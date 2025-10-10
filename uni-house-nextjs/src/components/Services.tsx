export default function Services() {
  const services = [
    {
      title: "Thiết Kế - Thi Công Xây Dựng",
      description: "UNI HOUSE chuyên Thiết Kế - Thi Công các công trình dân dụng",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Thiết Kế Thi Công Nội Thất",
      description: "UNI HOUSE chuyên Thiết Kế Thi Công Nội Thất",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
        </svg>
      )
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Lĩnh vực hoạt động
          </h2>
          <p className="text-xl text-gray-600">
            Các lĩnh vực của công ty chúng tôi đang hoạt động trên thị trường
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 italic mb-8">
            &ldquo;Ngay cả khi bạn chưa có phát thảo sẵn sàng về những gì bạn muốn, chúng tôi sẽ giúp bạn những mẫu thiết kế hợp lý nhất&rdquo;
          </p>
          <div className="bg-blue-600 text-white px-8 py-4 rounded-lg inline-block">
            <span className="text-xl font-bold">Hotline: 0934 982 212</span>
          </div>
        </div>
      </div>
    </section>
  )
}
