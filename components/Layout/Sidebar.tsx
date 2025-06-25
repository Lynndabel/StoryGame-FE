// src/components/layout/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MdAutoStories,
  MdHowToVote,
  MdCreate,
  MdExplore,
  MdTrendingUp,
  MdBookmark,
  MdHistory
} from 'react-icons/md';
import { FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';
import { Badge } from '../UI/Badge';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const mainNavItems = [
    { href: '/', label: 'Explore', icon: MdExplore, count: null },
    { href: '/stories', label: 'Stories', icon: MdAutoStories, count: '124' },
    { href: '/voting', label: 'Voting', icon: MdHowToVote, count: '7' },
    { href: '/create', label: 'Create', icon: MdCreate, count: null },
  ];

  const discoverItems = [
    { href: '/trending', label: 'Trending', icon: MdTrendingUp },
    { href: '/popular', label: 'Popular', icon: FiTrendingUp },
    { href: '/featured', label: 'Featured', icon: FiAward },
    { href: '/authors', label: 'Top Authors', icon: FiUsers },
  ];

  const personalItems = [
    { href: '/bookmarks', label: 'Bookmarks', icon: MdBookmark },
    { href: '/history', label: 'Reading History', icon: MdHistory },
  ];

  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      exit={{ x: -280 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-70 bg-dark-900 border-r border-dark-700 overflow-y-auto z-30"
    >
      <div className="p-6 space-y-8">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-4">
            Main
          </h3>
          <nav className="space-y-2">
            {mainNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center justify-between p-3 rounded-xl text-dark-300 hover:text-white hover:bg-dark-800 transition-all duration-200 group">
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 group-hover:text-primary-400 transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <Badge variant="primary" size="sm">
                      {item.count}
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Discover */}
        <div>
          <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-4">
            Discover
          </h3>
          <nav className="space-y-2">
            {discoverItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-dark-300 hover:text-white hover:bg-dark-800 transition-all duration-200 group">
                  <item.icon className="w-5 h-5 group-hover:text-secondary-400 transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Personal */}
        <div>
          <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-4">
            Personal
          </h3>
          <nav className="space-y-2">
            {personalItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center space-x-3 p-3 rounded-xl text-dark-300 hover:text-white hover:bg-dark-800 transition-all duration-200 group">
                  <item.icon className="w-5 h-5 group-hover:text-accent-400 transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-xl p-4">
          <h4 className="text-white font-semibold mb-3">Your Stats</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-dark-300">Stories Read</span>
              <span className="text-white font-medium">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-300">Votes Cast</span>
              <span className="text-white font-medium">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-300">Chapters Authored</span>
              <span className="text-white font-medium">8</span>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

