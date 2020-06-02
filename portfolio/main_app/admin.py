from django.contrib import admin

# Register your models here.

from .models import Skill


class SkillAdmin(admin.ModelAdmin):
    pass


admin.site.register(Skill, SkillAdmin)
