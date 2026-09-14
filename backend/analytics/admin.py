from django.contrib import admin
from .models import PageView

@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("page", "path", "session_key", "user", "created_at")
    list_filter = ("page", "created_at")
    search_fields = ("session_key", "path")