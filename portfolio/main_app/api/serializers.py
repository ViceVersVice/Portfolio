from rest_framework import serializers

from main_app.models import Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'description', 'level']
