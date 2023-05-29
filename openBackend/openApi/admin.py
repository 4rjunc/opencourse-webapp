from django.contrib import admin
from .models import OC
import os
from django.http import HttpResponse
import csv
import pandas as pd

#FIXed the Proccess and Download.csv, not finished the final check with some more data
def process_file(file_path):
    df = pd.read_csv(file_path)
    df.sort_values(by=['Marks'], ascending=False, inplace=True)
    seats = {
        "BOT": 30, "CHE": 34, "COM": 66, "CSC": 20, "ECO": 58,
        "HIS": 55, "MAL": 39, "MAT": 33, "PED": 30, "PHY": 42,
        "POL": 50, "SKT": 50, "STA": 33, "ZLG": 28
    }
    currently_allotted_seats = {
        "BOT": 0, "CHE": 0, "COM": 0, "CSC": 0, "ECO": 0,
        "HIS": 0, "MAL": 0, "MAT": 0, "PED": 0, "PHY": 0,
        "POL": 0, "SKT": 0, "STA": 0, "ZLG": 0
    }
    courses = {
        "_5D01BOT": "BOT", "_5D03BOT": "BOT",
        "_5D03CHE": "CHE", "_5D04CHE": "CHE",
        "_5D01COM": "COM", "_5D03COM": "COM",
        "_5D02CSC": "CSC", "_5D05CSC": "CSC",
        "_5D01ECO": "ECO", "_5D04ECO": "ECO",
        "_5D01HIS": "HIS", "_5D02HIS": "HIS", "_5D03HIS": "HIS",
        "_5D03MAL": "MAL", "_5D04MAL": "MAL",
        "_5D02MAT": "MAT", "_5D04MAT": "MAT",
        "_5D05PED": "PED",
        "_5D03PHY": "PHY", "_5D05PHY": "PHY",
        "_5D01POL": "POL", "_5D05POL": "POL",
        "_5D02SKT": "SKT", "_5D05SKT": "SKT",
        "_5D02STA": "STA", "_5D04STA": "STA",
        "_5D02ZLG": "ZLG", "_5D03ZLG": "ZLG"
    }

    def is_available(dept):
        return currently_allotted_seats[dept] < seats[dept]

    def update_seats(dept):
        currently_allotted_seats[dept] = currently_allotted_seats[dept] + 1 

    open_list = []

    for i, stud in df.iterrows():
        allotted = False
        for choice in range(1, 25):
            l = stud[stud == choice].index.tolist()
            if l:
             for course, dept in courses.items():
                    if l[0] == course:
                        if is_available(dept):
                            update_seats(dept)
                            allotted = True
                            allotment_row = []
                            allotment_row.append(stud["Reg_No"])
                            allotment_row.append(stud["Name"])
                            allotment_row.append(stud["Marks"])
                            allotment_row.append(course)
                            allotment_row.append(choice)
                            open_list.append(allotment_row)
                            break
                        if allotted:
                             break

    data = pd.DataFrame(open_list)
    new_file_path = "./openApi/csv_file/Open_Course.xlsx"  # Replace 'path/to/project/folder' with the actual path to your project folder
    data.to_excel(new_file_path, index=False)
    return new_file_path


#
def process_and_download_csv(self, request, queryset):
        file_path = "./openApi/csv_file/Open_Course.csv"  # Replace 'path/to/project/folder' with the actual path to your project folder
        new_file_path = process_file(file_path)
        with open(new_file_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename=open_allotment_2022-23.xlsx'
            return response


# This action will download the oc table in .csv file
def final_data(modeladmin, request, queryset):
    filename = 'Open_Course.csv'
    file_path = os.path.join('./openApi/csv_file/', filename)  # Replace 'path/to/project/folder' with the actual path to your project folder
    
    with open(file_path, 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        fields = [field.name for field in OC._meta.fields]  
        
        writer.writerow(fields)
        for obj in queryset:
            writer.writerow([str(getattr(obj, field)) for field in fields])
    
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="Open_Course.csv"'

    writer = csv.writer(response)
    fields = [field.name for field in OC._meta.fields]  

    writer.writerow(fields)
    for obj in queryset:
        writer.writerow([str(getattr(obj, field)) for field in fields])

    return response
    

class OCAdmin(admin.ModelAdmin):
    actions = [final_data, process_and_download_csv]

admin.site.register(OC, OCAdmin)  


