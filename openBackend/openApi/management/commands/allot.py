from typing import Any, Optional
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from openApi.models import StudMaster, OpenCourseChoice, Course
from django.db.models import Q
from django.db import IntegrityError
from django.core import serializers
import csv

class Command(BaseCommand):
    def handle(self, *args: Any, **options):
        print("hello")
        opencourse = Course.objects.filter(Q(course_type=2) & Q(syllabus_intro_year=2019))
        courses_list = [course.course_code for course in opencourse]
        header = ["Name", "Marks", "Registration Number"]
        header += courses_list
        print(f"{header = }")           
        student_data = {}  # Create a dictionary to store data for each student

        submissions = OpenCourseChoice.objects.all()
        for sub in submissions:
            student_id = sub.stud_id.uty_reg_no
            if student_id not in student_data:
                student_data[student_id] = {
                    "Name": sub.stud_id.name,
                    "Marks": sub.stud_id.marks_twelth,
                    "Registration Number": sub.stud_id.uty_reg_no  
                }
                # Initialize choices for all courses with 99 (or another default value)
                student_data[student_id].update({course: 99 for course in courses_list})

            # Update the choice for the specific course
            student_data[student_id][sub.course_code] = sub.choice

        with open("student_data.csv", mode="w", newline="") as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow(header)

            for student_id, student_info in student_data.items():
                row = [student_info[column] for column in header]
                writer.writerow(row)






