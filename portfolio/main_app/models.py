from django.db import models

# Create your models here


class Skill(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(max_length=500, blank=True)
    image = models.FileField(upload_to='skill_images/', blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        ordering = ['pk']


class SkillCharacteristic(models.Model):
    ENTRY = 1
    MIDDLE = 2
    CONFIDENT = 3
    FLUENT = 4
    PRO = 5

    SKILL_LEVEL_CHOICES = [
        (ENTRY, 'Entry'),
        (MIDDLE, 'Middle'),
        (CONFIDENT, 'Confident'),
        (FLUENT, 'Fluent'),
        (PRO, 'Pro')
    ]

    skill = models.ForeignKey(Skill, related_name='characteristics', null=False, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=False, blank=False)
    level = models.IntegerField(choices=SKILL_LEVEL_CHOICES, default=ENTRY)

    def __str__(self):
        return f'{self.skill.name} - {self.name}'


class Comment(models.Model):
    skill = models.ForeignKey('main_app.Skill', related_name='comments', on_delete=models.CASCADE)
    profile = models.ForeignKey('accounts.UserProfile', related_name='comments', on_delete=models.CASCADE, null=False)
    sub_comments = models.ForeignKey('main_app.Comment', related_name='related_comments', blank=True, null=True, on_delete=models.CASCADE)
    votes = models.IntegerField(default=0)
    text = models.TextField(max_length=500)
    date_added = models.DateTimeField(auto_now_add=True, db_index=True)
