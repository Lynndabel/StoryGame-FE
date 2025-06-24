// src/components/common/Pagination.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage
} from 'react-icons/md';
import { Button } from '../ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisible = 7,
  size = 'md',
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      let start = Math.max(2, currentPage - Math.floor((maxVisible - 3) / 2));
      let end = Math.min(totalPages - 1, currentPage + Math.floor((maxVisible - 3) / 2));
      
      // Adjust range if we're near the beginning or end
      if (currentPage <= Math.floor((maxVisible - 1) / 2)) {
        end = maxVisible - 2;
      } else if (currentPage >= totalPages - Math.floor((maxVisible - 1) / 2)) {
        start = totalPages - maxVisible + 3;
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const buttonSizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  } as const;

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="ghost"
          size={buttonSizes[size]}
          icon={MdFirstPage}
          onClick={() => onPageChange(1)}
          className="hidden sm:flex"
        />
      )}

      {/* Previous Page */}
      {showPrevNext && (
        <Button
          variant="ghost"
          size={buttonSizes[size]}
          icon={MdChevronLeft}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        />
      )}

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <motion.div
            key={`${page}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            {page === '...' ? (
              <span className="px-3 py-2 text-dark-400">...</span>
            ) : (
              <Button
                variant={currentPage === page ? 'primary' : 'ghost'}
                size={buttonSizes[size]}
                onClick={() => onPageChange(page as number)}
                className={currentPage === page ? 'pointer-events-none' : ''}
              >
                {page}
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Next Page */}
      {showPrevNext && (
        <Button
          variant="ghost"
          size={buttonSizes[size]}
          icon={MdChevronRight}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        />
      )}

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="ghost"
          size={buttonSizes[size]}
          icon={MdLastPage}
          onClick={() => onPageChange(totalPages)}
          className="hidden sm:flex"
        />
      )}
    </nav>
  );
};

