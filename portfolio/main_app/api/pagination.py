from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


class StartCountPagination(LimitOffsetPagination):
    limit_query_param = 'count'
    offset_query_param = 'start'

    def paginate_queryset(self, queryset, request, view=None):
        # We want to store total queryset count to add it to response (needed for frontend endless pagination)
        if not getattr(self, 'items_count', None):
            self.items_count = queryset.count()

        paginated_qs = super().paginate_queryset(queryset, request, view=view)
        return paginated_qs

    def get_paginated_response(self, data):
        return Response({'data': data, 'total_items': self.items_count})
