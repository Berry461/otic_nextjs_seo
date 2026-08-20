import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PostView from '@/components/PostView'

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  full_content: string
  category: string
  image: string | null
  author_name: string | null
  author_image: string | null
  published_at: string | null
  created_at: string
  gallery_images?: any[]
}

// 👉 UPDATED PROPS TO INCLUDE searchParams 👈
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ fromPage?: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`https://www.oticsurveys.com/api/posts/${slug}/`, {
    cache: 'no-store'
  })

  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch post')
  return res.json()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | OTIC Surveys`,
    description: post.excerpt ?? "Professional drone surveying and mapping services in Nigeria.",
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "Professional drone surveying and mapping services in Nigeria.",
      images: post.image ? [post.image] : [],
      type: 'article',
      url: `https://oticsurveys.com/blog/${slug}`
    },
    twitter: {
      card: 'summary_large_image'
    },
    alternates: {
      canonical: `https://www.oticsurveys.com/blog/${slug}`
    }
  }
}

export default async function BlogDetail({ params, searchParams }: Props) {
  // 👉 AWAIT PARAMS AND SEARCHPARAMS 👈
  const { slug } = await params
  const { fromPage } = await searchParams
  const returnPage = fromPage || '1' // Default to 1 if there's no fromPage parameter

  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      <Navigation />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[140px] mb-12">
        <div className="text-center max-w-4xl mx-auto mb-8">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-4 block">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
        </div>

        <div className="relative w-full mb-4">
          {post.image && (
            <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="relative -mt-24 ml-4 md:ml-12 z-10 max-w-2xl">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                  {post.author_image ? (
                    <img src={post.author_image} alt={post.author_name || "Author"} className="w-full h-full object-cover" />
                  ) : (
                    <span>{post.author_name ? post.author_name.charAt(0) : "O"}</span>
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-gray-900">{post.author_name || "Otic Team"}</p>
                  <p className="text-gray-500">
                    {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          {/* 👉 MODIFIED THIS LINK TO USE returnPage 👈 */}
          <Link
            href={`/blog?page=${returnPage}`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          <article className="w-full prose lg:prose-xl max-w-none">
            <PostView content={post.full_content} galleryImages={post.gallery_images} />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
