'use client'

import { useData } from '@/contexts/DataContext'
import { useTranslations } from 'next-intl'

export default function NewsSection() {
  const { homepageNews: newsItems } = useData()
  const t = useTranslations('news')

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'laser':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'steel':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'plasma':
        return (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="metal-texture w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 relative">
            <span className="gradient-primary bg-clip-text text-transparent">{t('title')}</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"></div>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <div key={news.id} className="group cursor-pointer precision-cut" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 steel-glow">
                {/* News Header */}
                <div className={`relative h-32 bg-gradient-to-r ${news.color} flex items-center justify-center overflow-hidden`}>
                  {/* Metal shine effect */}
                  <div className="metal-shine absolute inset-0"></div>
                  
                  {/* Welding spark effect for laser news */}
                  {news.icon === 'laser' && (
                    <div className="welding-spark"></div>
                  )}
                  
                  {/* Icon */}
                  <div className="relative z-10">
                    {getIcon(news.icon)}
                  </div>
                  
                  {/* Industrial corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-black opacity-20"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {news.description}
                  </p>

                  {/* Industrial bottom border */}
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
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
