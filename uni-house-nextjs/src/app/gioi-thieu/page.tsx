'use client'

import { useState, useEffect } from 'react'
import { Header, Footer } from '@/components'
import PageHeader from '@/components/PageHeader'

interface ImageItem {
  url: string
  caption: string
  width: number
  height: number
}

interface AboutContent {
  id: string
  title: string
  content: string
  images: ImageItem[]
  gridImages?: ImageItem[] // 6 ảnh nhỏ hiển thị dưới dạng grid
  section: 'company' | 'staff' | 'equipment'
  updatedAt: string
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutContent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/about')
      if (response.ok) {
        const data = await response.json()
        setAboutData(data)
      }
    } catch (error) {
      console.error('Error fetching about data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSectionData = (section: string) => {
    return aboutData.find(item => item.section === section)
  }

  const companyData = getSectionData('company')
  const staffData = getSectionData('staff')
  const equipmentData = getSectionData('equipment')

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <PageHeader
        title="GIỚI THIỆU CÔNG TY"
        description="Công ty TNHH Phú An Phát - Đối tác tin cậy trong lĩnh vực cung cấp thép và gia công cơ khí chính xác với hơn 15 năm kinh nghiệm."
        stats={[
          { value: '2009', label: 'Thành lập', color: 'text-blue-600' },
          { value: '15+', label: 'Năm kinh nghiệm', color: 'text-red-600' },
          { value: '80%', label: 'Khách hàng Nhật', color: 'text-green-600' },
          { value: '1000+', label: 'Dự án hoàn thành', color: 'text-purple-600' }
        ]}
      />

      {/* Company Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-stretch">
            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-6 text-gray-700 text-lg leading-relaxed flex flex-col justify-center">
              {companyData ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{companyData.title}</h2>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: companyData.content }}
                  />
                </>
              ) : (
                <>
                  <p>
                    Công ty TNHH Phú An Phát được thành lập với sứ mệnh mang đến những giải pháp xây dựng 
                    toàn diện và chất lượng cao cho khách hàng. Với nhiều năm kinh nghiệm trong ngành, 
                    chúng tôi tự hào là đối tác tin cậy của nhiều dự án lớn nhỏ trên toàn quốc.
                  </p>
                  <p>
                    Chúng tôi chuyên cung cấp các dịch vụ thi công xây dựng, thiết kế nội thất, 
                    và phân phối vật liệu xây dựng chất lượng cao. Đội ngũ nhân viên giàu kinh nghiệm 
                    và trang thiết bị hiện đại đảm bảo mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất.
                  </p>
                  <p>
                    Với 80% khách hàng là các công ty Nhật Bản, chúng tôi đã khẳng định được vị thế 
                    trong lĩnh vực cung cấp thép và sản xuất máy móc chính xác.
                  </p>
                  <p className="font-bold text-orange-600 text-xl">
                    <strong>SỨC KHỎE - MAY MẮN - THÀNH ĐẠT NHẤT</strong>
                  </p>
                  <p>
                    là phương châm hoạt động của chúng tôi, luôn đặt lợi ích khách hàng lên hàng đầu.
                  </p>
                </>
              )}
            </div>

            {/* Images Column */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center">
              {/* Main Image */}
              {companyData?.images?.[0]?.url ? (
                <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={companyData.images[0].url}
                    alt={companyData.images[0].caption || 'Công ty Phú An Phát'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-80 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p>Chưa có hình ảnh</p>
                  </div>
                </div>
              )}
              
              {/* Additional Images - Vertical Stack */}
              {companyData?.images && companyData.images.length > 1 && (
                <>
                  {companyData.images.slice(1).map((image, index) => (
                    <img
                      key={`company-img-${index}-${image.url}`}
                      src={image.url}
                      alt={image.caption || `Company ${index + 2}`}
                      className="w-full aspect-video object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Nhân Lực Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {staffData?.title || 'NHÂN LỰC'}
            </h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-stretch">
            {/* Images Column - LEFT */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center">
              {/* Main Image */}
              {staffData?.images?.[0]?.url ? (
                <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={staffData.images[0].url}
                    alt={staffData.images[0].caption || 'Nhân lực Phú An Phát'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-80 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p>Chưa có hình ảnh</p>
                  </div>
                </div>
              )}
              
              {/* Additional Images - Vertical Stack */}
              {staffData?.images && staffData.images.length > 1 && (
                <>
                  {staffData.images.slice(1).map((image, index) => (
                    <img
                      key={`staff-img-${index}-${image.url}`}
                      src={image.url}
                      alt={image.caption || `Nhân viên ${index + 2}`}
                      className="w-full aspect-video object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                  ))}
                </>
              )}
            </div>

            {/* Text Content - RIGHT */}
            <div className="w-full md:w-1/2 space-y-6 text-gray-700 text-lg leading-relaxed">
              {staffData?.content ? (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: staffData.content }}
                />
              ) : (
                <p>Đội ngũ nhân viên chuyên nghiệp, giàu kinh nghiệm và tận tâm với công việc.</p>
              )}
            </div>
          </div>
          
          {/* Grid Images - 6 ảnh nhỏ tùy chỉnh riêng */}
          {staffData?.gridImages && staffData.gridImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {staffData.gridImages.map((image, index) => (
                <img
                  key={`staff-grid-${index}-${image.url}`}
                  src={image.url}
                  alt={image.caption || `Nhân viên ${index + 1}`}
                  className="w-full aspect-video object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`staff-placeholder-${index}`} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <p className="text-xs">Nhân viên {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Thiết Bị Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {equipmentData?.title || 'THIẾT BỊ'}
            </h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-stretch">
            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-6 text-gray-700 text-lg leading-relaxed flex flex-col justify-center">
              {equipmentData?.content ? (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: equipmentData.content }}
                />
              ) : (
                <p>Hệ thống máy móc, thiết bị hiện đại, đáp ứng mọi yêu cầu kỹ thuật khắt khe nhất.</p>
              )}
            </div>

            {/* Images Column */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center">
              {/* Main Image */}
              {equipmentData?.images?.[0]?.url ? (
                <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={equipmentData.images[0].url}
                    alt={equipmentData.images[0].caption || 'Thiết bị Phú An Phát'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-80 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <p>Chưa có hình ảnh</p>
                  </div>
                </div>
              )}
              
              {/* Additional Images - Vertical Stack */}
              {equipmentData?.images && equipmentData.images.length > 1 && (
                <>
                  {equipmentData.images.slice(1).map((image, index) => (
                    <img
                      key={`equip-img-${index}-${image.url}`}
                      src={image.url}
                      alt={image.caption || `Thiết bị ${index + 2}`}
                      className="w-full aspect-video object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                  ))}
                </>
              )}
            </div>
          </div>
          
          {/* Grid Images - 6 ảnh nhỏ tùy chỉnh riêng */}
          {equipmentData?.gridImages && equipmentData.gridImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {equipmentData.gridImages.map((image, index) => (
                <img
                  key={`equip-grid-${index}-${image.url}`}
                  src={image.url}
                  alt={image.caption || `Thiết bị ${index + 1}`}
                  className="w-full aspect-video object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`equip-placeholder-${index}`} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <p className="text-xs">Máy móc {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi giúp bạn thực hiện dự án xây dựng của mình một cách hoàn hảo nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://zalo.me/0931535007"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.972L2.05 21.95l4.028-1.937A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.988 0-3.84-.73-5.25-1.938l-.375-.313-2.438 1.175 1.188-2.4-.325-.388A7.951 7.951 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
              Chat Zalo
            </a>
            <a
              href="/lien-he"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Gửi Email
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
