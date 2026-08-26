from rest_framework import serializers
from .models import ChatLog

class ChatLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatLog
        fields = [
            'id', 'session_id', 'user_message', 'bot_reply',
            'tool_called', 'tool_result_count', 'is_error', 'error_message',
            'asked_count', 'asked_dates', 'first_asked_at', 'last_asked_at',
        ]