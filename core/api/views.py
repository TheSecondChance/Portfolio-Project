from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *

from ..models import User, Question, Category, Answer

from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.middleware.csrf import get_token


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class OnlyCategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = OnlyCategorySerializer

#  Random sections

class RandomQuestionView(APIView):
    def get(self, request, *args, **kwargs):
        serializer = RandomQuestionSerializer(instance={})
        return Response(serializer.data)

class RandomCategoryView(APIView):
    def get(self, request, *args, **kwargs):
        serializer = RandomCategorySerializer(instance={})
        return Response(serializer.data)

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})