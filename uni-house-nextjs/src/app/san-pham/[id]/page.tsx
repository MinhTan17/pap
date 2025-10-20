'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from '@/components'
import { products } from '@/data/products'

interface ProductDetailProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState('info')

  const base = products.find(p => String(p.id) === params.id)
  const product = base ? {
    id: base.id,
    name: base.name.toUpperCase(),
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200'
    ],
    description: base.description,
    specifications: {
      material: base.category,
      grades: base.name.match(/: (.*)/)?.[1]?.split(',').map(s => s.trim()) || [],
      applications: ['Xây dựng', 'Công nghiệp', 'Gia công cơ khí'],
      features: ['Độ bền cao', 'Chống ăn mòn', 'Dễ gia công']
    }
  } : null

  const relatedProducts = [
    { id: 1, name: "Thép xây dựng", image: "/api/placeholder/300/200" },
    { id: 2, name: "Nhôm tấm", image: "/api/placeholder/300/200" },
    { id: 3, name: "Kim loại đặc biệt", image: "/api/placeholder/300/200" }
  ]

  const tabs = [
    { id: 'info', label: 'THÔNG TIN CHI TIẾT' },
    { id: 'comments', label: 'BÌNH LUẬN' },
    { id: 'images', label: 'HÌNH ẢNH' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Product Title */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            {product?.name || 'SẢN PHẨM'}
          </h1>
        </div>
      </section>

      {/* Product Images */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Image */}
          <div className="mb-6">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg">Hình ảnh sản phẩm chính</p>
              </div>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {product?.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs">Hình {index + 2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm uppercase transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-800 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'info' && (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Thông tin chi tiết</h3>
                <p className="text-gray-600 mb-6">{product?.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Thông số kỹ thuật</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-700">Vật liệu:</span>
                        <span className="ml-2 text-gray-600">{product?.specifications.material}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Các loại:</span>
                        <span className="ml-2 text-gray-600">{product?.specifications.grades.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Ứng dụng:</span>
                        <span className="ml-2 text-gray-600">{product?.specifications.applications.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Đặc điểm nổi bật</h4>
                    <ul className="space-y-2">
                      {product?.specifications.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Bình luận</h3>
                <div className="text-center py-12">
                  <p className="text-gray-600">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Viết bình luận
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Hình ảnh</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product?.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm">Hình {index + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">SẢN PHẨM LIÊN QUAN</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/san-pham/${relatedProduct.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <div className="text-center text-gray-600">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <p className="text-sm">Hình ảnh</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-center">
                    {relatedProduct.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
