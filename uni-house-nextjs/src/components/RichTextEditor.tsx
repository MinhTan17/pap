'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { useCallback } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onUploadImage?: () => Promise<string> // Function để upload ảnh
}

export default function RichTextEditor({ content, onChange, onUploadImage }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Color,
      TextStyle,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const addImage = useCallback(async () => {
    if (onUploadImage) {
      try {
        const imageUrl = await onUploadImage()
        if (imageUrl && editor) {
          editor.chain().focus().setImage({ src: imageUrl }).run()
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Lỗi khi upload ảnh')
      }
    } else {
      // Fallback: prompt for URL
      const url = window.prompt('Nhập URL hình ảnh:')
      if (url && editor) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }
  }, [editor, onUploadImage])

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('Nhập URL:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b p-2 flex flex-wrap gap-1">
        {/* Text formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Đậm (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Nghiêng (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 rounded ${editor.isActive('underline') ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Gạch chân (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded ${editor.isActive('strike') ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Gạch ngang"
        >
          <s>S</s>
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Tiêu đề 1"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Tiêu đề 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Tiêu đề 3"
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-3 py-1 rounded ${editor.isActive('paragraph') ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Đoạn văn"
        >
          P
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Danh sách dấu đầu dòng"
        >
          •
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded ${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Danh sách đánh số"
        >
          1.
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-3 py-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Căn trái"
        >
          ≡
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-3 py-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Căn giữa"
        >
          ≡
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-3 py-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Căn phải"
        >
          ≡
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`px-3 py-1 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Căn đều"
        >
          ≡
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        {/* Link & Image */}
        <button
          onClick={setLink}
          className={`px-3 py-1 rounded ${editor.isActive('link') ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Chèn liên kết"
        >
          🔗
        </button>
        <button
          onClick={addImage}
          className="px-3 py-1 rounded bg-white"
          title="Upload ảnh từ máy tính"
        >
          📷
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        {/* Other */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded ${editor.isActive('blockquote') ? 'bg-blue-500 text-white' : 'bg-white'}`}
          title="Trích dẫn"
        >
          "
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 rounded bg-white"
          title="Đường kẻ ngang"
        >
          ―
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1 rounded bg-white disabled:opacity-50"
          title="Hoàn tác (Ctrl+Z)"
        >
          ↶
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1 rounded bg-white disabled:opacity-50"
          title="Làm lại (Ctrl+Y)"
        >
          ↷
        </button>
      </div>

      {/* Editor content */}
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[400px] focus:outline-none"
      />
    </div>
  )
}
