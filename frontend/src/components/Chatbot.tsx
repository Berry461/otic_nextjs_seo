"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Minus, MessageSquare } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatLauncherPrompt from "./ChatLauncherPrompt";

const MAX_HISTORY_MESSAGES = 10;

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! I am your OTIC Surveys AI assistant. How can I help you with our surveying services today?",
    },
  ]);

  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    let id = sessionStorage.getItem("otic_chat_session_id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("otic_chat_session_id", id);
    }
    sessionIdRef.current = id;
  }, []);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickLinks = [
    { label: "Get a Quote", message: "I'd like to get a quote for a survey." },
    { label: "Our Services", message: "What surveying services do you offer?" },
    { label: "Contact Us", message: "How can I contact OTIC Surveys directly?" },
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      setShowPrompt(false);
      return;
    }
    if (sessionStorage.getItem("otic_chat_prompt_dismissed") === "true") {
      return;
    }

    let hideTimer: ReturnType<typeof setTimeout>;

    const scheduleNextPrompt = () => {
      const delay = 30000 + Math.random() * 30000;
      return setTimeout(() => {
        setShowPrompt(true);
        hideTimer = setTimeout(() => setShowPrompt(false), 8000);
      }, delay);
    };

    const firstTimer = setTimeout(() => {
      setShowPrompt(true);
      hideTimer = setTimeout(() => setShowPrompt(false), 8000);
    }, 6000);

    const interval = setInterval(() => {
      setShowPrompt(false);
      scheduleNextPrompt();
    }, 45000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [isOpen]);

  const dismissPrompt = () => {
    setShowPrompt(false);
    sessionStorage.setItem("otic_chat_prompt_dismissed", "true");
  };

  const startChatFromPrompt = () => {
    setShowPrompt(false);
    setIsOpen(true);
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/chat", {
        message: query,
        history: messages
          .slice(-MAX_HISTORY_MESSAGES)
          .map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            text: m.text,
          })),
        session_id: sessionIdRef.current,
      });
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Chat request failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-80">
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] sm:w-96 h-125 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-linear-to-r from-blue-700 to-blue-900 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                <Bot className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Ask OTIC Surveys</h3>
                <p className="text-[10px] text-blue-200">Instant Surveying Assistance</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-800 text-white rounded-br-none shadow-sm"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.sender === "user" ? (
                    msg.text
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ href, children }) => (
                            <a
                          
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline font-semibold break-all"
                          >
                            {children}
                          </a>
                        ),
                        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-1.5">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-1.5">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none text-xs text-gray-500 animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {!loading && (
            <div className="px-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {quickLinks.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleSend(q.message)}
                  className="shrink-0 text-[11px] font-medium px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 text-xs px-3 py-2.5 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="p-2.5 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
      <div className="group fixed bottom-6 right-6 flex items-end gap-3">
        <div className="hidden sm:block">
          {showPrompt && (
            <ChatLauncherPrompt
              onStartChat={startChatFromPrompt}
              onDismiss={dismissPrompt}
            />
          )}
        </div>
        <button
            onClick={toggleChat}
            title="Need help? Chat with us"
            className={`bg-blue-800 hover:bg-blue-900 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-500 ease-out cursor-pointer overflow-hidden ${
              showPrompt
                ? "w-auto h-14 rounded-full px-5 gap-2"
                : "w-14 h-14 rounded-full hover:scale-105"
            }`}
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="w-6 h-6 shrink-0" />
            {showPrompt && (
              <span className="text-sm font-semibold whitespace-nowrap animate-[fadeIn_0.3s_ease-out_0.2s_both]">
                Need help? Chat with us
              </span>
            )}
          </button>
        </div>
      )}
      {isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-800 hover:bg-blue-900 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Close AI Assistant"
        >
          <X className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
