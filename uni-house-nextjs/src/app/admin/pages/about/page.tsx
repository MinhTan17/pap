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
                    folder: 'uploads/about'
                  })
                })

                const data = await response.json()
                if (data.success) {
                  resolve(data.path)
                  console.log('✅ Uploaded image for editor:', data.path)
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
        
        {/* Preview Content - Copy from gioi-thieu page */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Text Content */}
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                {getSectionContent('company') ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{getSectionContent('company')?.title}</h2>
                    <div className="whitespace-pre-line">{getSectionContent('company')?.content}</div>
                  </>
                ) : (
                  <>
                    <p>Công ty TNHH Phú An Phát được thành lập với sứ mệnh mang đến những giải pháp xây dựng toàn diện và chất lượng cao cho khách hàng...</p>
                  </>
                )}
              </div>

              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                  {getSectionContent('company') && getSectionContent('company')!.images.length > 0 ? (
                    <img
                      src={getSectionContent('company')!.images[0].url}
                      alt={getSectionContent('company')!.images[0].caption || "Company office"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <p className="text-lg">Văn phòng hiện đại</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {getSectionContent('staff')?.title || 'NHÂN LỰC'}
              </h2>
              <div className="w-24 h-1 bg-gray-300 mx-auto"></div>
            </div>
            
            {getSectionContent('staff')?.content && (
              <div className="text-center mb-8">
                <p className="text-lg text-gray-600 max-w-4xl mx-auto whitespace-pre-line">
                  {getSectionContent('staff')?.content}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                {getSectionContent('staff') && getSectionContent('staff')!.images.length > 0 ? (
                  <img
                    src={getSectionContent('staff')!.images[0].url}
                    alt={getSectionContent('staff')!.images[0].caption || "Staff"}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                ) : (
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <p className="text-sm">Nhân lực</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                {getSectionContent('staff') && getSectionContent('staff')!.images.length > 1 ? (
                  getSectionContent('staff')!.images.slice(1, 6).map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.caption || `Staff ${index + 1}`}
                      className="aspect-square object-cover rounded-lg"
                    />
                  ))
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                        </div>
                        <p className="text-xs">Nhân viên {index + 1}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {getSectionContent('equipment')?.title || 'THIẾT BỊ'}
              </h2>
              <div className="w-24 h-1 bg-gray-300 mx-auto"></div>
            </div>
            
            {getSectionContent('equipment')?.content && (
              <div className="text-center mb-8">
                <p className="text-lg text-gray-600 max-w-4xl mx-auto whitespace-pre-line">
                  {getSectionContent('equipment')?.content}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                {getSectionContent('equipment') && getSectionContent('equipment')!.images.length > 0 ? (
                  <img
                    src={getSectionContent('equipment')!.images[0].url}
                    alt={getSectionContent('equipment')!.images[0].caption || "Equipment"}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                ) : (
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <p className="text-sm">Thiết bị</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                {getSectionContent('equipment') && getSectionContent('equipment')!.images.length > 1 ? (
                  getSectionContent('equipment')!.images.slice(1, 6).map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.caption || `Equipment ${index + 1}`}
                      className="aspect-square object-cover rounded-lg"
                    />
                  ))
                ) : (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <p className="text-xs">Máy móc {index + 1}</p>
                      </div>
                    </div>
                  ))
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
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = async (e) => {
                            if (e.target?.result) {
                              const base64 = e.target.result as string
                              const response = await fetch('/api/upload', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  base64,
                                  folder: 'uploads/about'
                                })
                              })
                              const data = await response.json()
                              if (data.success) {
                                const newImage: ImageItem = {
                                  url: data.path,
                                  caption: '',
                                  width: 300,
                                  height: 200
                                }
                                setFormData(prev => ({
                                  ...prev,
                                  images: [...prev.images, newImage]
                                }))
                              }
                            }
                          }
                          reader.readAsDataURL(file)
                        }
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
                          <h4 className="text-md font-semibold text-gray-800 mb-2">Hình ảnh:</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {content.images.map((image, index) => (
                              <div key={index} className="text-center">
                                <img
                                  src={image.url}
                                  alt={image.caption || `${section.title} ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg mx-auto"
                                  style={{ 
                                    width: image.width > 0 ? `${image.width}px` : '100%',
                                    height: image.height > 0 ? `${image.height}px` : '96px'
                                  }}
                                />
                                {image.caption && (
                                  <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
                                )}
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
