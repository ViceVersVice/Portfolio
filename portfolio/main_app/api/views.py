from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .pagination import StartCountPagination
from .serializers import SkillSerializer, SkillCommentSerializer
from main_app.models import Skill, Comment


class SkillViewSet(ModelViewSet):
    model = Skill
    serializer_class = SkillSerializer
    pagination_class = StartCountPagination

    def get_queryset(self):
        return Skill.objects.all()

    def get_paginated_response(self, data):
        resp = super().get_paginated_response(data)
        return resp

    def list(self, request, *args, **kwargs):
        response = super().list(request, args, kwargs)
        import time
        # print('LOOOOOOOOOOO!!!')
        return response

    @action(detail=True, methods=['post'])
    def add_comment(self, request, *args, **kwargs):
        serializer = SkillCommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'lol': 'lol'})
