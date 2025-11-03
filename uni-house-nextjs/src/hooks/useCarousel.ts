import { useState, useEffect, useCallback } from 'react';

interface UseCarouselProps {
  totalItems: number;
  initialIndex?: number;
}

interface UseCarouselReturn {
  currentIndex: number;
  isTransitioning: boolean;
  itemsPerView: number;
  totalSlides: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  goToSlide: (index: number) => void;
}

// Debounce helper function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function useCarousel({ 
  totalItems, 
  initialIndex = 0 
}: UseCarouselProps): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Calculate total slides based on items per view
  const totalSlides = Math.ceil(totalItems / itemsPerView);

  // Calculate navigation boundaries
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalSlides - 1;

  // Responsive items per view logic with debounced resize handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2); // mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3); // tablet
      } else {
        setItemsPerView(4); // desktop
      }
    };

    // Debounce resize handler for better performance
    const debouncedHandleResize = debounce(handleResize, 200);

    handleResize();
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  // Reset to first slide if current index exceeds new total slides
  useEffect(() => {
    if (currentIndex >= totalSlides && totalSlides > 0) {
      setCurrentIndex(totalSlides - 1);
    }
  }, [totalSlides, currentIndex]);

  // Navigate to next slide
  const goToNext = useCallback(() => {
    if (canGoNext && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400); // Match transition duration
    }
  }, [canGoNext, isTransitioning]);

  // Navigate to previous slide
  const goToPrevious = useCallback(() => {
    if (canGoPrevious && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400); // Match transition duration
    }
  }, [canGoPrevious, isTransitioning]);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides && index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400); // Match transition duration
    }
  }, [totalSlides, currentIndex, isTransitioning]);

  return {
    currentIndex,
    isTransitioning,
    itemsPerView,
    totalSlides,
    canGoPrevious,
    canGoNext,
    goToNext,
    goToPrevious,
    goToSlide,
  };
}
