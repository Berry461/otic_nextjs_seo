'use client'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export interface ChatLog {
  id: number
  session_id: string
  user_message: string
  bot_reply: string
  tool_called: string | null
  tool_result_count: number | null
  is_error: boolean
  error_message: string | null
  asked_count: number
  first_asked_at: string
  last_asked_at: string
  asked_dates: string[]
}

export interface PaginatedChatLogs {
  count: number
  next: string | null
  previous: string | null
  results: ChatLog[]
}

export const useChatLogs = (page: number = 1) => {
  return useQuery({
    queryKey: ['chatlogs', page],
    queryFn: async (): Promise<PaginatedChatLogs> => {
      const response = await api.get<PaginatedChatLogs>(`/chatlogs/?page=${page}`)
      return response.data
    },
  })
}