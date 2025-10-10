export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      title: "TIN TỨC 1",
      description: "Thông tin về các dự án mới nhất của công ty",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      title: "TIN TỨC 2",
      description: "Cập nhật về công nghệ và kỹ thuật thi công",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      title: "TIN TỨC 3",
      description: "Thông báo về các chính sách và quy định mới",
      image: "/api/placeholder/200/200"
    }
  ]

  return (
    <section className="py-20 bg-gray-800 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.1) 10px,
            rgba(255,255,255,0.1) 20px
          )`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <div key={news.id} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              {/* Circular image */}
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <p className="text-xs">Hình ảnh</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                {news.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-center">
                {news.description}
              </p>

              {/* Time icon and text */}
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600 text-sm">Thời gian</span>
              </div>

              <div className="text-center mt-4">
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-1 mx-auto">
                  <span>Xem Thêm</span>
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
