import React, { useState } from 'react';

interface SearchSortBarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  selectedSort: string;
  onSortChange: (sortOption: string) => void;
}

const SearchSortBar: React.FC<SearchSortBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedSort,
  onSortChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    'Most Recent',
    'Oldest', 
    'Shortest Duration',
    'Longest Duration',
    'Highest Budget',
    'Lowest Budget'
  ];

  const handleSortSelect = (option: string) => {
    onSortChange(option);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-4 rounded-2xl" style={{ backgroundColor: '#F2E8CF0A', border: '1px solid #F2E8CF0A' }}>
      {/* Search Bar */}
      <div className="relative flex-1 max-w-lg">
        <div className="relative">
          <img 
            src="market/search-normal.svg" 
            alt="Search" 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          />
          <input
            type="text"
            placeholder="Search jobs, skills, or keywords..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-transparent"
            style={{ 
              backgroundColor: '#F2E8CF0A', 
              border: '1px solid #F2E8CF0A',
              boxShadow: 'none'
            }}
            onFocus={(e) => {
              e.target.style.border = '1px solid #F2E8CF0A';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Sort Section */}
      <div className="flex items-center space-x-4 ml-8">
        <span className="text-gray-300 text-sm font-medium">Sort by:</span>
        
        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 rounded-lg px-4 py-2.5 text-white hover:bg-gray-750 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            style={{ backgroundColor: '#F2E8CF0A', border: '1px solid #F2E8CF0A' }}
          >
            <span className="text-sm">{selectedSort}</span>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? 'transform rotate-180' : ''
              }`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl z-50" style={{ backgroundColor: '#333333', border: '1px solid #F2E8CF0A' }}>
              <div className="py-2">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSortSelect(option)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors text-gray-300 ${
                      selectedSort === option 
                        ? '' 
                        : 'hover:bg-opacity-50'
                    }`}
                    style={{ 
                      backgroundColor: selectedSort === option ? '#F2E8CF0A' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedSort !== option) {
                        e.currentTarget.style.backgroundColor = '#F2E8CF0A';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedSort !== option) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSortBar;