import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/AIService";

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000";
const DJANGO_BASE = RAW_API_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || "";

function logTurn(payload: object) {
  fetch(`${DJANGO_BASE}/api/chatlogs/log/turn/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Internal-Api-Key": INTERNAL_API_KEY },
    body: JSON.stringify(payload),
  }).catch((err) => console.error("[chatlogs] failed to log turn:", err));
}

function logError(payload: object) {
  fetch(`${DJANGO_BASE}/api/chatlogs/log/error/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Internal-Api-Key": INTERNAL_API_KEY },
    body: JSON.stringify(payload),
  }).catch((err) => console.error("[chatlogs] failed to log error:", err));
}

export async function POST(req: Request) {
  try {
    const { message, page_context, history, session_id } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message string is required" }, { status: 400 });
    }

    const start = Date.now();
    const reply = await generateAIResponse(message, page_context, history);
    const latencyMs = Date.now() - start;

    if (reply.errored) {
      logError({
        session_id,
        user_message: message,
        error_message: reply.errorMessage ?? "unknown error",
      });
    } else {
      logTurn({
        session_id,
        user_text: message,
        bot_text: reply.text,
        tool_called: reply.toolCalled ?? null,
        tool_result_count: reply.toolResultCount ?? null,
        page_context,
        latency_ms: latencyMs,
      });
    }

    return NextResponse.json({ reply: reply.text });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}