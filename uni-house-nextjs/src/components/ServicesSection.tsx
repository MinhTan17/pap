export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "THI CÔNG CẤY LASER CNC",
      image: "/api/placeholder/400/300",
      description: "Dịch vụ thi công cấy laser CNC chuyên nghiệp"
    },
    {
      id: 2,
      title: "THI CÔNG NỘI THẤT",
      image: "/api/placeholder/400/300",
      description: "Thiết kế và thi công nội thất cao cấp"
    },
    {
      id: 3,
      title: "THI CÔNG CẤY LASER",
      image: "/api/placeholder/400/300",
      description: "Dịch vụ thi công cấy laser chất lượng"
    },
    {
      id: 4,
      title: "THI CÔNG NỘI THẤT",
      image: "/api/placeholder/400/300",
      description: "Thiết kế và thi công nội thất hiện đại"
    },
    {
      id: 5,
      title: "THI CÔNG XÂY DỰNG",
      image: "/api/placeholder/400/300",
      description: "Thi công xây dựng công trình dân dụng"
    },
    {
      id: 6,
      title: "THIẾT KẾ KIẾN TRÚC",
      image: "/api/placeholder/400/300",
      description: "Thiết kế kiến trúc và quy hoạch"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            DỊCH VỤ CUNG CẤP
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-sm">Hình ảnh dịch vụ</p>
                  </div>
                </div>
                
                {/* Orange dot in bottom left */}
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-orange-500 rounded-full"></div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
