from django.urls import path
from .views import (
    details,
    login_api,
    submit,
    delete_submit,
    export_course_choices_csv,
    get_seats_open_course,
    get_submissions,
    allotement,
)

urlpatterns = [
    # path('api/submit/', save_object, name='save_object'),
    path("api/details/", details),
    path("api/login/", login_api),
    path("api/submit/", submit),
    path("api/delete", delete_submit),
    path("api/data_csv", export_course_choices_csv),
    path("api/seats", get_seats_open_course),
    path("api/submissions", get_submissions),
    path("api/allotement", allotement),
]
