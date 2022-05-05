from rest_framework import serializers

from main_app.models import Skill, Comment, SkillCharacteristic, Project, ENTRY, MIDDLE, CONFIDENT, FLUENT, PRO


class SkillCharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCharacteristic
        fields = ['name', 'level']


class SkillSerializer(serializers.ModelSerializer):
    comments_count = serializers.SerializerMethodField()
    characteristics = SkillCharacteristicSerializer(many=True)
    level = serializers.CharField(source='get_level_display')
    level_color = serializers.SerializerMethodField()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_level_color(self, obj):
        level_to_color_map = {
            ENTRY: '#f28b46',
            MIDDLE: '#edda5a',
            CONFIDENT: '#dde85f',
            FLUENT: '#a5ed45',
            PRO: '#8fe5f2',
        }

        return level_to_color_map.get(obj.level)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'description', 'image', 'comments_count', 'characteristics', 'level', 'level_color']


class SkillCommentSerializer(serializers.ModelSerializer):
    comment_text = serializers.CharField(source='text')

    class Meta:
        model = Comment
        fields = ['skill', 'comment_text', 'profile']


class ProjectSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['name', 'text', 'duration', 'image']

    def get_duration(self, obj: Project):
        if (days := getattr(obj.duration, 'days', 0)) and days >= 30:
            return f'{days // 30} months'

        return f'{days} days'
