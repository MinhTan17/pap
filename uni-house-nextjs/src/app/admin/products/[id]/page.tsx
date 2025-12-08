'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useData } from '@/contexts/DataContext'
import { ProductItem } from '@/data/products'

export default function ProductDetailEditor() {
  const params = useParams()
  const router = useRouter()
  const { products, updateProduct } = useData()
  const [product, setProduct] = useState<ProductItem | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const productId = parseInt(params.id as string)
    const foundProduct = products.find((p) => p.id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [params.id, products])

  const handleSave = async () => {
    if (!product) return

    try {
      setIsSaving(true)
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          products.map((p) => (p.id === product.id ? product : p))
        ),
      })

      if (response.ok) {
        updateProduct(product.id, product)
        alert('✅ Đã lưu thông tin sản phẩm!')
      } else {
        alert('❌ Lỗi khi lưu')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('❌ Lỗi khi lưu')
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !product) return

    try {
      setIsSaving(true)
      const { uploadToCloudinary } = await import('@/lib/cloudinary-upload')
      const result = await uploadToCloudinary(file, 'products')

      if (result.success && result.url) {
        const updatedProduct = { ...product, image: result.url }
        setProduct(updatedProduct)

        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            products.map((p) => (p.id === product.id ? updatedProduct : p))
          ),
        })

        if (response.ok) {
          updateProduct(product.id, updatedProduct)
          alert('✅ Đã cập nhật ảnh sản phẩm!')
        }
      } else {
        alert('❌ Lỗi upload: ' + result.error)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('❌ Lỗi upload ảnh')
    } finally {
      setIsSaving(false)
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Đang tải sản phẩm...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <button
            onClick={() => router.push('/admin/products')}
            className="text-blue-600 hover:text-blue-800 mb-2"
          >
            ← Quay lại danh sách
          </button>
          <h1 className="text-2xl font-bold">
            Chỉnh sửa sản phẩm: {product.name}
          </h1>
        </div>
        <a
          href={`/san-pham/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          👁️ Xem trên site
        </a>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Thông tin sản phẩm</h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <input
                type="text"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá
              </label>
              <input
                type="text"
                value={product.price || ''}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? '⏳ Đang lưu...' : '💾 Lưu thông tin'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Ảnh sản phẩm</h2>
        <div className="flex items-start gap-4">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-lg border"
            />
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-500 mt-1">
              Chọn ảnh mới để thay đổi ảnh sản phẩm
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
