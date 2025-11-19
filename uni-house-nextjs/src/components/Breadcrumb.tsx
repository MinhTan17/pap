'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname()

  // Auto-generate breadcrumb if items not provided
  const generateBreadcrumb = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '')

    const breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Trang chủ', href: '/' }
    ]

    // Map path segments to Vietnamese labels
    const pathLabels: Record<string, string> = {
      'san-pham': 'Sản phẩm',
      'dich-vu': 'Dịch vụ',
      'gioi-thieu': 'Giới thiệu',
      'tin-tuc': 'Tin tức',
      'lien-he': 'Liên hệ',
      'admin': 'Quản trị'
    }

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Skip numeric IDs for detail pages
      if (!isNaN(Number(segment))) {
        return
      }

      const label = pathLabels[segment] || segment

      // Don't add href for the last item (current page)
      const isLast = index === pathSegments.length - 1 ||
        (index === pathSegments.length - 2 && !isNaN(Number(pathSegments[pathSegments.length - 1])))

      breadcrumbItems.push({
        label,
        href: isLast ? undefined : currentPath
      })
    })

    return breadcrumbItems
  }

  const breadcrumbItems = items || generateBreadcrumb()

  // Determine if we're in a dark context (e.g., on colored background)
  const isDarkContext = className?.includes('text-white')

  return (
    <nav
      className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm whitespace-nowrap overflow-x-auto scrollbar-hide ${className}`}
      aria-label="Breadcrumb"
      style={{ wordBreak: 'keep-all', wordWrap: 'normal' }}
    >
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center flex-shrink-0">
          {index > 0 && (
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 flex-shrink-0 ${isDarkContext ? 'text-white/60' : 'text-slate-400'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}

          {item.href ? (
            <Link
              href={item.href}
              className={`transition-colors duration-200 font-medium whitespace-nowrap hover:underline ${isDarkContext
                  ? 'text-white/80 hover:text-white'
                  : 'text-slate-600 hover:text-blue-600'
                }`}
              style={{ wordBreak: 'keep-all', wordWrap: 'normal' }}
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={`font-semibold whitespace-nowrap ${isDarkContext ? 'text-white' : 'text-slate-800'}`}
              style={{ wordBreak: 'keep-all', wordWrap: 'normal' }}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}