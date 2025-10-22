'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/contexts/DataContext'

export default function Hero() {
  const { banners } = useData()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imgErrorIds, setImgErrorIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (banners.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length)
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [banners.length])


  return (
    <section className="relative h-96 md:h-[600px] overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="metal-texture w-full h-full"></div>
      </div>
      
      {/* Slider Container */}
      <div className="relative h-full">
        {banners.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full relative overflow-hidden bg-gradient-to-br ${slide.gradient}`}>
              {/* Background Image (optional) */}
              {slide.image && !imgErrorIds.has(slide.id) && (
                  <img
                    src={slide.image}
                    alt={slide.imageAlt || slide.title}
                    className="w-full h-full object-cover"
                    onError={() => {
                      setImgErrorIds((prev) => new Set(prev).add(slide.id))
                    }}
                  />
              )}
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="text-center text-white max-w-4xl">
                  
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
        {banners.map((_, index) => (
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
        onClick={() => setCurrentSlide(currentSlide === 0 ? banners.length - 1 : currentSlide - 1)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all steel-glow"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % banners.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition-all steel-glow"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}
