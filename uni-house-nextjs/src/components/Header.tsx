'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const productsDropdownRef = useRef<HTMLDivElement>(null)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
      router.refresh()
    })
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false)
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Product categories for dropdown
  const productCategories = [
    { id: 'alloy', name: 'HỢP KIM', href: '/san-pham?category=alloy' },
    { id: 'mold-steel', name: 'THÉP LÀM KHUÔN', href: '/san-pham?category=mold-steel' },
    { id: 'machine-steel', name: 'THÉP CHẾ TẠO MÁY', href: '/san-pham?category=machine-steel' },
    { id: 'carbon-steel', name: 'THÉP CARBON', href: '/san-pham?category=carbon-steel' },
    { id: 'stainless-steel', name: 'THÉP KHÔNG RỈ', href: '/san-pham?category=stainless-steel' }
  ]

  // Services for dropdown
  const servicesList = [
    { id: 1, name: 'GIA CÔNG CẮT LASER CNC', href: '/dich-vu/1' },
    { id: 2, name: 'GIA CÔNG PHAY VÀ MÀI 6 MẶT', href: '/dich-vu/2' },
    { id: 3, name: 'GIA CÔNG CẮT CƯA THÉP', href: '/dich-vu/3' },
    { id: 4, name: 'XỬ LÝ NHIỆT - NHIỆT LUYỆN', href: '/dich-vu/4' },
    { id: 5, name: 'GIA CÔNG CẮT PLASMA', href: '/dich-vu/5' },
    { id: 6, name: 'GIA CÔNG OXY GAS - CNC', href: '/dich-vu/6' }
  ]

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 gap-2 flex-nowrap">
          {/* Logo Section */}
          <div className="flex-shrink-0 min-w-fit max-w-[50%] lg:max-w-none">
            <Link href="/" className="flex items-center space-x-2 lg:space-x-3 group min-w-fit">
              <div className="relative flex-shrink-0">
                <img
                  src="/icons/banners/logo.png"
                  alt="Phú An Phát logo"
                  className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  style={{ minWidth: '32px', minHeight: '32px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent whitespace-nowrap">
                  PHÚ AN PHÁT
                </div>
                <div className="text-xs lg:text-sm text-slate-500 font-medium tracking-wide whitespace-nowrap hidden md:block">
                  PROFESSIONAL STEEL SUPPLIER
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <nav className="hidden lg:flex items-center justify-end flex-1 min-w-0 mr-8">
            <div className="flex items-center gap-0 flex-nowrap">
              <Link
                href="/"
                className="px-2 xl:px-3 py-2 text-sm xl:text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 uppercase tracking-wide whitespace-nowrap"
              >
                {t('home')}
              </Link>
              <Link
                href="/gioi-thieu"
                className="px-2 xl:px-3 py-2 text-sm xl:text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 uppercase tracking-wide whitespace-nowrap"
              >
                {t('about')}
              </Link>

              {/* Products Dropdown */}
              <div className="relative" ref={productsDropdownRef}>
                <button
                  className="px-2 xl:px-3 py-2 text-sm xl:text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 uppercase tracking-wide flex items-center space-x-1 group whitespace-nowrap"
                  onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                >
                  <span>{t('product')}</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isProductsDropdownOpen && (
                  <div
                    className="dropdown-menu products"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                      <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Sản phẩm thép</h3>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/san-pham"
                        className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                        onClick={() => setIsProductsDropdownOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>TẤT CẢ SẢN PHẨM</span>
                        </div>
                      </Link>
                      {productCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setIsProductsDropdownOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                            <span>{category.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesDropdownRef}>
                <button
                  className="px-2 xl:px-3 py-2 text-sm xl:text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 uppercase tracking-wide flex items-center space-x-1 group whitespace-nowrap"
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                >
                  <span>{t('service')}</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isServicesDropdownOpen && (
                  <div
                    className="dropdown-menu services"
                  >
                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3">
                      <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Dịch vụ gia công</h3>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/dich-vu"
                        className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-red-50 hover:text-red-600 transition-colors border-b border-gray-100"
                        onClick={() => setIsServicesDropdownOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          <span>TẤT CẢ DỊCH VỤ</span>
                        </div>
                      </Link>
                      {servicesList.map((service) => (
                        <Link
                          key={service.id}
                          href={service.href}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                            <span className="line-clamp-1">{service.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/tin-tuc"
                className="px-2 xl:px-3 py-2 text-sm xl:text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 uppercase tracking-wide whitespace-nowrap"
              >
                {t('news')}
              </Link>
              <Link
                href="/lien-he"
                className="px-2 xl:px-3 py-2 text-sm xl:text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 uppercase tracking-wide whitespace-nowrap"
              >
                {t('contact')}
              </Link>
            </div>
          </nav>

          {/* Actions Section */}
          <div className="flex-shrink-0 flex items-center gap-1 min-w-fit">
            {/* Mobile Language Switcher (very compact) */}
            <div className="flex sm:hidden items-center">
              <button
                onClick={() => switchLanguage(locale === 'vi' ? 'en' : 'vi')}
                disabled={isPending}
                className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-md text-xs font-medium transition-all duration-200 hover:bg-slate-200 disabled:opacity-50"
                title={locale === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              >
                <span className="text-sm">{locale === 'vi' ? '🇬🇧' : '🇻🇳'}</span>
              </button>
            </div>

            {/* Desktop Language Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 flex-shrink-0">
              <button
                onClick={() => switchLanguage('vi')}
                disabled={isPending || locale === 'vi'}
                className={`flex items-center justify-center w-7 h-7 xl:w-8 xl:h-8 rounded-md text-sm font-medium transition-all duration-200 ${locale === 'vi'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
                  } disabled:opacity-50`}
                title="Tiếng Việt"
              >
                <span className="text-xs xl:text-sm">🇻🇳</span>
              </button>
              <button
                onClick={() => switchLanguage('en')}
                disabled={isPending || locale === 'en'}
                className={`flex items-center justify-center w-7 h-7 xl:w-8 xl:h-8 rounded-md text-sm font-medium transition-all duration-200 ${locale === 'en'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
                  } disabled:opacity-50`}
                title="English"
              >
                <span className="text-xs xl:text-sm">🇬🇧</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className={`w-6 h-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-semibold uppercase tracking-wide transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                href="/gioi-thieu"
                className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-semibold uppercase tracking-wide transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about')}
              </Link>

              {/* Mobile Products Dropdown */}
              <div className="bg-slate-50 rounded-lg overflow-hidden">
                <button
                  className="w-full px-4 py-3 text-slate-700 hover:text-blue-600 font-semibold uppercase tracking-wide flex items-center justify-between transition-colors"
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                >
                  <span>{t('product')}</span>
                  <svg className={`w-5 h-5 transform transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileProductsOpen && (
                  <div className="bg-white border-t border-gray-200">
                    <Link
                      href="/san-pham"
                      className="block px-6 py-3 text-sm font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>TẤT CẢ SẢN PHẨM</span>
                      </div>
                    </Link>
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="block px-6 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                          <span>{category.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Services Dropdown */}
              <div className="bg-slate-50 rounded-lg overflow-hidden">
                <button
                  className="w-full px-4 py-3 text-slate-700 hover:text-red-600 font-semibold uppercase tracking-wide flex items-center justify-between transition-colors"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                >
                  <span>{t('service')}</span>
                  <svg className={`w-5 h-5 transform transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileServicesOpen && (
                  <div className="bg-white border-t border-gray-200">
                    <Link
                      href="/dich-vu"
                      className="block px-6 py-3 text-sm font-medium text-slate-800 hover:bg-red-50 hover:text-red-600 transition-colors border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span>TẤT CẢ DỊCH VỤ</span>
                      </div>
                    </Link>
                    {servicesList.map((service) => (
                      <Link
                        key={service.id}
                        href={service.href}
                        className="block px-6 py-2.5 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                          <span className="line-clamp-2">{service.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/tin-tuc"
                className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-semibold uppercase tracking-wide transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('news')}
              </Link>
              <Link
                href="/lien-he"
                className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-semibold uppercase tracking-wide transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => switchLanguage('vi')}
                    disabled={isPending || locale === 'vi'}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${locale === 'vi'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                      } disabled:opacity-50`}
                  >
                    <span className="text-base">🇻🇳</span>
                    <span>Tiếng Việt</span>
                  </button>
                  <button
                    onClick={() => switchLanguage('en')}
                    disabled={isPending || locale === 'en'}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${locale === 'en'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                      } disabled:opacity-50`}
                  >
                    <span className="text-base">🇬🇧</span>
                    <span>English</span>
                  </button>
                </div>
              </div>


            </div>
          </div>
        )}
      </div>
    </header>
  )
}
