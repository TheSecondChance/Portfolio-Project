from django.contrib import admin
from .models import User, Category, Question, Answer
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2", "categories"),
            },
        ),
    )

admin.site.register(Category)

class AnswerAdmin(admin.StackedInline):
    model = Answer

class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerAdmin]


admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)