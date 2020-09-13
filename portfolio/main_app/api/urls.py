from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import SkillViewSet, SkillCommentsViewSet

skills_router = DefaultRouter()
skill_comments_router = DefaultRouter()

skills_router.register('skills', SkillViewSet, basename='skills')
skill_comments_router.register('comments', SkillCommentsViewSet, basename='comments')

urlpatterns = [
    path("", include(skills_router.urls)),
    path("", include(skill_comments_router.urls))
]
