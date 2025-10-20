'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from '@/components'
import { useData } from '@/contexts/DataContext'

export default function ProductsPage() {
  const { categories, products } = useData()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'copper':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
        )
      case 'aluminum':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )
      case 'hot-die':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'stainless':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'cold-die':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      case 'plastic-mold':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      case 'machine':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      case 'carbon':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      default:
        return null
    }
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Industrial Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="metal-texture w-full h-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6 relative">
              <span className="gradient-primary bg-clip-text text-transparent">SẢN PHẨM</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full"></div>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cung cấp đầy đủ các loại sắt thép, hợp kim chất lượng cao nhập khẩu từ các nước tiên tiến
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Industrial Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="metal-texture w-full h-full"></div>
                      </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="group cursor-pointer precision-cut" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link href={`/san-pham/${product.id}`} className="block">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 steel-glow border border-gray-200">
                  {/* Product Header */}
                  <div className={`relative h-24 bg-gradient-to-r ${product.color} flex items-center justify-center overflow-hidden`}>
                    {/* Metal shine effect */}
                    <div className="metal-shine absolute inset-0"></div>
                    
                    {/* Welding spark effect for hot-die steel */}
                    {product.icon === 'hot-die' && (
                      <div className="welding-spark"></div>
                    )}
                    
                    {/* Icon */}
                    <div className="relative z-10">
                      {getIcon(product.icon)}
                    </div>
                    
                    {/* Industrial corner accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-black opacity-20"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Industrial bottom border */}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center text-gray-500">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span>Có sẵn</span>
                        </div>
                        <span className="text-blue-600 font-medium">Chi tiết</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                </Link>
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
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Industrial Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="metal-texture w-full h-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 relative">
              <span className="gradient-primary bg-clip-text text-transparent">DANH MỤC SẢN PHẨM</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600">
              Chúng tôi cung cấp đầy đủ các loại sắt thép, hợp kim chất lượng cao nhập khẩu
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-xl steel-glow border border-gray-200 relative overflow-hidden">
              {/* Metal shine effect */}
              <div className="metal-shine absolute inset-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Hợp Kim</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Hợp kim đồng: C3604, C1020, C1100</li>
                  <li>• Hợp kim nhôm: A1050, A5052, A6061, A7075</li>
                  <li>• Chất lượng cao</li>
                  <li>• Nhập khẩu chính hãng</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-xl steel-glow border border-gray-200 relative overflow-hidden">
              {/* Metal shine effect */}
              <div className="metal-shine absolute inset-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Thép Làm Khuôn</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Khuôn dập nóng: SKT4, SKD61, DH2F</li>
                  <li>• Khuôn dập nguội: SK3, SKS3, SKD11</li>
                  <li>• Khuôn nhựa: P20, 2311, 2083</li>
                  <li>• Chuyên dụng, bền bỉ</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-xl steel-glow border border-gray-200 relative overflow-hidden">
              {/* Metal shine effect */}
              <div className="metal-shine absolute inset-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Thép Chế Tạo Máy</h3>
              <ul className="space-y-2 text-gray-600">
                  <li>• SCR420, SCR440, SCM415</li>
                  <li>• SCM420, SCM440, SNCM439</li>
                  <li>• 65Mn, 5XM</li>
                  <li>• Độ chính xác cao</li>
              </ul>
            </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-xl steel-glow border border-gray-200 relative overflow-hidden">
              {/* Metal shine effect */}
              <div className="metal-shine absolute inset-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Thép Carbon</h3>
              <ul className="space-y-2 text-gray-600">
                  <li>• S20C, SS400, S45C</li>
                  <li>• S50C, S55C</li>
                  <li>• Ứng dụng đa dạng</li>
                  <li>• Giá cả hợp lý</li>
              </ul>
            </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-xl steel-glow border border-gray-200 relative overflow-hidden">
              {/* Metal shine effect */}
              <div className="metal-shine absolute inset-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Thép Không Rỉ</h3>
              <ul className="space-y-2 text-gray-600">
                  <li>• SUS201, SUS304, SUS316</li>
                  <li>• Chống ăn mòn tốt</li>
                  <li>• Bền đẹp theo thời gian</li>
                  <li>• Ứng dụng rộng rãi</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-orange-600 relative overflow-hidden">
        {/* Industrial Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="metal-texture w-full h-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">
            Cần Tư Vấn Sản Phẩm?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay để được tư vấn và báo giá chi tiết về các sản phẩm sắt thép, hợp kim chất lượng cao
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all steel-glow">
              Yêu cầu báo giá
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all steel-glow">
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
