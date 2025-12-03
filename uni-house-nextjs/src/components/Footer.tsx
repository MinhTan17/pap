'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & Company Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/icons/banners/logo.png"
                alt="Phú An Phát logo"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Nhà cung cấp thép và dịch vụ gia công chuyên nghiệp hàng đầu Việt Nam.
            </p>
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Chất lượng - Uy tín - Chuyên nghiệp</span>
            </div>
          </div>

          {/* Dịch vụ chúng tôi */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-blue-500"></span>
              {t('servicesTitle')}
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/dich-vu/1', name: 'Gia công cắt Laser CNC' },
                { href: '/dich-vu/2', name: 'Gia công phay và mài 6 mặt' },
                { href: '/dich-vu/3', name: 'Gia công cắt cưa thép' },
                { href: '/dich-vu/4', name: 'Xử lý nhiệt - Nhiệt luyện' },
                { href: '/dich-vu/5', name: 'Gia công cắt Plasma' },
                { href: '/dich-vu/6', name: 'Gia công Oxy Gas - CNC' },
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href} 
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sản phẩm */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-red-500"></span>
              {t('productsTitle')}
            </h3>
            <ul className="space-y-2">
              {[
                'Hợp kim',
                'Thép làm khuôn',
                'Thép chế tạo máy',
                'Thép Carbon',
                'Thép không rỉ',
              ].map((product, index) => (
                <li key={index}>
                  <Link 
                    href="/san-pham" 
                    className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-green-500"></span>
              PHÚ AN PHÁT
            </h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase">{t('address')}</p>
                <p className="text-gray-300">Đường số 9, KCN Tam Phước, p. Tam Phước, Đồng Nai</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">{t('hotline')}</p>
                <a href="tel:0931535007" className="text-blue-400 hover:text-blue-300 font-medium">0931 535 007</a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">{t('email')}</p>
                <a href="mailto:sales.phuanphat@gmail.com" className="text-gray-300 hover:text-white">sales.phuanphat@gmail.com</a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">{t('website')}</p>
                <a href="https://www.phuanphat.com.vn" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">www.phuanphat.com.vn</a>
              </div>
            </div>
          </div>
        </div>

        {/* Chi nhánh & Social Media */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Chi nhánh miền Bắc */}
            <div className="bg-yellow-500/10 rounded-xl px-5 py-4 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400 text-xs uppercase tracking-wide">Chi nhánh miền Bắc:</span>
                <span className="text-white font-semibold">HẢO AN PHÁT</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400">
                <span>Thôn Phù Trì, Xã Quang Minh, Hà Nội</span>
                <a href="tel:0868586927" className="text-yellow-400 hover:text-yellow-300">0868 586 927</a>
                <a href="https://haoanphat.vn" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">haoanphat.vn</a>
              </div>
            </div>

            {/* Social Media - Chỉ 3 icons chính */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm mr-2">Theo dõi:</span>
              <a href="https://www.facebook.com/share/1GMhCrG3Sm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@phuanphatthep233" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center hover:bg-red-500 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://zalo.me/0931535007" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center hover:bg-blue-400 transition-colors">
                <span className="text-white font-bold text-xs">Zalo</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <span className="text-gray-500">{t('copyright')}</span>
            
            {/* Developer Credit - Professional Style */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div className="flex items-center gap-2">
                
                <span className="text-gray-400">Design by</span>
                <span className="text-white font-medium">Võ Minh Tân</span>
              </div>
              <span className="text-gray-600">|</span>
              <a 
                href="https://zalo.me/0337854179" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                0337 854 179
              </a>
              <span className="text-gray-600">|</span>
              <a 
                href="mailto:vominhtan.contact@gmail.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                vominhtan.contact@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
