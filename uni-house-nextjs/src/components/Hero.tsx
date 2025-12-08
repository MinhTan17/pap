'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/contexts/DataContext'
import { useSwipe } from '@/hooks/useSwipe'
import { useDrag } from '@/hooks/useDrag'

export default function Hero() {
  const { banners, reloadFromStorage } = useData()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imgErrorIds, setImgErrorIds] = useState<Set<number>>(new Set())
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Force reload banners from localStorage on mount
  useEffect(() => {
    // Check localStorage directly
    const stored = localStorage.getItem('admin-banners')
    console.log('📦 localStorage admin-banners:', stored ? JSON.parse(stored) : 'EMPTY')

    reloadFromStorage()
  }, [reloadFromStorage])

  // Reload khi tab được focus lại (quay lại từ admin)
  useEffect(() => {
    const handleFocus = () => {
      console.log('👁️ Tab được focus, reload data...')
      reloadFromStorage()
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ Tab visible, reload data...')
        reloadFromStorage()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [reloadFromStorage])

  useEffect(() => {
    console.log('🎬 Hero banners:', banners)
    banners.forEach((banner, index) => {
      console.log(`Banner ${index + 1}:`, {
        id: banner.id,
        title: banner.title,
        image: banner.image,
        hasImage: !!banner.image
      })
    })
  }, [banners])

  useEffect(() => {
    if (banners.length > 0) {
      const timer = setInterval(() => {
        if (!isTransitioning) {
          handleNext()
        }
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [banners.length, isTransitioning])

  // Navigation handlers
  const handleNext = () => {
    if (!isTransitioning && banners.length > 0) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev + 1) % banners.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const handlePrevious = () => {
    if (!isTransitioning && banners.length > 0) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const handleDotClick = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  // Touch/Swipe handlers for mobile
  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
    threshold: 50,
  })

  // Mouse drag handlers for desktop
  const { isDragging, ...dragHandlers } = useDrag({
    onDragLeft: handleNext,
    onDragRight: handlePrevious,
    threshold: 50,
  })


  // Calculate transform offset
  const offset = -(currentSlide * 100)

  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[85vh] overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 modern-industrial"></div>

      {/* Slider Container */}
      <div
        className={`relative h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        {...swipeHandlers}
        {...dragHandlers}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(${offset}%)`,
            willChange: 'transform',
          }}
        >
          {banners.map((slide, index) => (
            <div
              key={`slide-${index}-${slide.id}`}
              className="flex-shrink-0 w-full h-full"
            >
              <div className={`h-full relative overflow-hidden bg-gradient-to-br ${slide.gradient}`}>
                {/* Background Image with modern overlay */}
                {slide.image && !imgErrorIds.has(slide.id) && (
                  <>
                    <img
                      src={slide.image}
                      alt={slide.imageAlt || slide.title}
                      className="hero-image w-full h-full object-cover object-center transition-transform duration-[10s] ease-out"
                      onLoad={() => {
                        console.log('✅ Ảnh load thành công:', slide.image)
                      }}
                      onError={(e) => {
                        console.error('❌ Lỗi load ảnh:', slide.image)
                        setImgErrorIds((prev) => new Set(prev).add(slide.id))
                      }}
                    />
                    {/* Much lighter overlay for clearer image visibility */}
                    <div className="absolute inset-0 hero-overlay-light z-[1]"></div>
                    <div className="absolute inset-0 hero-overlay-bottom z-[1]"></div>
                  </>
                )}

                {/* Content Container */}
                <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="max-w-3xl">
                      {/* Subtitle with modern styling */}
                      <div className="flex items-center mb-6 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 mr-4"></div>
                        <p className="text-blue-400 font-semibold text-sm md:text-base uppercase tracking-[0.2em]">
                          {slide.subtitle}
                        </p>
                      </div>

                      {/* Main Title with modern typography */}
                      <h1 className="heading-primary text-white mb-6 animate-slide-in-right" 
                          style={{ animationDelay: '0.4s' }}>
                        <span className="block">{slide.title}</span>
                      </h1>

                      {/* Description with better readability */}
                      <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed mb-8 animate-slide-in-right max-w-2xl"
                         style={{ animationDelay: '0.6s' }}>
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-right" style={{ animationDelay: '0.8s' }}>
                        <a
                          href="/san-pham"
                          className="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold hover-lift"
                        >
                          <span>Khám phá sản phẩm</span>
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                        <a
                          href="/dich-vu"
                          className="btn-secondary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold hover-lift"
                        >
                          <span>Dịch vụ gia công</span>
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modern geometric accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-500/20 to-transparent"></div>
                
                {/* Floating elements */}
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          {banners.map((banner, index) => (
            <button
              key={`dot-${index}-${banner.id}`}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 h-2 bg-white rounded-full' 
                  : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={handlePrevious}
        className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover-lift"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover-lift"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}
