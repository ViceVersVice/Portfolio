import pytest

from django.db.models import Q
from main_app.api.query_builder import SkillQueryBuilder
from rest_framework.request import QueryDict


@pytest.mark.parametrize(
    'query_params,expected',
    (
        (
            QueryDict(query_string='levelFilters='),
            Q()
        ),
        (
            QueryDict(query_string='levelFilters=1'),
            Q(level__in=['1'])
        ),
        (
            QueryDict(query_string='levelFilters=1,2,3'),
            Q(level__in=['1', '2', '3'])
        ),
    )
)
def test_query_builder__levelFilters(query_params, expected):
    # arrange

    # act
    query = SkillQueryBuilder(query_params).build()

    # assert
    assert query == expected


@pytest.mark.parametrize(
    'query_params,expected',
    (
        (
            QueryDict(query_string='categoryFilter='),
            Q()
        ),
        (
            QueryDict(query_string='categoryFilter=1'),
            Q(category__in=['1'])
        ),
        (
            QueryDict(query_string='categoryFilter=1,2,3'),
            Q(category__in=['1', '2', '3'])
        ),
    )
)
def test_query_builder__categoryFilter(query_params, expected):
    # arrange

    # act
    query = SkillQueryBuilder(query_params).build()

    # assert
    assert query == expected
