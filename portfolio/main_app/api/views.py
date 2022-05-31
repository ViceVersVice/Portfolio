from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.request import Request

from accounts.models import UserProfile
from base.views import SnakeCamelViewSet, SnakeCamelListView
from .pagination import StartCountPagination
from .serializers import SkillSerializer, SkillCommentSerializer, ProjectSerializer, LEVEL_TO_COLOR_MAP
from main_app.models import Skill, Comment, Project, SKILL_LEVEL_CHOICES


class SkillViewSet(SnakeCamelViewSet):
    model = Skill
    serializer_class = SkillSerializer
    pagination_class = StartCountPagination
    permission_classes = [AllowAny]

    def get_queryset(self):
        filter_query = Q()
        if level_filters := self.request.query_params.get('levelFilters'):
            filter_query |= Q(level__in=level_filters.split(','))

        return Skill.objects.filter(filter_query).order_by('-level')

    def list(self, request, *args, **kwargs):
        response = super().list(request, args, kwargs)
        return response

    @action(detail=True, methods=['get'], basename='comments-count')
    def comments_count(self, request: Request, *args, **kwargs):
        skill = self.get_object()
        return Response({'comments_count': skill.comments.count()})

    @action(detail=True, methods=['get'], basename='comments')
    def skill_comments(self, request: Request, *args, **kwargs):
        skill = self.get_object()
        comments = skill.comments.all().order_by('-date_added')
        skill_comments = self.paginate_queryset(comments)
        serializer = SkillCommentSerializer(skill_comments, many=True)

        return self.paginator.get_paginated_response(serializer.data)

    @action(detail=False, methods=['get'], basename='level-filters')
    def level_filters(self, request: Request, *args, **kwargs):
        return Response(
            {
                'levelFilters': {
                    level: {'name': name, 'color': LEVEL_TO_COLOR_MAP.get(level)}
                    for level, name in SKILL_LEVEL_CHOICES
                }
            }
        )


class SkillCommentsViewSet(SnakeCamelViewSet):
    model = Comment
    serializer_class = SkillCommentSerializer
    pagination_class = StartCountPagination
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_403_FORBIDDEN)

    def get_queryset(self):
        return Comment.objects.all().order_by('-date_added')

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'errors': ['Sign in to leave a comment']})

        data = request.data.copy()
        data.update({'profile': UserProfile.objects.get(user=request.user.id).id})

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
        return Project.objects.all().order_by('start_date')
