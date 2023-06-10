from django.urls import path
from .views import details

urlpatterns = [
    #path('api/submit/', save_object, name='save_object'),
    path('api/details/',details)
]
