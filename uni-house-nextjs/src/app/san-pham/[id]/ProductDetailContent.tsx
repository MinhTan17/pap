'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from '@/components'
import { useData } from '@/contexts/DataContext'

interface ProductDetailContentProps {
  productId: string
}

export default function ProductDetailContent({ productId }: ProductDetailContentProps) {
  const { products } = useData()
  const [activeTab, setActiveTab] = useState('info')

  // Cache-busting helper
  const addCacheBuster = (url: string) => {
    const timestamp = Date.now()
    return `${url}?v=${timestamp}`
  }

  const base = products.find(p => String(p.id) === productId)
  const product = base ? {
    id: base.id,
    name: base.name.toUpperCase(),
    images: (base.images && base.images.length > 0) ? base.images : [
      base.image || '',

    ],
    description: base.description,
    specifications: {
      material: base.category,
      grades: base.name.match(/: (.*)/)?.[1]?.split(',').map(s => s.trim()) || [],
      applications: ['Xây dựng', 'Công nghiệp', 'Gia công cơ khí'],
      features: ['Độ bền cao', 'Chống ăn mòn', 'Dễ gia công']
    }
  } : null

  // Get related products: same category first, then random others
  const relatedProducts = (() => {
    if (!base) return []

    // Get products from same category
    const sameCategory = products.filter(p =>
      String(p.id) !== productId && p.category === base.category
    )

    // Get products from other categories
    const otherProducts = products.filter(p =>
      String(p.id) !== productId && p.category !== base.category
    )

    // Combine: same category first, then others, limit to 3
    const combined = [...sameCategory, ...otherProducts].slice(0, 3)

    return combined.map(p => ({
      id: p.id,
      name: p.name.split(':')[0].trim(),
      image: p.image,
      category: p.category
    }))
  })()

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
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              {product?.images[0] ? (
                <img
                  src={addCacheBuster(product.images[0])}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-lg">Hình ảnh sản phẩm chính</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {product?.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                {image ? (
                  <img
                    src={addCacheBuster(image)}
                    alt={`${product?.name} - ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs">Hình {index + 2}</p>
                    </div>
                  </div>
                )}
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
                className={`px-6 py-3 font-medium text-sm uppercase transition-colors ${activeTab === tab.id
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
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      {image ? (
                        <img
                          src={addCacheBuster(image)}
                          alt={`${product?.name} - ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-sm">Hình {index + 1}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Consultation Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="metal-texture w-full h-full"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-900 rounded-full mb-6 shadow-lg">
              <span className="text-4xl">💬</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              CẦN TƯ VẤN VỀ SẢN PHẨM?
            </h2>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Đội ngũ chuyên gia của Phú An Phát luôn sẵn sàng tư vấn miễn phí về sản phẩm,
              báo giá và giải đáp mọi thắc mắc của bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://zalo.me/0931535007"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:bg-red-700 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {/* <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="white" />
                  <path d="M15 31.5C15 31.5 18.5 28 24 28C29.5 28 33 31.5 33 31.5M18 21H18.01M30 21H30.01M24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38Z" stroke="#0068FF" strokeWidth="2" strokeLinecap="round" />
                </svg> */}
                <span>Chat Zalo ngay</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="tel:0931535007"
                className="inline-flex items-center gap-3 bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-blue-700 hover:bg-blue-700 hover:border-red-600 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0931 535 007</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Hỗ trợ 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Tư vấn miễn phí</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Báo giá nhanh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/50 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-red-600/20"></div>
        <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[60px] border-r-transparent border-b-[60px] border-b-blue-800/20"></div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">SẢN PHẨM LIÊN QUAN</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/san-pham/${relatedProduct.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden group-hover:shadow-lg transition-shadow">
                    {relatedProduct.image ? (
                      <img
                        src={addCacheBuster(relatedProduct.image)}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <p className="text-sm">Hình ảnh</p>
                        </div>
                      </div>
                    )}
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
