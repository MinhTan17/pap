'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'

// Import RichTextEditor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => <p>Đang tải trình soạn thảo...</p>
})

interface ImageItem {
  url: string
  caption: string
  width: number
  height: number
}

interface AboutContent {
  id: string
  title: string
  content: string
  images: ImageItem[]
  section: 'company' | 'staff' | 'equipment'
}

export default function AboutAdminPage() {
  const [aboutContent, setAboutContent] = useState<AboutContent[]>([])
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: [] as ImageItem[]
  })
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchAboutContent()
  }, [])

  const fetchAboutContent = async () => {
    try {
      const response = await fetch('/api/about')
      if (response.ok) {
        const data = await response.json()
        setAboutContent(data)
      }
    } catch (error) {
      console.error('Error fetching about content:', error)
    }
  }

  const handleSave = async (section: string) => {
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          ...formData
        })
      })

      if (response.ok) {
        await fetchAboutContent()
        setEditingSection(null)
        setFormData({ title: '', content: '', images: [] })
        setHasUnsavedChanges(false)
        alert('✅ Đã lưu thành công!')
      }
    } catch (error) {
      console.error('Error saving about content:', error)
      alert('❌ Có lỗi xảy ra khi lưu. Vui lòng thử lại!')
    } finally {
      setIsSaving(false)
    }
  }

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
            // Use FormData instead of base64
            const formData = new FormData()
            formData.append('file', file)
            formData.append('section', 'about')

            // Upload to server
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData
            })

            const data = await response.json()
            if (data.success) {
              resolve(data.path)
              console.log('✅ Uploaded image for editor:', data.path)
            } else {
              reject(new Error(data.message))
            }
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

  const handleContentChange = useCallback((newContent: string) => {
    setFormData(prev => ({ ...prev, content: newContent }))
    setHasUnsavedChanges(true)
  }, [])

  const handleCancel = () => {
    const content = getSectionContent(editingSection!)
    setFormData({
      title: content?.title || '',
      content: content?.content || '',
      images: content?.images || []
    })
    setHasUnsavedChanges(false)
    setEditingSection(null)
  }

  const getSectionContent = (section: string) => {
    return aboutContent.find(item => item.section === section)
  }

  const sections = [
    { key: 'company', title: 'Thông tin công ty', description: 'Nội dung giới thiệu về công ty' },
    { key: 'staff', title: 'Nhân lực', description: 'Thông tin về đội ngũ nhân viên' },
    { key: 'equipment', title: 'Thiết bị', description: 'Thông tin về máy móc thiết bị' }
  ]

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gray-800 py-4 px-6 flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Preview - Trang Giới Thiệu</h1>
          <button
            onClick={() => setIsPreviewMode(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Quay lại chỉnh sửa
          </button>
        </div>
        
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Company Section */}
        <div className="py-12">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-center">
              {getSectionContent('company') ? (
                <>
                  <h2 className="text-3xl font-bold text-gray-800">{getSectionContent('company')?.title}</h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {getSectionContent('company')?.content}
                  </div>
                </>
              ) : (
                <p className="text-gray-600">Công ty TNHH Phú An Phát được thành lập với sứ mệnh mang đến những giải pháp xây dựng toàn diện và chất lượng cao cho khách hàng...</p>
              )}
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex items-center">
              {getSectionContent('company')?.images?.[0]?.url ? (
                <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={getSectionContent('company')!.images[0].url}
                    alt={getSectionContent('company')!.images[0].caption || 'Công ty Phú An Phát'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-80 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p>Chưa có hình ảnh</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Staff Section */}
        <div className="py-12 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-800">{getSectionContent('staff')?.title || 'NHÂN LỰC'}</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {getSectionContent('staff')?.content}
              </div>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex items-center">
              {getSectionContent('staff')?.images?.[0]?.url ? (
                <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={getSectionContent('staff')!.images[0].url}
                    alt={getSectionContent('staff')!.images[0].caption || 'Nhân lực Phú An Phát'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-80 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p>Chưa có hình ảnh</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Equipment Section */}
        <div className="py-12">
          <div className="flex flex-row gap-8 items-center">
            {/* Text Content */}
            <div className="w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">{getSectionContent('equipment')?.title || 'THIẾT BỊ'}</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {getSectionContent('equipment')?.content}
              </div>
            </div>

            {/* Image */}
            <div className="w-1/2">
              {getSectionContent('equipment')?.images?.[0]?.url ? (
                <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={getSectionContent('equipment')!.images[0].url}
                    alt={getSectionContent('equipment')!.images[0].caption || 'Thiết bị Phú An Phát'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p>Chưa có hình ảnh</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý trang giới thiệu</h1>
        <div className="flex gap-2">
          <a
            href="/gioi-thieu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            👁️ Xem trên site
          </a>
          <button
            onClick={() => setIsPreviewMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Xem trước
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => {
          const content = getSectionContent(section.key)
          const isEditing = editingSection === section.key
          
          return (
            <div key={section.key} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                  <p className="text-gray-600">{section.description}</p>
                </div>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => {
                        setEditingSection(section.key)
                        setFormData({
                          title: content?.title || '',
                          content: content?.content || '',
                          images: content?.images || []
                        })
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Chỉnh sửa
                    </button>
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
                        onClick={() => handleSave(section.key)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSaving}
                      >
                        {isSaving ? '⏳ Đang lưu...' : hasUnsavedChanges ? 'Lưu thay đổi' : 'Lưu'}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tiêu đề..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung
                    </label>
                    <p className="text-sm text-gray-600 mb-4">
                      Sử dụng các công cụ bên dưới để định dạng nội dung giống như trong Microsoft Word
                    </p>
                    <RichTextEditor
                      content={formData.content}
                      onChange={handleContentChange}
                      onUploadImage={handleImageUpload}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hình ảnh bổ sung
                    </label>
                    <div className="space-y-4 mb-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <img
                                src={image.url}
                                alt={`Upload ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Tiêu đề ảnh
                                </label>
                                <input
                                  type="text"
                                  value={image.caption}
                                  onChange={(e) => {
                                    const newImages = [...formData.images]
                                    newImages[index].caption = e.target.value
                                    setFormData(prev => ({ ...prev, images: newImages }))
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Nhập tiêu đề ảnh..."
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Chiều rộng (px)
                                  </label>
                                  <input
                                    type="number"
                                    value={image.width}
                                    onChange={(e) => {
                                      const newImages = [...formData.images]
                                      newImages[index].width = parseInt(e.target.value) || 0
                                      setFormData(prev => ({ ...prev, images: newImages }))
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="300"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Chiều cao (px)
                                  </label>
                                  <input
                                    type="number"
                                    value={image.height}
                                    onChange={(e) => {
                                      const newImages = [...formData.images]
                                      newImages[index].height = parseInt(e.target.value) || 0
                                      setFormData(prev => ({ ...prev, images: newImages }))
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="200"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <button
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  images: prev.images.filter((_, i) => i !== index)
                                }))}
                                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 text-sm"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => document.getElementById(`image-upload-${section.key}`)?.click()}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Thêm ảnh
                      </button>
                      <span className="text-sm text-gray-600 py-2">Hoặc chọn nhiều file cùng lúc</span>
                    </div>
                    <input
                      id={`image-upload-${section.key}`}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        files.forEach(file => {
                          const formData = new FormData()
                          formData.append('file', file)
                          formData.append('section', 'about')

                          fetch('/api/upload', {
                            method: 'POST',
                            body: formData
                          }).then(response => response.json())
                            .then(data => {
                              if (data.success) {
                                const newImage: ImageItem = {
                                  url: data.path,
                                  caption: '',
                                  width: 300,
                                  height: 200
                                }
                                // Thêm ảnh mới vào cuối danh sách
                                // Thứ tự: [Ảnh cũ 1, Ảnh cũ 2, ..., Ảnh mới]
                                setFormData(prev => ({
                                  ...prev,
                                  images: [...prev.images, newImage]
                                }))
                              }
                            })
                            .catch(console.error)
                        })
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {content ? (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{content.title}</h3>
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: content.content }}
                      />
                      {content.images.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-md font-semibold text-gray-800 mb-4">Hình ảnh:</h4>
                          <div className="space-y-4">
                            {content.images.map((image, index) => (
                              <div key={index} className="border rounded-lg p-3 bg-white">
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0">
                                    <img
                                      src={image.url}
                                      alt={image.caption || `Ảnh ${index + 1}`}
                                      className="w-32 h-24 object-cover rounded"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-700">Ảnh {index + 1}</p>
                                    {image.caption && (
                                      <p className="text-sm text-gray-600 mt-1">{image.caption}</p>
                                    )}
                                    <div className="mt-2 text-sm text-gray-500">
                                      <p>Kích thước: {image.width || 'auto'} x {image.height || 'auto'} px</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Chưa có nội dung:</strong> Nhấn "Chỉnh sửa" để thêm nội dung cho section này.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Tips */}
      {editingSection && (
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
