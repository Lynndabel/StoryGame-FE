// src/components/common/FilterTabs.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { Badge } from '../ui/Badge';

interface FilterTab {
  id: string;
  label: string;
  icon?: IconType;
  count?: number;
  disabled?: boolean;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  className = "",
}) => {
  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-3',
    lg: 'text-lg px-6 py-4',
  };

  const renderDefaultTabs = () => (
    <div className={`flex bg-dark-800 border border-dark-600 rounded-xl p-1 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            disabled={tab.disabled}
            className={`
              relative flex items-center space-x-2 ${sizeClasses[size]} rounded-lg font-medium transition-all duration-200
              ${isActive 
                ? 'bg-primary-500 text-white shadow-lg' 
                : tab.disabled
                  ? 'text-dark-500 cursor-not-allowed'
                  : 'text-dark-300 hover:text-white hover:bg-dark-700'
              }
            `}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <Badge
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive ? 'bg-white/20' : ''}
              >
                {tab.count}
              </Badge>
            )}
            
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary-500 rounded-lg -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );

  const renderPillTabs = () => (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            disabled={tab.disabled}
            className={`
              flex items-center space-x-2 ${sizeClasses[size]} rounded-full font-medium transition-all duration-200 border
              ${isActive 
                ? 'bg-primary-500 text-white border-primary-500 shadow-lg' 
                : tab.disabled
                  ? 'text-dark-500 border-dark-700 cursor-not-allowed'
                  : 'text-dark-300 border-dark-600 hover:text-white hover:border-primary-500 hover:bg-primary-500/10'
              }
            `}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <Badge
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive ? 'bg-white/20' : ''}
              >
                {tab.count}
              </Badge>
            )}
          </button>
        );
      })}
    </div>
  );

  const renderUnderlineTabs = () => (
    <div className={`border-b border-dark-700 ${className}`}>
      <nav className="flex space-x-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              className={`
                relative flex items-center space-x-2 ${sizeClasses[size]} border-b-2 font-medium transition-all duration-200
                ${isActive 
                  ? 'border-primary-500 text-primary-400' 
                  : tab.disabled
                    ? 'border-transparent text-dark-500 cursor-not-allowed'
                    : 'border-transparent text-dark-400 hover:text-dark-200 hover:border-dark-500'
                }
              `}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <Badge
                  variant={isActive ? 'primary' : 'ghost'}
                  size="sm"
                >
                  {tab.count}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );

  switch (variant) {
    case 'pills':
      return renderPillTabs();
    case 'underline':
      return renderUnderlineTabs();
    default:
      return renderDefaultTabs();
  }
};