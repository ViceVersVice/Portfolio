from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class EntryPointView(TemplateView):
    template_name = 'index.html'
