"use client"; // 1. REQUIRED: Marks this as a Next.js Client Component

import { useState, useMemo } from 'react'; 
import { useRouter } from 'next/navigation'; // 2. CHANGED: Next.js App Router navigation
import { useAllPosts, useDeletePost } from '@/hooks/usePosts'; // Adjust path if needed
import { Edit, Trash2, Plus, FileText, CheckCircle, LogOut, ChevronLeft, ChevronRight, Search, Filter, MessageSquare, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import ConfirmModal from '@/components/ConfirmModal';

export default function Dashboard() {
  const router = useRouter(); // 3. CHANGED: Replaced useNavigate with useRouter
  
  // 1. PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; 

  // 2. FETCH DATA 
  const { data, isLoading, error } = useAllPosts(currentPage);
  const deleteMutation = useDeletePost();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // 3. EXTRACT RESULTS FROM DJANGO'S PAGINATED RESPONSE
  const posts = data?.results || [];
  const totalItems = data?.count || 0;
  const totalPages = Math.ceil(totalItems / postsPerPage);

  // SEARCH & FILTER STATE
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // FILTERING LOGIC
  const filteredPosts = useMemo(() => {
    if (!posts.length) return [];
    
    return posts.filter((post: any) => { // Added 'any' or use your Post type here
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.author_name || "Otic Admin").toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || post.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, statusFilter]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) { // Ensure window.confirm for safety in SSR contexts
      await deleteMutation.mutateAsync(id);
      toast.success("Post deleted");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    toast.success("Logged out successfully");
    router.push('/');
  };

  if (isLoading) return <div className="p-10 text-center">Loading Dashboard...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error loading posts.</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="container mx-auto px-3 sm:px-4 pt-[120px] pb-20 mt-10">        
          
          {/* HEADER SECTION */}
           <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Creator Dashboard</h1>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full md:w-auto">
              <button 
                onClick={() => router.push('/dashboard/analytics')}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-3 sm:px-5 py-2.5 rounded-lg hover:bg-gray-50 transition shadow-sm font-medium text-sm sm:text-base"
              >
                <BarChart3 size={18} /> <span className="hidden sm:inline">Analytics</span>
              </button>

              <button 
                onClick={() => router.push('/dashboard/chatlogs')}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-3 sm:px-5 py-2.5 rounded-lg hover:bg-gray-50 transition shadow-sm font-medium text-sm sm:text-base"
              >
                <MessageSquare size={18} /> <span className="hidden sm:inline">Chat Logs</span>
              </button>

              <button 
                onClick={() => router.push('/create/posts/new')} // 5. CHANGED: Updated routing
                className="flex items-center gap-2 bg-blue-600 text-white px-3 sm:px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm font-medium text-sm sm:text-base"
              >
                <Plus size={18} /> <span className="hidden sm:inline">New Post</span>
              </button>

              <button 
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-2 bg-white border border-red-200 text-red-600 px-3 sm:px-5 py-2.5 rounded-lg hover:bg-red-50 transition shadow-sm font-medium text-sm sm:text-base"
              >
                <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search by title or author..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none bg-white"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </div>

          {/* Posts List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* MOBILE CARD VIEW */}
            <div className="md:hidden divide-y divide-gray-100">
              {filteredPosts.map((post: any) => (
                <div key={post.slug} className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {post.author_image ? (
                        <img src={post.author_image} alt="Author" className="w-6 h-6 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
                          {(post.author_name || "A").charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-xs text-gray-600 truncate">{post.author_name || "Otic Admin"}</span>
                    </div>
                    {post.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700 shrink-0">
                        <CheckCircle size={10} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-yellow-100 text-yellow-700 shrink-0">
                        <FileText size={10} /> Draft
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{post.title}</div>
                    <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">{post.excerpt}</div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-gray-400">
                      {new Date(post.published_at || post.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => router.push(`/create/posts/${post.slug}`)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(post.id.toString())} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP TABLE VIEW */}
            <table className="hidden md:table w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPosts.map((post: any) => (
                  <tr key={post.slug} className="hover:bg-gray-50 transition">
                   <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                          {post.author_image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={post.author_image} alt="Author" className="w-6 h-6 rounded-full object-cover" />
                          ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                              {(post.author_name || "A").charAt(0).toUpperCase()}
                          </div>
                          )}
                          <span className="font-medium">
                          {post.author_name ? post.author_name : "Otic Admin"}
                          </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                    </td>
                    <td className="px-6 py-4">
                      {post.status === 'published' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle size={12} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          <FileText size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(post.published_at || post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => router.push(`/create/posts/${post.slug}`)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(post.id.toString())} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION CONTROLS */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages || 1}</span>
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                No posts found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Log out?"
        message="You'll need to sign in again to access the dashboard."
        confirmLabel="Log out"
        variant="danger"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </ProtectedRoute>
  );
}
