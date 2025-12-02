'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components'
import PageHeader from '@/components/PageHeader'
import { useData } from '@/contexts/DataContext'
import { useState } from 'react'

export default function NewsPage() {
  const { newsArticles } = useData()
  const featuredNews = newsArticles[0]
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...new Set(newsArticles.map(a => a.category))]
  
  const filteredNews = activeCategory === 'all' 
    ? newsArticles.slice(1) 
    : newsArticles.slice(1).filter(a => a.category === activeCategory)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <PageHeader
        title="TIN TỨC & SỰ KIỆN"
        description="Cập nhật những thông tin mới nhất về ngành thép, công nghệ gia công và các dự án của Phú An Phát."
        stats={[
          { value: '50+', label: 'Bài viết', color: 'text-blue-600' },
          { value: '10+', label: 'Chủ đề', color: 'text-red-600' },
          { value: '1000+', label: 'Lượt xem', color: 'text-green-600' },
          { value: 'Hàng tuần', label: 'Cập nhật', color: 'text-purple-600' }
        ]}
      />

      {/* Featured News - Hero Style */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Tin tức nổi bật</h2>
              <p className="text-slate-500">Bài viết được quan tâm nhất</p>
            </div>
          </div>

          <Link href={`/tin-tuc/${featuredNews.id}`} className="group block">
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                  {featuredNews.image ? (
                    <img
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent lg:hidden"></div>
                </div>

                {/* Content */}
                <div className="relative p-8 lg:p-12 flex flex-col justify-center">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold backdrop-blur-sm border border-blue-500/30">
                        {featuredNews.category}
                      </span>
                      <span className="text-slate-400 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {featuredNews.date}
                      </span>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                      {featuredNews.title}
                    </h3>

                    <p className="text-slate-300 text-lg mb-8 leading-relaxed line-clamp-3">
                      {featuredNews.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      {featuredNews.readTime && (
                        <span className="text-slate-400 text-sm flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {featuredNews.readTime}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl group-hover:from-blue-500 group-hover:to-blue-400 transition-all shadow-lg shadow-blue-500/30">
                        Đọc ngay
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800">Tin tức mới nhất</h2>
                <p className="text-slate-500">Cập nhật hàng ngày</p>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'Tất cả' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* News Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article, index) => (
              <Link 
                key={article.id} 
                href={`/tin-tuc/${article.id}`}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100 h-full flex flex-col group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-slate-700 rounded-lg text-xs font-semibold shadow-sm">
                        {article.category}
                      </span>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg text-xs font-semibold shadow-sm">
                        {article.date}
                      </span>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      {article.readTime && (
                        <span className="text-slate-400 text-xs flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {article.readTime}
                        </span>
                      )}
                      <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Xem Thêm
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Xem thêm bài viết
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter - Modern Design */}
      <section className="py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Đăng ký nhận tin tức
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Nhận những tin tức mới nhất về ngành thép và các dự án của chúng tôi trực tiếp vào email
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
              />
            </div>
            <Link 
              href="/lien-he" 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Đăng ký ngay
            </Link>
          </div>
          
          <p className="text-blue-200 text-sm mt-6">
            Chúng tôi cam kết không spam. Bạn có thể hủy đăng ký bất cứ lúc nào.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
