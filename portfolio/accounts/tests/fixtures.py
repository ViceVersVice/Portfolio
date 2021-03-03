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
        date_of_birth = kwargs.pop('user', None) or timezone.now()
        return UserProfile.objects.create(user=user, date_of_birth=date_of_birth, **kwargs)

    return _create

