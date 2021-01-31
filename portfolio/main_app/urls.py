from django.urls import path

from .views import EntryPointView

urlpatterns = [
    path('first/', EntryPointView.as_view(), name='main_page')
]