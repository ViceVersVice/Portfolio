from django.contrib.auth.models import User

from accounts.models import UserProfile


def create_user_profile(strategy, details, backend, user=None, *args, **kwargs):
    user_profile, created = UserProfile.objects.get_or_create(user=user)

