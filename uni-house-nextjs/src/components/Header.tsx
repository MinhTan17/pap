'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
      router.refresh()
    })
  }

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
            <Link href="/san-pham" className="construction-link font-medium uppercase">
              {t('product')}
            </Link>
            <Link href="/dich-vu" className="construction-link font-medium uppercase">
              {t('service')}
            </Link>
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
              <Link href="/san-pham" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                {t('product')}
              </Link>
              <Link href="/dich-vu" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                {t('service')}
              </Link>
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
