from rest_framework.viewsets import ModelViewSet

from .pagination import StartCountPagination
from .serializers import SkillSerializer
from main_app.models import Skill


class SkillViewSet(ModelViewSet):
    model = Skill
    serializer_class = SkillSerializer
    pagination_class = StartCountPagination

    def get_queryset(self):
        return Skill.objects.all()

    def get_paginated_response(self, data):
        resp = super().get_paginated_response(data)
        print(resp.data)
        return resp

    def list(self, request, *args, **kwargs):
        print(self.paginator)
        response = super().list(request, args, kwargs)
        import time
        # print('LOOOOOOOOOOO!!!')
        return response


    # def get(self, request, *args, **kwargs):
    #     response_data = SkillSerializer(self.get_queryset(), many=True).data
    #     return Response(response_data)
