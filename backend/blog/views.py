from rest_framework import viewsets, permissions, generics
from django.utils import timezone
from .models import Post, Author
from .serializers import PostSerializer, AuthorSerializer
from django.shortcuts import get_object_or_404

# ==========================================
# 1. AUTHOR LIST VIEW (Must be on the far left)
# ==========================================
class AuthorListView(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [permissions.AllowAny] 

    pagination_class = None
# ==========================================
# 2. POST VIEWSET (Must be on the far left)
# ==========================================
class PostViewSet(viewsets.ModelViewSet):
    # Default to the heavy one, we'll override this below
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    # 👇 Dynamically pick the right serializer
    def get_serializer_class(self):
        if self.action == 'list':
            # Use the lightweight one for the main blog page!
            from .serializers import PostListSerializer
            return PostListSerializer
        # Use the heavy one for retrieving a single post, creating, or updating
        return PostSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_value = self.kwargs[self.lookup_field]

        if lookup_value.isdigit():
            return get_object_or_404(queryset, pk=lookup_value)
        
        return get_object_or_404(queryset, slug=lookup_value)

    def get_queryset(self):
        # 👇 FIX: Optimize Database Queries!
        # select_related fetches ForeignKeys (Author, User) in the same query
        # prefetch_related fetches reverse relations (Gallery Images) in one batch
        queryset = Post.objects.select_related('author', 'uploaded_by').prefetch_related('gallery_images').order_by('-published_at')

        if self.request.user.is_authenticated:
            return queryset

        return queryset.filter(
            status='published', 
            published_at__lte=timezone.now()
        )

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
