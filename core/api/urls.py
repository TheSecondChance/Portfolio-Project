from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (UserViewSet, QuestionViewSet, CategoryViewSet, AnswerViewSet, RandomCategoryView,
                    RandomQuestionView, OnlyCategoryViewSet, get_csrf_token)

router = DefaultRouter()

router.register('users', UserViewSet, basename="users")
router.register('questions', QuestionViewSet, basename="questions")
router.register('category', CategoryViewSet, basename="category")
router.register('answer', AnswerViewSet, basename="answer")
router.register('only-category', OnlyCategoryViewSet, basename="only-category")

urlpatterns = [
    path('random-category', RandomCategoryView.as_view(), name='random-category'),
    path('random-question', RandomQuestionView.as_view(), name='random-question'),
    path('get-csrf-token/', get_csrf_token, name='get-csrf-token')
]

urlpatterns += router.urls