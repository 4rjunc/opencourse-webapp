from django.urls import path
from .views import save_object

urlpatterns = [
    path('api/submit/', save_object, name='save_object'),
]
