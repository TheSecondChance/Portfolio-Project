from rest_framework import serializers
from ..models import User, Question, Category, Answer
import random

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'categories']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    question_answer = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question', 'question_answer']

class CategorySerializer(serializers.ModelSerializer):
    all_category_questions = QuestionSerializer(many=True)

    class Meta:
        model = Category
        fields = ['id', 'category', 'all_category_questions']

class OnlyCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category']

# Random sections

class RandomQuestionSerializer(serializers.Serializer):
    random_question = serializers.SerializerMethodField()

    def get_random_question(self, obj):
        question = Question.objects.all()
        if not question.exists():
            return None
        random_question = random.choice(question)
        return QuestionSerializer(random_question).data

class RandomCategorySerializer(serializers.Serializer):
    random_category = serializers.SerializerMethodField()

    def get_random_category(self, obj):
        categories = Category.objects.all()
        if not categories.exists():
            return None
        random_category = random.choice(categories)
        return RandomQuestionSerializer(random_category).data