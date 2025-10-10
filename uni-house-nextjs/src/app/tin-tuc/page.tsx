import Link from 'next/link'
import { Header, Footer } from '@/components'

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "Xu hướng thiết kế nội thất hiện đại năm 2024",
      excerpt: "Khám phá những xu hướng thiết kế nội thất mới nhất đang được ưa chuộng trong năm 2024, từ phong cách tối giản đến các giải pháp thông minh.",
      category: "Thiết kế",
      date: "15/01/2024",
      readTime: "5 phút đọc",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Các loại vật liệu xây dựng bền vững cho tương lai",
      excerpt: "Tìm hiểu về các loại vật liệu xây dựng thân thiện với môi trường và bền vững, giúp tiết kiệm chi phí và bảo vệ môi trường.",
      category: "Vật liệu",
      date: "12/01/2024",
      readTime: "7 phút đọc",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Quy trình thi công nhà ở an toàn và hiệu quả",
      excerpt: "Hướng dẫn chi tiết về quy trình thi công nhà ở đúng chuẩn, đảm bảo an toàn và chất lượng công trình.",
      category: "Thi công",
      date: "10/01/2024",
      readTime: "6 phút đọc",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Công nghệ laser CNC trong xây dựng hiện đại",
      excerpt: "Khám phá ứng dụng của công nghệ laser CNC trong ngành xây dựng, mang lại độ chính xác và hiệu quả cao.",
      category: "Công nghệ",
      date: "08/01/2024",
      readTime: "8 phút đọc",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Tips chọn vật liệu xây dựng phù hợp với ngân sách",
      excerpt: "Những lời khuyên hữu ích giúp bạn chọn lựa vật liệu xây dựng phù hợp với ngân sách mà vẫn đảm bảo chất lượng.",
      category: "Tư vấn",
      date: "05/01/2024",
      readTime: "4 phút đọc",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Dự án nhà ở xã hội - Cơ hội cho người dân",
      excerpt: "Thông tin về các dự án nhà ở xã hội đang được triển khai, mang đến cơ hội sở hữu nhà ở cho người dân có thu nhập thấp.",
      category: "Dự án",
      date: "03/01/2024",
      readTime: "6 phút đọc",
      image: "/api/placeholder/400/250"
    }
  ]

  const featuredNews = newsArticles[0]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              TIN TỨC
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cập nhật những thông tin mới nhất về ngành xây dựng và vật liệu xây dựng
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Tin tức nổi bật</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <p>Hình ảnh bài viết</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredNews.category}
                    </span>
                    <span className="text-gray-500 text-sm">{featuredNews.date}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {featuredNews.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredNews.readTime}
                    </span>
                    <Link href={`/tin-tuc/${featuredNews.id}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Đọc thêm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Tin tức mới nhất</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.slice(1).map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <p className="text-xs">Hình ảnh</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-gray-500 text-xs">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {article.readTime}
                      </span>
                      <Link href={`/tin-tuc/${article.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Đọc thêm →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Trước
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">2</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">3</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Sau
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Đăng ký nhận tin tức
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Nhận những tin tức mới nhất về ngành xây dựng và các dự án của chúng tôi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
