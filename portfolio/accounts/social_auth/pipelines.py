from django.contrib.auth.models import User

from accounts.models import UserProfile


def create_user_profile(strategy, details, backend, user=None, *args, **kwargs):
    picture_url = kwargs.get('response', {}).get('picture', {}).get('data', {}).get('url')
    user_profile, created = UserProfile.objects.get_or_create(user=user)
    if picture_url:
        user_profile.avatar = picture_url
        user_profile.save()
