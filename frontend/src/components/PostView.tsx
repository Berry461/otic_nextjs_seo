'use client'

import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

interface PostViewProps {
  content: string
  galleryImages?: string[]
}

const PostView = ({ content, galleryImages = [] }: PostViewProps) => {
  const [cleanContent, setCleanContent] = useState('')

  useEffect(() => {
    // DOMPurify only works in browser, so we run it in useEffect
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

    const injectGallery = (htmlContent: string) => {
      const galleryPlaceholder = /(?:<p>|<br>|\s|&nbsp;)*\[\[\s*gallery\s*\]\](?:<\/p>|<br>|\s|&nbsp;)*/gi
      
      if (galleryPlaceholder.test(htmlContent)) {
        return htmlContent.replace(galleryPlaceholder, generateGalleryGrid())
      }
      return htmlContent
    }

    const contentWithRealSpaces = content.replace(/\u00A0/g, ' ')
    
    // 👉 FIX INLINE RICH-TEXT IMAGES: Convert /media/... inside the text body to absolute URL
    const contentWithAbsoluteImages = contentWithRealSpaces.replace(
      /src="(\/[^"]+)"/g,
      'src="http://localhost:8000$1"'
    )

    const contentWithGallery = injectGallery(contentWithAbsoluteImages)
    
    const sanitized = DOMPurify.sanitize(contentWithGallery, {
      ADD_TAGS: ['img', 'div'],
      ADD_ATTR: ['src', 'alt', 'class', 'style', 'loading']
    })

    setCleanContent(sanitized)
  }, [content, galleryImages])

  // Show nothing on first render to avoid SSR mismatch with DOMPurify
  if (!cleanContent) {
    return <div className="w-full max-w-none animate-pulse h-96 bg-gray-100 rounded-lg" />
  }

  return (
    <div className="w-full max-w-none">
      <div 
        className="
          prose prose-lg prose-blue w-full max-w-none break-words text-gray-800 leading-relaxed
          
          prose-p:my-2
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