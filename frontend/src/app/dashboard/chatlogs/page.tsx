"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChatLogs } from '@/hooks/useChatLogs';
import { ChevronLeft, ChevronRight, MessageSquare, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ChatLogsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useChatLogs(currentPage);

  const logs = data?.results || [];
  const totalItems = data?.count || 0;
  const totalPages = Math.ceil(totalItems / 10);

  if (isLoading) return <div className="p-10 text-center">Loading chat logs...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error loading chat logs.</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="container mx-auto px-4 pt-[120px] pb-20 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Chat Logs</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition shadow-sm font-medium"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="md:hidden divide-y divide-gray-100">
              {logs.map((log) => (
                <div key={log.id} className="p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    {log.is_error ? (
                      <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                    ) : (
                      <MessageSquare size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    )}
                    <span className="font-medium text-gray-900 text-sm">{log.user_message}</span>
                  </div>
                  <div className="text-xs text-gray-600 pl-6">
                    {log.is_error ? (
                      <span className="text-red-600">{log.error_message}</span>
                    ) : (
                      log.bot_reply
                    )}
                  </div>
                  <div className="flex items-center justify-between pl-6 pt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-700">
                      {log.asked_count}x
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(log.last_asked_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <table className="hidden md:table w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Question</th>
                  <th className="px-6 py-4">Answer</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Asked</th>
                  <th className="px-6 py-4">Last Asked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition align-top">
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex items-start gap-2">
                        {log.is_error ? (
                          <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                        ) : (
                          <MessageSquare size={16} className="text-blue-500 mt-0.5 shrink-0" />
                        )}
                        <span className="font-medium text-gray-900">{log.user_message}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                      {log.is_error ? (
                        <span className="text-red-600">{log.error_message}</span>
                      ) : (
                        log.bot_reply
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                        {log.asked_dates?.slice(-5).map((d) => new Date(d).toLocaleDateString()).join(', ')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {log.asked_count}x
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(log.last_asked_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages || 1}</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {logs.length === 0 && (
              <div className="p-10 text-center text-gray-500">No chat logs yet.</div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
