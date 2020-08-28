from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from accounts.models import UserProfile
from utils.parsers import CamelCaseJsonParser
from utils.renderers import CamelCaseJsonRenderer
from .pagination import StartCountPagination
from .serializers import SkillSerializer, SkillCommentSerializer
from main_app.models import Skill, Comment


class SkillViewSet(ModelViewSet):
    model = Skill
    serializer_class = SkillSerializer
    pagination_class = StartCountPagination
    authentication_classes = []
    permission_classes = [AllowAny]
    parser_classes = [CamelCaseJsonParser]
    renderer_classes = [CamelCaseJsonRenderer]

    def get_queryset(self):
        return Skill.objects.all()

    def get_paginated_response(self, data):
        resp = super().get_paginated_response(data)
        return resp

    def list(self, request, *args, **kwargs):
        response = super().list(request, args, kwargs)
        return response

    @action(detail=True, methods=['post'])
    def add_comment(self, request, *args, **kwargs):
        d = request.data.copy()
        d.update({'profile': UserProfile.objects.first().pk})
        serializer = SkillCommentSerializer(data=d)
        if serializer.is_valid():
            serializer.save()
        return Response({'errors': ['wtf you done!', 'bby bboi']}, status=status.HTTP_400_BAD_REQUEST)
