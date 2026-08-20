import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Keep crawlers out of your backend
    },
    sitemap: 'https://oticsurveys.com/sitemap.xml',
  }
}
