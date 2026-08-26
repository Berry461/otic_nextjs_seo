import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Metadata } from "next"


// UI Components
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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

type PaginatedPosts = {
  count: number
  next: string | null
  previous: string | null
  results: BlogPost[]
}

type Props = {
  searchParams: Promise<{ page?: string }>
}

export const metadata: Metadata = {
  title: "OTIC Surveys | Surveying Insights & Industry News",
  description: "Stay updated with the latest trends in geospatial technology, land surveying best practices, and project updates from OTIC SURVEYS in Nigeria.",
  keywords: ["Land Surveying Blog", "Geospatial News Nigeria", "Surveying Tips", "OTIC SURVEYS Updates", "Drones"],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: "OTIC SURVEYS Blog | Expert Surveying Insights",
    description: "Deep dives into drone mapping, boundary laws, and engineering surveys.",
    url: 'https://oticsurveys.com/blog',
    type: 'website',
  },
};

async function getPosts(page: number): Promise<PaginatedPosts> {
  const res = await fetch(`http://localhost:8000/api/posts/?page=${page}`, {
    cache: 'no-store' 
  })

  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default async function Blog({ searchParams }: Props) {
  const { page = '1' } = await searchParams
  const currentPage = Number(page)
  const itemsPerPage = 10

  let data: PaginatedPosts
  try {
    data = await getPosts(currentPage)
  } catch {
    return (
      <div className="min-h-screen bg-background relative">
        <Navigation />
        <div className="text-center py-20 text-red-500">
          Unable to load posts. Please try again later.
        </div>
        <Footer />
      </div>
    )
  }

  const currentPosts = data.results || []
  const totalPages = data.count ? Math.ceil(data.count / itemsPerPage) : 1

  return (
    <div className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <Navigation />

        <section className="container mx-auto px-4 mt-[140px] mb-12">
          <div className="relative h-[50vh] w-full rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/landmatters_blog.jpeg"
              alt="Blog Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-primary uppercase tracking-wider drop-shadow-md">
                  Our Blog
                </h2>
                <p className="text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-sm">
                  Insights, tutorials, and updates from the world of geospatial technology
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col gap-8">
              {currentPosts.map((post: BlogPost, index: number) => (
                <Card
                  key={post.slug}
                  className="group bg-card border-border overflow-hidden hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 w-full"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full h-64 md:h-auto md:w-[40%] relative shrink-0 overflow-hidden bg-muted">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-100">
                          No Image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    <div className="flex flex-col p-6 md:p-10 w-full md:w-[60%]">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="border-primary/30 text-white">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-white">
                          {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-1">
                        {post.title}
                      </h3>

                      <p className="text-white text-sm leading-relaxed mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={post.author_image || `https://ui-avatars.com/api/?name=${post.author_name || 'User'}&background=random&color=fff`}
                              alt={post.author_name || 'Author'}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-primary text-white text-xs">
                              {post.author_name ? post.author_name.slice(0, 2).toUpperCase() : 'AU'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white">
                              {post.author_name || "Unknown Author"}
                            </span>
                            <span className="text-xs text-white">Author</span>
                          </div>
                        </div>

                        {/* 👉 MODIFIED THIS LINK 👈 */}
                        <Link
                          href={`/blog/${post.slug}?fromPage=${currentPage}`}
                          className="flex items-center gap-1 group/readmore cursor-pointer"
                        >
                          <span className="text-sm font-semibold text-white group-hover/readmore:text-blue-400 transition-colors">
                            Read More
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-white group-hover/readmore:text-blue-400 transition-all group-hover/readmore:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <Link
                  href={currentPage === 1 ? '#' : `/blog?page=${currentPage - 1}`}
                  aria-disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm transition-colors
                    ${currentPage === 1
                      ? "border-gray-800 text-gray-600 cursor-not-allowed pointer-events-none"
                      : "border-primary text-primary hover:bg-primary/10"
                    }`}
                >
                  <ChevronLeft size={16} /> Previous
                </Link>

                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>

                <Link
                  href={currentPage === totalPages ? '#' : `/blog?page=${currentPage + 1}`}
                  aria-disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm transition-colors
                    ${currentPage === totalPages
                      ? "border-gray-800 text-gray-600 cursor-not-allowed pointer-events-none"
                      : "border-primary text-primary hover:bg-primary/10"
                    }`}
                >
                  Next <ChevronRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
