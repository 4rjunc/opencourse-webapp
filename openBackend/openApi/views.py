from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import StudMaster
import json

#Takes the payload from http://127.0.0.1:8000/openApi/api/submit/ and saves it in 
"""
@csrf_exempt
def save_object(request):
    payload = json.loads(request.body.decode('utf-8'))
    #print(payload)
    name = payload.get("name")
    reg_number = payload.get("regNumber")
    dept = payload.get("dept")
    marks = payload.get("marks")
    course_list = payload.get("courseList")
    #print(marks)
    #print(course_list)

    Checks for duplicate entries
    if OC.objects.filter(Reg_No=reg_number).exists():
        #return JsonResponse({"message": "Object with the same regNumber already exists."}, status=400)
    oc_object = OC(
        Name=name,
        Class=dept,
        Reg_No=reg_number,
        Marks=marks,
        _5D01BOT=course_list.get("5D01BOT"),
        _5D03BOT=course_list.get("5D03BOT"),
        _5D03CHE=course_list.get("5D03CHE"),
        _5D04CHE=course_list.get("5D04CHE"),
        _5D01COM=course_list.get("5D01COM"),
        _5D03COM=course_list.get("5D03COM"),
        _5D02CSC=course_list.get("5D02CSC"),
        _5D05CSC=course_list.get("5D05CSC"),
        _5D01ECO=course_list.get("5D01ECO"),
        _5D04ECO=course_list.get("5D04ECO"),
        _5D01HIS=course_list.get("5D01HIS"),
        _5D02HIS=course_list.get("5D02HIS"),
        _5D03HIS=course_list.get("5D03HIS"),
        _5D03MAL=course_list.get("5D03MAL"),
        _5D04MAL=course_list.get("5D04MAL"),
        _5D02MAT=course_list.get("5D02MAT"),
        _5D04MAT=course_list.get("5D04MAT"),
        _5D05PED=course_list.get("5D05PED"),
        _5D03PHY=course_list.get("5D03PHY"),
        _5D05PHY=course_list.get("5D05PHY"),
        _5D01POL=course_list.get("5D01POL"),
        _5D05POL=course_list.get("5D05POL"),
        _5D02SKT=course_list.get("5D02SKT"),
        _5D05SKT=course_list.get("5D05SKT"),
        _5D02STA=course_list.get("5D02STA"),
        _5D04STA=course_list.get("5D04STA"),
        _5D02ZLG=course_list.get("5D02ZLG"),
        _5D03ZLG=course_list.get("5D03ZLG")
    )
    oc_object.save()
    return JsonResponse({"message": "Object saved successfully."})
"""


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
        stud_dict = {
            "name" : name,
            "marks" : marks
        }
        
        response = [stud_dict]

        return JsonResponse(response, safe=False) 

 
