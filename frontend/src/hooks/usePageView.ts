"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL; // e.g. https://api.yoursite.com

function getSessionKey(): string {
  const KEY = "otic_session_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

function pageFromPath(path: string): string | null {
  if (path === "/") return "home";
  const map: Record<string, string> = {
    "/about": "about",
    "/services": "services",
    "/projects": "projects",
    "/blog": "blog",
    "/contact": "contact",
  };
  // matches /blog and any nested /blog/[slug]
  if (path.startsWith("/blog")) return "blog";
  return map[path] ?? null;
}

export function usePageView() {
  const pathname = usePathname();

  useEffect(() => {
    const page = pageFromPath(pathname);
    if (!page) return; // skip pages not in the tracked set (e.g. admin routes)

    const sessionKey = getSessionKey();

    fetch(`${API_BASE}/api/analytics/track/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // sends auth cookie/session if logged in
      body: JSON.stringify({ page, path: pathname, session_key: sessionKey }),
    }).catch(() => {
      // fail silently — don't let analytics break the page
    });
  }, [pathname]);
}