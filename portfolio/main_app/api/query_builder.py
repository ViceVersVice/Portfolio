from rest_framework.request import QueryDict
from django.db.models import Q


class SkillQueryBuilder:
    def __init__(self, query_params: QueryDict) -> None:
        self.qp = query_params

    def get_levelFilters(self, val: str) -> Q:
        return Q(level__in=val.split(','))

    def get_categoryFilter(self, val: str) -> Q:
        return Q(category__in=val.split(','))

    def build(self) -> Q:
        filter_query = Q()
        for param, val in self.qp.items():
            if val != '' and (method := getattr(self, f'get_{param}', None)):
                filter_query |= method(val=val)

        return filter_query
