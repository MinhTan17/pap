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
    <section className="relative h-96 md:h-[600px] overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="metal-texture w-full h-full"></div>
      </div>
      
      {/* Slider Container */}
      <div 
        className={`relative h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        {...swipeHandlers}
        {...dragHandlers}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(${offset}%)`,
            willChange: 'transform',
          }}
        >
          {banners.map((slide, index) => (
            <div
              key={`${slide.id}-${slide.image}`}
              className="flex-shrink-0 w-full h-full"
            >
            <div className={`h-full relative overflow-hidden bg-gradient-to-br ${slide.gradient}`}>
              {/* Background Image (optional) */}
              {slide.image && !imgErrorIds.has(slide.id) && (
                  <img
                    src={slide.image}
                    alt={slide.imageAlt || slide.title}
                    className="w-full h-full object-cover"
                    onLoad={() => {
                      console.log('✅ Ảnh load thành công:', slide.image)
                    }}
                    onError={(e) => {
                      console.error('❌ Lỗi load ảnh:', slide.image)
                      console.error('Kiểm tra: File có tồn tại trong public/ không?')
                      setImgErrorIds((prev) => new Set(prev).add(slide.id))
                    }}
                  />
              )}
              
              {/* Dark overlay for better text readability */}
              {slide.image && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 z-[1]"></div>
              )}
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="text-center text-white max-w-4xl">
                  
                  {/* Subtitle */}
                  <p className="text-lg md:text-xl font-bold mb-4 tracking-wide uppercase animate-fade-in-up" 
                     style={{ 
                       animationDelay: '0.2s',
                       textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
                     }}>
                    {slide.subtitle}
                  </p>
                  
                  {/* Main Title */}
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight animate-fade-in-up" 
                      style={{ 
                        animationDelay: '0.4s',
                        textShadow: '3px 3px 10px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6)'
                      }}>
                    {slide.title}
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-in-up" 
                     style={{ 
                       animationDelay: '0.6s',
                       textShadow: '2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)'
                     }}>
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
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 steel-glow ${
              index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
