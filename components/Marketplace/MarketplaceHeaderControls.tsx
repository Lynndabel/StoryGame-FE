// components/Marketplace/MarketplaceHeaderControls.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { HiMenu, HiUser } from 'react-icons/hi';

const MarketplaceHeaderControls = () => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outsid
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: '📚', text: 'Help & FAQs', path: '/help' },
    { icon: '🔔', text: 'Notification', path: '/notifications' },
    { icon: '⚙️', text: 'Settings', path: '/settings' },
    { icon: '📄', text: 'Terms and Policies', path: '/terms' }
  ];

  return (
    <div className="flex items-center gap-4">
      {/* Filter Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className="text-gray-300 hover:text-white transition-colors text-sm"
        >
          Filter
        </button>

        {showFilterDropdown && (
          <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-xl z-50">
            {/* Dropdown Arrow */}
            <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-800"></div>
            
            {/* Dropdown Content */}
            <div className="p-6">
              {/* Menu Items */}
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.path}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Sign In Button */}
              <button className="w-full mt-6 bg-yellow-400 text-black font-medium py-3 rounded hover:bg-yellow-500 transition-colors">
                SIGN IN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sign In Button */}
      <button className="bg-yellow-400 text-black font-medium px-6 py-2 rounded hover:bg-yellow-500 transition-colors">
        SIGN IN
      </button>

      {/* Profile Icon */}
      <button className="text-gray-300 hover:text-white transition-colors">
        <HiUser size={20} />
      </button>

      {/* Hamburger Menu */}
      <button className="text-gray-300 hover:text-white transition-colors">
        <HiMenu size={24} />
      </button>
    </div>
  );
};

export default MarketplaceHeaderControls;