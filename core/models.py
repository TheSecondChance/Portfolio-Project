from django.db import models
from django.contrib.auth.models import AbstractUser


class Category(models.Model):
    category = models.CharField(max_length=255, unique=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self) -> str:
        return self.category
    
    class Meta:
        ordering = ['category']

class Question(models.Model):
    category = models.ForeignKey(Category, related_name="all_category_questions" ,on_delete=models.CASCADE)
    question = models.CharField(max_length=300)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self) -> str:
        return self.question
    
    class Meta:
        ordering = ['category']

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='question_answer', on_delete=models.CASCADE)
    answer = models.CharField(max_length=255)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    is_correct = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.answer

class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True)
    categories = models.ManyToManyField(Category, related_name='users')
