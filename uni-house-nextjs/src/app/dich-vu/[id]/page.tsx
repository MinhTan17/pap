'use client'

import { Header, Footer } from '@/components'
import { useData } from '@/contexts/DataContext'

interface ServiceDetailProps {
  params: { id: string }
}

export default function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { services } = useData()
  const SERVICES = services.map(s => ({
    id: String(s.id),
    title: s.title,
    color: s.color,
    description: s.description
  }))
  
  const service = SERVICES.find(s => s.id === params.id)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"><div className="metal-texture w-full h-full"></div></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative">
              <span className="gradient-primary bg-clip-text text-transparent">{service?.title || 'DỊCH VỤ'}</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{service?.description || 'Chi tiết dịch vụ của Phú An Phát.'}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-lg shadow-xl bg-white border border-gray-200">
            <div className={`relative h-40 bg-gradient-to-r ${service?.color || 'from-gray-600 to-gray-800'} flex items-center justify-center overflow-hidden`}>
              <div className="metal-shine absolute inset-0"></div>
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-black opacity-20"></div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">MÔ TẢ DỊCH VỤ</h2>
              <p className="text-gray-600 leading-relaxed">{service?.description || 'Thông tin đang được cập nhật.'}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


