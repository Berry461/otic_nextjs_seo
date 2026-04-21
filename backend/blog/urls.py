from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, AuthorListView

# 1. Create the router
router = DefaultRouter()

# 2. Register the ViewSet
# This generates urls like /posts/, /posts/1/, etc.
router.register(r'posts', PostViewSet, basename='post')

# 3. Define the urlpatterns list
# IMPORTANT: The variable name must be exactly 'urlpatterns'
urlpatterns = [
    path('', include(router.urls)),
    path('authors/', AuthorListView.as_view(), name='author-list'),
]
