# Design Document - Performance Optimization

## Overview

Thiết kế này tập trung vào việc tối ưu hóa toàn diện hiệu suất website Next.js thông qua các chiến lược: tối ưu hóa hình ảnh, lazy loading thông minh, code splitting, caching strategies, và giảm thiểu bundle size. Mục tiêu là đạt Lighthouse score > 90 và LCP < 2.5s.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Service      │  │ Image        │  │ Component    │      │
│  │ Worker       │  │ Optimizer    │  │ Lazy Loader  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Server                            │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Static       │  │ API Routes   │  │ Image        │      │
│  │ Generation   │  │ with Cache   │  │ Optimization │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    CDN / Cache Layer                         │
└─────────────────────────────────────────────────────────────┘
```

### Performance Optimization Layers

1. **Build-time Optimization**: Code splitting, tree shaking, minification
2. **Runtime Optimization**: Lazy loading, dynamic imports, prefetching
3. **Asset Optimization**: Image compression, format conversion, responsive images
4. **Caching Strategy**: Browser cache, CDN cache, service worker cache
5. **Monitoring**: Real-time performance tracking, Core Web Vitals

## Components and Interfaces

### 1. Image Optimization System

#### ImageOptimizer Component
```typescript
interface ImageOptimizerProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  sizes?: string
  className?: string
}

// Sử dụng Next.js Image component với optimization
const OptimizedImage: React.FC<ImageOptimizerProps>
```

**Responsibilities:**
- Tự động chuyển đổi sang WebP/AVIF
- Lazy load images ngoài viewport
- Responsive images với srcset
- Blur placeholder cho better UX
- Priority loading cho critical images

**Implementation Strategy:**
- Sử dụng Next.js Image component
- Configure next.config.ts với formats, deviceSizes, imageSizes
- Implement blur placeholder với base64 hoặc shimmer effect
- Preload critical images (hero banners)

### 2. Component Lazy Loading System

#### LazyComponentLoader
```typescript
interface LazyLoadConfig {
  component: () => Promise<any>
  loading?: React.ComponentType
  ssr?: boolean
  suspense?: boolean
}

const createLazyComponent = (config: LazyLoadConfig) => React.ComponentType
```

**Responsibilities:**
- Dynamic import components below fold
- Show skeleton loaders during loading
- Prevent layout shift
- Optimize bundle splitting

**Components to Lazy Load:**
- ServicesSection (already done)
- ProductsSection (already done)
- NewsSection (already done)
- Partners (already done)
- HotlineSection (already done)
- Footer components (nếu nặng)
- Admin components
- Modal/Dialog components

### 3. Bundle Analyzer Integration

#### Bundle Analysis Tool
```typescript
interface BundleReport {
  totalSize: number
  gzippedSize: number
  modules: ModuleInfo[]
  recommendations: string[]
}

interface ModuleInfo {
  name: string
  size: number
  percentage: number
}
```

**Responsibilities:**
- Analyze bundle composition
- Identify large dependencies
- Suggest optimization opportunities
- Track bundle size over time

**Implementation:**
- Install @next/bundle-analyzer
- Configure in next.config.ts
- Generate reports after build
- Set up CI/CD checks for bundle size limits

### 4. Caching Strategy Manager

#### Cache Configuration
```typescript
interface CacheConfig {
  staticAssets: {
    maxAge: number // 1 year
    immutable: boolean
  }
  apiResponses: {
    strategy: 'stale-while-revalidate' | 'cache-first' | 'network-first'
    maxAge: number
  }
  images: {
    maxAge: number
    formats: string[]
  }
}
```

**Caching Layers:**

1. **Browser Cache (HTTP Headers)**
```typescript
// next.config.ts
headers: async () => [
  {
    source: '/_next/static/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  },
  {
    source: '/icons/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  }
]
```

2. **API Response Cache**
```typescript
// app/api/[route]/route.ts
export const revalidate = 3600 // 1 hour
export const dynamic = 'force-static' // for static data
```

3. **Service Worker Cache** (Optional - for offline support)
```typescript
// public/sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
```

### 5. Performance Monitoring System

#### PerformanceMonitor Component
```typescript
interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
  tbt: number // Total Blocking Time
}

const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>()
  
  useEffect(() => {
    // Track Core Web Vitals
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log)
        getFID(console.log)
        getFCP(console.log)
        getLCP(console.log)
        getTTFB(console.log)
      })
    }
  }, [])
  
  return metrics
}
```

**Responsibilities:**
- Track Core Web Vitals in real-time
- Send metrics to analytics
- Alert on performance regressions
- Generate performance reports

### 6. Code Splitting Strategy

#### Route-based Splitting
```typescript
// Automatic với Next.js App Router
// Mỗi page.tsx tự động được split thành separate bundle
```

#### Component-based Splitting
```typescript
// Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
})

const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <Loading />,
  ssr: false
})
```

#### Library Splitting
```typescript
// next.config.ts
experimental: {
  optimizePackageImports: [
    '@tiptap/react',
    '@tiptap/starter-kit',
    'react-icons'
  ]
}
```

## Data Models

### Performance Budget
```typescript
interface PerformanceBudget {
  javascript: {
    maxSize: 200 * 1024 // 200KB gzipped
    warning: 150 * 1024 // 150KB gzipped
  }
  css: {
    maxSize: 50 * 1024 // 50KB gzipped
    warning: 40 * 1024 // 40KB gzipped
  }
  images: {
    maxSize: 500 * 1024 // 500KB per image
    totalSize: 2 * 1024 * 1024 // 2MB total
  }
  fonts: {
    maxSize: 100 * 1024 // 100KB total
  }
  metrics: {
    lcp: 2500 // 2.5s
    fid: 100 // 100ms
    cls: 0.1 // 0.1
    fcp: 1200 // 1.2s
    ttfb: 600 // 600ms
  }
}
```

### Image Optimization Config
```typescript
interface ImageConfig {
  formats: ['image/avif', 'image/webp']
  quality: {
    default: 75
    hero: 85
    thumbnail: 60
  }
  sizes: {
    mobile: [320, 640, 750]
    tablet: [828, 1080]
    desktop: [1200, 1920]
  }
  lazy: {
    threshold: '50px' // Load when 50px from viewport
    rootMargin: '50px'
  }
}
```

## Error Handling

### Image Loading Errors
```typescript
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  // Fallback to placeholder
  e.currentTarget.src = '/images/placeholder.png'
  
  // Log error for monitoring
  console.error('Image failed to load:', e.currentTarget.src)
  
  // Track in analytics
  trackEvent('image_load_error', {
    src: e.currentTarget.src,
    page: window.location.pathname
  })
}
```

### Lazy Loading Errors
```typescript
const LazyComponent = dynamic(() => import('./Component'), {
  loading: () => <Skeleton />,
  ssr: false
}).catch((error) => {
  console.error('Failed to load component:', error)
  return () => <ErrorFallback />
})
```

### Performance Monitoring Errors
```typescript
try {
  // Track metrics
  getCLS(sendToAnalytics)
} catch (error) {
  // Gracefully fail - don't break user experience
  console.warn('Performance monitoring failed:', error)
}
```

## Testing Strategy

### Performance Testing

#### 1. Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/san-pham
            http://localhost:3000/dich-vu
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

#### 2. Bundle Size Testing
```json
// lighthouse-budget.json
{
  "budget": [
    {
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 200
        },
        {
          "resourceType": "stylesheet",
          "budget": 50
        },
        {
          "resourceType": "image",
          "budget": 500
        }
      ],
      "timings": [
        {
          "metric": "interactive",
          "budget": 3000
        },
        {
          "metric": "first-contentful-paint",
          "budget": 1200
        }
      ]
    }
  ]
}
```

#### 3. Visual Regression Testing
```typescript
// tests/performance/visual-regression.test.ts
describe('Performance Visual Regression', () => {
  it('should not have layout shift on hero section', async () => {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const cls = entries.reduce((sum, entry) => sum + entry.value, 0)
          resolve(cls)
        }).observe({ entryTypes: ['layout-shift'] })
        
        setTimeout(() => resolve(0), 5000)
      })
    })
    
    expect(cls).toBeLessThan(0.1)
  })
})
```

### Load Testing
```typescript
// tests/performance/load-test.ts
import { check } from 'k6'
import http from 'k6/http'

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% requests < 2s
    http_req_failed: ['rate<0.01'], // < 1% failures
  },
}

export default function () {
  const res = http.get('http://localhost:3000')
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  })
}
```

## Implementation Phases

### Phase 1: Quick Wins (Immediate Impact)
1. Optimize existing images to WebP/AVIF
2. Add proper image dimensions to prevent CLS
3. Remove unused dependencies
4. Enable compression and caching headers
5. Defer non-critical JavaScript

### Phase 2: Code Optimization
1. Implement bundle analyzer
2. Optimize imports (tree shaking)
3. Code split large components
4. Lazy load below-fold content
5. Optimize Hero component (remove console.logs, optimize re-renders)

### Phase 3: Advanced Optimization
1. Implement service worker for offline support
2. Add resource hints (preconnect, prefetch)
3. Optimize fonts loading
4. Implement progressive image loading
5. Add performance monitoring

### Phase 4: Monitoring & Maintenance
1. Set up Lighthouse CI
2. Configure performance budgets
3. Add real-user monitoring (RUM)
4. Create performance dashboard
5. Set up alerts for regressions

## Specific Optimizations for Current Codebase

### Hero Component Optimization
**Current Issues:**
- Multiple console.logs in production
- localStorage access on every render
- Multiple useEffect hooks
- Image error handling creates new Set on every error

**Optimizations:**
```typescript
// Remove all console.logs (already configured in next.config.ts)
// Memoize expensive computations
const bannerImages = useMemo(() => 
  banners.filter(b => b.image && !imgErrorIds.has(b.id)),
  [banners, imgErrorIds]
)

// Optimize image error handling
const handleImageError = useCallback((id: number) => {
  setImgErrorIds(prev => new Set([...prev, id]))
}, [])

// Debounce localStorage checks
const debouncedReload = useMemo(
  () => debounce(reloadFromStorage, 300),
  [reloadFromStorage]
)
```

### Partners Component Optimization
**Current Issues:**
- Loads all partner images immediately
- No lazy loading for images

**Optimizations:**
```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src={partner.logo}
  alt={partner.name}
  width={160}
  height={80}
  loading="lazy"
  quality={75}
/>
```

### Data Files Optimization
**Current Issues:**
- Large data files imported directly
- No code splitting for data

**Optimizations:**
```typescript
// Dynamic import for large data
const loadPartners = () => import('@/data/partners').then(m => m.partners)

// Or use API routes for dynamic data
// app/api/partners/route.ts
export const revalidate = 3600
export async function GET() {
  return Response.json(partners)
}
```

## Performance Metrics Targets

| Metric | Current (Estimated) | Target | Priority |
|--------|-------------------|--------|----------|
| Lighthouse Score | 60-70 | 90+ | High |
| FCP | 2-3s | < 1.2s | High |
| LCP | 3-5s | < 2.5s | High |
| TBT | 500ms+ | < 200ms | Medium |
| CLS | 0.2+ | < 0.1 | High |
| JS Bundle | 300KB+ | < 200KB | High |
| CSS Bundle | 80KB+ | < 50KB | Medium |
| First Load | 3-5s | < 1.5s | High |
| Subsequent Load | 1-2s | < 300ms | Medium |

## Tools and Dependencies

### Required Packages
```json
{
  "devDependencies": {
    "@next/bundle-analyzer": "^15.0.0",
    "web-vitals": "^3.5.0",
    "sharp": "^0.33.0" // For image optimization
  }
}
```

### Configuration Files
- `next.config.ts` - Next.js optimization config
- `lighthouse-budget.json` - Performance budgets
- `.github/workflows/lighthouse.yml` - CI/CD performance checks

### Monitoring Tools
- Google Lighthouse
- Chrome DevTools Performance
- WebPageTest
- Bundle Analyzer
- Web Vitals library

## Success Criteria

1. ✅ Lighthouse Performance score > 90
2. ✅ LCP < 2.5s on 3G connection
3. ✅ FCP < 1.2s
4. ✅ TBT < 200ms
5. ✅ CLS < 0.1
6. ✅ JavaScript bundle < 200KB (gzipped)
7. ✅ CSS bundle < 50KB (gzipped)
8. ✅ All images in WebP/AVIF format
9. ✅ 60 FPS for all animations
10. ✅ Zero console errors in production
