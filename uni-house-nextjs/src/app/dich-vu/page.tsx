import { Header, Footer } from '@/components'

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "THI CÔNG XÂY DỰNG",
      description: "Thi công các công trình dân dụng, công nghiệp với chất lượng cao và tiến độ đảm bảo",
      features: [
        "Thi công nhà ở dân dụng",
        "Thi công công trình công nghiệp", 
        "Thi công cơ sở hạ tầng",
        "Sửa chữa và nâng cấp công trình"
      ],
      icon: "🏗️"
    },
    {
      id: 2,
      title: "THI CÔNG NỘI THẤT",
      description: "Thiết kế và thi công nội thất hiện đại, sang trọng theo yêu cầu của khách hàng",
      features: [
        "Thiết kế nội thất nhà ở",
        "Thiết kế nội thất văn phòng",
        "Thiết kế nội thất khách sạn",
        "Thi công và lắp đặt nội thất"
      ],
      icon: "🪑"
    },
    {
      id: 3,
      title: "THI CÔNG CẤY LASER CNC",
      description: "Dịch vụ thi công cấy laser CNC chuyên nghiệp với độ chính xác cao",
      features: [
        "Cắt laser kim loại",
        "Khắc laser trên vật liệu",
        "Cắt laser trên gỗ và nhựa",
        "Gia công CNC chính xác"
      ],
      icon: "⚡"
    },
    {
      id: 4,
      title: "THIẾT KẾ KIẾN TRÚC",
      description: "Thiết kế kiến trúc chuyên nghiệp, sáng tạo và phù hợp với nhu cầu thực tế",
      features: [
        "Thiết kế nhà ở",
        "Thiết kế công trình thương mại",
        "Thiết kế cảnh quan",
        "Tư vấn thiết kế"
      ],
      icon: "🏛️"
    },
    {
      id: 5,
      title: "TƯ VẤN DỰ ÁN",
      description: "Tư vấn toàn diện về các dự án xây dựng từ khâu thiết kế đến thi công",
      features: [
        "Tư vấn thiết kế",
        "Tư vấn thi công",
        "Tư vấn vật liệu",
        "Giám sát thi công"
      ],
      icon: "💡"
    },
    {
      id: 6,
      title: "CUNG CẤP VẬT LIỆU",
      description: "Cung cấp vật liệu xây dựng chất lượng cao với giá cả cạnh tranh",
      features: [
        "Xi măng, cát, đá",
        "Gạch, ngói",
        "Thép xây dựng",
        "Vật liệu hoàn thiện"
      ],
      icon: "🧱"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              DỊCH VỤ CUNG CẤP
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cung cấp đầy đủ các dịch vụ xây dựng chuyên nghiệp với chất lượng cao
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <div className="p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
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
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Cần Tư Vấn Dịch Vụ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Liên hệ ngay với chúng tôi để được tư vấn miễn phí về các dịch vụ xây dựng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Liên hệ tư vấn
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Xem báo giá
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
