from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import StudMaster, Course, Programme, OpenCourseChoice
import json
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.urls import reverse
from django.db.models import Q
from django.core import serializers

# http://127.0.0.1:8000/openApi/api/details/?regno=NA20CPCR29

def details(request):
        reg = request.GET.get('regno')
        try : 
            student = StudMaster.objects.get(uty_reg_no=reg)
        except StudMaster.DoesNotExist :
            return JsonResponse({'message': 'Student Not Found'}, status=404)
        response = []
        name = student.name
        marks = student.marks_twelth
        regno = student.uty_reg_no
        dept = str(student.pgm)
        dob = student.dob  
        #Try to make it short or better
        #Will sort out the opencourses considering the dept of student
        programm = Programme.objects.filter(pgm_name=dept).first()
        opencourse = Course.objects.filter(Q(course_type=2) & Q(syllabus_intro_year=2019) & ~Q(dept=programm.dept_id)) 
        courses_list = serializers.serialize('python', opencourse)
        courses_list = [ { course["fields"]["course_title"] : course["fields"]["course_code"]} for course in courses_list]

        stud_dict = {
            "name" : name,
            "marks" : marks,
            "dept" : dept,
            "regno" : regno,
            "dob" : dob,
            "courses" : courses_list
        }
        response = [stud_dict]
        return JsonResponse(response, safe=False) 

# http://127.0.0.1:8000/openApi/api/login/

@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        print(username,password)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            session_token = request.session.session_key
            if not session_token:
                # Create a new session if one doesn't exists
                request.session.create()
                session_token = request.session.session_key
            return JsonResponse({'message': 'Login successful', 'session_token': session_token})
        else:
            return JsonResponse({'message': 'Invalid username or password'}, status=401)
    else:
        return JsonResponse({'message': 'Invalid request'}, status=400)
    

@csrf_exempt
def submit(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        reg_no = data["regno"]
        stud_obj = StudMaster.objects.get(uty_reg_no=reg_no)
        course_list = data["selectedCourses"]
        print("course_list",course_list)
        for course_code, choice in course_list.items():
            open_obj = OpenCourseChoice(course_code=course_code, choice=choice, stud_id=stud_obj)
            open_obj.save()
        return JsonResponse({'message': "Data Stubmitted"})

