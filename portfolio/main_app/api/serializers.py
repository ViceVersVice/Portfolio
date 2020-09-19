from rest_framework import serializers

from main_app.models import Skill, Comment


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'description', 'level', 'image']


class SkillCommentSerializer(serializers.ModelSerializer):
    comment_text = serializers.CharField(source='text')

    class Meta:
        model = Comment
        fields = ['skill', 'comment_text', 'profile']