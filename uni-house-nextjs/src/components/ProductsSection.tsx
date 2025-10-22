'use client'

import { useData } from '@/contexts/DataContext'

export default function ProductsSection() {
  const { products } = useData()

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="metal-texture w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 relative">
            <span className="gradient-primary bg-clip-text text-transparent">SẢN PHẨM NỔI BẬT</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="group cursor-pointer precision-cut" style={{ animationDelay: `${index * 0.1}s` }}>
              <a href={`/san-pham/${product.id}`} className="block">
              <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 steel-glow bg-white border border-gray-200">
                {/* Product Header */}
                <div className={`relative h-24 bg-gradient-to-r ${product.color} flex items-center justify-center overflow-hidden`}>
                  {/* Metal shine effect */}
                  <div className="metal-shine absolute inset-0"></div>
                  
                  {/* Product Image or Placeholder */}
                  <div className="relative z-10">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center text-white text-2xl font-bold">
                        {product.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Industrial corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-black opacity-20"></div>
                </div>
                
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
                        <span>Có sẵn</span>
                      </div>
                      <span className="text-blue-600 font-medium">Chi tiết</span>
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
