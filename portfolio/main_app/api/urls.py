from django.urls import path, include
from rest_framework.routers import SimpleRouter, DefaultRouter

from .views import SkillViewSet

skills_router = DefaultRouter()

skills_router.register('skills', SkillViewSet, basename='skills')

urlpatterns = [
    path("", include(skills_router.urls))
]
