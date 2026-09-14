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

function insertVideoPlaceholder(this: any) {
  const range = this.quill.getSelection(true)
  this.quill.insertText(range.index, '\n[[video]]\n', 'user')
  this.quill.setSelection(range.index + 11, 0)
}

function insertLinkPlaceholder(this: any) {
  const range = this.quill.getSelection(true)
  this.quill.insertText(range.index, ' [[link]] ', 'user')
  this.quill.setSelection(range.index + 10, 0)
}

const MODULES = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['insertVideo', 'insertLinkText'],
      ['clean']
    ],
    handlers: {
      insertVideo: insertVideoPlaceholder,
      insertLinkText: insertLinkPlaceholder,
    },
  },
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
        .ql-toolbar {
          overflow-x: auto;
          white-space: nowrap;
        }
        .ql-toolbar .ql-formats {
          display: inline-flex;
        }
        .ql-editor {
          min-height: 200px;
        }
        .ql-toolbar .ql-insertVideo,
        .ql-toolbar .ql-insertLinkText {
          width: auto !important;
          padding: 0 8px !important;
          font-size: 12px;
          font-weight: 600;
          color: #444;
        }
        .ql-toolbar .ql-insertVideo::before {
          content: "🎥 Video";
        }
        .ql-toolbar .ql-insertLinkText::before {
          content: "🔗 Link";
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