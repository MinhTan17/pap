import Link from 'next/link'
import { Header, Footer } from '@/components'

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "GIA CÔNG CẮT LASER CNC",
      icon: 'laser',
      description: "Việc nhập về máy gia công cắt laser đã giúp cho Khách hàng có quy trình khép kín từ việc cung cấp phôi thô cho đến gia công.",
      color: "from-red-600 to-orange-500",
      features: ["Độ chính xác cao", "Tốc độ nhanh", "Biên dạng phức tạp"]
    },
    {
      id: 2,
      title: "GIA CÔNG PHAY VÀ MÀI 6 MẶT",
      icon: 'milling',
      description: "Gia công phay và mài cho độ phẳng và độ song song cao.",
      color: "from-blue-600 to-blue-800",
      features: ["Độ phẳng cao", "Bề mặt đẹp", "Kích thước chính xác"]
    },
    {
      id: 3,
      title: "GIA CÔNG KHUÔN MẪU, CƠ KHÍ CHÍNH XÁC",
      icon: 'precision',
      description: "Đội ngũ kinh nghiệm, sản phẩm chính xác với thiết kế thông minh.",
      color: "from-green-600 to-green-800",
      features: ["Dung sai chặt", "Bền bỉ", "Vật liệu đa dạng"]
    },
    {
      id: 4,
      title: "XỬ LÝ NHIỆT - NHIỆT LUYỆN",
      icon: 'heat',
      description: "Tư vấn & hỗ trợ tối đa để sản phẩm đạt chất lượng tốt nhất.",
      color: "from-orange-600 to-red-600",
      features: ["Tôi – Ram", "Thấm Cacbon", "Cải thiện cơ tính"]
    },
    {
      id: 5,
      title: "GIA CÔNG CẮT PLASMA",
      icon: 'plasma',
      description: "Cắt chính xác – ưu tiên hàng đầu của chúng tôi.",
      color: "from-purple-600 to-blue-600",
      features: ["Tấm lớn", "Dày vật liệu", "Chi phí tối ưu"]
    },
    {
      id: 6,
      title: "XUẤT NHẬP KHẨU SẮT THÉP",
      icon: 'steel',
      description: "Cung cấp sắt thép tốt nhất của các nước tiên tiến với thời gian ngắn.",
      color: "from-gray-600 to-gray-800",
      features: ["Nguồn hàng ổn định", "Chủng loại đa dạng", "Giao nhanh"]
    }
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'laser':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'milling':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )
      case 'precision':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'heat':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'plasma':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      case 'steel':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Industrial Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="metal-texture w-full h-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6 relative">
              <span className="gradient-primary bg-clip-text text-transparent">DỊCH VỤ CUNG CẤP</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full"></div>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Các dịch vụ gia công cơ khí – xử lý – cung ứng vật liệu cho ngành công nghiệp
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Industrial Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="metal-texture w-full h-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="group cursor-pointer precision-cut" style={{ animationDelay: `${index * 0.2}s` }}>
                <Link href={`/dich-vu/${service.id}`} className="block">
                <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 steel-glow bg-white border border-gray-200">
                  {/* Industrial Header */}
                  <div className={`relative h-32 bg-gradient-to-r ${service.color} flex items-center justify-center overflow-hidden`}>
                    {/* Metal shine effect */}
                    <div className="metal-shine absolute inset-0"></div>
                    
                    {/* Welding spark effect for laser and heat services */}
                    {(service.icon === 'laser' || service.icon === 'heat') && (
                      <div className="welding-spark"></div>
                    )}
                    
                    {/* Icon */}
                    <div className="relative z-10">
                      {getIcon(service.icon)}
                    </div>
                    
                    {/* Industrial corner accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-black opacity-20"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
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
            {[
              { step: "1", title: "Tư vấn", description: "Tư vấn và lên phương án thiết kế" },
              { step: "2", title: "Thiết kế", description: "Thiết kế chi tiết và báo giá" },
              { step: "3", title: "Thi công", description: "Thi công theo đúng thiết kế" },
              { step: "4", title: "Hoàn thiện", description: "Kiểm tra và bàn giao công trình" }
            ].map((item, index) => (
              <div key={index} className="text-center">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Cần Tư Vấn Dịch Vụ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay để được tư vấn miễn phí về các dịch vụ gia công – cung ứng vật liệu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all steel-glow">
              Liên hệ tư vấn
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all steel-glow">
              Xem báo giá
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
