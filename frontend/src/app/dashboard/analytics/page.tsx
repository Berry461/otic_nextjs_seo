"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Eye, Users, ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  services: "Services",
  projects: "Projects",
  blog: "Blog",
  contact: "Contact",
};

const PAGE_ORDER = ["home", "about", "services", "projects", "blog", "contact"];

interface PerPageStat {
  page: string;
  total_views: number;
  unique_sessions: number;
  unique_users: number;
}

interface SummaryResponse {
  totals: {
    total_views: number;
    unique_visitors: number;
    unique_logged_in_users: number;
  };
  per_page: PerPageStat[];
  daily: { day: string; page: string; views: number }[];
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<string>("30");

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      const url = `${API_BASE}/api/analytics/summary/${days !== "all" ? `?days=${days}` : ""}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  // Build a full 6-page list, filling in zeros for pages with no views yet
  const perPageMap = new Map(
    (data?.per_page || []).map((row) => [row.page, row])
  );
  const rows: PerPageStat[] = PAGE_ORDER.map(
    (page) =>
      perPageMap.get(page) || {
        page,
        total_views: 0,
        unique_sessions: 0,
        unique_users: 0,
      }
  );

  const totalViews = data?.totals.total_views ?? 0;
  const totalUnique = data?.totals.unique_visitors ?? 0;
  const maxViews = Math.max(1, ...rows.map((r) => r.total_views));

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="container mx-auto px-3 sm:px-4 pt-[120px] pb-20 mt-10">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="relative z-[100] flex items-center gap-1 text-gray-500 hover:text-gray-800 transition"
                >
                <ArrowLeft size={20} />
                </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Analytics
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full md:w-auto">
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg shadow-sm text-sm sm:text-base"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="all">All time</option>
              </select>

              <button
                onClick={fetchSummary}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-3 sm:px-5 py-2.5 rounded-lg hover:bg-gray-50 transition shadow-sm font-medium text-sm sm:text-base"
              >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading analytics…</div>
          ) : (
            <>
              {/* SUMMARY CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                    <Eye size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Page Views</p>
                    <p className="text-2xl font-bold text-gray-800">{totalViews}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                  <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Unique Visitors</p>
                    <p className="text-2xl font-bold text-gray-800">{totalUnique}</p>
                  </div>
                </div>
              </div>

              {/* PER-PAGE BREAKDOWN — CARDS */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 size={18} className="text-gray-500" />
                        <h2 className="font-semibold text-gray-800">Views by Page</h2>
                    </div>
                    <p className="text-xs text-gray-400 -mt-2 mb-4">
                        Views and unique visits per page — a visitor viewing multiple pages counts once on each
                    </p>

                {loading ? (
                    <div className="p-10 text-center text-gray-500">Loading analytics…</div>
                    ) : (
                    <>
                        {/* SUMMARY CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {/* ...total views / unique visitors cards... */}
                        </div>

                        {/* PER-PAGE BREAKDOWN — CARDS */}
                        <div className="mb-6">
                        {/* ...page cards... */}
                        </div>

                        {/* ADD THIS LINE */}
                        <div
                        onClick={() => router.push("/dashboard/blog-analytics")}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                        >
                        <div>
                            <h2 className="font-semibold text-gray-800">Blog Post Analytics</h2>
                            <p className="text-sm text-gray-500">See views and unique visitors per blog post</p>
                        </div>
                        <ArrowLeft size={18} className="rotate-180 text-gray-400" />
                        </div>
                    </>
                    )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rows.map((row) => (
                    <div
                        key={row.page}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800">
                            {PAGE_LABELS[row.page] || row.page}
                        </h3>
                        <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                            {row.total_views} views
                        </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                            <Eye size={16} />
                            </div>
                            <div>
                            <p className="text-xs text-gray-500">Total Views</p>
                            <p className="font-bold text-gray-800">{row.total_views}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                            <Users size={16} />
                            </div>
                            <div>
                            <p className="text-xs text-gray-500">Unique</p>
                            <p className="font-bold text-gray-800">{row.unique_sessions}</p>
                            </div>
                        </div>
                        </div>

                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
                        <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all"
                            style={{ width: `${(row.total_views / maxViews) * 100}%` }}
                        />
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}