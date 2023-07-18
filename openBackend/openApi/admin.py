from django.contrib import admin
from . import models


import csv
from django.http import HttpResponse


def export_course_choices(modeladmin, request, queryset):
    # Define the header of the CSV file
    header = ["Name", "Marks", "CourseCode", "Choice"]

    # Create a list to store the rows of the CSV file
    rows = []

    # Iterate over the selected course choices and extract the required fields
    for choice in queryset:
        name = choice.stud_id.name
        marks = choice.stud_id.marks_twelth
        course_code = choice.course_code
        choice_num = choice.choice
        row = [name, marks, course_code, choice_num]
        rows.append(row)

    # Specify the filename of the CSV file
    filename = "course_choices.csv"

    # Create the HTTP response with CSV content
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = f'attachment; filename="{filename}"'

    # Write the data to the CSV file
    writer = csv.writer(response)
    writer.writerow(header)
    writer.writerows(rows)

    return response


export_course_choices.short_description = "Export selected course choices to CSV"


class OpenCourseChoiceAdmin(admin.ModelAdmin):
    list_display = ["course_code", "choice", "stud_id"]
    actions = [export_course_choices]


admin.site.register(models.OpenCourseChoice, OpenCourseChoiceAdmin)

# Get all model classes defined in the models module
model_classes = [
    getattr(models, name)
    for name in dir(models)
    if isinstance(getattr(models, name), type)
]

# Register all model classes
for model_class in model_classes:
    if model_class != models.OpenCourseChoice:
        admin.site.register(model_class)


