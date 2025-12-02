'use client'

import React from 'react'
import { cn } from '../../lib/utils'
import { useScrollAnimation, useStaggeredAnimation } from '../../hooks/useScrollAnimation'

export interface AnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp' | 'slideInDown'
  delay?: number
  duration?: 'fast' | 'normal' | 'slow'
  triggerOnce?: boolean
  threshold?: number
  children: React.ReactNode
}

const Animation = React.forwardRef<HTMLDivElement, AnimationProps>(
  ({ 
    className,
    type = 'fadeInUp',
    delay = 0,
    duration = 'normal',
    triggerOnce = true,
    threshold = 0.1,
    children,
    style,
    ...props 
  }, forwardedRef) => {
    const { ref, isInView } = useScrollAnimation({ 
      threshold, 
      triggerOnce 
    })

    const animationClasses = {
      fadeIn: 'animate-fade-in',
      fadeInUp: 'animate-fade-in-up',
      fadeInDown: 'animate-fade-in-down',
      fadeInLeft: 'animate-fade-in-left',
      fadeInRight: 'animate-fade-in-right',
      scaleIn: 'animate-scale-in',
      slideInUp: 'animate-slide-in-up',
      slideInDown: 'animate-slide-in-down'
    }

    const durationClasses = {
      fast: 'duration-300',
      normal: 'duration-500',
      slow: 'duration-700'
    }

    return (
      <div
        ref={(node) => {
          ref.current = node
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }}
        className={cn(
          'transition-opacity transition-transform',
          durationClasses[duration],
          isInView ? animationClasses[type] : 'opacity-0',
          className
        )}
        style={{
          animationDelay: `${delay}ms`,
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Animation.displayName = 'Animation'

export interface StaggeredAnimationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  itemCount: number
  delay?: number
  type?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn'
  children: (visibleItems: number[], isInView: boolean) => React.ReactNode
}

const StaggeredAnimation = React.forwardRef<HTMLDivElement, StaggeredAnimationProps>(
  ({ 
    className,
    itemCount,
    delay = 100,
    type = 'fadeInUp',
    children,
    ...props 
  }, forwardedRef) => {
    const { ref, visibleItems, isInView } = useStaggeredAnimation(itemCount, delay)

    return (
      <div
        ref={(node) => {
          ref.current = node
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }}
        className={cn('animate-stagger', className)}
        {...props}
      >
        {children(visibleItems, isInView)}
      </div>
    )
  }
)

StaggeredAnimation.displayName = 'StaggeredAnimation'

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number
  children: React.ReactNode
}

const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(
  ({ 
    className,
    speed = 0.5,
    children,
    style,
    ...props 
  }, ref) => {
    const [offset, setOffset] = React.useState(0)

    React.useEffect(() => {
      const handleScroll = () => {
        setOffset(window.pageYOffset * speed)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [speed])

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        style={{
          transform: `translateY(${offset}px)`,
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Parallax.displayName = 'Parallax'

export interface HoverEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  effect?: 'lift' | 'scale' | 'glow' | 'brightness'
  intensity?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const HoverEffect = React.forwardRef<HTMLDivElement, HoverEffectProps>(
  ({ 
    className,
    effect = 'lift',
    intensity = 'md',
    children,
    ...props 
  }, ref) => {
    const effectClasses = {
      lift: {
        sm: 'hover-lift-sm',
        md: 'hover-lift',
        lg: 'hover-lift'
      },
      scale: {
        sm: 'hover-scale-sm',
        md: 'hover-scale',
        lg: 'hover-scale'
      },
      glow: {
        sm: 'hover-glow',
        md: 'hover-glow',
        lg: 'hover-glow'
      },
      brightness: {
        sm: 'hover-brightness',
        md: 'hover-brightness',
        lg: 'hover-brightness'
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          effectClasses[effect][intensity],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

HoverEffect.displayName = 'HoverEffect'

export { Animation, StaggeredAnimation, Parallax, HoverEffect }