'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="construction-header-bg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 construction-logo rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold construction-text">PHÚ AN PHÁT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="construction-link font-medium uppercase">
              Trang chủ
            </Link>
            <Link href="/gioi-thieu" className="construction-link font-medium uppercase">
              Giới thiệu
            </Link>
            <Link href="/san-pham" className="construction-link font-medium uppercase">
              Sản phẩm
            </Link>
            <Link href="/dich-vu" className="construction-link font-medium uppercase">
              Dịch vụ
            </Link>
            <Link href="/tin-tuc" className="construction-link font-medium uppercase">
              Tin tức
            </Link>
            <Link href="/lien-he" className="construction-link font-medium uppercase">
              Liên hệ
            </Link>
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="construction-link">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="construction-link">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
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
                Trang chủ
              </Link>
              <Link href="/gioi-thieu" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Giới thiệu
              </Link>
              <Link href="/san-pham" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Sản phẩm
              </Link>
              <Link href="/dich-vu" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Dịch vụ
              </Link>
              <Link href="/tin-tuc" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Tin tức
              </Link>
              <Link href="/lien-he" className="construction-link font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Liên hệ
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
