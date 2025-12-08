'use client'

import Link from 'next/link'
import { partners } from '@/data/partners'

interface PartnersSectionProps {
  title?: string
  subtitle?: string
  showDescription?: boolean
  className?: string
}

export default function PartnersSection({
  title = "ĐỐI TÁC CHIẾN LƯỢC",
  subtitle = "Chúng tôi hợp tác với các thương hiệu uy tín trong ngành",
  showDescription = false,
  className = ""
}: PartnersSectionProps) {
  return (
    <section className={`py-16 bg-gradient-to-br from-gray-50 to-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative">
            <span className="bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
              {title}
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div
              key={`partner-${partner.id}-${index}`}
              className="group cursor-pointer precision-cut"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {partner.website ? (
                <Link href={partner.website} target="_blank" rel="noopener noreferrer">
                  <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-blue-300">
                    {/* Partner Logo */}
                    <div className="aspect-square flex items-center justify-center mb-4 bg-gray-50 rounded-lg overflow-hidden">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Partner Name */}
                    <div className="text-center">
                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {partner.name}
                      </h3>
                      {showDescription && partner.description && (
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                          {partner.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  {/* Partner Logo */}
                  <div className="aspect-square flex items-center justify-center mb-4 bg-gray-50 rounded-lg overflow-hidden">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Partner Name */}
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {partner.name}
                    </h3>
                    {showDescription && partner.description && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {partner.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Bạn muốn trở thành đối tác của chúng tôi?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://zalo.me/0931535007"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
            >
              Liên hệ hợp tác
            </a>
            <a
              href="mailto:contact@phuanphat.vn"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all"
            >
              Gửi email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
