'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header, Footer } from '@/components'
import { useData } from '@/contexts/DataContext'
import { NewsItem } from '@/data/news'

export default function NewsDetailPage() {
  const params = useParams()
  const { newsArticles } = useData()
  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) {
      notFound()
      return
    }

    const idParam = params.id
    const newsId = typeof idParam === 'string' ? parseInt(idParam, 10) : parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10)

    if (isNaN(newsId)) {
      notFound()
      return
    }

    const foundNews = newsArticles.find(n => n.id === newsId)

    if (!foundNews) {
      notFound()
      return
    }

    setNews(foundNews)
    setLoading(false)
  }, [params.id, newsArticles])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // This should never be reached due to notFound() above, but keeping for type safety
  if (!news) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className={`bg-gradient-to-r ${news.color || 'from-blue-600 to-blue-800'} text-white py-20`}>
          <div className="container mx-auto px-4">
            <Link href="/tin-tuc" className="inline-block mb-4 text-white/80 hover:text-white">
              ← Quay lại danh sách tin tức
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{news.title}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {news.date}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                {news.category}
              </span>
              {news.readTime && (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {news.readTime}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* News Image */}
        {news.image && (
          <div className="container mx-auto px-4 -mt-10">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Excerpt */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <p className="text-xl text-gray-700 leading-relaxed italic">
                "{news.excerpt}"
              </p>
            </div>

            {/* Detail Content */}
            {news.detailContent ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: news.detailContent }}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: `<p>${news.content}</p>` }}
                />
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <div className={`bg-gradient-to-r ${news.color || 'from-blue-600 to-blue-800'} rounded-lg p-6 text-white text-center`}>
                <h2 className="text-2xl font-bold mb-4">Quan tâm đến tin tức này?</h2>
                <p className="text-lg mb-6 text-white/90">Theo dõi để không bỏ lỡ những tin tức mới nhất</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/tin-tuc"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Xem tin tức khác
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/30"
                  >
                    Liên hệ với chúng tôi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
