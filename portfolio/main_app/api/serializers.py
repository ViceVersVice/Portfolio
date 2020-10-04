from rest_framework import serializers

from main_app.models import Skill, Comment


class SkillSerializer(serializers.ModelSerializer):
    comments_count = serializers.SerializerMethodField()

    def get_comments_count(self, obj):
        return obj.comments.count()

    class Meta:
        model = Skill
        fields = ['id', 'name', 'description', 'level', 'image', 'comments_count']


class SkillCommentSerializer(serializers.ModelSerializer):
    comment_text = serializers.CharField(source='text')

    class Meta:
        model = Comment
        fields = ['skill', 'comment_text', 'profile']