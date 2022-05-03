from django.urls import re_path

from .views import EntryPointView

urlpatterns = [
    re_path(r'^.*', EntryPointView.as_view(), name='main_page')
]
