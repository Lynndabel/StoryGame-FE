// src/components/ui/Card.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  gradient = false,
  padding = 'md',
  onClick,
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const baseClasses = `
    bg-dark-800 border border-dark-700 rounded-2xl transition-all duration-300
    ${gradient ? 'bg-gradient-to-br from-dark-800 via-dark-800 to-dark-700' : ''}
    ${paddingClasses[padding]}
    ${hover ? 'hover:border-primary-500 hover:shadow-xl hover:shadow-primary-500/10' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const Component = onClick ? motion.div : 'div';
  const motionProps = onClick ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
  } : {};

  return (
    <Component
      className={baseClasses}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

