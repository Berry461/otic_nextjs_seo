'use client'

import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

interface PostViewProps {
  content: string
  galleryImages?: string[]
  videoEmbedUrl?: string | null
  linkText?: string | null
  linkUrl?: string | null
}

const PostView = ({ content, galleryImages = [], videoEmbedUrl, linkText, linkUrl }: PostViewProps) => {
  const [cleanContent, setCleanContent] = useState('')

  useEffect(() => {
    const generateGalleryGrid = () => {
      if (!galleryImages || galleryImages.length === 0) return ''

      const imagesHtml = galleryImages.map((img, index) => `
        <div class="relative aspect-square overflow-hidden rounded-md cursor-pointer">
          <img 
            src="${img}" 
            alt="Gallery image ${index + 1}" 
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy" 
          />
        </div>
      `).join('')

      return `
        <div class="w-full !my-0 !py-0 clear-both"> 
          <div class="grid grid-cols-3 gap-1">
            ${imagesHtml}
          </div>
        </div>
      `
    }

    const generateVideoEmbed = () => {
      if (!videoEmbedUrl) return ''
      return `
        <div class="w-full aspect-video rounded-xl overflow-hidden !my-6 shadow-md">
          <iframe
            src="${videoEmbedUrl}"
            title="Video"
            class="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `
    }

    const generateLinkHtml = () => {
     if (!linkText || !linkUrl) return ''
     return `&nbsp;<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800 font-semibold">${linkText}</a>&nbsp;`
    }

    const injectPlaceholder = (htmlContent: string, keyword: string, replacement: string) => {
      const placeholder = new RegExp(`(?:<p>|<br>|\\s|&nbsp;)*\\[\\[\\s*${keyword}\\s*\\]\\](?:<\\/p>|<br>|\\s|&nbsp;)*`, 'gi')
      if (placeholder.test(htmlContent)) {
        return htmlContent.replace(placeholder, replacement)
      }
      return htmlContent
    }

    const contentWithRealSpaces = content.replace(/\u00A0/g, ' ')

    const contentWithAbsoluteImages = contentWithRealSpaces.replace(
      /src="(\/[^"]+)"/g,
      `src="${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}$1"`
    )

    const sanitized = DOMPurify.sanitize(contentWithAbsoluteImages, {
      ADD_TAGS: ['img', 'div'],
      ADD_ATTR: ['src', 'alt', 'class', 'style', 'loading']
    })

    let finalContent = injectPlaceholder(sanitized, 'gallery', generateGalleryGrid())
    finalContent = injectPlaceholder(finalContent, 'video', generateVideoEmbed())
    finalContent = injectPlaceholder(finalContent, 'link', generateLinkHtml())

    setCleanContent(finalContent)
  }, [content, galleryImages, videoEmbedUrl, linkText, linkUrl])

  if (!cleanContent) {
    return <div className="w-full max-w-none animate-pulse h-96 bg-gray-100 rounded-lg" />
  }

  return (
    <div className="w-full max-w-none">
      <div 
        className="
          prose prose-lg prose-blue w-full max-w-none break-words text-gray-800 leading-relaxed
          
          prose-p:my-6
          prose-headings:mt-6 
          prose-headings:mb-3 
          
          prose-img:w-full
          prose-img:aspect-square
          prose-img:object-cover
          prose-img:max-h-none
          prose-img:m-0
          prose-img:p-0
          prose-img:rounded-lg
          prose-img:my-4
        "
        style={{ wordBreak: 'normal', overflowWrap: 'anywhere' }}
        dangerouslySetInnerHTML={{ __html: cleanContent }} 
      />
    </div>
  )
}

export default PostView