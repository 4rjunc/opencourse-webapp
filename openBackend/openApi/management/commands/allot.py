from typing import Any, Optional
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from openApi.models import StudMaster, OpenCourseChoice, Course
from django.db.models import Q
from django.db import IntegrityError
from django.core import serializers
import csv
import pandas as pd

class Command(BaseCommand):
    def handle(self, *args: Any, **options):
        print("hello")
        opencourse = Course.objects.filter(Q(course_type=2) & Q(syllabus_intro_year=2019))
        courses_list = [course.course_code for course in opencourse]
        header = ["Name", "Marks", "Reg No."]
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
        print(f"{data = }")
        data.to_csv('allote.csv', index=False)

        # def is_available(dept):
        #     return currently_allotted_seats[dept] < seats[dept]

        # def update_seats(dept):
        #     currently_allotted_seats[dept] = currently_allotted_seats[dept] + 1

        # df = data
        # df.sort_values(by=['Marks'], ascending=False,inplace=True)
        # seats = {"BOT":30,"CHE":34,"COM":66,"CSC":20,"ECO":58,
        #         "HIS":55,"MAL":39,"MAT":33,"PED":30,"PHY":42,
        #         "POL":50,"SKT":50,"STA":33,"ZLG":28}
        # currently_allotted_seats = {"BOT":0,"CHE":0,"COM":0,"CSC":0,"ECO":0,
        #         "HIS":0,"MAL":0,"MAT":0,"PED":0,"PHY":0,
        #         "POL":0,"SKT":0,"STA":0,"ZLG":0}

        # courses ={"5D01BOT":"BOT","5D03BOT":"BOT",
        #         "5D03CHE":"CHE","5D04CHE":"CHE",
        #         "5D01COM":"COM","5D03COM":"COM",
        #         "5D02CSC":"CSC","5D05CSC":"CSC",
        #         "5D01ECO":"ECO","5D04ECO":"ECO",
        #         "5D01HIS":"HIS","5D02HIS":"HIS","5D03HIS":"HIS",
        #         "5D03MAL":"MAL","5D04MAL":"MAL",
        #         "5D02MAT":"MAT","5D04MAT":"MAT",
        #         "5D05PED":"PED",
        #         "5D03PHY":"PHY","5D05PHY":"PHY",
        #         "5D01POL":"POL","5D05POL":"POL",
        #         "5D02SKT":"SKT","5D05SKT":"SKT",
        #         "5D02STA":"STA","5D04STA":"STA",
        #         "5D02ZLG":"ZLG","5D03ZLG":"ZLG"}

        # open_list = []

        # for i, stud in df.iterrows():
        #     allotted = False
        #     for choice in range(1,25):
        #         l = stud[stud  == choice].index.tolist()
        #         print(f"{l=}")
        #         for course, dept in courses.items():
        #             print(stud["Reg No."])
        #             try : 
        #                 if l[0] == course:
        #                     if is_available(dept):
        #                         update_seats(dept)
        #                         allotted = True
        #                         allotment_row = []
        #                         allotment_row.append(stud["Reg No."])
        #                         allotment_row.append(stud["Name"])
        #                         allotment_row.append(stud["Marks"])
        #                         allotment_row.append(course)
        #                         allotment_row.append(choice)
        #                         open_list.append(allotment_row)
        #                         break
        #             except IndexError:
        #                 break
        #         if allotted == True:
        #             break

        # data = pd.DataFrame(open_list)
        # data.to_excel("open_allotment_2022-23.xlsx")

        # with open("student_data.csv", mode="w", newline="") as csv_file:
        #     writer = csv.writer(csv_file)
        #     writer.writerow(header)

        #     for student_id, student_info in student_data.items():
        #         row = [student_info[column] for column in header]
        #         writer.writerow(row)






