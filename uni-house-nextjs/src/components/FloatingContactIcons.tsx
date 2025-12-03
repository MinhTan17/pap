'use client'

import React, { useState, useEffect } from 'react'

interface FloatingContactIconProps {
  type: 'zalo' | 'fanpage' | 'phone'
  href: string
  color: string
  label: string
}

const FloatingContactIcons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const icons = [
    {
      type: 'zalo' as const,
      href: 'https://zalo.me/0931535007',
      color: '#0068FF',
      label: 'Zalo'
    },
    {
      type: 'fanpage' as const,
      href: 'https://www.facebook.com/share/1GMhCrG3Sm/?mibextid=wwXIfr',
      color: '#1877F2',
      label: 'Facebook'
    },
    {
      type: 'phone' as const,
      href: 'tel:0931535007',
      color: '#25D366',
      label: 'Gọi điện'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Desktop - Vertical layout on right side */}
      <div className={`fixed right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-4 hidden md:block transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-4'}`}>
        {icons.map((icon, index) => (
          <FloatingContactIcon
            key={icon.type}
            type={icon.type}
            href={icon.href}
            color={icon.color}
            label={icon.label}
            delay={index * 0.2}
          />
        ))}
      </div>

      {/* Mobile - Horizontal layout at bottom */}
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 md:hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {icons.map((icon, index) => (
          <a
            key={icon.type}
            href={icon.href}
            target={icon.type === 'phone' ? '_self' : '_blank'}
            rel={icon.type === 'phone' ? '' : 'noopener noreferrer'}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: icon.color }}
          >
            {icon.type === 'zalo' && (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M7.5 8.5h9v7h-9v-7z" fill="#0068FF" />
                <path d="M9 10.5h6v1h-6v-1zM9 12.5h4v1h-4v-1z" fill="white" />
              </svg>
            )}
            {icon.type === 'fanpage' && (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            )}
            {icon.type === 'phone' && (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            )}
          </a>
        ))}
      </div>
    </>
  )
}

const FloatingContactIcon: React.FC<FloatingContactIconProps & { delay: number }> = ({
  type,
  href,
  color,
  label,
  delay
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'zalo':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path d="M7.5 8.5h9v7h-9v-7z" fill="#0068FF" />
            <path d="M9 10.5h6v1h-6v-1zM9 12.5h4v1h-4v-1z" fill="white" />
          </svg>
        )
      case 'fanpage':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        )
      case 'phone':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="relative group animate-fade-in-up"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both'
      }}
    >
      <a
        href={href}
        className="relative block cursor-pointer"
        title={label}
        target={type === 'phone' ? '_self' : '_blank'}
        rel={type === 'phone' ? '' : 'noopener noreferrer'}
      >
        {/* Expanding wave effect */}
        <div className="absolute inset-0 rounded-full">
          {/* Wave Ring 1 */}
          <div
            className="absolute inset-0 rounded-full border-2 opacity-70"
            style={{
              borderColor: color,
              animation: 'expand-wave 5s ease-out infinite'
            }}
          />
          {/* Wave Ring 2 */}
          <div
            className="absolute inset-0 rounded-full border-2 opacity-50"
            style={{
              borderColor: color,
              animation: 'expand-wave 5s ease-out infinite',
              animationDelay: '1.7s'
            }}
          />
          {/* Wave Ring 3 */}
          <div
            className="absolute inset-0 rounded-full border-2 opacity-30"
            style={{
              borderColor: color,
              animation: 'expand-wave 5s ease-out infinite',
              animationDelay: '3.4s'
            }}
          />
        </div>

        {/* Main icon */}
        <div
          className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:rotate-6"
          style={{ backgroundColor: color }}
        >
          {renderIcon()}
        </div>

        {/* Label tooltip */}
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
          {label}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-800 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
        </div>
      </a>
    </div>
  )
}

export default FloatingContactIcons
