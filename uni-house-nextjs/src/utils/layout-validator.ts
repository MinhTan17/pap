/**
 * Layout validation utilities for responsive header
 */

export interface BreakpointConfig {
  mobile: number;    // 0-767px
  tablet: number;    // 768-1023px  
  desktop: number;   // 1024px+
}

export interface HeaderLayoutState {
  showFullLogo: boolean;
  showDesktopNav: boolean;
  showMobileButton: boolean;
  navigationSpacing: 'compact' | 'normal' | 'spacious';
}

export const BREAKPOINTS: BreakpointConfig = {
  mobile: 767,
  tablet: 1023,
  desktop: 1024
};

export const RESPONSIVE_TEST_POINTS = [
  { name: 'iPhone SE', width: 320 },
  { name: 'iPhone 12', width: 375 },
  { name: 'iPad Portrait', width: 768 },
  { name: 'iPad Landscape', width: 1024 },
  { name: 'Desktop', width: 1280 },
  { name: 'Large Desktop', width: 1920 }
];

/**
 * Determine header layout state based on screen width
 */
export function getHeaderLayoutState(width: number): HeaderLayoutState {
  if (width >= BREAKPOINTS.desktop) {
    return {
      showFullLogo: true,
      showDesktopNav: true,
      showMobileButton: false,
      navigationSpacing: width >= 1280 ? 'spacious' : 'normal'
    };
  } else if (width >= BREAKPOINTS.tablet) {
    return {
      showFullLogo: true,
      showDesktopNav: false,
      showMobileButton: true,
      navigationSpacing: 'compact'
    };
  } else {
    return {
      showFullLogo: false,
      showDesktopNav: false,
      showMobileButton: true,
      navigationSpacing: 'compact'
    };
  }
}

/**
 * Validate that header elements don't wrap to new line
 */
export function validateNoWrapLayout(): boolean {
  if (typeof window === 'undefined') return true;
  
  const header = document.querySelector('header .header-container');
  if (!header) return false;
  
  const headerRect = header.getBoundingClientRect();
  const children = Array.from(header.children);
  
  // Check if all children are on the same horizontal line
  let maxTop = 0;
  let minTop = Infinity;
  
  children.forEach(child => {
    const rect = child.getBoundingClientRect();
    maxTop = Math.max(maxTop, rect.top);
    minTop = Math.min(minTop, rect.top);
  });
  
  // Allow small differences due to alignment
  const heightDifference = maxTop - minTop;
  return heightDifference < 10; // 10px tolerance
}

/**
 * Check if header elements overflow container
 */
export function validateNoOverflow(): boolean {
  if (typeof window === 'undefined') return true;
  
  const header = document.querySelector('header .header-container');
  if (!header) return false;
  
  const headerRect = header.getBoundingClientRect();
  const children = Array.from(header.children);
  
  return children.every(child => {
    const rect = child.getBoundingClientRect();
    return rect.right <= headerRect.right && rect.left >= headerRect.left;
  });
}

/**
 * Run all layout validations
 */
export function runLayoutValidation(): {
  noWrap: boolean;
  noOverflow: boolean;
  screenWidth: number;
  layoutState: HeaderLayoutState;
} {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  
  return {
    noWrap: validateNoWrapLayout(),
    noOverflow: validateNoOverflow(),
    screenWidth,
    layoutState: getHeaderLayoutState(screenWidth)
  };
}