'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">PHÚ AN PHÁT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium uppercase">
              Trang chủ
            </Link>
            <Link href="/gioi-thieu" className="text-gray-700 hover:text-blue-600 font-medium uppercase">
              Giới thiệu
            </Link>
            <Link href="/san-pham" className="text-gray-700 hover:text-blue-600 font-medium uppercase">
              Sản phẩm
            </Link>
            <Link href="/dich-vu" className="text-gray-700 hover:text-blue-600 font-medium uppercase">
              Dịch vụ
            </Link>
            <Link href="/tin-tuc" className="text-gray-700 hover:text-blue-600 font-medium uppercase">
              Tin tức
            </Link>
            <Link href="/lien-he" className="text-gray-700 hover:text-blue-600 font-medium uppercase">
              Liên hệ
            </Link>
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
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
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Trang chủ
              </Link>
              <Link href="/gioi-thieu" className="text-gray-700 hover:text-blue-600 font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Giới thiệu
              </Link>
              <Link href="/san-pham" className="text-gray-700 hover:text-blue-600 font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Sản phẩm
              </Link>
              <Link href="/dich-vu" className="text-gray-700 hover:text-blue-600 font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Dịch vụ
              </Link>
              <Link href="/tin-tuc" className="text-gray-700 hover:text-blue-600 font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Tin tức
              </Link>
              <Link href="/lien-he" className="text-gray-700 hover:text-blue-600 font-medium py-2 uppercase" onClick={() => setIsMenuOpen(false)}>
                Liên hệ
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
