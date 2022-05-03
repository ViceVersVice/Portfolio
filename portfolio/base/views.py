from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView

from utils.parsers import CamelCaseJsonParser
from utils.renderers import CamelCaseJsonRenderer


class SnakeCamelViewSet(ModelViewSet):
    parser_classes = [CamelCaseJsonParser]
    renderer_classes = [CamelCaseJsonRenderer]


class SnakeCamelListView(ListAPIView):
    parser_classes = [CamelCaseJsonParser]
    renderer_classes = [CamelCaseJsonRenderer]
