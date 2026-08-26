from django.contrib import admin
from .models import ChatLog

@admin.register(ChatLog)
class ChatLogAdmin(admin.ModelAdmin):
    list_display = ['user_message_short', 'asked_count', 'dates_display', 'is_error', 'tool_called']
    list_filter = ['is_error', 'tool_called']
    search_fields = ['user_message', 'bot_reply', 'session_id']
    ordering = ['-asked_count', '-last_asked_at']
    readonly_fields = ['session_id', 'user_message', 'question_hash', 'bot_reply', 'tool_called', 'tool_result_count', 'page_context', 'latency_ms', 'is_error', 'error_message', 'asked_count', 'asked_dates', 'first_asked_at', 'last_asked_at']

    def user_message_short(self, obj):
        return obj.user_message[:60]
    user_message_short.short_description = 'Question'

    def dates_display(self, obj):
        dates = obj.asked_dates or []
        return ", ".join(d[:10] for d in dates[-5:])  # last 5 dates, YYYY-MM-DD
    dates_display.short_description = 'Asked on'