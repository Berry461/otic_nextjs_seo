'use client' // Add this at the top - hooks with useQuery need it

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { BlogPost, Author } from '@/data/types'

export interface PaginatedPosts {
  count: number
  next: string | null
  previous: string | null
  results: BlogPost[]
}

// 1. READ (List all posts)
export const usePosts = (page: number = 1) => {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: async (): Promise<PaginatedPosts> => {
      const response = await api.get<PaginatedPosts>(`/posts/?page=${page}`)
      return response.data
    },
  })
}

// 2. READ ONE (For Editing) - CHANGE HERE
export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ['post', slug],
    enabled:!!slug && slug!== 'new', // ← Don't fetch when slug is "new"
    queryFn: async () => {
      const response = await api.get<BlogPost>(`/posts/${slug}/`)
      return response.data
    },
    retry: false,
  })
}

// 3. CREATE Post
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newPostData: FormData) => {
      const response = await api.post('/posts/', newPostData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    },
    onSuccess: () => {
      // Invalidate ALL post queries, not just page 1
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['all-posts'] })
    },
  })
}

// 4. UPDATE Post (PATCH)
export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await api.patch(`/posts/${id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['all-posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', variables.id] })
    },
  })
}

// 5. DELETE Post
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/posts/${id}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['all-posts'] })
    },
  })
}

export const useAllPosts = (page: number = 1) => {
  return useQuery({
    queryKey: ['all-posts', page],
    queryFn: async () => {
      const response = await api.get<PaginatedPosts>(`/posts/?page=${page}`)
      return response.data
    },
  })
}

export const useAuthors = () => {
  return useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data } = await api.get('/authors/')
      return data
    },
  })
}