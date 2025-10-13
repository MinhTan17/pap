'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      id: 1,
      title: "GIA CÔNG CẮT LASER CNC",
      subtitle: "CÔNG NGHỆ HIỆN ĐẠI",
      description: "Cung cấp dịch vụ gia công cắt laser CNC chính xác cao với công nghệ tiên tiến",
      gradient: "from-red-600 via-orange-500 to-yellow-500",
      icon: "laser"
    },
    {
      id: 2,
      title: "SẮT THÉP CHẤT LƯỢNG CAO", 
      subtitle: "NHẬP KHẨU TRỰC TIẾP",
      description: "Nhập khẩu và phân phối các loại sắt thép chất lượng cao từ các nước tiên tiến",
      gradient: "from-blue-600 via-blue-700 to-gray-800",
      icon: "steel"
    },
    {
      id: 3,
      title: "CƠ KHÍ CHÍNH XÁC",
      subtitle: "KINH NGHIỆM 20+ NĂM",
      description: "Đội ngũ kỹ thuật giàu kinh nghiệm, cam kết chất lượng và tiến độ giao hàng",
      gradient: "from-green-600 via-green-700 to-blue-800",
      icon: "precision"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'laser':
        return (
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'steel':
        return (
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'precision':
        return (
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className="relative h-96 md:h-[600px] overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="metal-texture w-full h-full"></div>
      </div>
      
      {/* Slider Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full bg-gradient-to-br ${slide.gradient} relative overflow-hidden`}>
              {/* Metal shine effect */}
              <div className="metal-shine absolute inset-0"></div>
              
              {/* Welding spark effect for laser slide */}
              {slide.icon === 'laser' && (
                <div className="welding-spark"></div>
              )}
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="text-center text-white max-w-4xl">
                  {/* Icon */}
                  <div className="mb-6 animate-fade-in-up">
                    {getIcon(slide.icon)}
                  </div>
                  
                  {/* Subtitle */}
                  <p className="text-lg md:text-xl font-semibold mb-4 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {slide.subtitle}
                  </p>
                  
                  {/* Main Title */}
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    {slide.title}
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    {slide.description}
                  </p>
                </div>
              </div>
              
              {/* Industrial corner accents */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-black opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[60px] border-r-transparent border-b-[60px] border-b-black opacity-20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 steel-glow ${
              index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all steel-glow"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all steel-glow"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}
