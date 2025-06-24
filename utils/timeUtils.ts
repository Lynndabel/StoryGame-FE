export const formatRelativeTime = (dateInput: string | Date): string => {
    // Handle various input formats
    let date: Date;
    
    if (typeof dateInput === 'string') {
      // Handle common string formats
      if (dateInput.toLowerCase() === 'just now' || dateInput.toLowerCase() === 'now') {
        return 'Just now';
      }
      
      // Try to parse the date string
      date = new Date(dateInput);
      
      // If parsing fails, assume it's recent
      if (isNaN(date.getTime())) {
        return 'Just now';
      }
    } else {
      date = dateInput;
    }
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // If the date is in the future or invalid, return "Just now"
    if (diffMs < 0) {
      return 'Just now';
    }
    
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    // Years
    if (diffYears >= 1) {
      return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
    }
    
    // Months
    if (diffMonths >= 1) {
      if (diffMonths === 1) return '1 month ago';
      if (diffMonths === 2) return '2 months ago';
      if (diffMonths === 3) return '3 months ago';
      return `${diffMonths} months ago`;
    }
    
    // Weeks
    if (diffWeeks >= 1) {
      if (diffWeeks === 1) return '1 week ago';
      if (diffWeeks === 2) return '2 weeks ago';
      if (diffWeeks === 3) return '3 weeks ago';
      return `${diffWeeks} weeks ago`;
    }
    
    // Days
    if (diffDays >= 1) {
      if (diffDays === 1) return 'Yesterday';
      if (diffDays === 2) return '2 days ago';
      if (diffDays === 3) return '3 days ago';
      if (diffDays === 4) return '4 days ago';
      if (diffDays === 5) return '5 days ago';
      if (diffDays === 6) return '6 days ago';
      return `${diffDays} days ago`;
    }
    
    // Hours
    if (diffHours >= 1) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    }
    
    // Minutes
    if (diffMinutes >= 1) {
      if (diffMinutes === 1) return '1 minute ago';
      if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    }
    
    // Seconds (less than a minute)
    if (diffSeconds < 30) {
      return 'Just now';
    } else {
      return 'Less than a minute ago';
    }
  };
  
  // Hook to get relative time that updates automatically
  export const useRelativeTime = (dateInput: string | Date, updateInterval: number = 60000) => {
    const [relativeTime, setRelativeTime] = React.useState(() => formatRelativeTime(dateInput));
    
    React.useEffect(() => {
      const updateTime = () => {
        setRelativeTime(formatRelativeTime(dateInput));
      };
      
      // Update immediately
      updateTime();
      
      // Set up interval to update periodically
      const interval = setInterval(updateTime, updateInterval);
      
      return () => clearInterval(interval);
    }, [dateInput, updateInterval]);
    
    return relativeTime;
  };
  
  import React from 'react';