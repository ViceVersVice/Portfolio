import pytest

from main_app.models import Skill, Comment


@pytest.fixture
def skill_factory():
    def _create_skill(**kwargs):
        return Skill.objects.create(**kwargs)

    return _create_skill


@pytest.fixture
def skill_comment_factory(skill_factory, user_profile_factory):
    def _create(**kwargs):
        skill = kwargs.pop('skill', None) or skill_factory(name='Skill')
        profile = kwargs.pop('profile', None) or user_profile_factory()
        return Comment.objects.create(skill=skill, profile=profile, **kwargs)

    return _create

