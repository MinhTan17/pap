'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useData } from '@/contexts/DataContext'
import dynamic from 'next/dynamic'
import { ServiceItem } from '@/data/services'

// Import RichTextEditor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => <p>Đang tải trình soạn thảo...</p>
})

export default function ServiceDetailEditor() {
  const params = useParams()
  const router = useRouter()
  const { services, updateService, reloadFromStorage } = useData()
  const [service, setService] = useState<ServiceItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [detailContent, setDetailContent] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Load service from DataContext
  useEffect(() => {
    const serviceId = parseInt(params.id as string)
    const foundService = services.find(s => s.id === serviceId)
    if (foundService) {
      setService(foundService)
      setDetailContent(foundService.detailContent || '<h1>Nội dung chi tiết dịch vụ</h1><p>Bắt đầu soạn thảo nội dung chi tiết cho dịch vụ của bạn...</p>')
    }
  }, [params.id, services])

  // Upload image function for RichTextEditor - Direct Cloudinary upload
  const handleImageUpload = useCallback(async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) {
          reject(new Error('No file selected'))
          return
        }

        try {
          console.log('📤 Uploading image:', file.name, file.size, 'bytes')
          
          // Import upload function dynamically
          const { uploadToCloudinary } = await import('@/lib/cloudinary-upload')
          
          // Upload directly to Cloudinary
          const result = await uploadToCloudinary(file, 'services')
          
          if (result.success && result.url) {
            console.log('✅ Uploaded image successfully:', result.url)
            resolve(result.url)
          } else {
            console.error('❌ Upload failed:', result.error)
            reject(new Error(result.error || 'Upload failed'))
          }
        } catch (error: any) {
          console.error('❌ Upload error:', error)
          reject(error)
        }
      }

      input.click()
    })
  }, [])

  // Auto-save when content changes (debounced through DataContext)
  const handleContentChange = useCallback((newContent: string) => {
    console.log('📝 Content changed:', newContent.substring(0, 200))
    setDetailContent(newContent)
    setHasUnsavedChanges(true)
  }, [])

  const handleSave = async () => {
    if (!service) return

    setIsSaving(true)

    try {
      // Update service in DataContext - auto-save will handle API call
      const updatedService = {
        ...service,
        detailContent
      }

      console.log('🔄 Đang lưu service:', updatedService.id)
      console.log('📄 HTML Content:', detailContent)
      console.log('🔍 Has <strong> tag?', detailContent.includes('<strong>'))
      console.log('🔍 Has <em> tag?', detailContent.includes('<em>'))

      updateService(service.id, updatedService)

      // Wait for auto-save to complete (500ms debounce + 500ms for API)
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Reload data from API to ensure consistency
      try {
        await reloadFromStorage()
        console.log('✅ Đã reload data từ API')
      } catch (reloadError) {
        console.error('❌ Lỗi khi reload:', reloadError)
      }

      // Wait for React state to update after reload
      await new Promise(resolve => setTimeout(resolve, 500))

      // Check if data was saved correctly
      const reloadedService = services.find(s => s.id === service.id)
      console.log('🔍 Reloaded service:', reloadedService)
      console.log('🔍 Reloaded detailContent:', reloadedService?.detailContent?.substring(0, 200))

      // Update local state with reloaded data (not updatedService)
      if (reloadedService) {
        setService(reloadedService)
        setDetailContent(reloadedService.detailContent || '')
      }
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
    if (service) {
      setDetailContent(service.detailContent || '')
    }
    setHasUnsavedChanges(false)
    setIsEditing(false)
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Đang tải dịch vụ...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <button
            onClick={() => router.push('/admin/services')}
            className="text-blue-600 hover:text-blue-800 mb-2"
          >
            ← Quay lại danh sách
          </button>
          <h1 className="text-2xl font-bold">Chỉnh sửa chi tiết: {service.title}</h1>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <a
                href={`/dich-vu/${service.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                👁️ Xem trên site
              </a>
              <button
                onClick={() => {
                  console.log('🔧 Switching to edit mode')
                  setIsEditing(true)
                }}
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

      {/* Service Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên dịch vụ</label>
            <p className="text-gray-900">{service.title}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
            <p className="text-gray-600">{service.description}</p>
          </div>
        </div>
      </div>

      {/* Content Editor/Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Nội dung chi tiết</h2>

        {isEditing ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Sử dụng các công cụ bên dưới để định dạng nội dung. Thay đổi sẽ hiển thị ngay trong editor.
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


    </div>
  )
}
