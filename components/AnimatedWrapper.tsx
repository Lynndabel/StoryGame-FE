'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

interface AnimatedWrapperProps {
  children: React.ReactNode;
}

/**
 * AnimatedWrapper wraps page children with simple fade/slide animations on route change.
 * It relies on framer-motion and the current pathname as a key so that every navigation
 * triggers enter/exit animations. Update the transition values as desired to achieve
 * different effects.
 */
const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedWrapper;
