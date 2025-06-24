// src/components/common/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdSearch, MdClear, MdHistory, MdTrendingUp, MdAutoStories, MdPerson } from 'react-icons/md';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';

interface SearchResult {
  id: string;
  type: 'story' | 'author' | 'chapter' | 'proposal';
  title: string;
  subtitle?: string;
  thumbnail?: string;
  verified?: boolean;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelect?: (result: SearchResult) => void;
  suggestions?: SearchResult[];
  recentSearches?: string[];
  trending?: string[];
  loading?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search stories, authors, chapters...",
  onSearch,
  onSelect,
  suggestions = [],
  recentSearches = [],
  trending = [],
  loading = false,
  className = "",
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasResults = suggestions.length > 0;
  const showRecent = !query && recentSearches.length > 0;
  const showTrending = !query && trending.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSelectedIndex(-1);
    onSearch?.(newQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalItems = suggestions.length + (showRecent ? recentSearches.length : 0) + (showTrending ? trending.length : 0);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          onSelect?.(suggestions[selectedIndex]);
          setIsOpen(false);
          setQuery('');
        } else if (query.trim()) {
          onSearch?.(query);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'story': return MdAutoStories;
      case 'author': return MdPerson;
      case 'chapter': return MdAutoStories;
      case 'proposal': return MdAutoStories;
      default: return MdSearch;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'story': return 'text-primary-400';
      case 'author': return 'text-secondary-400';
      case 'chapter': return 'text-accent-400';
      case 'proposal': return 'text-yellow-400';
      default: return 'text-dark-400';
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-dark-500"
        />
        
        {/* Clear Button */}
        {query && (
          <Button
            variant="ghost"
            size="sm"
            icon={MdClear}
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 !p-1"
          />
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-dark-600 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto"
          >
            {/* Search Results */}
            {hasResults && (
              <div className="p-2">
                <div className="text-dark-400 text-xs uppercase tracking-wider font-semibold px-3 py-2">
                  Results
                </div>
                {suggestions.map((result, index) => {
                  const IconComponent = getTypeIcon(result.type);
                  return (
                    <button
                      key={result.id}
                      onClick={() => {
                        onSelect?.(result);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                        selectedIndex === index ? 'bg-primary-500/20 text-primary-300' : 'hover:bg-dark-700 text-white'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 ${getTypeColor(result.type)}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{result.title}</div>
                        {result.subtitle && (
                          <div className="text-dark-400 text-sm truncate">{result.subtitle}</div>
                        )}
                      </div>
                      <Badge variant="ghost" size="sm">
                        {result.type}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Recent Searches */}
            {showRecent && (
              <div className="border-t border-dark-700 p-2">
                <div className="text-dark-400 text-xs uppercase tracking-wider font-semibold px-3 py-2 flex items-center space-x-2">
                  <MdHistory className="w-3 h-3" />
                  <span>Recent</span>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      onSearch?.(search);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-dark-700 text-dark-300 hover:text-white transition-colors text-left"
                  >
                    <MdHistory className="w-4 h-4" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Trending */}
            {showTrending && (
              <div className="border-t border-dark-700 p-2">
                <div className="text-dark-400 text-xs uppercase tracking-wider font-semibold px-3 py-2 flex items-center space-x-2">
                  <MdTrendingUp className="w-3 h-3" />
                  <span>Trending</span>
                </div>
                {trending.map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(trend);
                      onSearch?.(trend);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-dark-700 text-dark-300 hover:text-white transition-colors text-left"
                  >
                    <MdTrendingUp className="w-4 h-4 text-orange-400" />
                    <span>{trend}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && !loading && !hasResults && (
              <div className="p-6 text-center">
                <MdSearch className="w-12 h-12 mx-auto mb-3 text-dark-400" />
                <div className="text-white font-medium mb-1">No results found</div>
                <div className="text-dark-400 text-sm">
                  Try adjusting your search or browse popular stories
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

