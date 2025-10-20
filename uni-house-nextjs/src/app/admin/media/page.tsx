'use client'

import { useState } from 'react'

interface MediaItem {
  id: string
  name: string
  type: 'image' | 'video'
  url: string
  alt?: string
}

export default function MediaManagement() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'Logo công ty',
      type: 'image',
      url: '/api/placeholder/200/100',
      alt: 'Logo Phú An Phát'
    },
    {
      id: '2',
      name: 'Banner chính',
      type: 'image',
      url: '/api/placeholder/1200/400',
      alt: 'Banner dịch vụ gia công'
    }
  ])

  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    setIsAdding(true)
    setEditingMedia({
      id: `media-${Date.now()}`,
      name: '',
      type: 'image',
      url: '',
      alt: ''
    })
  }

  const handleEdit = (media: MediaItem) => {
    setEditingMedia({ ...media })
    setIsAdding(false)
  }

  const handleSave = () => {
    if (!editingMedia) return

    if (isAdding) {
      setMediaItems([...mediaItems, editingMedia])
    } else {
      setMediaItems(mediaItems.map(m => m.id === editingMedia.id ? editingMedia : m))
    }

    setEditingMedia(null)
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa media này?')) {
      setMediaItems(mediaItems.filter(m => m.id !== id))
    }
  }

  const handleCancel = () => {
    setEditingMedia(null)
    setIsAdding(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (editingMedia && e.target?.result) {
          setEditingMedia({ ...editingMedia, url: e.target.result as string })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Media</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Thêm media mới
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.map((media) => (
          <div key={media.id} className="bg-white rounded-lg shadow border overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {media.type === 'image' ? (
                <img 
                  src={media.url} 
                  alt={media.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500">Video Preview</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{media.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{media.type}</p>
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  onClick={() => handleEdit(media)}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(media.id)}
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
      {editingMedia && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {isAdding ? 'Thêm media mới' : 'Chỉnh sửa media'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên media</label>
                <input
                  type="text"
                  value={editingMedia.name}
                  onChange={(e) => setEditingMedia({ ...editingMedia, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Loại</label>
                <select
                  value={editingMedia.type}
                  onChange={(e) => setEditingMedia({ ...editingMedia, type: e.target.value as 'image' | 'video' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="image">Hình ảnh</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Upload file</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <input
                  type="text"
                  value={editingMedia.url}
                  onChange={(e) => setEditingMedia({ ...editingMedia, url: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Alt text</label>
                <input
                  type="text"
                  value={editingMedia.alt || ''}
                  onChange={(e) => setEditingMedia({ ...editingMedia, alt: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {editingMedia.url && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preview</label>
                  <div className="mt-1 aspect-video bg-gray-100 rounded border">
                    {editingMedia.type === 'image' ? (
                      <img 
                        src={editingMedia.url} 
                        alt={editingMedia.alt}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Video Preview
                      </div>
                    )}
                  </div>
                </div>
              )}
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
