'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useData } from '@/contexts/DataContext'
import dynamic from 'next/dynamic'
import { NewsItem } from '@/data/news'

// Import RichTextEditor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => <p>Đang tải trình soạn thảo...</p>
})

export default function NewsDetailEditor() {
  const params = useParams()
  const router = useRouter()
  const { newsArticles, updateNews, reloadFromStorage } = useData()
  const [news, setNews] = useState<NewsItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [detailContent, setDetailContent] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load news from DataContext
  useEffect(() => {
    const newsId = parseInt(params.id as string)
    const foundNews = newsArticles.find(n => n.id === newsId)
    if (foundNews) {
      setNews(foundNews)
      setDetailContent(foundNews.detailContent || `<h1>${foundNews.title}</h1><p>${foundNews.excerpt}</p><p>Bắt đầu soạn thảo nội dung chi tiết cho tin tức...</p>`)
    }
  }, [params.id, newsArticles])

  // Upload image function for RichTextEditor
  const handleImageUpload = useCallback(async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }

      const handleFileChange = async (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
          try {
            // Convert to base64
            const reader = new FileReader()
            reader.onload = async (e) => {
              if (e.target?.result) {
                const base64 = e.target.result as string

                // Upload to server
                const response = await fetch('/api/upload', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    base64,
                    folder: 'icons/news'
                  })
                })

                const data = await response.json()
                if (data.success) {
                  resolve(data.path)
                  console.log('✅ Uploaded image for news editor:', data.path)
                } else {
                  reject(new Error(data.message))
                }
              }
            }
            reader.readAsDataURL(file)
          } catch (error) {
            reject(error)
          }
        } else {
          reject(new Error('No file selected'))
        }

        // Remove event listener
        if (fileInputRef.current) {
          fileInputRef.current.removeEventListener('change', handleFileChange)
        }
      }

      if (fileInputRef.current) {
        fileInputRef.current.addEventListener('change', handleFileChange)
      }
    })
  }, [])

  // Auto-save when content changes (debounced through DataContext)
  const handleContentChange = useCallback((newContent: string) => {
    console.log('📝 News content changed:', newContent.substring(0, 200))
    setDetailContent(newContent)
    setHasUnsavedChanges(true)
  }, [])

  const handleSave = async () => {
    if (!news) return

    setIsSaving(true)

    try {
      // Update news in DataContext - auto-save will handle API call
      const updatedNews = {
        ...news,
        detailContent
      }

      console.log('🔄 Đang lưu news:', updatedNews.id)
      console.log('📄 HTML Content:', detailContent)
      console.log('🔍 Has <strong> tag?', detailContent.includes('<strong>'))

      updateNews(news.id, updatedNews)

      // Wait for auto-save to complete (500ms debounce + 500ms for API)
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Reload data from API to ensure consistency
      await reloadFromStorage()
      console.log('✅ Đã reload news data từ API')

      // Update local state to reflect changes
      setNews(updatedNews)
      setHasUnsavedChanges(false)
      setIsEditing(false)

      // Show success message
      alert('✅ Đã lưu thành công! Bạn có thể xem kết quả bằng nút "Xem trên site".')
    } catch (error) {
      console.error('❌ Lỗi khi lưu:', error)
      alert('❌ Có lỗi xảy ra khi lưu. Vui lòng thử lại!')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (news) {
      setDetailContent(news.detailContent || '')
    }
    setHasUnsavedChanges(false)
    setIsEditing(false)
  }

  if (!news) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Đang tải tin tức...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <button
            onClick={() => router.push('/admin/news')}
            className="text-blue-600 hover:text-blue-800 mb-2"
          >
            ← Quay lại danh sách
          </button>
          <h1 className="text-2xl font-bold">Chỉnh sửa chi tiết: {news.title}</h1>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <a
                href={`/tin-tuc/${news.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                👁️ Xem trên site
              </a>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Chỉnh sửa
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                disabled={isSaving}
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                {isSaving ? '⏳ Đang lưu...' : hasUnsavedChanges ? 'Lưu thay đổi' : 'Lưu'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* News Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <p className="text-gray-900">{news.title}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <p className="text-gray-600">{news.category}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đăng</label>
            <p className="text-gray-600">{news.date}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian đọc</label>
            <p className="text-gray-600">{news.readTime}</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
          <p className="text-gray-700">{news.excerpt}</p>
        </div>
      </div>

      {/* Content Editor/Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Nội dung chi tiết</h2>

        {isEditing ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Sử dụng các công cụ bên dưới để định dạng nội dung giống như trong Microsoft Word
            </p>
            <RichTextEditor
              content={detailContent}
              onChange={handleContentChange}
              onUploadImage={handleImageUpload}
            />
          </div>
        ) : (
          <div>
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                💡 <strong>Chế độ xem trước:</strong> Đây là nội dung sẽ hiển thị trên trang web.
                Nhấn "Chỉnh sửa" để thay đổi nội dung.
              </p>
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: detailContent }}
            />
          </div>
        )}
      </div>

      {/* Auto-save Notice */}
      {isEditing && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            ✅ <strong>Tự động lưu:</strong> Thay đổi của bạn sẽ được tự động lưu sau 0.5 giây.
            Nhấn "Lưu" để kết thúc chỉnh sửa và xem kết quả trên trang web.
          </p>
        </div>
      )}

      {/* Tips */}
      {isEditing && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-bold text-yellow-800 mb-2">💡 Mẹo sử dụng:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Sử dụng <strong>H1, H2, H3</strong> để tạo tiêu đề phân cấp</li>
            <li>• Nhấn <strong>B</strong> (Bold) để in đậm, <strong>I</strong> (Italic) để in nghiêng</li>
            <li>• Sử dụng danh sách dấu đầu dòng (•) hoặc đánh số (1.) để liệt kê</li>
            <li>• Nhấn 🔗 để chèn liên kết, 📷 để upload ảnh từ máy tính</li>
            <li>• Sử dụng các nút căn lề để căn chỉnh văn bản</li>
            <li>• Nhấn Ctrl+Z để hoàn tác, Ctrl+Y để làm lại</li>
          </ul>
        </div>
      )}

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={() => {}} // Handled by handleImageUpload
      />
    </div>
  )
}
