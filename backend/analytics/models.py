import uuid
from django.conf import settings
from django.db import models

PAGE_CHOICES = [
    ("home", "Home"),
    ("about", "About"),
    ("services", "Services"),
    ("projects", "Projects"),
    ("blog", "Blog"),
    ("contact", "Contact"),
]

class PageView(models.Model):
    page = models.CharField(max_length=50, choices=PAGE_CHOICES, db_index=True)
    path = models.CharField(max_length=255, blank=True)  # exact URL, e.g. /blog/my-post
    session_key = models.CharField(max_length=64, db_index=True)  # anonymous visitor id
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True,
        on_delete=models.SET_NULL, related_name="page_views"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["page", "created_at"]),
            models.Index(fields=["page", "session_key"]),
        ]

    def __str__(self):
        return f"{self.page} @ {self.created_at}"