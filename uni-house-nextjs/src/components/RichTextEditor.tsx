'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { useCallback, useState } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onUploadImage?: () => Promise<string> // Function để upload ảnh
}

export default function RichTextEditor({ content, onChange, onUploadImage }: RichTextEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showBgColorPicker, setShowBgColorPicker] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Allow HTML to be parsed
        hardBreak: {
          keepMarks: true,
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      Image,
      Color,
      TextStyle.extend({
        // Allow style attribute for font-size and background-color
        addAttributes() {
          return {
            ...this.parent?.(),
            style: {
              default: null,
              parseHTML: element => element.getAttribute('style'),
              renderHTML: attributes => {
                if (!attributes.style) {
                  return {}
                }
                return { style: attributes.style }
              },
            },
          }
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    onCreate: ({ editor }) => {
      console.log('✅ TipTap Editor initialized successfully')
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
      <div className="bg-gray-100 border-b p-2 flex flex-wrap gap-1 items-center">
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

        {/* Font Size - Using HTML directly */}
        <select
          onChange={(e) => {
            const fontSize = e.target.value
            if (fontSize && editor) {
              const { from, to } = editor.state.selection
              const selectedText = editor.state.doc.textBetween(from, to)

              if (selectedText) {
                // Escape HTML entities
                const escapedText = selectedText
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;')

                editor
                  .chain()
                  .focus()
                  .deleteSelection()
                  .insertContent(`<span style="font-size: ${fontSize}">${escapedText}</span>`, {
                    parseOptions: {
                      preserveWhitespace: 'full',
                    },
                  })
                  .run()

                console.log('✅ Applied font size:', fontSize, 'to text:', selectedText)
                e.target.value = '' // Reset dropdown
              } else {
                alert('⚠️ Vui lòng bôi đen text trước khi chọn cỡ chữ!')
                e.target.value = '' // Reset dropdown
              }
            }
          }}
          className="px-2 py-1 rounded bg-white border text-sm"
          title="Kích thước chữ (Chọn text trước)"
        >
          <option value="">Cỡ chữ</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="28px">28px</option>
          <option value="32px">32px</option>
        </select>

        {/* Text Color */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="px-3 py-1 rounded bg-white border flex items-center gap-1"
            title="Màu chữ"
          >
            <span>A</span>
            <div
              className="w-4 h-1 rounded"
              style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000000' }}
            />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded shadow-lg z-10">
              <div className="grid grid-cols-6 gap-1 mb-2">
                {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
                  '#00FFFF', '#FFA500', '#800080', '#008000', '#000080', '#808080'].map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        editor.chain().focus().setColor(color).run()
                        setShowColorPicker(false)
                      }}
                      className="w-6 h-6 rounded border hover:scale-110"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
              </div>
              <input
                type="color"
                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                className="w-full"
                title="Chọn màu tùy chỉnh"
              />
              <button
                onClick={() => {
                  editor.chain().focus().unsetColor().run()
                  setShowColorPicker(false)
                }}
                className="w-full mt-1 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
              >
                Xóa màu
              </button>
            </div>
          )}
        </div>

        {/* Background Color - Using HTML directly */}
        <div className="relative">
          <button
            onClick={() => setShowBgColorPicker(!showBgColorPicker)}
            className="px-3 py-1 rounded bg-white border"
            title="Màu nền"
          >
            🎨
          </button>
          {showBgColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded shadow-lg z-10">
              <div className="grid grid-cols-6 gap-1 mb-2">
                {['#FFFFFF', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#FFA500',
                  '#FFE4E1', '#E6E6FA', '#F0FFF0', '#FFF8DC', '#FFE4B5', '#F5F5DC'].map(bgColor => (
                    <button
                      key={bgColor}
                      onClick={() => {
                        const { from, to } = editor.state.selection
                        const selectedText = editor.state.doc.textBetween(from, to)
                        if (selectedText) {
                          // Escape HTML entities
                          const escapedText = selectedText
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#039;')

                          editor
                            .chain()
                            .focus()
                            .deleteSelection()
                            .insertContent(`<span style="background-color: ${bgColor}">${escapedText}</span>`, {
                              parseOptions: {
                                preserveWhitespace: 'full',
                              },
                            })
                            .run()

                          console.log('✅ Applied background color:', bgColor, 'to text:', selectedText)
                          setShowBgColorPicker(false)
                        } else {
                          alert('⚠️ Vui lòng bôi đen text trước khi chọn màu nền!')
                          setShowBgColorPicker(false)
                        }
                      }}
                      className="w-6 h-6 rounded border hover:scale-110"
                      style={{ backgroundColor: bgColor }}
                      title={bgColor}
                    />
                  ))}
              </div>
              <input
                type="color"
                onChange={(e) => {
                  const bgColor = e.target.value
                  const { from, to } = editor.state.selection
                  const selectedText = editor.state.doc.textBetween(from, to)
                  if (selectedText) {
                    // Escape HTML entities
                    const escapedText = selectedText
                      .replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&#039;')

                    editor
                      .chain()
                      .focus()
                      .deleteSelection()
                      .insertContent(`<span style="background-color: ${bgColor}">${escapedText}</span>`, {
                        parseOptions: {
                          preserveWhitespace: 'full',
                        },
                      })
                      .run()

                    console.log('✅ Applied custom background color:', bgColor)
                  } else {
                    alert('⚠️ Vui lòng bôi đen text trước khi chọn màu nền!')
                  }
                }}
                className="w-full"
                title="Chọn màu nền tùy chỉnh"
              />
            </div>
          )}
        </div>

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

      {/* Helper text */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-xs text-yellow-800">
        💡 <strong>Mẹo:</strong> Bôi đen text trước khi chọn cỡ chữ hoặc màu nền. Màu chữ có thể áp dụng trực tiếp.
      </div>

      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[400px] focus:outline-none [&_span]:inline [&_span[style]]:inline"
      />

      {/* Global styles for inline HTML in editor */}
      <style jsx global>{`
        .ProseMirror span[style] {
          display: inline !important;
        }
        .ProseMirror span[style*="font-size"] {
          display: inline !important;
        }
        .ProseMirror span[style*="background-color"] {
          display: inline !important;
          padding: 2px 4px;
          border-radius: 2px;
        }
        .ProseMirror span[style*="color"] {
          display: inline !important;
        }
        /* Ensure TipTap renders inline styles */
        .ProseMirror {
          min-height: 400px;
        }
        .ProseMirror p {
          margin: 0.5em 0;
        }
      `}</style>
    </div>
  )
}
