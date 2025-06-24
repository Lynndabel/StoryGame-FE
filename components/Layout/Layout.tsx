// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showSidebar = true,
  className = '' 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (showSidebar) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <Header 
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <AnimatePresence>
            <Sidebar isOpen={isSidebarOpen} />
          </AnimatePresence>
        )}

        {/* Main Content */}
        <main className={`
          flex-1 min-h-[calc(100vh-4rem)]
          ${showSidebar && isSidebarOpen ? 'lg:ml-70' : ''}
          ${className}
        `}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsSidebarOpen(false);
          }}
        />
      )}
    </div>
  );
};