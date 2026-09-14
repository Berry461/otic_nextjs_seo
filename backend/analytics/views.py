from django.db.models import Count
from django.db.models.functions import TruncDate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import PageView
from .serializers import PageViewCreateSerializer
from blog.models import Post

class TrackPageViewAPIView(APIView):
    """Public endpoint — anonymous or logged-in visitors hit this on page load."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PageViewCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        PageView.objects.create(
            page=data["page"],
            path=data.get("path", ""),
            session_key=data["session_key"],
            user=request.user if request.user.is_authenticated else None,
        )
        return Response({"status": "ok"}, status=201)


class AnalyticsSummaryAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        qs = PageView.objects.all()

        days = request.query_params.get("days")
        if days and days != "all":
            from django.utils import timezone
            import datetime
            cutoff = timezone.now() - datetime.timedelta(days=int(days))
            qs = qs.filter(created_at__gte=cutoff)

        per_page = (
            qs.values("page")
            .annotate(
                total_views=Count("id"),
                unique_sessions=Count("session_key", distinct=True),
                unique_users=Count("user", distinct=True),
            )
            .order_by("-total_views")
        )

        daily = (
            qs.annotate(day=TruncDate("created_at"))
            .values("day", "page")
            .annotate(views=Count("id"))
            .order_by("day")
        )

        # TRUE site-wide unique counts — not summed per page
        total_unique_sessions = qs.values("session_key").distinct().count()
        total_unique_users = qs.exclude(user__isnull=True).values("user").distinct().count()
        total_views = qs.count()

        return Response({
            "totals": {
                "total_views": total_views,
                "unique_visitors": total_unique_sessions,
                "unique_logged_in_users": total_unique_users,
            },
            "per_page": list(per_page),
            "daily": list(daily),
        })

class BlogPostAnalyticsAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        qs = PageView.objects.filter(page="blog")

        days = request.query_params.get("days")
        if days and days != "all":
            from django.utils import timezone
            import datetime
            cutoff = timezone.now() - datetime.timedelta(days=int(days))
            qs = qs.filter(created_at__gte=cutoff)

        qs = qs.exclude(path="/blog").exclude(path="/blog/")

        # TRUE unique visitors across ALL blog posts combined
        total_unique_sessions = qs.values("session_key").distinct().count()
        total_views = qs.count()

        raw = (
            qs.values("path")
            .annotate(
                total_views=Count("id"),
                unique_sessions=Count("session_key", distinct=True),
                unique_users=Count("user", distinct=True),
            )
            .order_by("-total_views")
        )
        raw = list(raw)

        def slug_from_path(path):
            return path.strip("/").split("/")[-1] if path else ""

        slugs = [slug_from_path(r["path"]) for r in raw]
        posts_by_slug = {
            p.slug: p
            for p in Post.objects.filter(slug__in=slugs).select_related("author")
        }

        results = []
        for r in raw:
            slug = slug_from_path(r["path"])
            post = posts_by_slug.get(slug)
            results.append({
                "path": r["path"],
                "total_views": r["total_views"],
                "unique_sessions": r["unique_sessions"],
                "unique_users": r["unique_users"],
                "title": post.title if post else None,
                "category": post.category if post else None,
                "status": post.status if post else None,
                "author": post.author.name if (post and post.author) else None,
                "published_at": post.published_at.isoformat() if post else None,
            })

        return Response({
            "totals": {
                "total_views": total_views,
                "unique_visitors": total_unique_sessions,
            },
            "posts": results,
        })