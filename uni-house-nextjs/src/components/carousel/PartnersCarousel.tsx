'use client';

import { Partner } from '@/data/partners';
import { useCarousel } from '@/hooks/useCarousel';
import { useSwipe } from '@/hooks/useSwipe';
import { useDrag } from '@/hooks/useDrag';
import DotsIndicator from './DotsIndicator';
import PartnerCard from './PartnerCard';

interface PartnersCarouselProps {
  partners: Partner[];
}

export default function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const {
    currentIndex,
    isTransitioning,
    itemsPerView,
    totalSlides,
    canGoPrevious,
    canGoNext,
    goToNext,
    goToPrevious,
    goToSlide,
  } = useCarousel({
    totalItems: partners.length,
  });

  // Prevent navigation during transition (rapid clicking protection)
  const handleNext = () => {
    if (!isTransitioning && canGoNext) {
      goToNext();
    }
  };

  const handlePrevious = () => {
    if (!isTransitioning && canGoPrevious) {
      goToPrevious();
    }
  };

  const handleDotClick = (index: number) => {
    if (!isTransitioning) {
      goToSlide(index);
    }
  };

  // Touch/Swipe handlers for mobile
  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
    threshold: 50,
  });

  // Mouse drag handlers for desktop
  const { isDragging, ...dragHandlers } = useDrag({
    onDragLeft: handleNext,
    onDragRight: handlePrevious,
    threshold: 50,
  });

  // Calculate transform offset
  const offset = -(currentIndex * 100);

  // Show navigation only if there are multiple slides
  // Hide when partners count is less than or equal to itemsPerView
  const showNavigation = totalSlides > 1 && partners.length > itemsPerView;

  return (
    <div className="relative">
      {/* Carousel Container with fixed height to prevent layout shift */}
      <div
        className={`relative overflow-hidden min-h-[160px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        {...swipeHandlers}
        {...dragHandlers}
      >
        {/* Carousel Track */}
        <div
          className="flex transition-transform duration-400 ease-in-out select-none"
          style={{
            transform: `translateX(${offset}%)`,
            willChange: 'transform',
          }}
          aria-live="polite"
        >
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex-shrink-0 px-2 group"
              style={{
                width: `${100 / itemsPerView}%`,
              }}
            >
              <PartnerCard partner={partner} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {showNavigation && (
        <DotsIndicator
          totalSlides={totalSlides}
          currentSlide={currentIndex}
          onDotClick={handleDotClick}
        />
      )}
    </div>
  );
}
