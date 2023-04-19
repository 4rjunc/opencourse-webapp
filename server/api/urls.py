from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('api-token-auth/', obtain_auth_token),
]
