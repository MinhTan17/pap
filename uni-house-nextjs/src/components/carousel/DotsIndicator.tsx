interface DotsIndicatorProps {
    totalSlides: number;
    currentSlide: number;
    onDotClick: (index: number) => void;
}

export default function DotsIndicator({
    totalSlides,
    currentSlide,
    onDotClick,
}: DotsIndicatorProps) {
    if (totalSlides <= 1) return null;

    return (
        <div
            className="flex items-center justify-center gap-2 mt-8"
            role="tablist"
            aria-label="Carousel navigation"
        >
            {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onDotClick(index)}
                    role="tab"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-selected={index === currentSlide}
                    aria-controls={`carousel-slide-${index}`}
                    className={`
            w-3 h-3 rounded-full
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
            ${index === currentSlide
                            ? 'bg-blue-600 scale-110'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }
          `}
                />
            ))}
        </div>
    );
}
