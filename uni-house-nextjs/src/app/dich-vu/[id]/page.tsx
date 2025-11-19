'use client'

import { Header, Footer } from '@/components'
import { useData } from '@/contexts/DataContext'
import { use } from 'react'
import React from 'react'
import { styleSettingsToCSS } from '@/utils/styleUtils'

interface ServiceDetailProps {
  params: Promise<{ id: string }>
}

export default function ServiceDetailPage({ params }: ServiceDetailProps) {
  const resolvedParams = use(params)
  const { services, reloadFromStorage } = useData()
  const service = services.find(s => String(s.id) === resolvedParams.id)

  // Force reload data when page loads
  React.useEffect(() => {
    reloadFromStorage()
  }, [resolvedParams.id, reloadFromStorage])

  // Debug logging
  console.log('[Service Detail] ID:', resolvedParams.id)
  console.log('[Service Detail] Service found:', service)
  console.log('[Service Detail] Has detailContent:', !!service?.detailContent)
  console.log('[Service Detail] detailContent length:', service?.detailContent?.length || 0)
  console.log('[Service Detail] detailContent preview:', service?.detailContent?.substring(0, 100))

  // Check if detailContent has actual content (not just empty HTML tags)
  const hasRealContent = service?.detailContent && 
    service.detailContent.trim().length > 0 &&
    service.detailContent.replace(/<[^>]*>/g, '').trim().length > 0

  console.log('[Service Detail] Has real content:', hasRealContent)
  console.log('[Service Detail] Text content:', service?.detailContent?.replace(/<[^>]*>/g, '').trim())

  // Show detailContent if it has meaningful content (more than just HTML tags)
  const textContent = service?.detailContent?.replace(/<[^>]*>/g, '').trim() || ''
  const shouldShowDetailContent = service?.detailContent && textContent.length > 5
  
  console.log('[Service Detail] Text content length:', textContent.length)
  console.log('[Service Detail] Should show:', shouldShowDetailContent)

  // Nếu có detailContent từ admin với nội dung thực sự, hiển thị nó
  if (shouldShowDetailContent) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className={`bg-gradient-to-r ${service.color || 'from-blue-600 to-blue-800'} text-white py-20`}>
            <div className="container mx-auto px-4">
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

          {/* Detail Content from Admin */}
          <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: service.detailContent || '' }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Nội dung chi tiết cho dịch vụ cắt cưa (id = 5) - fallback nếu chưa có detailContent
  const cuttingServiceContent = resolvedParams.id === '5' ? {
    sections: [
      {
        number: '01',
        title: 'CẮT CƯA THÉP LÀ GÌ?',
        content: [
          'Cắt cưa thép là phương pháp gia công sử dụng lưỡi cưa chuyên dụng để chia tách phôi thép theo kích thước yêu cầu. Khác với công nghệ cắt nhiệt như Laser Fiber hay Oxy-Gas, phương pháp này không tạo ra vùng ảnh hưởng nhiệt, nhờ vậy giữ nguyên cấu trúc cơ tính của vật liệu và giảm thiểu tối đa hiện tượng cong vênh.',
          'Điểm mạnh của cắt cưa thép nằm ở tính kinh tế và sự linh hoạt. Tại Phú An Phát, phương pháp này phù hợp với đơn hàng thép dày từ 5 mm đến 800 mm, dung sai trong phạm vi cho phép, đảm bảo phôi đạt chuẩn để tiếp tục gia công phay, tiện hoặc hàn kết cấu. Nhờ vậy, doanh nghiệp vừa tiết kiệm chi phí, vừa rút ngắn thời gian chuẩn bị vật liệu.'
        ]
      },
      {
        number: '02',
        title: 'ƯU ĐIỂM CỦA DỊCH VỤ CẮT CƯA',
        benefits: [
          { icon: '💰', title: 'Hiệu quả kinh tế cao', desc: 'Chi phí gia công thấp hơn đáng kể so với các phương pháp cắt nhiệt.' },
          { icon: '🔧', title: 'Giữ nguyên cơ tính thép', desc: 'Không phát sinh vùng ảnh hưởng nhiệt, đảm bảo độ bền cơ học.' },
          { icon: '⚡', title: 'Linh hoạt trong sản xuất', desc: 'Cắt được nhiều loại phôi, từ thép tấm, thép hình đến thép tròn, thép đặc.' },
          { icon: '📏', title: 'Dung sai ổn định', desc: 'Quy trình kiểm soát nghiêm ngặt giúp sản phẩm đạt chuẩn, giảm thiểu công đoạn chỉnh sửa sau cắt.' },
          { icon: '🏭', title: 'Phục vụ đa dạng nhu cầu', desc: 'Thích hợp từ dự án lớn (cầu đường, đóng tàu) đến sản xuất công nghiệp vừa và nhỏ.' },
          { icon: '🚚', title: 'Giao hàng nhanh chóng', desc: 'Phú An Phát cam kết đáp ứng đơn hàng đúng tiến độ, phủ khắp khu vực Miền Nam.' }
        ]
      },
      {
        number: '03',
        title: 'NĂNG LỰC MÁY MÓC - NỀN TẢNG TẠO UY TÍN',
        content: [
          'Để đáp ứng nhu cầu ngày càng cao từ thị trường, Phú An Phát đã đầu tư hệ thống 16 máy cắt cưa hiện đại đến từ những thương hiệu hàng đầu như Fujitech, AMADA, COSEN, Everising.'
        ],
        machines: [
          'Fujitech FS4265x1000, 4233GNC – chuyên xử lý thép tấm dày, bản mã lớn.',
          'COSEN SH1080D, EVERISING H7050 – tối ưu cho phôi thép tròn, thép vuông, năng suất cao.',
          'AMADA HA-700, HFA530, H550E, HA-165, HA-250, HA-300, HA-550, CM100CNC – máy cắt bàn lớn'
        ],
        specs: [
          '📐 Thông số bàn làm việc đa dạng: 600x1200x4000, 800x1200xL, 600x1000xL, 330x330xL, 250x250xL, 800x1000xL, 700x800xL, 500x550xL, 500x700xL, 300x300xL, 550x500xL, 100x100xL…',
          '✅ Cắt được độ dày lên tới 1000mm',
          '🎯 Dung sai cắt cưa: 0 ~ 3 mm, đảm bảo phôi sau cắt đạt chuẩn'
        ],
        capacity: [
          '⚙️ Công suất xử lý: 8–9 tấn thép/ngày với 2 ca làm việc liên tục',
          '📊 Khả năng cắt đa dạng: từ mỏng nhất 4 mm đến dày nhất 1000 mm',
          '🔍 Quy trình kiểm tra nghiêm ngặt: phôi xéo dương được phay bớt đến khi đạt dung sai ≤1 mm, xéo âm 2–3 mm sẽ cấp lại phôi'
        ]
      },
      {
        number: '04',
        title: 'ĐỘI NGŨ KỸ THUẬT – GIÁ TRỊ CỐT LÕI',
        content: [
          'Máy móc hiện đại chỉ phát huy hết tiềm năng khi được vận hành bởi những con người giỏi nghề. Phú An Phát luôn coi đội ngũ kỹ thuật viên là trái tim của chất lượng dịch vụ.'
        ],
        team: [
          { icon: '🎓', title: 'Đào tạo chuyên sâu', desc: 'Kỹ thuật viên được huấn luyện kỹ lưỡng về thao tác cắt, kiểm tra bavia, xử lý ngoại quan.' },
          { icon: '📈', title: 'Nâng cao kỹ năng liên tục', desc: 'Định kỳ tổ chức đào tạo nội bộ, thực hành trực tiếp để nâng cao khả năng ứng biến.' },
          { icon: '🛡️', title: 'An toàn lao động', desc: 'Thường xuyên tập huấn 5S, 6STOP, PCCC, đảm bảo môi trường làm việc an toàn và khoa học.' },
          { icon: '🌟', title: 'Phát triển toàn diện', desc: 'Bên cạnh chuyên môn, nhân sự còn được trang bị kỹ năng bán hàng, quản lý thời gian và tư vấn khách hàng.' }
        ]
      }
    ]
  } : null

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="metal-texture w-full h-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative">
              <span className="bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
                {service?.title || 'DỊCH VỤ'}
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full"></div>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-8">
              {service?.description || 'Chi tiết dịch vụ của Phú An Phát.'}
            </p>
          </div>
        </div>
      </section>

      {/* Content for Cutting Service (id = 5) */}
      {cuttingServiceContent && (
        <div className="bg-white">
          {cuttingServiceContent.sections.map((section, idx) => (
            <section key={idx} className={`py-16 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-700 to-red-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {section.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{section.title}</h2>
                    {section.content && section.content.map((para, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed mb-4 text-lg">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Benefits Grid */}
                {section.benefits && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {section.benefits.map((benefit, i) => (
                      <div key={i} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">{benefit.icon}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Machines List */}
                {section.machines && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Các dòng máy nổi bật:</h3>
                    {section.machines.map((machine, i) => (
                      <div key={i} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <p className="text-gray-700">{machine}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Specs */}
                {section.specs && (
                  <div className="mt-8 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-6">
                    {section.specs.map((spec, i) => (
                      <p key={i} className="text-gray-700 mb-3 text-lg">{spec}</p>
                    ))}
                  </div>
                )}

                {/* Capacity */}
                {section.capacity && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <span className="text-4xl">⚡</span>
                      NĂNG LỰC SẢN XUẤT VƯỢT TRỘI
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {section.capacity.map((item, i) => (
                        <div key={i} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
                          <p className="text-gray-700 font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team */}
                {section.team && (
                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    {section.team.map((member, i) => (
                      <div key={i} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{member.icon}</div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{member.title}</h4>
                            <p className="text-gray-600">{member.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Default content for other services */}
      {!cuttingServiceContent && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-lg shadow-xl bg-white border border-gray-200">
              <div className={`relative h-40 bg-gradient-to-r ${service?.color || 'from-gray-600 to-gray-800'} flex items-center justify-center overflow-hidden`}>
                <div className="metal-shine absolute inset-0"></div>
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-black opacity-20"></div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">MÔ TẢ DỊCH VỤ</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {service?.description || 'Thông tin đang được cập nhật.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Consultation Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="metal-texture w-full h-full"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-900 rounded-full mb-6 shadow-lg">
              <span className="text-4xl">💬</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              CẦN TƯ VẤN THÊM?
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Đội ngũ chuyên gia của Phú An Phát luôn sẵn sàng tư vấn miễn phí về dịch vụ,
              báo giá và giải đáp mọi thắc mắc của bạn.
            </p>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Zalo Button */}
              <a
                href="https://zalo.me/0931535007"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:bg-red-700 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="white" />
                  <path d="M15 31.5C15 31.5 18.5 28 24 28C29.5 28 33 31.5 33 31.5M18 21H18.01M30 21H30.01M24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38Z" stroke="#0068FF" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Chat Zalo ngay</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Hotline Button */}
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

            {/* Additional Info */}
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

        {/* Decorative Elements - Industrial Style */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/50 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-red-600/20"></div>
        <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[60px] border-r-transparent border-b-[60px] border-b-blue-800/20"></div>
      </section>

      <Footer />
    </div>
  )
}


