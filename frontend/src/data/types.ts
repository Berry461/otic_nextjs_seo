export interface Author {
  id: number
  name: string
  profile_picture: string | null
  bio: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  full_content: string
  created_at: string
  category: string
  image: string | null
  gallery_images: string[]
  author: number | Author | null // ← Change: can be ID or full object
  author_username: string
  author_image: string | null
  author_name: string
  status: 'draft' | 'published'
  published_at: string | null // ← Change: can be null for drafts
  tags: string
  uploaded_by: number
}

export interface CreatePostDTO {
  title: string
  excerpt: string
  full_content: string
  category: string
  image: File | null
  upload_gallery?: File[]
  slug?: string // ← Add this since you generate it in the form
  status?: 'draft' | 'published'
  tags?: string
  author?: number | string
  published_at?: string
}