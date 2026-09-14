"use client";

import { X } from "lucide-react";

interface ChatLauncherPromptProps {
  onStartChat: () => void;
  onDismiss: () => void;
}

export default function ChatLauncherPrompt({ onStartChat, onDismiss }: ChatLauncherPromptProps) {
  return (
    <div className="fixed bottom-24 right-6 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 animate-[fadeInUp_0.3s_ease-out] z-50">
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      <p className="text-sm font-bold text-gray-900 mb-1 pr-4">Ask our AI Assistant</p>
      <p className="text-xs text-gray-500 leading-relaxed mb-3">
        Get instant help finding equipment, checking prices, or getting a quote, no waiting required.
      </p>
      <button
        onClick={onStartChat}
        className="flex items-center gap-1.5 text-xs font-semibold text-blue-800 hover:text-blue-900"
      >
        <MessageSquareIcon /> Start chatting
      </button>
    </div>
  );
}

function MessageSquareIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}