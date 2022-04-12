from django.urls import path

from .views import EntryPointView

urlpatterns = [
    path('', EntryPointView.as_view(), name='main_page')
]
