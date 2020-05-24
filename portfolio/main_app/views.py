from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework.views import APIView


class EntryPointView(TemplateView):
    template_name = 'index.html'


class TestViewOne(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'Hello': 'WRLD'})