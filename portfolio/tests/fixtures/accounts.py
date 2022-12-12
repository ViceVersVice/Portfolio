import uuid

import pytest
from django.contrib.auth.models import User
from django.utils import timezone

from accounts.models import UserProfile


@pytest.fixture
def user_factory():
    def _create(**kwargs) -> User:
        username = kwargs.pop('username', None) or uuid.uuid4()
        return User.objects.create(username=username, **kwargs)

    return _create


@pytest.fixture
def user_profile_factory(user_factory):
    def _create(**kwargs) -> UserProfile:
        user = kwargs.pop('user', None) or user_factory()
        return UserProfile.objects.create(user=user, **kwargs)

    return _create

