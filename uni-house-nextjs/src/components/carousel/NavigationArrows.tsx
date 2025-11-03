interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export default function NavigationArrows({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: NavigationArrowsProps) {
  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous partners"
        aria-disabled={!canGoPrevious}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          w-12 h-12 rounded-full
          bg-white/80 backdrop-blur-sm border-2 border-blue-600/60
          flex items-center justify-center
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
          ${
            canGoPrevious
              ? 'hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer'
              : 'opacity-40 cursor-not-allowed'
          }
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next partners"
        aria-disabled={!canGoNext}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          w-12 h-12 rounded-full
          bg-white/80 backdrop-blur-sm border-2 border-blue-600/60
          flex items-center justify-center
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
          ${
            canGoNext
              ? 'hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer'
              : 'opacity-40 cursor-not-allowed'
          }
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </>
  );
}
