'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { ServiceItem } from '@/data/services'

export default function ServicesManagement() {
  const { services, addService, updateService, deleteService } = useData()
  const [editingService, setEditingService] = useState<ServiceItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newFeature, setNewFeature] = useState('')

  const handleAdd = () => {
    setIsAdding(true)
    setEditingService({
      id: Math.max(...services.map(s => s.id)) + 1,
      title: '',
      description: '',
      color: 'from-blue-600 to-blue-800',
      features: [],
      image: ''
    })
  }

  const handleEdit = (service: ServiceItem) => {
    setEditingService({ ...service })
    setIsAdding(false)
  }

  const handleSave = () => {
    if (!editingService) return

    if (isAdding) {
      addService(editingService)
    } else {
      updateService(editingService.id, editingService)
    }

    setEditingService(null)
    setIsAdding(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa dịch vụ này?')) {
      deleteService(id)
    }
  }

  const handleCancel = () => {
    setEditingService(null)
    setIsAdding(false)
    setNewFeature('')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (editingService && e.target?.result) {
          setEditingService({ 
            ...editingService, 
            image: e.target.result as string
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddFeature = () => {
    if (!editingService || !newFeature.trim()) return
    
    const updatedFeatures = [...(editingService.features || []), newFeature.trim()]
    setEditingService({ ...editingService, features: updatedFeatures })
    setNewFeature('')
  }

  const handleRemoveFeature = (index: number) => {
    if (!editingService) return
    
    const updatedFeatures = editingService.features?.filter((_, i) => i !== index) || []
    setEditingService({ ...editingService, features: updatedFeatures })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý dịch vụ</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Thêm dịch vụ mới
        </button>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {service.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {isAdding ? 'Thêm dịch vụ mới' : 'Chỉnh sửa dịch vụ'}
            </h3>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên dịch vụ</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Màu sắc</label>
                <select
                  value={editingService.color}
                  onChange={(e) => setEditingService({ ...editingService, color: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="from-red-600 to-orange-500">Đỏ - Cam</option>
                  <option value="from-blue-600 to-blue-800">Xanh dương</option>
                  <option value="from-green-600 to-green-800">Xanh lá</option>
                  <option value="from-orange-600 to-red-600">Cam - Đỏ</option>
                  <option value="from-purple-600 to-blue-600">Tím - Xanh</option>
                  <option value="from-yellow-600 to-amber-600">Vàng - Hổ phách</option>
                  <option value="from-gray-600 to-gray-800">Xám</option>
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
                  value={editingService.image || ''}
                  onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                  placeholder="/icons/services/service.png"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {/* Preview Image */}
              {editingService.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview hình ảnh</label>
                  <div className="border rounded-md p-2 bg-gray-50">
                    <img 
                      src={editingService.image} 
                      alt={editingService.title}
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                </div>
              )}

              {/* Features Management */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tính năng nổi bật</label>
                <div className="space-y-2">
                  {editingService.features && editingService.features.length > 0 && (
                    <div className="space-y-1">
                      {editingService.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                          <span className="text-sm text-gray-700">{feature}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Xóa
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                      placeholder="Nhập tính năng mới..."
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
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
