from django.contrib import admin

# Register your models here.

from .models import Skill, Comment


class SkillAdmin(admin.ModelAdmin):
    pass


class CommentAdmin(admin.ModelAdmin):
    pass


admin.site.register(Skill, SkillAdmin)
admin.site.register(Comment, CommentAdmin)
