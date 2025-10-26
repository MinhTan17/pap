'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useData } from '@/contexts/DataContext'
import dynamic from 'next/dynamic'
import { NewsItem } from '@/data/news'

// Import RichTextEditor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => <p>Đang tải trình soạn thảo...</p>
})

export default function AddNewsPage() {
  const router = useRouter()
  const { newsArticles, addNews, reloadFromStorage } = useData()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('Thiết kế')
  const [date, setDate] = useState(new Date().toLocaleDateString('vi-VN'))
  const [readTime, setReadTime] = useState('5 phút đọc')
  const [image, setImage] = useState('')
  const [detailContent, setDetailContent] = useState('<h1>Nội dung tin tức</h1><p>Bắt đầu soạn thảo nội dung chi tiết cho tin tức...</p>')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề!')
      return
    }

    setIsSaving(true)

    try {
      // Create new news item
      const newNews: NewsItem = {
        id: Math.max(...newsArticles.map(n => n.id)) + 1,
        title: title.trim(),
        excerpt: excerpt.trim() || title.trim(),
        content: detailContent.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        detailContent,
        category,
        date,
        readTime,
        image: image || '/icons/service/tt.png',
        icon: 'steel',
        color: 'from-blue-500 to-blue-700'
      }

      console.log('🔄 Đang tạo news mới:', newNews.id)
      addNews(newNews)

      // Wait for auto-save to complete (500ms debounce + 500ms for API)
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Reload data from API to ensure consistency
      await reloadFromStorage()
      console.log('✅ Đã reload news data từ API')

      setHasUnsavedChanges(false)

      // Show success message
      alert('✅ Đã tạo tin tức thành công!')
      router.push(`/admin/news/${newNews.id}`)
    } catch (error) {
      console.error('❌ Lỗi khi tạo:', error)
      alert('❌ Có lỗi xảy ra khi tạo tin tức. Vui lòng thử lại!')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/news')
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
          <h1 className="text-2xl font-bold">Thêm tin tức mới</h1>
        </div>
        <div className="flex gap-2">
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
            {isSaving ? '⏳ Đang lưu...' : 'Lưu tin tức'}
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Thông tin cơ bản</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Nhập tiêu đề tin tức..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="Thiết kế">Thiết kế</option>
              <option value="Vật liệu">Vật liệu</option>
              <option value="Thi công">Thi công</option>
              <option value="Công nghệ">Công nghệ</option>
              <option value="Tư vấn">Tư vấn</option>
              <option value="Dự án">Dự án</option>
              <option value="Thị trường">Thị trường</option>
              <option value="Laser">Laser</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đăng</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="15/01/2024"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian đọc</label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="5 phút đọc"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Mô tả ngắn về tin tức..."
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">URL hình ảnh</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="/icons/news/news-image.jpg"
          />
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Nội dung chi tiết</h2>
        <p className="text-sm text-gray-600 mb-4">
          Sử dụng các công cụ bên dưới để định dạng nội dung giống như trong Microsoft Word
        </p>
        <RichTextEditor
          content={detailContent}
          onChange={handleContentChange}
          onUploadImage={handleImageUpload}
        />
      </div>

      {/* Tips */}
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
