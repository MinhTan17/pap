import React from 'react';
import { cn } from '@/utils/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: boolean;
  background?: 'white' | 'gray' | 'primary' | 'gradient';
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    padding = true,
    background = 'white',
    children, 
    ...props 
  }, ref) => {
    const backgroundClasses = {
      white: 'bg-white',
      gray: 'bg-neutral-50',
      primary: 'bg-primary-600 text-white',
      gradient: 'bg-gradient-to-br from-primary-600 to-primary-800 text-white'
    };

    return (
      <section
        className={cn(
          backgroundClasses[background],
          padding && 'section-padding',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };