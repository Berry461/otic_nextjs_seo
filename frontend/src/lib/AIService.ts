// src/lib/AIService.ts
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { COMPANY_KNOWLEDGE } from "@/data/companyData";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const AI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
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

  try {
    const chat = ai.chats.create({
      model: AI_MODEL,
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
  } catch (error) {
    console.error("AI Service Error:", error);
    return {
      text: "I'm having trouble retrieving details right now. You can browse our services at https://oticsurveys.com/services or contact us directly.",
      errored: true,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}
