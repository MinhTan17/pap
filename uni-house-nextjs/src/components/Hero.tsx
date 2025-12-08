'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useData } from '@/contexts/DataContext'
import { useSwipe } from '@/hooks/useSwipe'
import { useDrag } from '@/hooks/useDrag'

export default function Hero() {
  const { banners, reloadFromStorage } = useData()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imgErrorIds, setImgErrorIds] = useState<Set<number>>(new Set())
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    reloadFromStorage()
  }, [reloadFromStorage])

  useEffect(() => {
    const handleFocus = () => reloadFromStorage()
    const handleVisibilityChange = () => {
      if (!document.hidden) reloadFromStorage()
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [reloadFromStorage])

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length)
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [banners.length])

  const handleNext = useCallback(() => {
    if (!isTransitioning && banners.length > 0) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev + 1) % banners.length)
      setTimeout(() => setIsTransitioning(false), 600)
    }
  }, [isTransitioning, banners.length])

  const handlePrevious = useCallback(() => {
    if (!isTransitioning && banners.length > 0) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
      setTimeout(() => setIsTransitioning(false), 600)
    }
  }, [isTransitioning, banners.length])

  const handleDotClick = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true)
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 600)
    }
  }

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
    threshold: 50,
  })

  const { isDragging, ...dragHandlers } = useDrag({
    onDragLeft: handleNext,
    onDragRight: handlePrevious,
    threshold: 50,
  })

  return (
    <section className="relative w-full h-[55vh] sm:h-[65vh] md:h-[80vh] lg:h-[90vh] overflow-hidden bg-slate-900">
      {/* Main Slider */}
      <div
        className={`relative h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        {...swipeHandlers}
        {...dragHandlers}
      >
        {banners.map((slide, index) => (
          <div
            key={`slide-${index}-${slide.id}`}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {slide.image && !imgErrorIds.has(slide.id) ? (
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt || slide.title}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  quality={100}
                  unoptimized
                  className="object-cover object-center"
                  onError={() => {
                    setImgErrorIds((prev) => new Set(prev).add(slide.id))
                  }}
                />
              </div>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${slide.gradient}`} />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Dots */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex items-center justify-center px-4 py-4 bg-gradient-to-t from-black/30 to-transparent">
          <div className="flex items-center gap-2">
            {banners.map((banner, index) => (
              <button
                key={`dot-${index}-${banner.id}`}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-2 bg-white' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Side Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 group"
        aria-label="Previous"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 group"
        aria-label="Next"
      >
        <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}
