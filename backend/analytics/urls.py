from django.urls import path
from .views import BlogPostAnalyticsAPIView, TrackPageViewAPIView, AnalyticsSummaryAPIView

urlpatterns = [
    path("track/", TrackPageViewAPIView.as_view(), name="track-pageview"),
    path("summary/", AnalyticsSummaryAPIView.as_view(), name="analytics-summary"),
    path("blog-posts/", BlogPostAnalyticsAPIView.as_view(), name="analytics-blog-posts"),
]