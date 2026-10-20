// src/lib/AIService.ts
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { COMPANY_KNOWLEDGE } from "@/data/companyData";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const AI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
// Optional: a second model to try if the main one stays overloaded
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || "";
const DJANGO_API = (process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "") + "/api";

export interface AIResponseResult {
  text: string;
  toolCalled?: string | null;
  toolResultCount?: number | null;
  errored: boolean;
  errorMessage?: string;
}

// Tool: search the site's own blog/content for anything not covered
// in the static knowledge base (case studies, specific project write-ups, etc.)
const searchContentTool: FunctionDeclaration = {
  name: "searchOticSurveysContent",
  description:
    "Search OTIC Surveys' blog and articles for information not already covered in your knowledge base — e.g. specific project details, recent posts, or topics not listed above. Use this whenever the user asks something you can't answer confidently from the static company knowledge.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: "Search keywords, e.g. 'drone mapping accuracy', 'land survey cost', 'hydrographic survey'",
      },
    },
    required: ["query"],
  },
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Temporary Google-side problems worth retrying (overload, rate limit, timeouts)
function isRetryable(err: unknown): boolean {
  const e = err as { status?: number; message?: string };
  if (e && typeof e.status === "number" && [429, 500, 503, 504].includes(e.status)) return true;
  const msg = String(e?.message ?? "");
  return /UNAVAILABLE|RESOURCE_EXHAUSTED|high demand|overloaded|timed out|ECONNRESET/i.test(msg);
}

// One full attempt against one model. Throws on failure so the caller can retry.
async function runChat(
  model: string,
  systemInstruction: string,
  userMessage: string,
  history: { role: "user" | "model"; text: string }[]
): Promise<AIResponseResult> {
  // A fresh chat each attempt, so a failed try leaves no half-written history
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction,
      tools: [{ functionDeclarations: [searchContentTool] }],
    },
    history: history.slice(-10).map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    })),
  });

  let result = await chat.sendMessage({ message: userMessage });
  const functionCalls = result.functionCalls;
  let toolCalled: string | null | undefined = null;
  let toolResultCount: number | null = null;

  if (functionCalls && functionCalls.length > 0) {
    const call = functionCalls[0];
    toolCalled = call.name;

    if (call.name === "searchOticSurveysContent") {
      const searchQuery = (call.args as { query: string }).query;

      let matchedPosts: any[] = [];
      try {
        const apiRes = await axios.get(`${DJANGO_API}/posts/`, {
          params: { search: searchQuery },
        });
        const results = apiRes.data?.results ?? apiRes.data ?? [];
        matchedPosts = results.slice(0, 3).map((p: any) => ({
          title: p.title,
          excerpt: p.excerpt,
          url: `https://oticsurveys.com/blog/${p.slug}`,
          category: p.category,
        }));
        toolResultCount = matchedPosts.length;
      } catch (err) {
        console.error("searchOticSurveysContent failed:", err);
        toolResultCount = 0;
      }

      result = await chat.sendMessage({
        message: [
          {
            functionResponse: {
              name: "searchOticSurveysContent",
              response: { articles: matchedPosts },
            },
          },
        ],
      });
    }
  }

  return { text: result.text ?? "", toolCalled, toolResultCount, errored: false };
}

export async function generateAIResponse(
  userMessage: string,
  pageContext?: string,
  history: { role: "user" | "model"; text: string }[] = []
): Promise<AIResponseResult> {
  let systemInstruction = COMPANY_KNOWLEDGE;

  systemInstruction += `\n\n=== TOOL USE RULE ===
If a question asks about something specific that is NOT covered in the knowledge above (e.g. a particular project, a recent blog post, a detail you're unsure of), call the searchOticSurveysContent tool before answering. Do not guess or invent details. If the tool returns no useful results, say you don't have that information and offer to connect the user with support.`;

  if (pageContext && pageContext.trim()) {
    systemInstruction += `\n\n=== CURRENT PAGE CONTENT VISIBLE TO USER ===\n${pageContext}\n`;
  }

  // Same model twice (with a short wait), then the backup model if one is set
  const attempts: { model: string; waitBefore: number }[] = [
    { model: AI_MODEL, waitBefore: 0 },
    { model: AI_MODEL, waitBefore: 1500 },
  ];
  if (FALLBACK_MODEL && FALLBACK_MODEL !== AI_MODEL) {
    attempts.push({ model: FALLBACK_MODEL, waitBefore: 500 });
  }

  let lastError: unknown = null;

  for (const attempt of attempts) {
    if (attempt.waitBefore) await sleep(attempt.waitBefore);
    try {
      return await runChat(attempt.model, systemInstruction, userMessage, history);
    } catch (error) {
      lastError = error;
      console.error(`AI Service Error (model ${attempt.model}):`, error);
      if (!isRetryable(error)) break; // a bad key or bad request won't fix itself
    }
  }

  return {
    text: "I'm having trouble retrieving details right now. You can browse our services at https://oticsurveys.com/services or contact us directly.",
    errored: true,
    errorMessage: lastError instanceof Error ? lastError.message : String(lastError),
  };
}