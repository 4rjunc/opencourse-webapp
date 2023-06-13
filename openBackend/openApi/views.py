from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import StudMaster, Course, Department
import json
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.urls import reverse
from django.db.models import Q
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
        dept = str(student.pgm)
        print(dept)
        stud_dict = {
            "name" : name,
            "marks" : marks,
            "dept" : dept,
            #"courses" : open_course
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
                # Create a new session if one doesn't exist
                request.session.create()
                session_token = request.session.session_key
            # Generate the redirection URL
            redirect_url = 'course'  # Replace 'your_specific_page' with your actual URL name
            return JsonResponse({'message': 'Login successful', 'session_token': session_token, 'redirect_url': redirect_url})
        else:
            return JsonResponse({'message': 'Invalid username or password'}, status=401)
    else:
        return JsonResponse({'message': 'Invalid request'}, status=400)


 
