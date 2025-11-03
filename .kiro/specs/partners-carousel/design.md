# Design Document - Partners Carousel

## Overview

Tính năng Partners Carousel sẽ chuyển đổi component Partners hiện tại từ grid layout tĩnh sang một carousel động với khả năng điều hướng bằng nút mũi tên và cử chỉ vuốt. Component sẽ sử dụng thư viện carousel phổ biến hoặc tự xây dựng logic carousel đơn giản với React hooks.

## Architecture

### Component Structure

```
Partners (Container)
├── PartnersCarousel (Main Carousel Logic)
│   ├── CarouselTrack (Sliding Container)
│   │   └── PartnerCard[] (Individual Partner Items)
│   ├── NavigationArrows (Left/Right Buttons)
│   └── DotsIndicator (Position Indicators)
└── CTA Section (Contact Buttons)
```

### Technology Stack

- **React Hooks**: useState, useEffect, useRef cho carousel logic
- **CSS/Tailwind**: Animations và transitions
- **Touch Events**: Hỗ trợ swipe gestures
- **Optional Library**: Có thể sử dụng `swiper` hoặc `embla-carousel-react` nếu cần tính năng nâng cao

## Components and Interfaces

### 1. Partners Component (Updated)

Component chính sẽ được cập nhật để sử dụng carousel thay vì grid.

```typescript
interface PartnersProps {
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

export default function Partners({ 
  autoScroll = false, 
  autoScrollInterval = 5000 
}: PartnersProps)
```

### 2. PartnersCarousel Component

Component carousel chính xử lý logic điều hướng và hiển thị.

```typescript
interface PartnersCarouselProps {
  partners: Partner[];
  itemsPerView: {
    mobile: number;    // 2
    tablet: number;    // 3
    desktop: number;   // 4
  };
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

interface CarouselState {
  currentIndex: number;
  isTransitioning: boolean;
  touchStart: number;
  touchEnd: number;
}
```

**Key Methods:**
- `goToNext()`: Di chuyển đến nhóm đối tác tiếp theo
- `goToPrevious()`: Di chuyển về nhóm đối tác trước
- `goToSlide(index)`: Nhảy đến slide cụ thể
- `handleTouchStart(e)`: Xử lý bắt đầu cử chỉ vuốt
- `handleTouchMove(e)`: Xử lý di chuyển trong khi vuốt
- `handleTouchEnd()`: Xử lý kết thúc cử chỉ vuốt và quyết định hướng

### 3. NavigationArrows Component

```typescript
interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  position?: 'sides' | 'bottom'; // Vị trí nút
}
```

**Styling:**
- Icon: Chevron Left/Right từ heroicons hoặc lucide-react
- Size: w-10 h-10 hoặc w-12 h-12
- Colors: bg-white với border blue-600, hover:bg-blue-600
- Disabled state: opacity-50 cursor-not-allowed

### 4. DotsIndicator Component

```typescript
interface DotsIndicatorProps {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
}
```

**Styling:**
- Dots: w-2 h-2 hoặc w-3 h-3 rounded-full
- Active: bg-blue-600
- Inactive: bg-gray-300
- Spacing: gap-2

### 5. PartnerCard Component (Extracted)

Tách logic hiển thị card đối tác thành component riêng để tái sử dụng.

```typescript
interface PartnerCardProps {
  partner: Partner;
  index: number;
}
```

## Data Models

### Partner Interface (Existing)

```typescript
interface Partner {
  id: number;
  name: string;
  logo: string;
  website?: string;
  description?: string;
}
```

### Carousel Configuration

```typescript
interface CarouselConfig {
  itemsPerView: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap: number; // Khoảng cách giữa các items (px)
  transitionDuration: number; // ms
  transitionTimingFunction: string; // ease-in-out
  swipeThreshold: number; // Minimum distance for swipe (px)
}

const defaultConfig: CarouselConfig = {
  itemsPerView: {
    mobile: 2,
    tablet: 3,
    desktop: 4,
  },
  gap: 32,
  transitionDuration: 400,
  transitionTimingFunction: 'ease-in-out',
  swipeThreshold: 50,
};
```

## Implementation Details

### Carousel Logic

**Calculation:**
```typescript
// Tính toán số slides dựa trên số items per view
const totalSlides = Math.ceil(partners.length / itemsPerView);

// Tính toán transform offset
const offset = -(currentIndex * 100);
const transform = `translateX(${offset}%)`;
```

**Responsive Items Per View:**
```typescript
const [itemsPerView, setItemsPerView] = useState(4);

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
  
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### Touch/Swipe Handling

```typescript
const handleTouchStart = (e: TouchEvent) => {
  setTouchStart(e.touches[0].clientX);
};

const handleTouchMove = (e: TouchEvent) => {
  setTouchEnd(e.touches[0].clientX);
};

const handleTouchEnd = () => {
  if (!touchStart || !touchEnd) return;
  
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > swipeThreshold;
  const isRightSwipe = distance < -swipeThreshold;
  
  if (isLeftSwipe && canGoNext) {
    goToNext();
  }
  if (isRightSwipe && canGoPrevious) {
    goToPrevious();
  }
  
  setTouchStart(0);
  setTouchEnd(0);
};
```

### CSS Structure

```css
/* Carousel Container */
.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

/* Carousel Track */
.carousel-track {
  display: flex;
  transition: transform 400ms ease-in-out;
  will-change: transform;
}

/* Carousel Slide */
.carousel-slide {
  flex: 0 0 auto;
  width: calc((100% - gap * (itemsPerView - 1)) / itemsPerView);
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.nav-arrow-left {
  left: -20px;
}

.nav-arrow-right {
  right: -20px;
}
```

## Error Handling

### Edge Cases

1. **Empty Partners List**
   - Display: "Chưa có đối tác nào"
   - Hide: Navigation arrows và dots

2. **Single Partner**
   - Display: Single card centered
   - Hide: Navigation arrows và dots

3. **Partners Count < Items Per View**
   - Display: All partners without carousel
   - Hide: Navigation arrows và dots

4. **Touch Event Not Supported**
   - Fallback: Chỉ sử dụng navigation arrows
   - No error shown to user

5. **Rapid Clicking**
   - Prevent: Disable buttons during transition
   - Use: `isTransitioning` state flag

### Error Boundaries

```typescript
// Wrap carousel in error boundary
<ErrorBoundary fallback={<StaticPartnersGrid />}>
  <PartnersCarousel />
</ErrorBoundary>
```

## Testing Strategy

### Unit Tests

1. **Carousel Navigation**
   - Test goToNext() increases currentIndex
   - Test goToPrevious() decreases currentIndex
   - Test boundaries (first/last slide)

2. **Responsive Behavior**
   - Test itemsPerView changes with window resize
   - Test calculation of totalSlides

3. **Touch Handling**
   - Test swipe left triggers goToNext()
   - Test swipe right triggers goToPrevious()
   - Test swipe threshold

### Integration Tests

1. **User Interactions**
   - Click right arrow → carousel moves right
   - Click left arrow → carousel moves left
   - Click dot indicator → carousel jumps to slide
   - Swipe left → carousel moves right
   - Swipe right → carousel moves left

2. **Responsive Display**
   - Mobile (< 640px) shows 2 items
   - Tablet (640-1023px) shows 3 items
   - Desktop (≥ 1024px) shows 4 items

3. **Visual Regression**
   - Carousel renders correctly on all screen sizes
   - Transitions are smooth
   - Hover effects work on partner cards

### Manual Testing Checklist

- [ ] Carousel hiển thị đúng số lượng items trên mobile/tablet/desktop
- [ ] Nút mũi tên hoạt động chính xác
- [ ] Vuốt trái/phải hoạt động trên thiết bị cảm ứng
- [ ] Dots indicator cập nhật đúng vị trí
- [ ] Click vào dot chuyển đến slide đúng
- [ ] Hiệu ứng transition mượt mà
- [ ] Hover effects trên partner cards vẫn hoạt động
- [ ] Links đến website đối tác vẫn hoạt động
- [ ] CTA buttons vẫn hiển thị và hoạt động

## Performance Considerations

1. **Lazy Loading Images**
   - Sử dụng `loading="lazy"` cho partner logos
   - Preload logos của slide hiện tại và kế tiếp

2. **Debounce Resize Handler**
   - Tránh tính toán lại quá nhiều khi resize
   - Sử dụng debounce 150-200ms

3. **CSS Transform**
   - Sử dụng `transform` thay vì `left/right` cho performance tốt hơn
   - Thêm `will-change: transform` cho carousel track

4. **Prevent Layout Shift**
   - Set fixed height cho carousel container
   - Use aspect-ratio cho partner cards

## Accessibility

1. **Keyboard Navigation**
   - Tab: Focus vào navigation arrows
   - Enter/Space: Activate arrow buttons
   - Arrow keys: Navigate carousel (optional)

2. **ARIA Labels**
   - `aria-label="Previous partners"` cho left arrow
   - `aria-label="Next partners"` cho right arrow
   - `aria-label="Go to slide X"` cho dots
   - `aria-live="polite"` cho carousel track

3. **Screen Readers**
   - Announce current slide: "Slide 1 of 3"
   - Announce partner name when focused

## Migration Plan

1. **Phase 1**: Tạo PartnersCarousel component mới
2. **Phase 2**: Test carousel với data hiện tại
3. **Phase 3**: Thay thế grid layout trong Partners component
4. **Phase 4**: Testing và fine-tuning
5. **Phase 5**: Deploy và monitor

## Alternative Approaches

### Option 1: Custom Implementation (Recommended)
- **Pros**: Full control, lightweight, no dependencies
- **Cons**: Cần implement logic từ đầu

### Option 2: Swiper Library
- **Pros**: Feature-rich, well-tested, nhiều options
- **Cons**: Bundle size lớn hơn (~50KB)

### Option 3: Embla Carousel
- **Pros**: Lightweight (~5KB), flexible, TypeScript support
- **Cons**: Learning curve, cần config

**Decision**: Bắt đầu với custom implementation đơn giản. Nếu cần tính năng nâng cao sau này, có thể migrate sang Embla Carousel.
