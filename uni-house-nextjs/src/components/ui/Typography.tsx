'use client'

import React from 'react'
import { cn } from '../../lib/utils'

// Heading Components
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'display' | 'heading' | 'subheading'
  gradient?: boolean
  children: React.ReactNode
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ 
    className, 
    level = 1, 
    variant = 'heading',
    gradient = false,
    children, 
    ...props 
  }, ref) => {
    const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    
    const baseClasses = 'font-heading font-semibold tracking-tight'
    
    const variantClasses = {
      display: {
        1: 'text-5xl md:text-6xl lg:text-7xl leading-none',
        2: 'text-4xl md:text-5xl lg:text-6xl leading-tight',
        3: 'text-3xl md:text-4xl lg:text-5xl leading-tight',
        4: 'text-2xl md:text-3xl lg:text-4xl leading-snug',
        5: 'text-xl md:text-2xl lg:text-3xl leading-snug',
        6: 'text-lg md:text-xl lg:text-2xl leading-normal'
      },
      heading: {
        1: 'text-4xl md:text-5xl lg:text-6xl leading-tight',
        2: 'text-3xl md:text-4xl lg:text-5xl leading-tight', 
        3: 'text-2xl md:text-3xl lg:text-4xl leading-snug',
        4: 'text-xl md:text-2xl lg:text-3xl leading-snug',
        5: 'text-lg md:text-xl lg:text-2xl leading-normal',
        6: 'text-base md:text-lg lg:text-xl leading-normal'
      },
      subheading: {
        1: 'text-2xl md:text-3xl lg:text-4xl leading-snug font-medium',
        2: 'text-xl md:text-2xl lg:text-3xl leading-snug font-medium',
        3: 'text-lg md:text-xl lg:text-2xl leading-normal font-medium',
        4: 'text-base md:text-lg lg:text-xl leading-normal font-medium',
        5: 'text-sm md:text-base lg:text-lg leading-normal font-medium',
        6: 'text-xs md:text-sm lg:text-base leading-normal font-medium'
      }
    }

    return (
      <Component
        className={cn(
          baseClasses,
          variantClasses[variant][level],
          gradient && 'gradient-text',
          className
        )}
        ref={ref as any}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

// Text Components
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body-large' | 'body' | 'body-small' | 'caption' | 'overline'
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'error' | 'success' | 'warning'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  children: React.ReactNode
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ 
    className,
    variant = 'body',
    color = 'primary',
    weight = 'normal',
    align = 'left',
    truncate = false,
    children,
    ...props 
  }, ref) => {
    const variantClasses = {
      'body-large': 'text-lg leading-relaxed',
      'body': 'text-base leading-normal',
      'body-small': 'text-sm leading-normal',
      'caption': 'text-xs leading-normal',
      'overline': 'text-xs leading-normal uppercase tracking-wider font-medium'
    }

    const colorClasses = {
      primary: 'text-neutral-900',
      secondary: 'text-neutral-700',
      muted: 'text-neutral-500',
      accent: 'text-primary-600',
      error: 'text-red-600',
      success: 'text-green-600',
      warning: 'text-yellow-600'
    }

    const weightClasses = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    }

    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify'
    }

    return (
      <p
        className={cn(
          'font-primary',
          variantClasses[variant],
          colorClasses[color],
          weightClasses[weight],
          alignClasses[align],
          truncate && 'truncate',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    )
  }
)

Text.displayName = 'Text'

// Lead Text Component
export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, children, ...props }, ref) => (
    <p
      className={cn(
        'text-xl leading-relaxed text-neutral-600 font-light',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </p>
  )
)

Lead.displayName = 'Lead'

// Blockquote Component
export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  cite?: string
  children: React.ReactNode
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, cite, children, ...props }, ref) => (
    <blockquote
      className={cn(
        'border-l-4 border-primary-200 pl-6 py-2 italic text-lg text-neutral-700 font-medium',
        className
      )}
      cite={cite}
      ref={ref}
      {...props}
    >
      {children}
    </blockquote>
  )
)

Blockquote.displayName = 'Blockquote'

// Code Component
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'inline' | 'block'
  children: React.ReactNode
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant = 'inline', children, ...props }, ref) => {
    if (variant === 'block') {
      return (
        <pre
          className={cn(
            'bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm font-mono',
            className
          )}
          ref={ref as any}
          {...props}
        >
          <code>{children}</code>
        </pre>
      )
    }

    return (
      <code
        className={cn(
          'bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono',
          className
        )}
        ref={ref as any}
        {...props}
      >
        {children}
      </code>
    )
  }
)

Code.displayName = 'Code'

// List Components
export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  variant?: 'unordered' | 'ordered'
  spacing?: 'tight' | 'normal' | 'loose'
  children: React.ReactNode
}

const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, variant = 'unordered', spacing = 'normal', children, ...props }, ref) => {
    const Component = variant === 'ordered' ? 'ol' : 'ul'
    
    const spacingClasses = {
      tight: 'space-y-1',
      normal: 'space-y-2',
      loose: 'space-y-4'
    }

    const listClasses = {
      unordered: 'list-disc list-inside',
      ordered: 'list-decimal list-inside'
    }

    return (
      <Component
        className={cn(
          'text-neutral-700',
          listClasses[variant],
          spacingClasses[spacing],
          className
        )}
        ref={ref as any}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

List.displayName = 'List'

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => (
    <li
      className={cn('leading-relaxed', className)}
      ref={ref}
      {...props}
    >
      {children}
    </li>
  )
)

ListItem.displayName = 'ListItem'

export { Heading, Text, Lead, Blockquote, Code, List, ListItem }