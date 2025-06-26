
// src/utils/helpers/formatters.ts
export const formatters = {
    // Time formatting
    timeAgo: (date: string | Date): string => {
      const now = new Date();
      const past = new Date(date);
      const diffMs = now.getTime() - past.getTime();
      
      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);
      const diffWeeks = Math.floor(diffDays / 7);
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffDays / 365);
  
      if (diffSeconds < 60) return 'just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      if (diffWeeks < 4) return `${diffWeeks}w ago`;
      if (diffMonths < 12) return `${diffMonths}mo ago`;
      return `${diffYears}y ago`;
    },
  
    // Duration formatting
    duration: (seconds: number): string => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
  
      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    },
  
    // Number formatting
    number: (num: number): string => {
      if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
      return num.toString();
    },
  
    // Currency formatting
    currency: (amount: number, currency = 'USD'): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(amount);
    },
  
    // Percentage formatting
    percentage: (value: number, decimals = 1): string => {
      return `${value.toFixed(decimals)}%`;
    },
  
    // File size formatting
    fileSize: (bytes: number): string => {
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      if (bytes === 0) return '0 Bytes';
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    },
  
    // Text truncation
    truncate: (text: string, length = 100, suffix = '...'): string => {
      if (text.length <= length) return text;
      return text.slice(0, length).trim() + suffix;
    },
  
    // Reading time estimation
    readingTime: (text: string, wordsPerMinute = 200): number => {
      const words = text.trim().split(/\s+/).length;
      return Math.ceil(words / wordsPerMinute);
    }
  };
  
  