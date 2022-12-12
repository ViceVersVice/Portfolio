import datetime
from django.utils import timezone

import pytest
from freezegun import freeze_time
import pytest_django

from main_app.api.serializers import SkillSerializer, SkillCommentSerializer, \
    LEVEL_TO_COLOR_MAP
from main_app.models import CONFIDENT, PRO


def test_skill_serializer(db, skill_factory, skill_comment_factory):
    # arrange
    skill = skill_factory(name='SkillName', description='Some description', level=PRO)
    first_comment = skill_comment_factory(text='Some text', skill=skill)
    second_comment = skill_comment_factory(text='Some text...', skill=skill)

    # act
    serialized_data = SkillSerializer(skill).data

    # assert
    assert serialized_data['id'] == skill.id
    assert serialized_data['name'] == skill.name
    assert serialized_data['description'] == skill.description
    assert serialized_data['image'] is None
    assert serialized_data['comments_count'] == 2
    assert serialized_data['level_color'] == LEVEL_TO_COLOR_MAP.get(PRO)


now = timezone.now()


@pytest.mark.parametrize(
    'db_date_added,expected',
    (
        (
            now - datetime.timedelta(days=5),
            '5 days ago'
        ),
        (
            now - datetime.timedelta(seconds=5),
            '5 seconds ago'
        ),
        (
            now - datetime.timedelta(minutes=4),
            '4 minutes ago'
        ),
        (
            now - datetime.timedelta(hours=8),
            '8 hours ago'
        ),
    )

)
def test_skill_comment_serializer__date_added_is_correct(
        db,
        skill_comment_factory,
        db_date_added,
        expected,
):
    # arrange
    with freeze_time(db_date_added):
        comment = skill_comment_factory(text='Some text')

    # act
    with freeze_time(now):
        serialized_data = SkillCommentSerializer(comment).data

    # assert
    assert serialized_data['date_added'] == expected


def test_skill_comment_serializer(db, skill_comment_factory):
    # arrange
    comment = skill_comment_factory(text='Some text')

    # act
    serialized_data = SkillCommentSerializer(comment).data

    # assert
    assert serialized_data['skill'] == comment.skill.id
    assert serialized_data['comment_text'] == comment.text
    assert serialized_data['profile'] == comment.profile.id



