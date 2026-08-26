from django.db import models
import hashlib
import re


def normalize_question(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text


class ChatLog(models.Model):
    session_id = models.CharField(max_length=100, db_index=True)
    user_message = models.TextField()
    question_hash = models.CharField(max_length=64, db_index=True, blank=True)
    bot_reply = models.TextField(blank=True)
    tool_called = models.CharField(max_length=100, blank=True, null=True)
    tool_result_count = models.IntegerField(blank=True, null=True)
    page_context = models.TextField(blank=True, null=True)
    latency_ms = models.IntegerField(blank=True, null=True)
    is_error = models.BooleanField(default=False)
    error_message = models.TextField(blank=True, null=True)
    asked_count = models.IntegerField(default=1)
    asked_dates = models.JSONField(default=list, blank=True)
    first_asked_at = models.DateTimeField(auto_now_add=True)
    last_asked_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-last_asked_at']

    def save(self, *args, **kwargs):
        if not self.question_hash and self.user_message:
            normalized = normalize_question(self.user_message)
            self.question_hash = hashlib.sha256(normalized.encode()).hexdigest()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.session_id[:8]}] {self.user_message[:50]} (x{self.asked_count})"