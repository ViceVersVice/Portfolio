from rest_framework import serializers

from main_app.models import Skill, Comment, SkillCharacteristic


class SkillCharacteristicSerializer(serializers.ModelSerializer):

    class Meta:
        model = SkillCharacteristic
        fields = ['name', 'level']


class SkillSerializer(serializers.ModelSerializer):
    comments_count = serializers.SerializerMethodField()
    characteristics = SkillCharacteristicSerializer(many=True)

    def get_comments_count(self, obj):
        return obj.comments.count()

    class Meta:
        model = Skill
        fields = ['id', 'name', 'description', 'image', 'comments_count', 'characteristics']


class SkillCommentSerializer(serializers.ModelSerializer):
    comment_text = serializers.CharField(source='text')

    class Meta:
        model = Comment
        fields = ['skill', 'comment_text', 'profile']