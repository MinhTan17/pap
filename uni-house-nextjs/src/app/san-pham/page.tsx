'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from '@/components'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm' },
    { id: 'cement', name: 'Xi măng' },
    { id: 'brick', name: 'Gạch' },
    { id: 'stone', name: 'Đá' },
    { id: 'interior', name: 'Nội thất' },
    { id: 'material', name: 'Vật liệu xây dựng' }
  ]

  const products = [
    { id: 1, name: "Xi măng Lapilla Extra", category: "cement", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 2, name: "Gạch tàu 30x30", category: "brick", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 3, name: "Gạch rỗng", category: "brick", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 4, name: "Đá dăm 1x2", category: "stone", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 5, name: "Đá hoa cương", category: "stone", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 6, name: "Sàn gỗ công nghiệp", category: "interior", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 7, name: "Gạch ốp lát", category: "brick", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 8, name: "Thảm văn phòng", category: "interior", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 9, name: "Xi măng Hà Tiên", category: "cement", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 10, name: "Xi măng INSEE", category: "cement", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 11, name: "Vật liệu ốp tường", category: "material", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 12, name: "Nội thất văn phòng", category: "interior", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 13, name: "Gạch block", category: "brick", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 14, name: "Cát xây dựng", category: "material", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 15, name: "Thép xây dựng", category: "material", price: "Liên hệ", image: "/api/placeholder/300/200" },
    { id: 16, name: "Tôn lợp", category: "material", price: "Liên hệ", image: "/api/placeholder/300/200" }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              SẢN PHẨM
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cung cấp đầy đủ các loại vật liệu xây dựng và nội thất chất lượng cao
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <p className="text-xs">Hình ảnh</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-sm mb-2">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-medium text-sm">{product.price}</span>
                      <Link href={`/san-pham/${product.id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors inline-block">
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Không tìm thấy sản phẩm nào trong danh mục này.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Categories Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              DANH MỤC SẢN PHẨM
            </h2>
            <p className="text-xl text-gray-600">
              Chúng tôi cung cấp đầy đủ các loại vật liệu xây dựng chất lượng cao
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🧱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Vật Liệu Xây Dựng</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Xi măng các loại</li>
                <li>• Cát, đá, sỏi</li>
                <li>• Thép xây dựng</li>
                <li>• Tôn lợp</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Gạch & Ngói</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Gạch đất nung</li>
                <li>• Gạch block</li>
                <li>• Gạch ốp lát</li>
                <li>• Ngói lợp</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🪑</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Nội Thất</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sàn gỗ</li>
                <li>• Thảm văn phòng</li>
                <li>• Nội thất văn phòng</li>
                <li>• Vật liệu ốp tường</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Cần Tư Vấn Sản Phẩm?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay để được tư vấn và báo giá chi tiết về các sản phẩm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Yêu cầu báo giá
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
