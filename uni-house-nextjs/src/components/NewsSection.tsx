'use client'

import { useData } from '@/contexts/DataContext'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NewsSection() {
  const { newsArticles } = useData()
  const t = useTranslations('news')

  const homepageNews = newsArticles.slice(0, 6)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="metal-texture w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 relative">
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">{t('title')}</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"></div>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {homepageNews.map((news, index) => (
            <Link
              key={news.id}
              href={`/tin-tuc/${news.id}`}
              className="group block"
              onClick={(e) => {
                // Ensure navigation works in Next.js 13+ app router
                if (typeof window !== 'undefined') {
                  window.location.href = `/tin-tuc/${news.id}`
                }
              }}
            >
              <div className="relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 steel-glow cursor-pointer">
                {/* News Image */}
                <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                  {news.image ? (
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-center text-gray-600">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <p className="text-xs">Hình ảnh</p>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-800">{news.category}</span>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-white">{news.date}</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{news.title}</h3>
                      <p className="text-sm line-clamp-2 opacity-90">{news.excerpt}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                    {news.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {news.excerpt}
                  </p>

                  {/* Bottom info */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-gray-500">
                        <svg className="w-4 h-4 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{t('latest')}</span>
                      </div>
                      <span className="text-blue-600 font-medium">{t('viewMore')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
