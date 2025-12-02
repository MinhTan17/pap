'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export default function HotlineSection() {
  const t = useTranslations('hotline')
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }
  
  return (
    <section 
      className="relative py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Moving gradient that follows mouse */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-4 h-4 bg-blue-500/30 rounded-full animate-float"></div>
        <div className="absolute top-40 left-[20%] w-2 h-2 bg-red-500/40 rounded-full animate-float-delayed"></div>
        <div className="absolute top-32 right-[15%] w-3 h-3 bg-blue-400/30 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-[30%] w-2 h-2 bg-white/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 right-[25%] w-4 h-4 bg-red-400/20 rounded-full animate-float"></div>
        
        {/* Large gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-red-500/5 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Grid pattern with gradient fade */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Diagonal lines */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,0.1) 100px, rgba(255,255,255,0.1) 101px)`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Quote Section with animations */}
          <div className={`lg:w-3/5 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Animated quote icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 backdrop-blur-sm relative group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <svg className="w-10 h-10 text-blue-400 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-3xl border border-blue-500/30 animate-spin-slow"></div>
            </div>
            
            <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light leading-relaxed mb-8">
              <span className="relative">
                <span className="relative z-10">&ldquo;{t('quote')}&rdquo;</span>
                {/* Highlight effect */}
                <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-500/20 to-red-500/20 -z-0"></span>
              </span>
            </blockquote>
            
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent"></div>
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Phú An Phát </span>
              <div className="h-px w-16 bg-gradient-to-l from-red-500 via-red-400 to-transparent lg:hidden"></div>
            </div>
          </div>

          {/* Hotline Card with enhanced effects */}
          <div className={`lg:w-2/5 w-full max-w-md transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative group">
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-500 to-red-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-700 animate-gradient-shift pointer-events-none"></div>
              
              {/* Rotating border */}
              <div className="absolute -inset-[2px] rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 animate-spin-slow opacity-50"></div>
              </div>
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-xl">
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine"></div>
                </div>
                
                {/* Header */}
                <div className="relative flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/40">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-2xl bg-green-400/30 animate-ping-slow"></div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{t('title')}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <span className="text-green-400 text-xs font-medium">Sẵn sàng hỗ trợ 24/7</span>
                    </div>
                  </div>
                </div>

                {/* Phone Number with typewriter effect */}
                <a href="tel:0931535007" className="block group/phone mb-6">
                  <div className="text-5xl md:text-6xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent group-hover/phone:from-blue-400 group-hover/phone:via-white group-hover/phone:to-red-400 transition-all duration-500 animate-text-shimmer bg-[length:200%_auto]">
                      0931 535 007
                    </span>
                  </div>
                  <div className="mt-2 text-slate-500 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Nhấn để gọi ngay
                  </div>
                </a>

                {/* CTA Button with ripple */}
                <a 
                  href="tel:0931535007"
                  className="relative flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white font-bold rounded-2xl transition-all duration-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 overflow-hidden group/btn"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                  <svg className="w-5 h-5 animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="relative">Gọi ngay</span>
                </a>

                {/* Contact options with hover effects */}
                <div className="relative z-20 flex items-center justify-center gap-3 mt-8 pt-6 border-t border-slate-700/50">
                  <a 
                    href="https://zalo.me/0931535007" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative z-30 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://zalo.me/0931535007', '_blank');
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/>
                    </svg>
                    Zalo
                  </a>
                  <a 
                    href="mailto:contact@phuanphat.com" 
                    className="relative z-30 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 hover:text-white text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-500/20 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = 'mailto:contact@phuanphat.com';
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shine {
          from { transform: translateX(-100%) skewX(-12deg); }
          to { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; animation-delay: 1s; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-gradient-shift { animation: gradient-shift 3s ease infinite; background-size: 200% 200%; }
        .animate-shine { animation: shine 1.5s ease-in-out; }
        .animate-text-shimmer { animation: text-shimmer 3s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
