import { MetadataRoute } from 'next'
import { servicesData } from "@/data/services"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.oticsurveys.com'

  // 1. Static Routes
  const staticPages = ['', '/services', '/blog', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. Dynamic Service Routes
  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 3. Dynamic Blog Routes — fetched from Django API
  let blogPages: MetadataRoute.Sitemap = []
  try {
    let allPosts: any[] = []
    let nextUrl: string | null = 'https://www.oticsurveys.com/api/posts/'

    while (nextUrl !== null) {
      const res: Response = await fetch(nextUrl, { next: { revalidate: 3600 } })
      if (!res.ok) break
      const data = await res.json()

      const posts = Array.isArray(data) ? data : data.results ?? []
      allPosts = [...allPosts, ...posts]
      nextUrl = Array.isArray(data) ? null : (data.next ?? null)
    }

    blogPages = allPosts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ?? post.created_at ?? new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Sitemap: Failed to fetch blog posts', error)
  }

  return [...staticPages, ...servicePages, ...blogPages]
}
