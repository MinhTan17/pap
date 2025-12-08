'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components'
import PageHeader from '@/components/PageHeader'
import { useData } from '@/contexts/DataContext'
import { processSteps } from '@/data/common'

export default function ServicesPage() {
  const { services } = useData()

  // Debug logging
  console.log('[Services Page] Services count:', services?.length || 0)
  console.log('[Services Page] Services data:', services)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHeader
        title="DỊCH VỤ GIA CÔNG"
        description="Các dịch vụ gia công cơ khí – xử lý – cung ứng vật liệu cho ngành công nghiệp với công nghệ hiện đại và đội ngũ chuyên nghiệp."
        stats={[
          { value: '6+', label: 'Dịch vụ chính', color: 'text-red-600' },
          { value: '10+', label: 'Năm kinh nghiệm', color: 'text-blue-600' },
          { value: '500+', label: 'Dự án hoàn thành', color: 'text-green-600' },
          { value: '99%', label: 'Khách hàng hài lòng', color: 'text-purple-600' }
        ]}
      />

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Industrial Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="metal-texture w-full h-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {!services || services.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Đang tải dịch vụ...</h3>
              <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
              <div key={service.id} className="group cursor-pointer precision-cut" style={{ animationDelay: `${index * 0.2}s` }}>
                <Link href={`/dich-vu/${service.id}`} className="block">
                  <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 steel-glow bg-white border border-gray-200">
                    {/* Service Image Section */}
                    <div className="relative h-64 overflow-hidden group">
                      <div className="relative w-full h-full">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://placehold.co/600x400/1a365d/ffffff?text=${encodeURIComponent(service.title)}`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center">
                            <span className="text-white text-center px-4">
                              {service.title}
                            </span>
                          </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                        {/* Service Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                          <div className="h-1 w-16 bg-white mb-3"></div>
                          <p className="text-sm opacity-90 line-clamp-2">{service.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {(service.features || []).map((feature, idx) => (
                          <li key={`feature-${service.id}-${idx}`} className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              QUY TRÌNH LÀM VIỆC
            </h2>
            <p className="text-xl text-gray-600">
              Quy trình chuyên nghiệp đảm bảo chất lượng và tiến độ dự án
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div key={`process-${item.step}-${index}`} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="metal-texture w-full h-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Cần Tư Vấn Dịch Vụ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay để được tư vấn miễn phí về các dịch vụ gia công – cung ứng vật liệu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://zalo.me/0931535007" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all steel-glow text-center cursor-pointer">
              Liên hệ tư vấn
            </a>
            <a href="/lien-he" className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all steel-glow text-center cursor-pointer">
              Xem báo giá
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
