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
import pandas as pd
import os
import tempfile
import zipfile
import shutil


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
                {
                    "message": "Login successful",
                    "session_token": session_token,
                    "staff": staff,
                }
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
                return JsonResponse(
                    {"message": f"Deleted {reg_no} from the submissions"}
                )
            else:
                return JsonResponse(
                    {"message": f"No submission found for {reg_no}"}, status=404
                )
        except StudMaster.DoesNotExist:
            return JsonResponse({"message": f"Student not found"}, status=404)
    else:
        return JsonResponse({"message": "Invalid request"}, status=400)

def submissions_csv(request):
    opencourse = Course.objects.filter(Q(course_type=2) & Q(syllabus_intro_year=2019))
    courses_list = [course.course_code for course in opencourse]
    header = ["Name", "Class", "Reg No.", "Marks"]
    header += courses_list
    student_data = {}  # Create a dictionary to store data for each student
    submissions = OpenCourseChoice.objects.all()
    for sub in submissions:
        student_id = sub.stud_id.uty_reg_no
        if student_id not in student_data:
            student_data[student_id] = {
                "Name": sub.stud_id.name,
                "Class": sub.stud_id.pgm,
                "Reg No.": sub.stud_id.uty_reg_no,
                "Marks": sub.stud_id.marks_twelth,
            }
            # Initialize choices for all courses with 99 (or another default value)
            student_data[student_id].update({course: 99 for course in courses_list})

        # Update the choice for the specific course
        student_data[student_id][sub.course_code] = sub.choice

    data = pd.DataFrame(student_data)
    data = data.T
    # print(f"{data = }")
    # data.to_csv('allote.csv', index=False)
    response = HttpResponse(content_type="text/csv")
    response[
        "Content-Disposition"
    ] = 'attachment; filename="opencourse_submissions.csv"'
    # Write the DataFrame to the response
    data.to_csv(response, index=False)
    return response


# Not intergrated Yet ! 🛠
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
        "MAL": seats_open_course.MAL,
    }

    # Return the serialized data as JSON response
    return JsonResponse(serialized_data)


def get_submissions(request):
    if request.method == "GET":
        page = request.GET.get(
            "page", 2
        )  # Get the page parameter from the query string (default to 1 if not provided)
        rows_per_page = request.GET.get(
            "rowsPerPage", 10
        )  # Get the rowsPerPage parameter (default to 10 if not provided)
        try:
            page = int(page)
            rows_per_page = int(rows_per_page)
        except ValueError:
            return JsonResponse(
                {"message": "Invalid page or rowsPerPage parameter"}, status=400
            )
        # Calculate the starting and ending indices for the pagination
        start_index = (page - 1) * rows_per_page
        end_index = start_index + rows_per_page
        submissions = OpenCourseChoice.objects.all()[
            start_index:end_index
        ]  # Slice the queryset based on pagination
        total_rows = OpenCourseChoice.objects.count()  # Get the total number of rows
        if submissions.exists():
            sub_data = [
                {
                    "id": sub.id,
                    "Name": sub.stud_id.name,
                    "Regno": sub.stud_id.uty_reg_no,
                    "Course Code": sub.course_code,
                    "Choice": sub.choice,
                }
                for sub in submissions
            ]
            return JsonResponse(
                {"submission_data": sub_data, "total_rows": total_rows}, status=200
            )
        else:
            return JsonResponse({"message": "No submissions found"}, status=404)

        
#Allotement 
def allotement_csv(request):
    opencourse = Course.objects.filter(Q(course_type=2) & Q(syllabus_intro_year=2019))
    courses_list = [course.course_code for course in opencourse]
    header = ["Name", "Class", "Reg No.", "Marks"]
    header += courses_list
    student_data = {}  # Create a dictionary to store data for each student
    submissions = OpenCourseChoice.objects.all()
    for sub in submissions:
        student_id = sub.stud_id.uty_reg_no
        if student_id not in student_data:
            student_data[student_id] = {
                "Name": sub.stud_id.name,
                "Class": sub.stud_id.pgm,
                "Reg No.": sub.stud_id.uty_reg_no,
                "Marks": sub.stud_id.marks_twelth,
            }
            # Initialize choices for all courses with 99 (or another default value)
            student_data[student_id].update({course: 99 for course in courses_list})

        # Update the choice for the specific course
        student_data[student_id][sub.course_code] = sub.choice

    data = pd.DataFrame(student_data)
    data = data.T
 
    def is_available(dept):
            return currently_allotted_seats[dept] < seats[dept]

    def update_seats(dept):
            currently_allotted_seats[dept] = currently_allotted_seats[dept] + 1

    df = data
    df.sort_values(by=['Marks'], ascending=False,inplace=True)
    seats = {"BOT":30,"CHE":34,"COM":66,"CSC":20,"ECO":58,
                "HIS":55,"MAL":39,"MAT":33,"PED":30,"PHY":42,
                "POL":50,"SKT":50,"STA":33,"ZLG":28}
    currently_allotted_seats = {"BOT":0,"CHE":0,"COM":0,"CSC":0,"ECO":0,
                "HIS":0,"MAL":0,"MAT":0,"PED":0,"PHY":0,
                "POL":0,"SKT":0,"STA":0,"ZLG":0}

    courses ={"5D01BOT":"BOT","5D03BOT":"BOT",
                "5D03CHE":"CHE","5D04CHE":"CHE",
                "5D01COM":"COM","5D03COM":"COM",
                "5D02CSC":"CSC","5D05CSC":"CSC",
                "5D01ECO":"ECO","5D04ECO":"ECO",
                "5D01HIS":"HIS","5D02HIS":"HIS","5D03HIS":"HIS",
                "5D03MAL":"MAL","5D04MAL":"MAL",
                "5D02MAT":"MAT","5D04MAT":"MAT",
                "5D05PED":"PED",
                "5D03PHY":"PHY","5D05PHY":"PHY",
                "5D01POL":"POL","5D05POL":"POL",
                "5D02SKT":"SKT","5D05SKT":"SKT",
                "5D02STA":"STA","5D04STA":"STA",
                "5D02ZLG":"ZLG","5D03ZLG":"ZLG"}

    open_list = []

    for i, stud in df.iterrows():
            allotted = False
            for choice in range(1,25):
                l = stud[stud  == choice].index.tolist()
                for course, dept in courses.items():
                    try :
                        if l[0] == course:
                            if is_available(dept):
                                update_seats(dept)
                                allotted = True
                                allotment_row = []
                                allotment_row.append(stud["Reg No."])
                                allotment_row.append(stud["Name"])
                                allotment_row.append(stud["Class"])
                                allotment_row.append(stud["Marks"])
                                allotment_row.append(course)
                                allotment_row.append(choice)
                                open_list.append(allotment_row)
                                break
                    except IndexError:
                        break
                if allotted == True:
                    break
    temp_dir = tempfile.mkdtemp()

    data = pd.DataFrame(open_list)  
    header = ["Reg No.", "Name","Class", "Marks", "Course Code", "Choice"]
    data.columns = header
    data.to_csv(os.path.join(temp_dir, f'Allotement_Master.csv'), index=False)
    
    #Creating .csv's wrt course code
    opencourse_list = data["Course Code"].unique()
    opencourse_by_coursecode={}
    for course_code in opencourse_list:
        opencourse_by_coursecode[course_code] = data[data["Course Code"] == course_code]
    for course_code in opencourse_list:
        opencourse_by_coursecode[course_code].to_csv(os.path.join(temp_dir, f'{course_code}.csv'), index=False)

    #Creating .csv's wrt department
    opencourse_by_dept={}
    for dept in courses.values():
        opencourse_by_dept[dept] = data[data["Course Code"].str[-3:] == dept]
    for dept in courses.values():
        opencourse_by_dept[dept].to_csv(os.path.join(temp_dir, f'{dept}.csv'), index=False)

    # Creating Zip file
    zip_filename = 'OpenCourse_Allotement.zip'
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(temp_dir):
            for file in files:
                zipf.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), temp_dir))

    # Create an HTTP response with the ZIP file
    response = HttpResponse(open(zip_filename, 'rb').read(), content_type='application/zip')
    response['Content-Disposition'] = f'attachment; filename="{zip_filename}"'
    
    # Clean up the temporary directory and ZIP file
    os.unlink(zip_filename)
    shutil.rmtree(temp_dir)
    return response
