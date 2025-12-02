import React from 'react';
import { cn } from '@/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label,
    error,
    helper,
    required,
    id,
    ...props 
  }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="form-group">
        {label && (
          <label 
            htmlFor={textareaId}
            className={cn('form-label', required && 'required')}
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'form-input form-textarea',
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

Textarea.displayName = 'Textarea';

export { Textarea };