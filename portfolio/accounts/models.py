from uuid import uuid4

from django.contrib.auth.models import User
from django.db import models


def get_profile_image_upload_path(instance, filename):
    uuid = uuid4()
    return f'profile_images/{instance.pk}_{instance.user.username}_{uuid}.jpg'


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    avatar = models.CharField(max_length=500, null=True)

    def __str__(self):
        return f'Profile: {self.user.email}'

    @property
    def username(self):
        return f'{self.user.first_name} {self.user.last_name}'
