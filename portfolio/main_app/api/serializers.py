from django.utils import timezone

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
    username = serializers.CharField(read_only=True, source='profile.username')
    date_added = serializers.SerializerMethodField(read_only=True)

    def get_date_added(self, obj: Comment):
        td = timezone.now() - obj.date_added

        predicates = [
            (lambda _td: td.days >= 365, lambda _td: f'{td.days // 365} years ago'),
            (lambda _td: td.days >= 31, lambda _td: f'{td.days // 31} months ago'),
            (lambda _td: td.days >= 1, lambda _td: f'{td.days} days ago'),
            (lambda _td: td.seconds >= 3600, lambda _td: f'{td.seconds // 3600} hours ago'),
            (lambda _td: td.seconds >= 60, lambda _td: f'{td.seconds // 60} minutes ago'),
            (lambda _td: True, lambda _td: f'{td.seconds} seconds ago'),
        ]

        for predicate, func in predicates:
            if predicate(td):
                return func(td)

    class Meta:
        model = Comment
        fields = ['skill', 'comment_text', 'username', 'date_added', 'profile']


class TechForProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'image']


class ProjectSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()
    technologies = TechForProjectSerializer(many=True)

    class Meta:
        model = Project
        fields = ['name', 'text', 'duration', 'image', 'technologies']

    def get_duration(self, obj: Project):
        if (days := getattr(obj.duration, 'days', 0)) and days >= 30:
            return f'{days // 30} months'

        return f'{days} days'
