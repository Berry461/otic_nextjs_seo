import os
import json
import hashlib
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.utils import timezone
from django.db import transaction
from rest_framework import generics, permissions, filters
from .models import ChatLog, normalize_question
from .serializers import ChatLogSerializer

INTERNAL_API_KEY = os.environ.get('INTERNAL_API_KEY', '')

def _check_key(request):
    return request.headers.get('X-Internal-Api-Key') == INTERNAL_API_KEY and INTERNAL_API_KEY != ''

@csrf_exempt
@require_POST
def log_turn(request):
    if not _check_key(request):
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    try:
        data = json.loads(request.body)
        user_message = data.get('user_text', '')
        normalized = normalize_question(user_message)
        q_hash = hashlib.sha256(normalized.encode()).hexdigest()
        now = timezone.now().isoformat()

        with transaction.atomic():
            existing = ChatLog.objects.select_for_update().filter(question_hash=q_hash, is_error=False).first()
            if existing:
                existing.asked_count += 1
                existing.asked_dates = (existing.asked_dates or []) + [now]
                existing.bot_reply = data.get('bot_text', existing.bot_reply)
                existing.latency_ms = data.get('latency_ms', existing.latency_ms)
                existing.save()
            else:
                ChatLog.objects.create(
                    session_id=data.get('session_id', ''),
                    user_message=user_message,
                    bot_reply=data.get('bot_text', ''),
                    tool_called=data.get('tool_called'),
                    tool_result_count=data.get('tool_result_count'),
                    page_context=data.get('page_context'),
                    latency_ms=data.get('latency_ms'),
                    is_error=False,
                    asked_dates=[now],
                )
        return JsonResponse({'status': 'ok'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@require_POST
def log_error(request):
    if not _check_key(request):
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    try:
        data = json.loads(request.body)
        ChatLog.objects.create(
            session_id=data.get('session_id', ''),
            user_message=data.get('user_message', ''),
            error_message=data.get('error_message', ''),
            is_error=True,
        )
        return JsonResponse({'status': 'ok'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


class ChatLogListView(generics.ListAPIView):
    queryset = ChatLog.objects.all().order_by('-last_asked_at')
    serializer_class = ChatLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['user_message', 'bot_reply', 'session_id']