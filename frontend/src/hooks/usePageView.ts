"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { onHuman } from "@/lib/humanGate";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getSessionKey(): string {
  const KEY = "otic_session_id";
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function pageFromPath(path: string): string | null {
  if (path === "/") return "home";
  if (path.startsWith("/blog")) return "blog";
  const map: Record<string, string> = {
    "/about": "about",
    "/services": "services",
    "/projects": "projects",
    "/contact": "contact",
  };
  return map[path] ?? null;
}

export function usePageView() {
  const pathname = usePathname();

  useEffect(() => {
    const page = pageFromPath(pathname);
    if (!page) return;

    return onHuman(() => {
      fetch(`${API_BASE}/api/analytics/track/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          page,
          path: pathname,
          session_key: getSessionKey(),
        }),
      }).catch(() => {
        // never let analytics break the page
      });
    });
  }, [pathname]);
}