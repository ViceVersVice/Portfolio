from django.db import models

# Create your models here.


class Skill(models.Model):
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

    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(max_length=500, blank=True)
    level = models.IntegerField(choices=SKILL_LEVEL_CHOICES, default=ENTRY)

    def __str__(self):
        return f'{self.name} - {self.level}'
