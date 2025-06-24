import React, { useState } from 'react';

interface DropdownOption {
  value: number;
  label: string;
  disabled?: boolean;
}

interface CustomDropdownProps {
  value: number;
  onChange: (value: number) => void;
  options: DropdownOption[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue: number, disabled?: boolean) => {
    if (disabled) return;
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg px-4 py-3 text-white text-sm cursor-pointer pr-12 flex items-center justify-between min-w-[100px]"
        style={{
          backgroundColor: '#F2E8CF0A',
          border: '0.5px solid',
          borderImageSource: 'linear-gradient(135.3deg, #FD9C49 2.51%, #FCCF49 120.64%)',
          borderImageSlice: 1
        }}
      >
        <span>{selectedOption?.label}</span>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform ml-3 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg z-10"
          style={{ backgroundColor: '#F2E8CF0A' }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value, option.disabled)}
              className={`px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                option.disabled 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-white cursor-pointer'
              }`}
              style={{
                backgroundColor: value === option.value ? '#F2E8CF1A' : '#F2E8CF0A'
              }}
              onMouseEnter={(e) => {
                if (value !== option.value && !option.disabled) {
                  e.currentTarget.style.backgroundColor = '#F2E8CF1A';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option.value && !option.disabled) {
                  e.currentTarget.style.backgroundColor = '#F2E8CF0A';
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  jobsPerPage: number;
  totalJobs: number;
  onPageChange: (page: number) => void;
  onJobsPerPageChange: (jobsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  jobsPerPage,
  totalJobs,
  onPageChange,
  onJobsPerPageChange
}) => {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleJobsPerPageChange = (value: number) => {
    onJobsPerPageChange(value);
  };

  // Generate dropdown options with disabled state based on total jobs
  const getDropdownOptions = () => {
    const baseOptions = [
      { value: 4, label: '4 Jobs' },
      { value: 8, label: '8 Jobs' },
      { value: 16, label: '16 Jobs' },
      { value: 20, label: '20 Jobs' }
    ];

    return baseOptions.map(option => ({
      ...option,
      disabled: option.value > totalJobs
    }));
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          visiblePages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          visiblePages.push(i);
        }
      }
    }
    
    return visiblePages;
  };

  return (
    <div 
      className="flex items-center w-full rounded-bl-2xl rounded-br-2xl" 
      style={{ 
        backgroundColor: '#F2E8CF0A',
        justifyContent: 'space-between',
        padding: '22px',
        borderBottom: '1px solid #F2E8CF0A',
        boxShadow: 'inset 0 1px 0 0 #00000040',
        height: 'auto'
      }}
    >
      {/* Left Side - Showing per page */}
      <div className="flex items-center space-x-3">
        <span 
          className="text-sm"
          style={{
            fontFamily: 'Merriweather',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '120%',
            letterSpacing: '0%',
            color: '#B4B3B3'
          }}
        >
          Showing per page :
        </span>
        
        {/* Jobs per page custom dropdown */}
        <CustomDropdown 
          value={jobsPerPage}
          onChange={handleJobsPerPageChange}
          options={getDropdownOptions()}
        />
        
        {/* FIXED: Show total jobs instead of jobsPerPage */}
        <span className="text-gray-300 text-sm">of {totalJobs}</span>
      </div>

      {/* Right Side - Pagination */}
      <div 
        className="flex items-center rounded-lg"
        style={{
          backgroundColor: '#1A1203',
          width: '226px',
          height: '42px',
          gap: '8px',
          borderRadius: '8px',
          padding: '8px'
        }}
      >
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-8 h-8 rounded ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-white hover:bg-gray-600'
          } transition-colors`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        {/* Page Numbers */}
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`flex items-center justify-center text-sm font-medium transition-colors ${
              currentPage === page
                ? 'text-black font-bold'
                : 'text-white hover:bg-gray-600 w-8 h-8 rounded'
            }`}
            style={currentPage === page ? { 
              backgroundColor: '#FFD700',
              width: '30px',
              height: '26px',
              paddingTop: '4px',
              paddingRight: '12px',
              paddingBottom: '4px',
              paddingLeft: '12px',
              borderRadius: '2px'
            } : {}}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-8 h-8 rounded ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-white hover:bg-gray-600'
          } transition-colors`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;