# Implementation Plan - Partners Carousel

- [x] 1. Tạo custom hooks cho carousel logic


  - Tạo file `src/hooks/useCarousel.ts` với logic điều hướng carousel
  - Implement state management: currentIndex, isTransitioning
  - Implement methods: goToNext, goToPrevious, goToSlide
  - Implement responsive itemsPerView logic với useEffect và resize listener
  - Calculate totalSlides dựa trên partners.length và itemsPerView
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.1, 3.2, 3.3, 3.4_



- [ ] 2. Tạo custom hook cho touch/swipe handling
  - Tạo file `src/hooks/useSwipe.ts` với logic xử lý cử chỉ vuốt
  - Implement handleTouchStart, handleTouchMove, handleTouchEnd
  - Calculate swipe distance và direction


  - Trigger callback khi swipe vượt threshold (50px)
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 3. Tạo NavigationArrows component
  - Tạo file `src/components/carousel/NavigationArrows.tsx`
  - Implement left và right arrow buttons với icons (ChevronLeft, ChevronRight)
  - Style buttons: bg-white, border-2 border-blue-600, rounded-full
  - Implement hover effects: bg-blue-600, text-white


  - Implement disabled state với opacity-50 và cursor-not-allowed
  - Add onClick handlers cho onPrevious và onNext
  - Position arrows ở hai bên carousel (absolute positioning)
  - _Requirements: 1.2, 1.3, 1.4, 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 4. Tạo DotsIndicator component
  - Tạo file `src/components/carousel/DotsIndicator.tsx`


  - Render array of dots dựa trên totalSlides
  - Style dots: w-3 h-3, rounded-full, gap-2
  - Active dot: bg-blue-600, Inactive: bg-gray-300
  - Implement onClick handler để jump to specific slide
  - Add transition effects cho active state
  - _Requirements: 4.1, 4.2, 4.3, 4.4_



- [ ] 5. Tạo PartnerCard component
  - Tạo file `src/components/carousel/PartnerCard.tsx`
  - Extract card rendering logic từ Partners.tsx hiện tại
  - Maintain tất cả styling hiện có: shadow-lg, hover effects, scale transform
  - Support cả có và không có website link
  - Maintain aspect-square cho logo container
  - _Requirements: 5.4, 5.5_

- [ ] 6. Tạo PartnersCarousel component
  - Tạo file `src/components/carousel/PartnersCarousel.tsx`
  - Import và sử dụng useCarousel hook


  - Import và sử dụng useSwipe hook
  - Render carousel container với overflow-hidden
  - Render carousel track với flex layout và transform style
  - Calculate và apply transform: translateX(-currentIndex * 100%)
  - Add transition: transform 400ms ease-in-out
  - Render PartnerCard components trong carousel track
  - Calculate width cho mỗi slide: calc((100% - gap) / itemsPerView)
  - Integrate NavigationArrows component


  - Integrate DotsIndicator component
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.1, 5.2, 5.3_

- [ ] 7. Update Partners component để sử dụng carousel
  - Update file `src/components/Partners.tsx`
  - Replace grid layout với PartnersCarousel component


  - Pass partners data vào PartnersCarousel
  - Maintain section styling: py-20, bg-gradient
  - Maintain header: "ĐỐI TÁC CHIẾN LƯỢC" với gradient text
  - Maintain CTA section với contact buttons
  - Handle edge cases: empty list, single partner, few partners
  - _Requirements: 1.1, 3.1, 3.2, 3.3, 3.4_





- [ ] 8. Implement error handling và edge cases
  - Add conditional rendering trong Partners.tsx cho empty partners list
  - Hide navigation arrows khi partners.length <= itemsPerView
  - Hide dots indicator khi totalSlides <= 1
  - Disable navigation buttons ở boundaries (first/last slide)
  - Add isTransitioning flag để prevent rapid clicking
  - _Requirements: 1.5_

- [ ] 9. Add accessibility features
  - Add aria-label cho navigation arrows: "Previous partners", "Next partners"
  - Add aria-label cho dots: "Go to slide X"
  - Add aria-live="polite" cho carousel track
  - Add keyboard support: Tab navigation, Enter/Space activation
  - Add aria-disabled cho disabled buttons
  - Ensure partner links có proper focus states
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 10. Optimize performance
  - Add loading="lazy" cho partner logo images
  - Add will-change: transform cho carousel track
  - Implement debounce cho resize handler (200ms)
  - Use CSS transform thay vì left/right positioning
  - Set fixed height cho carousel container để prevent layout shift
  - _Requirements: 5.1, 5.2, 5.3_

- [ ]* 11. Write unit tests cho carousel hooks
  - Test useCarousel hook: goToNext, goToPrevious, goToSlide
  - Test boundary conditions: first slide, last slide
  - Test responsive itemsPerView calculation
  - Test useSwipe hook: swipe detection, threshold, callbacks
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2_

- [ ]* 12. Write integration tests
  - Test navigation arrows click handlers
  - Test dots indicator click handlers
  - Test swipe gestures on touch devices
  - Test responsive behavior với different screen sizes
  - Test edge cases: empty list, single item, few items
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 3.1, 3.2, 3.3, 4.3_
