'use client'

import React from 'react'
import { cn } from '../../lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'tight' | 'normal' | 'loose' | 'xl'
  children: React.ReactNode
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'normal', children, ...props }, ref) => {
    const spacingClasses = {
      tight: 'py-8 md:py-12',
      normal: 'py-12 md:py-16 lg:py-20',
      loose: 'py-16 md:py-20 lg:py-24',
      xl: 'py-20 md:py-24 lg:py-32'
    }

    return (
      <section
        className={cn(
          'relative',
          spacingClasses[spacing],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-none'
    }

    return (
      <div
        className={cn(
          'container mx-auto px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  children: React.ReactNode
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = 'md', align = 'stretch', children, ...props }, ref) => {
    const spacingClasses = {
      xs: 'space-y-2',
      sm: 'space-y-4',
      md: 'space-y-6',
      lg: 'space-y-8',
      xl: 'space-y-12',
      '2xl': 'space-y-16'
    }

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch'
    }

    return (
      <div
        className={cn(
          'flex flex-col',
          spacingClasses[spacing],
          alignClasses[align],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Stack.displayName = 'Stack'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
  children: React.ReactNode
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap = 'md', responsive = true, children, ...props }, ref) => {
    const colsClasses = {
      1: 'grid-cols-1',
      2: responsive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2',
      3: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-3',
      4: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4',
      5: responsive ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-5',
      6: responsive ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-6'
    }

    const gapClasses = {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12'
    }

    return (
      <div
        className={cn(
          'grid',
          colsClasses[cols],
          gapClasses[gap],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    className, 
    direction = 'row', 
    align = 'stretch', 
    justify = 'start',
    wrap = false,
    gap = 'md',
    children, 
    ...props 
  }, ref) => {
    const directionClasses = {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse'
    }

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline'
    }

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly'
    }

    const gapClasses = {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12'
    }

    return (
      <div
        className={cn(
          'flex',
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          wrap && 'flex-wrap',
          gapClasses[gap],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Flex.displayName = 'Flex'

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      xs: 'h-2',
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-8',
      xl: 'h-12',
      '2xl': 'h-16',
      '3xl': 'h-24'
    }

    return (
      <div
        className={cn(sizeClasses[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Spacer.displayName = 'Spacer'

export { Section, Container, Stack, Grid, Flex, Spacer }