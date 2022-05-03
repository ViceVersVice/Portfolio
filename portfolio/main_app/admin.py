from django.contrib import admin

# Register your models here.

from .models import Skill, Comment, SkillCharacteristic, Project


class SkillAdmin(admin.ModelAdmin):
    pass


class CommentAdmin(admin.ModelAdmin):
    pass


class SkillCharacteristicAdmin(admin.ModelAdmin):
    pass


class ProjectAdmin(admin.ModelAdmin):
    pass


admin.site.register(Skill, SkillAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(SkillCharacteristic, SkillCharacteristicAdmin)
admin.site.register(Project, ProjectAdmin)
