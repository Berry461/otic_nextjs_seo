import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/AIService";

export async function POST(req: Request) {
  try {
    const { message, page_context, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message string is required" }, { status: 400 });
    }

    const reply = await generateAIResponse(message, page_context, history);

    return NextResponse.json({ reply: reply.text });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
