'use client'

import { useState, useEffect } from 'react'
import { Header, Footer } from '@/components'

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
  section: 'company' | 'staff' | 'equipment'
  updatedAt: string
}

export default function AboutPage() {
  const [currentImage, setCurrentImage] = useState(0)
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
      
      {/* Page Title Bar */}
      <section className="py-8 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center uppercase">
            GIỚI THIỆU
          </h1>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Text Content */}
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
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

            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                {companyData && companyData.images.length > 0 ? (
                  <>
                    <img
                      src={companyData.images[currentImage].url}
                      alt={companyData.images[currentImage].caption || "Company office"}
                      className="w-full h-full object-cover"
                      style={{ 
                        width: companyData.images[currentImage].width > 0 ? `${companyData.images[currentImage].width}px` : '100%',
                        height: companyData.images[currentImage].height > 0 ? `${companyData.images[currentImage].height}px` : '100%'
                      }}
                    />
                    {/* Navigation Arrows */}
                    {companyData.images.length > 1 && (
                      <>
                        <button 
                          onClick={() => setCurrentImage(currentImage === 0 ? companyData.images.length - 1 : currentImage - 1)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => setCurrentImage((currentImage + 1) % companyData.images.length)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-lg">Văn phòng hiện đại</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nhân Lực Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {staffData?.title || 'NHÂN LỰC'}
            </h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto"></div>
          </div>
          
            {staffData?.content && (
              <div className="text-center mb-8">
                <div 
                  className="prose max-w-4xl mx-auto text-lg text-gray-600"
                  dangerouslySetInnerHTML={{ __html: staffData.content }}
                />
              </div>
            )}
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Large image on left */}
            <div className="md:col-span-1">
              {staffData && staffData.images.length > 0 ? (
                <img
                  src={staffData.images[0].url}
                  alt={staffData.images[0].caption || "Staff"}
                  className="w-full aspect-video object-cover rounded-lg"
                  style={{ 
                    width: staffData.images[0].width > 0 ? `${staffData.images[0].width}px` : '100%',
                    height: staffData.images[0].height > 0 ? `${staffData.images[0].height}px` : 'auto'
                  }}
                />
              ) : (
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <p className="text-sm">Nhân lực</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Grid of smaller images */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {staffData && staffData.images.length > 1 ? (
                staffData.images.slice(1, 6).map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.caption || `Staff ${index + 1}`}
                    className="aspect-square object-cover rounded-lg"
                    style={{ 
                      width: image.width > 0 ? `${image.width}px` : '100%',
                      height: image.height > 0 ? `${image.height}px` : '100%'
                    }}
                  />
                ))
              ) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <p className="text-xs">Nhân viên {index + 1}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
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
          
            {equipmentData?.content && (
              <div className="text-center mb-8">
                <div 
                  className="prose max-w-4xl mx-auto text-lg text-gray-600"
                  dangerouslySetInnerHTML={{ __html: equipmentData.content }}
                />
              </div>
            )}
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Large image on left */}
            <div className="md:col-span-1">
              {equipmentData && equipmentData.images.length > 0 ? (
                <img
                  src={equipmentData.images[0].url}
                  alt={equipmentData.images[0].caption || "Equipment"}
                  className="w-full aspect-video object-cover rounded-lg"
                  style={{ 
                    width: equipmentData.images[0].width > 0 ? `${equipmentData.images[0].width}px` : '100%',
                    height: equipmentData.images[0].height > 0 ? `${equipmentData.images[0].height}px` : 'auto'
                  }}
                />
              ) : (
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <p className="text-sm">Thiết bị</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Grid of smaller images */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {equipmentData && equipmentData.images.length > 1 ? (
                equipmentData.images.slice(1, 6).map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.caption || `Equipment ${index + 1}`}
                    className="aspect-square object-cover rounded-lg"
                    style={{ 
                      width: image.width > 0 ? `${image.width}px` : '100%',
                      height: image.height > 0 ? `${image.height}px` : '100%'
                    }}
                  />
                ))
              ) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <p className="text-xs">Máy móc {index + 1}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
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
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Liên hệ ngay
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Xem dự án
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
