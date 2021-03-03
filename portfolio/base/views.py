from rest_framework.viewsets import ModelViewSet

from utils.parsers import CamelCaseJsonParser
from utils.renderers import CamelCaseJsonRenderer


class SnakeCamelViewSet(ModelViewSet):
    parser_classes = [CamelCaseJsonParser]
    renderer_classes = [CamelCaseJsonRenderer]
