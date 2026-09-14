from rest_framework import serializers
from .models import PageView

class PageViewCreateSerializer(serializers.Serializer):
    page = serializers.ChoiceField(choices=PageView._meta.get_field("page").choices)
    path = serializers.CharField(max_length=255, required=False, allow_blank=True)
    session_key = serializers.CharField(max_length=64)