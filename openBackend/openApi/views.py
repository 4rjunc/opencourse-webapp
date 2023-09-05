from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import StudMaster, Course, Programme, OpenCourseChoice, SeatsOpenCourse
import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.urls import reverse
from django.db.models import Q
from django.core import serializers
import csv



# http://127.0.0.1:8000/openApi/api/details/?regno=NA20CPCR29

def details(request):
    reg = request.GET.get("regno")
    try:
        student = StudMaster.objects.get(uty_reg_no=reg)
    except StudMaster.DoesNotExist:
        return JsonResponse({"message": "Student Not Found"}, status=404)
    response = []
    name = student.name
    marks = student.marks_twelth
    regno = student.uty_reg_no
    dept = str(student.pgm)
    dob = student.dob
    # Try to make it short or better
    # Will sort out the opencourses considering the dept of student
    programm = Programme.objects.filter(pgm_name=dept).first()
    opencourse = Course.objects.filter(
        Q(course_type=2) & Q(syllabus_intro_year=2019) & ~Q(dept=programm.dept_id)
    )
    courses_list = serializers.serialize("python", opencourse)
    courses_list = [
        {course["fields"]["course_title"]: course["fields"]["course_code"]}
        # {course["fields"]["course_code"] : course["fields"]["course_title"] }
        for course in courses_list
    ]

    stud_dict = {
        "name": name,
        "marks": marks,
        "dept": dept,
        "regno": regno,
        "dob": dob,
        "courses": courses_list,
    }
    response = [stud_dict]
    return JsonResponse(response, safe=False)


# http://127.0.0.1:8000/openApi/api/login/


@csrf_exempt
def login_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        print(username, password)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            session_token = request.session.session_key
            staff = user.is_staff
            print(staff)
            if not session_token:
                # Create a new session if one doesn't exists
                request.session.create()
                session_token = request.session.session_key
            return JsonResponse(
                {"message": "Login successful", "session_token": session_token, "staff" : staff}
            )
        else:
            return JsonResponse({"message": "Invalid username or password"}, status=401)
    else:
        return JsonResponse({"message": "Invalid request"}, status=400)


@csrf_exempt
def submit(request):
    if request.method == "POST":
        data = json.loads(request.body)
        reg_no = data["regno"]
        stud_obj = StudMaster.objects.get(uty_reg_no=reg_no)
        course_list = data["selectedCourses"]
        # Checks the data already exist
        existing_entry = OpenCourseChoice.objects.filter(stud_id=stud_obj).exists()
        if existing_entry:
            return JsonResponse(
                {"message": "User has already made an entry"}, status=400
            )

        for course_code, choice in course_list.items():
            open_obj = OpenCourseChoice(
                course_code=course_code, choice=choice, stud_id=stud_obj
            )
            open_obj.save()
        return JsonResponse({"message": "Data Stubmitted"})

@csrf_exempt
def delete_submit(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        reg_no = data["regno"]
        try:
            stud_obj = StudMaster.objects.get(uty_reg_no=reg_no)
            record = OpenCourseChoice.objects.filter(stud_id=stud_obj)
            if record.exists():
                record.delete()
                return JsonResponse({"message": f"Deleted {reg_no} from the submissions"})
            else:
                return JsonResponse({"message": f"No submission found for {reg_no}"}, status=404)
        except StudMaster.DoesNotExist:
            return JsonResponse({"message": f"Student not found"}, status=404)
    else:
        return JsonResponse({"message": "Invalid request"}, status=400)
    
  # Adjust the import to your model

def export_course_choices_csv(request):
    queryset = OpenCourseChoice.objects.all()  # Get the queryset of course choices
    
    header = ["Name", "Marks", "CourseCode", "Choice"]
    rows = []

    for choice in queryset:
        name = choice.stud_id.name
        marks = choice.stud_id.marks_twelth
        course_code = choice.course_code
        choice_num = choice.choice
        row = [name, marks, course_code, choice_num]
        rows.append(row)

    filename = "course_choices.csv"

    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = f'attachment; filename="{filename}"'

    writer = csv.writer(response)
    writer.writerow(header)
    writer.writerows(rows)

    return response

#Not intergrated Yet ! 🛠
def get_seats_open_course(request):
    # Fetch the single instance of SeatsOpenCourse (assuming it's the only instance)
    seats_open_course = SeatsOpenCourse.objects.first()
    
    # Serialize the data manually
    serialized_data = {
        "id": seats_open_course.id,
        "BOT": seats_open_course.BOT,
        "CHE": seats_open_course.CHE,
        "COM": seats_open_course.COM,
        "CSC": seats_open_course.CSC,
        "ECO": seats_open_course.ECO,
        "MAT": seats_open_course.MAT,
        "PED": seats_open_course.PED,
        "PHY": seats_open_course.PHY,
        "POL": seats_open_course.POL,
        "SKT": seats_open_course.SKT,
        "STA": seats_open_course.STA,
        "ZLG": seats_open_course.ZLG,
        "HIS": seats_open_course.HIS,
        "ENG": seats_open_course.ENG,
        "MAL": seats_open_course.MAL
    }

    # Return the serialized data as JSON response
    return JsonResponse(serialized_data)



def get_submissions(request):
    if request.method == "GET":
        page = request.GET.get('page', 2)  # Get the page parameter from the query string (default to 1 if not provided)
        rows_per_page = request.GET.get('rowsPerPage', 10)  # Get the rowsPerPage parameter (default to 10 if not provided)

        try:
            page = int(page)
            rows_per_page = int(rows_per_page)
        except ValueError:
            return JsonResponse({'message': 'Invalid page or rowsPerPage parameter'}, status=400)

        # Calculate the starting and ending indices for the pagination
        start_index = (page - 1) * rows_per_page
        end_index = start_index + rows_per_page

        submissions = OpenCourseChoice.objects.all()[start_index:end_index]  # Slice the queryset based on pagination
        total_rows = OpenCourseChoice.objects.count()  # Get the total number of rows

        if submissions.exists():
            sub_data = [
                {
                    "id": sub.id,
                    "Name": sub.stud_id.name,
                    "Regno": sub.stud_id.uty_reg_no,
                    "Course Code": sub.course_code,
                    "Choice": sub.choice
                }
                for sub in submissions
            ]
            return JsonResponse({'submission_data': sub_data, 'total_rows': total_rows}, status=200)
        else:
             return JsonResponse({'message': 'No submissions found'}, status=404)

        # student_data = {}  # Create a dictionary to store data for each student
        # opencourse = Course.objects.filter(Q(course_type=2) & Q(syllabus_intro_year=2019))
        # courses_list = [course.course_code for course in opencourse]
        # submissions = OpenCourseChoice.objects.all()
        # header = ["Name", "Marks", "Registration Number"]
        # header += courses_list
        # if submissions.exists():
        #     for sub in submissions:
        #         student_id = sub.stud_id.uty_reg_no
        #         if student_id not in student_data:
        #             student_data[student_id] = {
        #                 "Name": sub.stud_id.name,
        #                 "Marks": sub.stud_id.marks_twelth,
        #                 "Registration Number": sub.stud_id.uty_reg_no  
        #             }
        #             # Initialize choices for all courses with 99 (or another default value)
        #             student_data[student_id].update({course: 99 for course in courses_list})

        #         # Update the choice for the specific course
        #         student_data[student_id][sub.course_code] = sub.choice
        #         final_data = {}
        #         for student_id, student_info in student_data.items():
        #              final_data = [student_info[column] for column in header]
        #     return JsonResponse({'submission_data': final_data, 'total_rows': total_rows, 'headers': header}, status=200)
        # else:
        #     return JsonResponse({'message': 'No submissions found'}, status=404)

def allotement(request):
    return JsonResponse({"message":"Success"}, status=200)
