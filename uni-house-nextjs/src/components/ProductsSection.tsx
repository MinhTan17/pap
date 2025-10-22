'use client'

import { useData } from '@/contexts/DataContext'
import { useTranslations } from 'next-intl'

export default function ProductsSection() {
  const { products } = useData()
  const t = useTranslations('products')

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="metal-texture w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 relative">
            <span className="bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">{t('title')}</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="group cursor-pointer precision-cut" style={{ animationDelay: `${index * 0.1}s` }}>
              <a href={`/san-pham/${product.id}`} className="block">
              <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 steel-glow bg-white border border-gray-200">
                {/* Product Image */}
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                )}
                
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Industrial bottom border */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>{t('available')}</span>
                      </div>
                      <span className="text-blue-600 font-medium">{t('details')}</span>
                  </div>
                </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
