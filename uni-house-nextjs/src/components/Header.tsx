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
    <header className="construction-header-bg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/icons/banners/logo.png"
                alt="Phú An Phát logo"
                className="h-14 md:h-20 w-auto object-contain"
              />
              <span className="text-2xl font-bold construction-text"></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="construction-link font-medium uppercase">
              {t('home')}
            </Link>
            <Link href="/gioi-thieu" className="construction-link font-medium uppercase">
              {t('about')}
            </Link>
            
            {/* Products Dropdown */}
            <div className="relative" ref={productsDropdownRef}>
              <button
                className="construction-link font-medium uppercase flex items-center space-x-1"
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
              >
                <span>{t('product')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isProductsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50"
                  onMouseLeave={() => setIsProductsDropdownOpen(false)}
                >
                  <div className="py-2">
                    <Link
                      href="/san-pham"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium border-b"
                      onClick={() => setIsProductsDropdownOpen(false)}
                    >
                      TẤT CẢ SẢN PHẨM
                    </Link>
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProductsDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                className="construction-link font-medium uppercase flex items-center space-x-1"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              >
                <span>{t('service')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isServicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50"
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <div className="py-2">
                    <Link
                      href="/dich-vu"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium border-b"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      TẤT CẢ DỊCH VỤ
                    </Link>
                    {servicesList.map((service) => (
                      <Link
                        key={service.id}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsServicesDropdownOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/tin-tuc" className="construction-link font-medium uppercase">
              {t('news')}
            </Link>
            <Link href="/lien-he" className="construction-link font-medium uppercase">
              {t('contact')}
            </Link>
          </nav>

        
          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => switchLanguage('vi')}
              disabled={isPending || locale === 'vi'}
              className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-gray-100 ${locale === 'vi' ? 'font-semibold' : ''} disabled:opacity-50`}
            >
              <span className="text-lg">🇻🇳</span>
              <span className="text-sm">VI</span>
            </button>
            <button
              onClick={() => switchLanguage('en')}
              disabled={isPending || locale === 'en'}
              className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-gray-100 ${locale === 'en' ? 'font-semibold' : ''} disabled:opacity-50`}
            >
              <span className="text-lg">🇬🇧</span>
              <span className="text-sm">EN</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md construction-link hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                {t('home')}
              </Link>
              <Link href="/gioi-thieu" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                {t('about')}
              </Link>
              
              {/* Mobile Products Dropdown */}
              <div>
                <button
                  className="construction-link font-medium py-2 uppercase flex items-center justify-between w-full"
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                >
                  <span>{t('product')}</span>
                  <svg className={`w-4 h-4 transform transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileProductsOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      href="/san-pham"
                      className="block construction-link text-sm py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      TẤT CẢ SẢN PHẨM
                    </Link>
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="block construction-link text-sm py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className="construction-link font-medium py-2 uppercase flex items-center justify-between w-full"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                >
                  <span>{t('service')}</span>
                  <svg className={`w-4 h-4 transform transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileServicesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      href="/dich-vu"
                      className="block construction-link text-sm py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      TẤT CẢ DỊCH VỤ
                    </Link>
                    {servicesList.map((service) => (
                      <Link
                        key={service.id}
                        href={service.href}
                        className="block construction-link text-sm py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/tin-tuc" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                {t('news')}
              </Link>
              <Link href="/lien-he" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                {t('contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
