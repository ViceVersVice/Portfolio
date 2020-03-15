from django.urls import path

from .views import TestViewOne

urlpatterns = [
    path('test/', TestViewOne.as_view(), name='test_view_one')
]