'use client'

import { Header, Footer } from '@/components'
import { useData } from '@/contexts/DataContext'

interface ServiceDetailProps {
  params: { id: string }
}

export default function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { services } = useData()
  const SERVICES = services.map(s => ({ id: String(s.id), title: s.title, icon: s.icon, color: s.color, description: s.description }))

function Icon({ type }: { type: string }) {
  switch (type) {
    case 'laser':
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      )
    case 'milling':
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
      )
    case 'precision':
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    case 'heat':
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      )
    case 'plasma':
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      )
    case 'steel':
      return (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
      )
    default:
      return null
  }
}

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
              {service?.icon && (<div className="relative z-10"><Icon type={service.icon} /></div>)}
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


