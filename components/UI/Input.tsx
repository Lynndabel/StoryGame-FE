// src/components/ui/Input.tsx
import React, { forwardRef } from 'react';
import { IconType } from 'react-icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  helper?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  helper,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
        )}
        
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl 
            text-white placeholder-dark-400 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            hover:border-dark-500
            ${Icon && iconPosition === 'left' ? 'pl-12' : ''}
            ${Icon && iconPosition === 'right' ? 'pr-12' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        
        {Icon && iconPosition === 'right' && (
          <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
      
      {helper && !error && (
        <p className="mt-2 text-sm text-dark-400">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

