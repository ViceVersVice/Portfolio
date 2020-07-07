from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


class StartCountPagination(LimitOffsetPagination):
    limit_query_param = 'count'
    offset_query_param = 'start'

    def get_paginated_response(self, data):
        return Response(data)
