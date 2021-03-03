import pytest
import pytest_django

from ...api.serializers import SkillCharacteristicSerializer, SkillSerializer, SkillCommentSerializer
from ...models import SkillCharacteristic


def test_skill_characteristic_serializer(db, skill_characteristic_factory):
    skill_char = skill_characteristic_factory(name='Python4', level=SkillCharacteristic.CONFIDENT)
    serialized_data = SkillCharacteristicSerializer(skill_char).data

    assert len(serialized_data.items()) == 2
    assert serialized_data['name'] == skill_char.name
    assert serialized_data['level'] == SkillCharacteristic.CONFIDENT


def test_skill_serializer(db, skill_factory, skill_comment_factory):
    skill = skill_factory(name='SkillName', description='Some description')
    first_comment = skill_comment_factory(text='Some text', skill=skill)
    second_comment = skill_comment_factory(text='Some text...', skill=skill)

    serialized_data = SkillSerializer(skill).data

    assert serialized_data['id'] == skill.id
    assert serialized_data['name'] == skill.name
    assert serialized_data['description'] == skill.description
    assert serialized_data['image'] is None
    assert serialized_data['comments_count'] == 2


def test_skill_comment_serializer(db, skill_comment_factory):
    comment = skill_comment_factory(text='Some text')

    serialized_data = SkillCommentSerializer(comment).data

    assert serialized_data['skill'] == comment.skill.id
    assert serialized_data['comment_text'] == comment.text
    assert serialized_data['profile'] == comment.profile.id



