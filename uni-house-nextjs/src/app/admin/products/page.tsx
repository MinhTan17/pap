'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { ProductItem } from '@/data/products'

export default function ProductsManagement() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData()
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    setIsAdding(true)
    setEditingProduct({
      id: Math.max(...products.map(p => p.id)) + 1,
      name: '',
      category: 'alloy',
      price: 'Liên hệ',
      description: '',
      color: 'from-orange-500 to-red-600',
      image: '',
      images: []
    })
  }

  const handleEdit = (product: ProductItem) => {
    setEditingProduct({ ...product })
    setIsAdding(false)
  }

  const handleSave = () => {
    if (!editingProduct) return

    if (isAdding) {
      addProduct(editingProduct)
    } else {
      updateProduct(editingProduct.id, editingProduct)
    }

    setEditingProduct(null)
    setIsAdding(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      deleteProduct(id)
    }
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setIsAdding(false)
  }

  const handleMainImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && editingProduct) {
      try {
        // Convert to base64 first
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
                folder: 'icons/products'
              })
            })
            
            const data = await response.json()
            if (data.success) {
              setEditingProduct({ 
                ...editingProduct, 
                image: data.path
              })
              console.log('✅ Uploaded image:', data.path)
            } else {
              alert('❌ Lỗi upload ảnh: ' + data.message)
            }
          }
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('❌ Lỗi khi upload ảnh')
      }
    }
  }

  const handleMultipleImagesUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || !editingProduct) return

    try {
      const uploadPromises: Promise<string>[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const promise = new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = async (e) => {
            if (e.target?.result) {
              const base64 = e.target.result as string
              
              try {
                // Upload to server
                const response = await fetch('/api/upload', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    base64, 
                    folder: 'icons/products'
                  })
                })
                
                const data = await response.json()
                if (data.success) {
                  resolve(data.path)
                } else {
                  reject(new Error(data.message))
                }
              } catch (error) {
                reject(error)
              }
            }
          }
          reader.readAsDataURL(file)
        })
        uploadPromises.push(promise)
      }

      const uploadedPaths = await Promise.all(uploadPromises)
      const currentImages = editingProduct.images || []
      setEditingProduct({
        ...editingProduct,
        images: [...currentImages, ...uploadedPaths]
      })
      console.log(`✅ Uploaded ${uploadedPaths.length} images`)
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('❌ Lỗi khi upload ảnh')
    }
  }

  const handleRemoveImage = (index: number) => {
    if (!editingProduct) return
    
    const updatedImages = editingProduct.images?.filter((_, i) => i !== index) || []
    setEditingProduct({ ...editingProduct, images: updatedImages })
  }

  const handleAddImageUrl = (url: string) => {
    if (!editingProduct || !url.trim()) return
    
    const currentImages = editingProduct.images || []
    setEditingProduct({
      ...editingProduct,
      images: [...currentImages, url.trim()]
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Thêm sản phẩm mới
        </button>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {categories.find(c => c.id === product.category)?.name || product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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
      {editingProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {isAdding ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
            </h3>
            
            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Giá</label>
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Màu sắc</label>
                <select
                  value={editingProduct.color}
                  onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="from-orange-500 to-red-600">Cam - Đỏ</option>
                  <option value="from-gray-400 to-gray-600">Xám</option>
                  <option value="from-red-600 to-red-800">Đỏ</option>
                  <option value="from-blue-400 to-blue-600">Xanh dương nhạt</option>
                  <option value="from-blue-600 to-blue-800">Xanh dương đậm</option>
                  <option value="from-green-500 to-green-700">Xanh lá</option>
                  <option value="from-purple-500 to-purple-700">Tím</option>
                  <option value="from-gray-600 to-gray-800">Xám đậm</option>
                </select>
              </div>

              {/* Main Image Section */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Hình ảnh chính</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload hình ảnh chính</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">Hoặc nhập đường dẫn ảnh</label>
                  <input
                    type="text"
                    value={editingProduct.image || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    placeholder="/icons/products/product.png"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                {editingProduct.image && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                    <div className="border rounded-md p-2 bg-gray-50 inline-block">
                      <img 
                        src={editingProduct.image} 
                        alt={editingProduct.name}
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Multiple Images Section */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Thư viện ảnh (cho trang chi tiết)</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload nhiều ảnh</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImagesUpload}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Có thể chọn nhiều ảnh cùng lúc</p>
                </div>

                {editingProduct.images && editingProduct.images.length > 0 && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ảnh đã thêm ({editingProduct.images.length})
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {editingProduct.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={img} 
                            alt={`${editingProduct.name} ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
