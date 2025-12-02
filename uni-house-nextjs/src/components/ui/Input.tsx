import React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  variant?: 'default' | 'filled' | 'outlined';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    helper,
    variant = 'default',
    required,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="form-group">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn('form-label', required && 'required')}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'form-input',
            error && 'error',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="form-error">
            {error}
          </span>
        )}
        {helper && !error && (
          <span className="form-helper">
            {helper}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };