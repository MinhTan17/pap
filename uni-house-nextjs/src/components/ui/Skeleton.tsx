'use client'

import React from 'react'
import { cn } from '../../lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className,
    variant = 'rectangular',
    width,
    height,
    lines = 1,
    style,
    ...props 
  }, ref) => {
    const baseClasses = 'loading-pulse bg-neutral-200 animate-pulse'
    
    const variantClasses = {
      text: 'rounded h-4',
      circular: 'rounded-full',
      rectangular: 'rounded-md'
    }

    const skeletonStyle = {
      width: width,
      height: height,
      ...style
    }

    if (variant === 'text' && lines > 1) {
      return (
        <div className="space-y-2" ref={ref} {...props}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                baseClasses,
                variantClasses[variant],
                index === lines - 1 && 'w-3/4', // Last line is shorter
                className
              )}
              style={skeletonStyle}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        className={cn(
          baseClasses,
          variantClasses[variant],
          className
        )}
        style={skeletonStyle}
        ref={ref}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

export { Skeleton }