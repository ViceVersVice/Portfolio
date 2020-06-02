from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import SkillSerializer
from main_app.models import Skill


class SkillViewSet(ModelViewSet):
    model = Skill
    serializer_class = SkillSerializer

    def get_queryset(self):
        return Skill.objects.all()

    # def get(self, request, *args, **kwargs):
    #     response_data = SkillSerializer(self.get_queryset(), many=True).data
    #     return Response(response_data)
