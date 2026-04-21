'use client'

import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// Dynamic import with SSR disabled
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-md" />
})

interface EditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  },
}

const FORMATS = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list',
  'link', 'image'
]

export default function RichTextEditor({ value, onChange, placeholder }: EditorProps) {
  return (
    <div className="bg-white relative">
      <style>{`
        .ql-toolbar svg {
          width: 20px!important;
          height: 20px!important;
        }
        .ql-container {
          min-height: 200px;
          font-size: 1rem;
        }
        .ql-editor {
          min-height: 200px;
        }
      `}</style>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={MODULES}
        formats={FORMATS}
        placeholder={placeholder}
        className="h-64 mb-12"
      />
    </div>
  )
}