from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from accounts.models import UserProfile
from base.views import SnakeCamelViewSet, SnakeCamelListView
from .pagination import StartCountPagination
from .serializers import SkillSerializer, SkillCommentSerializer, ProjectSerializer
from main_app.models import Skill, Comment, Project


class SkillViewSet(SnakeCamelViewSet):
    model = Skill
    serializer_class = SkillSerializer
    pagination_class = StartCountPagination
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Skill.objects.all()

    def list(self, request, *args, **kwargs):
        response = super().list(request, args, kwargs)
        return response

    @action(detail=True, methods=['get'], basename='comments')
    def skill_comments(self, request, *args, **kwargs):
        skill = self.get_object()
        comments = skill.comments.all()
        skill_comments = self.paginate_queryset(comments)
        serializer = SkillCommentSerializer(skill_comments, many=True)

        return self.paginator.get_paginated_response(serializer.data)


class SkillCommentsViewSet(SnakeCamelViewSet):
    model = Comment
    serializer_class = SkillCommentSerializer
    pagination_class = StartCountPagination
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_403_FORBIDDEN)

    def get_queryset(self):
        return Comment.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data.update({'profile': UserProfile.objects.get(user=request.user)})

        serializer = SkillCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

        if serializer.errors:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.data)


class ProjectListView(SnakeCamelListView):
    model = Project
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    pagination_class = StartCountPagination

    def get_queryset(self):
        return Project.objects.all()
