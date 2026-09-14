"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Users, FileText, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const POSTS_PER_PAGE = 10;

interface BlogPostStat {
  path: string;
  total_views: number;
  unique_sessions: number;
  unique_users: number;
  title: string | null;
  category: string | null;
  status: string | null;
  author: string | null;
  published_at: string | null;
}

interface BlogSummaryResponse {
  totals: { total_views: number; unique_visitors: number };
  posts: BlogPostStat[];
}

export default function BlogAnalyticsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostStat[]>([]);
  const [totals, setTotals] = useState({ total_views: 0, unique_visitors: 0 });
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState("30");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      const url = `${API_BASE}/api/analytics/blog-posts/${days !== "all" ? `?days=${days}` : ""}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      setPosts(json.posts || []);
      setTotals(json.totals || { total_views: 0, unique_visitors: 0 });
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't load blog analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const filteredPosts = useMemo(() => {
    if (!search) return posts;
    return posts.filter((p) =>
      (p.title || p.path).toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  const totalPosts = filteredPosts.length;
  const totalViews = filteredPosts.reduce((sum, p) => sum + p.total_views, 0);
  const totalUnique = totals.unique_visitors;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-3 sm:px-4 pt-[120px] pb-20 mt-10">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/dashboard/analytics")}
                className="relative z-[100] text-gray-500 hover:text-gray-800 transition"
                >
                <ArrowLeft size={20} />
                </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Blog Post Analytics</h1>
            </div>

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
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-3">
              <div className="bg-gray-50 text-gray-600 p-2.5 rounded-lg"><FileText size={20} /></div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalPosts}</p>
                <p className="text-xs text-gray-500">POSTS TRACKED</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-3">
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg"><Eye size={20} /></div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalViews}</p>
                <p className="text-xs text-gray-500">TOTAL VIEWS</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-3">
              <div className="bg-green-50 text-green-600 p-2.5 rounded-lg"><Users size={20} /></div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalUnique}</p>
                <p className="text-xs text-gray-500">UNIQUE VISITORS</p>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full sm:w-96 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm shadow-sm"
            />
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 text-xs uppercase border-b border-gray-100">
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Views</th>
                    <th className="px-6 py-3">Unique</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-500">Loading…</td></tr>
                  ) : paginatedPosts.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-500">No blog post views recorded yet.</td></tr>
                  ) : (
                    paginatedPosts.map((post) => (
                      <tr key={post.path} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-800">{post.title || post.path}</p>
                          {post.author && <p className="text-xs text-gray-500">{post.author}</p>}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{post.category || "—"}</td>
                        <td className="px-6 py-4">
                          {post.status ? (
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              post.status === "published" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"
                            }`}>
                              {post.status}
                            </span>
                          ) : "—"}
                        </td>
                        <td className="px-6 py-4 flex items-center gap-1 text-gray-700">
                          <Eye size={14} className="text-gray-400" /> {post.total_views}
                        </td>
                        <td className="px-6 py-4 flex items-center gap-1 text-gray-700">
                          <Users size={14} className="text-gray-400" /> {post.unique_sessions}
                        </td>
                        <td className="px-6 py-4">
                          <a href={post.path} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700">
                            <ExternalLink size={16} />
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {!loading && filteredPosts.length > POSTS_PER_PAGE && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
                <div className="flex gap-2">
                  <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}