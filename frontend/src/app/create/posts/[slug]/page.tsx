// File: app/create/posts/[slug]/page.tsx
// This single file handles BOTH:
//   /create/posts/new     → create mode
//   /create/posts/my-post → edit mode

'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LogOut, X, Image as ImageIcon, UploadCloud } from 'lucide-react'
import { usePost, useCreatePost, useUpdatePost, useDeletePost, useAuthors } from '@/hooks/usePosts'
import RichTextEditor from '@/components/RichTextEditor'
import ProtectedRoute from '@/components/ProtectedRoute'

type Props = {
  params: Promise<{ slug: string }>
}

export default function CreatePostForm({ params }: Props) {
  const router = useRouter()

  // ✅ Next.js 15: unwrap params with React.use() — no useEffect needed
  const { slug: slugParam } = use(params)
  const isEditing = slugParam !== 'new'
  const slug = isEditing ? slugParam : undefined

  const createPostMutation = useCreatePost()
  const updatePostMutation = useUpdatePost()
  const deletePostMutation = useDeletePost()

  const { data: authors, isLoading: isLoadingAuthors } = useAuthors()
  const { data: existingPost, isLoading: isLoadingPost } = usePost(slug ?? '')

  // Form State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Land / Cadastral Survey')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [existingGallery, setExistingGallery] = useState<string[]>([])
  const [status, setStatus] = useState('published')
  const [publishedAt, setPublishedAt] = useState('')
  const [tags, setTags] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  // Populate form when editing
  useEffect(() => {
    if (isEditing && existingPost) {
      setTitle(existingPost.title || '')
      setCategory(existingPost.category || 'Land / Cadastral Survey')
      setExcerpt(existingPost.excerpt || '')
      setContent(existingPost.full_content || '')
      setStatus(existingPost.status || 'published')
      setTags(existingPost.tags || '')

      if (existingPost.author) {
        const authorIdStr =
          typeof existingPost.author === 'object'
            ? (existingPost.author as { id: number | string }).id.toString()
            : existingPost.author.toString()
        setAuthorId(authorIdStr)
      }

      if (existingPost.image) setImagePreview(existingPost.image)
      if (existingPost.gallery_images) setExistingGallery(existingPost.gallery_images)

      if (existingPost.published_at) {
        const date = new Date(existingPost.published_at)
        const localIso = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16)
        setPublishedAt(localIso)
      }

      setIsDataLoaded(true)
    }
  }, [isEditing, existingPost])

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setGalleryFiles((prev) => [...prev, ...filesArray])
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file))
      setGalleryPreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const removeGalleryImage = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index))
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index))
  }

    const validatePost = (): string | null => {
    if (title.length > 200) {
      return `Title is ${title.length} characters — please shorten it to 200 characters or fewer.`
    }
    if (excerpt.length > 500) {
      return `Excerpt is ${excerpt.length} characters — please shorten it to 500 characters or fewer (currently ${excerpt.length - 500} over the limit).`
    }
    if (tags.length > 255) {
      const tagCount = tags.split(',').filter((t) => t.trim()).length
      return `SEO Tags are too long (${tags.length} characters across ${tagCount} tags) — the limit is 255 characters total. Please remove or shorten a few tags.`
    }
    return null
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validatePost()
    if (validationError) {
      console.error('Post validation failed:', validationError)
      toast.error(validationError)
      return
    }

    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const cleanContent = content.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('slug', generatedSlug)
    formData.append('category', category)
    formData.append('excerpt', excerpt)
    formData.append('full_content', cleanContent)
    formData.append('status', status)
    formData.append('tags', tags)

    if (authorId) formData.append('author', authorId)
    formData.append('published_at', publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString())
    if (image) formData.append('image', image)
    galleryFiles.forEach((file) => formData.append('upload_gallery', file))

    const handleError = (error: any) => {
      console.error('DJANGO ERROR DATA:', error.response?.data)
      const errorData = error.response?.data
      const titleError = Array.isArray(errorData?.title) ? errorData.title[0] : errorData?.title
      const slugError = Array.isArray(errorData?.slug) ? errorData.slug[0] :errorData?.slug
      const excerptError = Array.isArray(errorData?.excerpt) ? errorData.excerpt[0] : errorData?.excerpt
      const tagsError = Array.isArray(errorData?.tags) ? errorData.tags[0] : errorData?.tags

      if (titleError) {
        toast.error(`Title error: ${titleError}`)
      } else if (excerptError) {
        toast.error(`Excerpt error: ${excerptError}`)
      } else if (tagsError) {
        toast.error(`SEO Tags error: ${tagsError}`)
      } else if (slugError) {
        toast.error('A post with this title already exists! Please choose a different title.')
      } else if (error.response?.status === 500) {
        toast.error('Server error: This title might already exist, causing adatabase conflict.')
      } else {
        toast.error(`Failed to ${isEditing ? 'update' : 'create'} post. Check console for details.`)
      }
    }

    if (isEditing && slug) {
      updatePostMutation.mutate(
        { id: slug, data: formData },
        {
          onSuccess: () => {
            toast.success('Post updated successfully!')
            router.push('/dashboard')
          },
          onError: handleError,
        }
      )
    } else {
      createPostMutation.mutate(formData, {
        onSuccess: () => {
          toast.success('Post published successfully!')
          setTitle(''); setExcerpt(''); setContent('')
          setImage(null); setImagePreview(null)
          setGalleryFiles([]); setGalleryPreviews([])
          setCategory('Land / Cadastral Survey'); setTags(''); setPublishedAt(''); setAuthorId('')
          window.scrollTo(0, 0)
          router.push('/dashboard')
        },
        onError: handleError,
      })
    }
  }

  const handleDelete = () => {
    const numericId = existingPost?.id?.toString()
    if (!numericId || !window.confirm('Are you sure?')) return

    deletePostMutation.mutate(numericId, {
      onSuccess: () => {
        toast.success('Post deleted')
        router.push('/dashboard')
      },
      onError: () => toast.error('Could not delete post'),
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    toast.success('Logged out')
    router.push('/login')
  }

  if (isEditing && isLoadingPost) {
    return <div className="p-10 text-center text-gray-500">Loading editor...</div>
  }

  const isSaving = createPostMutation.isPending || updatePostMutation.isPending

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-xl border border-gray-100 my-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center"
            >
              <LogOut size={20} />
            </button>
            <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-500">
              Cancel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text" required value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
            {title && (
              <p className="text-[11px] text-gray-400 mt-1">
                URL Preview: /blog/{title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')}
              </p>
            )}
          </div>

          {/* Category / Author / Featured Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Land / Cadastral Survey">Land Survey</option>
                <option value="Equipment Sales">Equipment Sales</option>
                <option value="Route Survey">Route Survey</option>
                <option value="Drone / Aerial Survey">Drone / Aerial Survey</option>
                <option value="Remote Sensing & Mapping Services">Remote Sensing & Mapping Services</option>
                <option value="Topographic Survey">Topographic Survey</option>
                <option value="Hydrographic / Bathymetric Survey">Hydrographic / Bathymetric Survey</option>
                <option value="GIS & Spatial Data Analysis">GIS & Spatial Data Analysis</option>
                <option value="Pipeline Survey">Pipeline Survey</option>
                <option value="As-Built Survey">As-Built Survey</option>
                <option value="Setting-Out Survey">Setting-Out Survey</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <select
                value={authorId} onChange={(e) => setAuthorId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Author --</option>
                {isLoadingAuthors ? (
                  <option disabled>Loading authors...</option>
                ) : (
                  authors?.map((author) => (
                    <option key={author.id} value={author.id}>{author.name}</option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
              <div className="flex items-center gap-2">
                <input
                  type="file" accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImage(e.target.files[0])
                      setImagePreview(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:bg-blue-50 file:text-blue-700"
                />
                {imagePreview && (
                  <div className="w-10 h-10 rounded overflow-hidden border">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="p-5 border border-dashed border-gray-300 rounded-xl bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                Event Gallery
              </label>
              <label className="cursor-pointer bg-white border border-gray-300 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 flex items-center gap-2">
                <UploadCloud className="w-4 h-4" />
                <span>Select Images</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleGallerySelect} />
              </label>
            </div>

            {galleryPreviews.length === 0 && existingGallery.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">No images selected for gallery yet.</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {existingGallery.map((url, idx) => (
                  <div key={`exist-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-blue-200">
                    <img src={url} alt="Existing" className="w-full h-full object-cover" />
                    <div className="absolute top-1 right-1 bg-black/50 text-white text-[10px] px-1.5 rounded">Saved</div>
                  </div>
                ))}
                {galleryPreviews.map((url, idx) => (
                  <div key={`new-${idx}`} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-300 shadow-sm bg-white">
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button" onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status / Date / Tags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Post Status</label>
              <select
                value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Publish Date</label>
              <input
                type="datetime-local" value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">SEO Tags</label>
              <input
                type="text" value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt</label>
            <textarea
              required rows={2} value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="h-[400px] mb-12">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
            {(!isEditing || isDataLoaded) ? (
              <RichTextEditor
                key={isEditing ? slug : 'new-post'}
                value={content}
                onChange={setContent}
                placeholder="Write your blog post here..."
              />
            ) : (
              <div className="h-[350px] bg-gray-50 animate-pulse border rounded-md flex items-center justify-center text-gray-400">
                Loading content...
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-12">
            <button
              type="submit" disabled={isSaving}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Post'}
            </button>

            {isEditing && (
              <button
                type="button" onClick={handleDelete} disabled={deletePostMutation.isPending}
                className="px-6 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium"
              >
                {deletePostMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </form>
      </div>
    </ProtectedRoute>
  )
}
