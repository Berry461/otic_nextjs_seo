from django.urls import path
from . import views

urlpatterns = [
    path('log/turn/', views.log_turn, name='log_turn'),
    path('log/error/', views.log_error, name='log_error'),
    path('', views.ChatLogListView.as_view(), name='chatlog_list'),
]