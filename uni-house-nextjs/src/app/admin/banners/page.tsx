'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { BannerSlide } from '@/data/banners'

export default function BannersManagement() {
  const { banners, addBanner, updateBanner, deleteBanner } = useData()
  const [editingBanner, setEditingBanner] = useState<BannerSlide | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    setIsAdding(true)
    setEditingBanner({
      id: Math.max(...banners.map(b => b.id)) + 1,
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

    if (isAdding) {
      addBanner(editingBanner)
    } else {
      updateBanner(editingBanner.id, editingBanner)
    }

    setEditingBanner(null)
    setIsAdding(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa banner này?')) {
      deleteBanner(id)
    }
  }

  const handleCancel = () => {
    setEditingBanner(null)
    setIsAdding(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (editingBanner && e.target?.result) {
          setEditingBanner({ 
            ...editingBanner, 
            image: e.target.result as string
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Banner</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Thêm banner mới
        </button>
      </div>

      {/* Banners List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow border overflow-hidden">
            <div className="aspect-video flex items-center justify-center relative overflow-hidden">
              {banner.image ? (
                <>
                  <img 
                    src={banner.image} 
                    alt={banner.imageAlt || banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="relative z-10 text-center text-white p-4">
                    <h3 className="text-lg font-bold mb-2">{banner.title}</h3>
                    <p className="text-sm opacity-90">{banner.subtitle}</p>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-900 p-4">
                  <h3 className="text-lg font-bold mb-2">{banner.title}</h3>
                  <p className="text-sm opacity-90">{banner.subtitle}</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{banner.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{banner.description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(banner)}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingBanner && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {isAdding ? 'Thêm banner mới' : 'Chỉnh sửa banner'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề chính</label>
                <input
                  type="text"
                  value={editingBanner.title}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề phụ</label>
                <input
                  type="text"
                  value={editingBanner.subtitle}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  value={editingBanner.description}
                  onChange={(e) => setEditingBanner({ ...editingBanner, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Màu nền gradient (tùy chọn)</label>
                <select
                  value={editingBanner.gradient}
                  onChange={(e) => setEditingBanner({ ...editingBanner, gradient: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="from-red-600 via-orange-500 to-yellow-500">Đỏ - Cam - Vàng</option>
                  <option value="from-blue-600 via-blue-700 to-gray-800">Xanh dương - Xám</option>
                  <option value="from-green-600 via-green-700 to-blue-800">Xanh lá - Xanh dương</option>
                  <option value="from-purple-600 via-purple-700 to-indigo-800">Tím - Chàm</option>
                  <option value="from-orange-600 via-red-600 to-pink-600">Cam - Đỏ - Hồng</option>
                  <option value="from-gray-600 via-gray-700 to-gray-800">Xám gradient</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Upload hình ảnh</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Hoặc nhập đường dẫn ảnh</label>
                <input
                  type="text"
                  value={editingBanner.image || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, image: e.target.value })}
                  placeholder="/icons/banners/banner.png"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Alt text cho hình ảnh</label>
                <input
                  type="text"
                  value={editingBanner.imageAlt || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, imageAlt: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Mô tả hình ảnh cho SEO"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Link (tùy chọn)</label>
                <input
                  type="text"
                  value={editingBanner.link || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, link: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="https://example.com"
                />
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                <div className="aspect-video rounded border flex items-center justify-center relative overflow-hidden">
                  {editingBanner.image ? (
                    <>
                      <img 
                        src={editingBanner.image} 
                        alt={editingBanner.imageAlt || editingBanner.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                      <div className="relative z-10 text-center text-white p-4">
                        <h4 className="text-lg font-bold mb-2">{editingBanner.title || 'Tiêu đề'}</h4>
                        <p className="text-sm opacity-90">{editingBanner.subtitle || 'Tiêu đề phụ'}</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-white p-4">
                      <h4 className="text-lg font-bold mb-2">{editingBanner.title || 'Tiêu đề'}</h4>
                      <p className="text-sm opacity-90">{editingBanner.subtitle || 'Tiêu đề phụ'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
