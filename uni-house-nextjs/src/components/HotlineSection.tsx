'use client'

import { useTranslations } from 'next-intl'

export default function HotlineSection() {
  const t = useTranslations('hotline')
  
  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Quote */}
          <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-8">
            <p className="text-white text-lg md:text-xl leading-relaxed">
              &ldquo;{t('quote')}&rdquo;
            </p>
          </div>

          {/* Hotline Button */}
          <div className="lg:w-1/3 text-center lg:text-right">
            <div className="bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg p-6 inline-block">
              <button className="text-white font-bold text-lg mb-2 block">
                {t('title')}
              </button>
              <div className="text-white text-2xl md:text-3xl font-bold">
                0931 535 007
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
