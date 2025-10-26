'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ServiceItem } from '@/data/services'

export default function ServiceDetailPage() {
  const params = useParams()
  const [service, setService] = useState<ServiceItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadService = async () => {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const services = await response.json()
          const serviceId = parseInt(params.id as string)
          const foundService = services.find((s: ServiceItem) => s.id === serviceId)
          setService(foundService || null)
        }
      } catch (error) {
        console.error('Error loading service:', error)
      } finally {
        setLoading(false)
      }
    }

    loadService()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy dịch vụ</h1>
          <Link href="/services" className="text-blue-600 hover:text-blue-800">
            ← Quay lại danh sách dịch vụ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${service.color || 'from-blue-600 to-blue-800'} text-white py-20`}>
        <div className="container mx-auto px-4">
          <Link href="/services" className="inline-block mb-4 text-white/80 hover:text-white">
            ← Quay lại danh sách dịch vụ
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{service.description}</p>
        </div>
      </div>

      {/* Service Image */}
      {service.image && (
        <div className="container mx-auto px-4 -mt-10">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      )}

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tính năng nổi bật</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Content */}
      {service.detailContent && (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: service.detailContent }}
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <div className={`bg-gradient-to-r ${service.color || 'from-blue-600 to-blue-800'} rounded-lg shadow-xl p-8 text-white text-center`}>
          <h2 className="text-3xl font-bold mb-4">Quan tâm đến dịch vụ này?</h2>
          <p className="text-xl mb-6 text-white/90">Liên hệ với chúng tôi để được tư vấn chi tiết</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Liên hệ ngay
            </Link>
            <Link 
              href="/services" 
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/30"
            >
              Xem dịch vụ khác
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
