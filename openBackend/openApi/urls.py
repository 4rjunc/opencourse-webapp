from django.urls import path
from .views import (
    details,
    login_api,
    submit,
    delete_submit,
    submissions_csv,
    get_seats_open_course,
    get_submissions,
    allotement_csv,
)

urlpatterns = [
    # path('api/submit/', save_object, name='save_object'),
    path("api/details/", details),
    path("api/login/", login_api),
    path("api/submit/", submit),
    path("api/delete", delete_submit),
    path("api/submission_csv", submissions_csv),
    path("api/seats", get_seats_open_course),
    path("api/submissions", get_submissions),
    path("api/allotement_csv", allotement_csv),
]
