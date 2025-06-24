// src/components/ui/Badge.tsx
import React from 'react';
import { IconType } from 'react-icons';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconType;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
}) => {
  const variants = {
    primary: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    secondary: 'bg-secondary-500/20 text-secondary-300 border-secondary-500/30',
    success: 'bg-accent-500/20 text-accent-300 border-accent-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-300 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full border
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}>
      {Icon && <Icon className={iconSizes[size]} />}
      {children}
    </span>
  );
};

