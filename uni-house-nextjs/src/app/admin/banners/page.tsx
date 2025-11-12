'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/contexts/DataContext'
import { BannerSlide } from '@/data/banners'

export default function BannersManagement() {
  const { banners, addBanner, updateBanner, deleteBanner } = useData()
  const [editingBanner, setEditingBanner] = useState<BannerSlide | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  // Fix hydration mismatch - chỉ render sau khi component mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const showNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleAdd = () => {
    setIsAdding(true)
    setEditingBanner({
      id: Math.max(...banners.map(b => b.id), 0) + 1,
      title: '',
      subtitle: '',
      description: '',
      gradient: 'from-blue-600 via-blue-700 to-gray-800',
      image: '',
      imageAlt: ''
    })
  }

  const handleEdit = (banner: BannerSlide) => {
    setEditingBanner({ ...banner })
    setIsAdding(false)
  }

  const handleSave = () => {
    if (!editingBanner) return

    console.log('💾 Đang lưu banner:', editingBanner)

    if (isAdding) {
      addBanner(editingBanner)
      console.log('✅ Đã thêm banner mới')
      showNotification('✅ Đã thêm banner mới thành công! Reload trang chủ để xem thay đổi.')
    } else {
      updateBanner(editingBanner.id, editingBanner)
      console.log('✅ Đã cập nhật banner')
      showNotification('✅ Đã cập nhật banner thành công! Reload trang chủ để xem thay đổi.')
    }

    setEditingBanner(null)
    setIsAdding(false)
    
    // Mở trang chủ trong tab mới sau 1 giây
    // setTimeout(() => {
    //   if (confirm('🔄 Mở trang chủ để xem thay đổi?')) {
    //     window.open('/', '_blank')
    //   }
    // }, 1000)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa banner này?')) {
      deleteBanner(id)
      showNotification('🗑️ Đã xóa banner thành công!')
    }
  }

  const handleCancel = () => {
    setEditingBanner(null)
    setIsAdding(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
    
    // Import upload function dynamically
    const { uploadToCloudinary } = await import('@/lib/cloudinary-upload')
    
    try {
      showNotification(`⏳ Đang upload ảnh (${fileSizeMB}MB)...`)
      
      // Upload directly to Cloudinary
      const result = await uploadToCloudinary(file, 'banners')
      
      if (result.success && result.url) {
        if (editingBanner) {
          setEditingBanner({ 
            ...editingBanner, 
            image: result.url
          })
          showNotification(`✅ Đã upload ảnh thành công! (${fileSizeMB}MB)`)
        }
      } else {
        alert(`❌ Lỗi upload: ${result.error}`)
        event.target.value = ''
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(`❌ Lỗi upload: ${error.message}`)
      event.target.value = ''
    }
  }

  // Hiển thị loading khi chưa mount để tránh hydration mismatch
  if (!isMounted) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý Banner</h1>
          <div className="bg-gray-200 h-10 w-32 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 h-16 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md border overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Banner</h1>
        <div className="flex gap-2">
          {/* <button
            onClick={() => {
              const data = localStorage.getItem('admin-banners')
              console.log('📦 Current localStorage:', data ? JSON.parse(data) : 'EMPTY')
              alert('Xem Console (F12) để kiểm tra dữ liệu localStorage')
            }}
            className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 text-sm"
          >
            🔍 Debug
          </button> */}
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Thêm banner mới
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="text-sm text-blue-900 mb-2">
                <strong>Tổng số banner:</strong> {banners.length} | 
                Banner sẽ tự động chuyển đổi sau mỗi 5 giây trên trang chủ.
              </p>
              <p className="text-xs text-blue-700">
                💡 <strong>Khuyến nghị:</strong> Dùng đường dẫn file thay vì upload base64 để tránh đầy localStorage
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('⚠️ Xóa TẤT CẢ dữ liệu localStorage?\n\nDữ liệu sẽ reset về mặc định.')) {
                localStorage.clear()
                window.location.reload()
              }
            }}
            className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded hover:bg-red-200 whitespace-nowrap"
          >
            🗑️ Clear Cache
          </button>
        </div>
      </div>

      {/* Banners List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner, index) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-md border overflow-hidden hover:shadow-xl transition-shadow">
            <div className="aspect-video flex items-center justify-center relative overflow-hidden">
              {banner.image ? (
                <>
                  <img 
                    src={banner.image} 
                    alt={banner.imageAlt || banner.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = ''
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="relative z-10 text-center text-white p-4">
                    <p className="text-xs font-semibold mb-1 opacity-90">{banner.subtitle}</p>
                    <h3 className="text-base font-bold mb-1">{banner.title}</h3>
                    <p className="text-xs opacity-75 line-clamp-2">{banner.description}</p>
                  </div>
                </>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${banner.gradient} flex items-center justify-center`}>
                  <div className="text-center text-white p-4">
                    <p className="text-xs font-semibold mb-1 opacity-90">{banner.subtitle}</p>
                    <h3 className="text-base font-bold mb-1">{banner.title}</h3>
                    <p className="text-xs opacity-75 line-clamp-2">{banner.description}</p>
                  </div>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold">
                #{index + 1}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{banner.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{banner.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(banner)}
                  className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
          <span className="text-6xl mb-4 block">📭</span>
          <p className="text-gray-600 mb-4">Chưa có banner nào</p>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
          >
            ➕ Thêm banner đầu tiên
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingBanner && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={handleCancel}>
          <div className="relative top-10 mx-auto p-6 border w-full max-w-3xl shadow-lg rounded-md bg-white mb-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {isAdding ? '➕ Thêm banner mới' : '✏️ Chỉnh sửa banner'}
              </h3>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {/* Section 1: Nội dung văn bản */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>📝</span> Nội dung văn bản
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiêu đề chính <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingBanner.title}
                      onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="VD: GIA CÔNG CẮT LASER CNC"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiêu đề phụ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingBanner.subtitle}
                      onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="VD: CÔNG NGHỆ HIỆN ĐẠI"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={editingBanner.description}
                      onChange={(e) => setEditingBanner({ ...editingBanner, description: e.target.value })}
                      rows={2}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mô tả ngắn gọn về banner..."
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Hình ảnh */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🖼️</span> Hình ảnh banner
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cách 1: Upload file ảnh
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Khuyến nghị: 1920x1080px (16:9)</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-xs text-gray-500">HOẶC</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cách 2: Nhập đường dẫn ảnh
                    </label>
                    <input
                      type="text"
                      value={editingBanner.image || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, image: e.target.value })}
                      placeholder="/icons/banners/bn.png"
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="mt-2 text-xs text-gray-600 bg-yellow-50 p-2 rounded border border-yellow-200">
                      <p className="font-semibold mb-1">⚠️ Lưu ý quan trọng:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Đường dẫn phải bắt đầu bằng dấu <code className="bg-yellow-100 px-1">/</code></li>
                        <li>Ví dụ đúng: <code className="bg-green-100 px-1">/icons/banners/bn.png</code></li>
                        <li>Ví dụ sai: <code className="bg-red-100 px-1">icons/banners/bn.png</code> (thiếu /)</li>
                        <li>File ảnh phải có trong thư mục <code className="bg-yellow-100 px-1">public/</code></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alt text (cho SEO)
                    </label>
                    <input
                      type="text"
                      value={editingBanner.imageAlt || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, imageAlt: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mô tả hình ảnh cho SEO"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Tùy chỉnh */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🎨</span> Tùy chỉnh giao diện
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Màu nền gradient
                    </label>
                    <select
                      value={editingBanner.gradient}
                      onChange={(e) => setEditingBanner({ ...editingBanner, gradient: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="from-red-600 via-orange-500 to-yellow-500">🔴 Đỏ - Cam - Vàng</option>
                      <option value="from-blue-600 via-blue-700 to-gray-800">🔵 Xanh dương - Xám</option>
                      <option value="from-green-600 via-green-700 to-blue-800">🟢 Xanh lá - Xanh dương</option>
                      <option value="from-purple-600 via-purple-700 to-indigo-800">🟣 Tím - Chàm</option>
                      <option value="from-orange-600 via-red-600 to-pink-600">🟠 Cam - Đỏ - Hồng</option>
                      <option value="from-gray-600 via-gray-700 to-gray-800">⚫ Xám gradient</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link (tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={editingBanner.link || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, link: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>👁️</span> Xem trước (Như trên trang chủ)
                </h4>
                <div className="aspect-video rounded-lg border-2 border-gray-300 flex items-center justify-center relative overflow-hidden shadow-lg bg-gray-900">
                  {editingBanner.image ? (
                    <>
                      <img 
                        src={editingBanner.image} 
                        alt={editingBanner.imageAlt || editingBanner.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
                      <div className="relative z-10 text-center text-white p-6 max-w-4xl">
                        <p className="text-base md:text-lg font-bold mb-3 tracking-wide uppercase" 
                           style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
                          {editingBanner.subtitle || 'TIÊU ĐỀ PHỤ'}
                        </p>
                        <h4 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight" 
                            style={{ textShadow: '3px 3px 10px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6)' }}>
                          {editingBanner.title || 'TIÊU ĐỀ CHÍNH'}
                        </h4>
                        <p className="text-sm md:text-lg font-medium max-w-2xl mx-auto" 
                           style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)' }}>
                          {editingBanner.description || 'Mô tả chi tiết về banner...'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${editingBanner.gradient} flex items-center justify-center`}>
                      <div className="text-center text-white p-6 max-w-4xl">
                        <p className="text-base md:text-lg font-bold mb-3 tracking-wide uppercase" 
                           style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
                          {editingBanner.subtitle || 'TIÊU ĐỀ PHỤ'}
                        </p>
                        <h4 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight" 
                            style={{ textShadow: '3px 3px 10px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6)' }}>
                          {editingBanner.title || 'TIÊU ĐỀ CHÍNH'}
                        </h4>
                        <p className="text-sm md:text-lg font-medium max-w-2xl mx-auto" 
                           style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)' }}>
                          {editingBanner.description || 'Mô tả chi tiết về banner...'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  💡 Chữ sẽ có bóng đổ để dễ đọc trên mọi loại ảnh nền
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t mt-6">
              <div className="text-sm text-gray-500">
                <span className="text-red-500">*</span> Trường bắt buộc
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  ❌ Hủy
                </button>
                <button
                  onClick={handleSave}
                  disabled={!editingBanner.title || !editingBanner.subtitle || !editingBanner.description}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  ✅ {isAdding ? 'Thêm mới' : 'Cập nhật'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
