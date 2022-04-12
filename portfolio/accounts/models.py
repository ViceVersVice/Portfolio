from uuid import uuid4

from django.contrib.auth.models import User
from django.db import models


def get_profile_image_upload_path(instance, filename):
    uuid = uuid4()
    return f'profile_images/{instance.pk}_{instance.user.username}_{uuid}.jpg'


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    date_of_birth = models.DateTimeField()
    avatar = models.ImageField(upload_to=get_profile_image_upload_path, blank=True, null=True)
    nickname = models.CharField(max_length=50, blank=True, null=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f'Profile: {self.user.email}'
