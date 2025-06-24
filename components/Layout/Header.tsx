// src/components/layout/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiSearch, 
  FiBell, 
  FiSun, 
  FiMoon,
  FiUser,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';
import { 
  MdAutoStories,
  MdHowToVote,
  MdCreate,
  MdExplore
} from 'react-icons/md';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { WalletConnect } from '../user/WalletConnect';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { href: '/', label: 'Explore', icon: MdExplore },
    { href: '/stories', label: 'Stories', icon: MdAutoStories },
    { href: '/voting', label: 'Voting', icon: MdHowToVote },
    { href: '/create', label: 'Create', icon: MdCreate },
  ];

  const userMenuItems = [
    { href: '/profile', label: 'Profile', icon: FiUser },
    { href: '/settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              icon={isMobileMenuOpen ? FiX : FiMenu}
              onClick={onMenuToggle}
              className="lg:hidden"
            />

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <MdAutoStories className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                StoryDAO
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 ml-8">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={item.icon}
                    className="text-dark-300 hover:text-white"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Input
              placeholder="Search stories, authors, chapters..."
              icon={FiSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-dark-800/50"
            />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              icon={isDarkMode ? FiSun : FiMoon}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hidden sm:flex"
            />

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                icon={FiBell}
                className="relative"
              />
              <Badge
                variant="error"
                size="sm"
                className="absolute -top-1 -right-1 !px-1.5 !py-0.5 !text-xs"
              >
                3
              </Badge>
            </div>

            {/* Wallet Connect */}
            <WalletConnect />

            {/* User Profile Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="!p-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
              </Button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-600 rounded-xl shadow-xl py-2"
                  >
                    {userMenuItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors">
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      </Link>
                    ))}
                    <hr className="my-2 border-dark-600" />
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-dark-700 transition-colors">
                      <FiLogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <Input
            placeholder="Search stories, authors, chapters..."
            icon={FiSearch}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-dark-800/50"
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-800 border-t border-dark-700"
          >
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="md"
                    icon={item.icon}
                    fullWidth
                    className="justify-start"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

