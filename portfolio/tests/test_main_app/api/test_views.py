from main_app.api.views import SkillQueryBuilder
from rest_framework.request import QueryDict
from django.db.models import Q


def test_skill_query_builder__level_filters():
    query_dict = QueryDict('levelFilters=1&levelFilters=3')
    query = SkillQueryBuilder(query_dict).build()

    print('QQQ:', query)
    # assert query == Q()