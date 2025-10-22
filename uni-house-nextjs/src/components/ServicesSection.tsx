'use client'

import Link from 'next/link'
import { useData } from '@/contexts/DataContext'

export default function ServicesSection() {
  const { services } = useData()

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="metal-texture w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 relative">
            <span className="gradient-primary bg-clip-text text-transparent">DỊCH VỤ CUNG CẤP</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dưới đây là một số dịch vụ công ty chúng tôi cung cấp
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service.id} className="group cursor-pointer precision-cut" style={{ animationDelay: `${index * 0.2}s` }}>
              <Link href={`/dich-vu/${service.id}`} className="block">
              <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 steel-glow bg-white border border-gray-200">
                {/* Industrial Header */}
                <div className={`relative h-32 bg-gradient-to-r ${service.color} flex items-center justify-center overflow-hidden`}>
                  {/* Metal shine effect */}
                  <div className="metal-shine absolute inset-0"></div>
                  
                  {/* Service Image or Placeholder */}
                  <div className="relative z-10">
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center text-white text-4xl font-bold">
                        {service.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Industrial corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-black opacity-20"></div>
                </div>
                
                {/* Industrial indicator dot */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-orange-500 rounded-full steel-glow"></div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Industrial bottom border */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Chất lượng cao</span>
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
      </div>
    </section>
  )
}
