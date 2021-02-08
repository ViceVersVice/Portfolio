from django.urls import path

from accounts.views import GetUserInfoView


urlpatterns = [
    path('userinfo/', GetUserInfoView.as_view(), name='user_info')
]