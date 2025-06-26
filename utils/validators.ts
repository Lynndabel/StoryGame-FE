// src/utils/helpers/validators.ts
export const validators = {
    // Email validation
    email: (email: string): boolean => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
  
    // URL validation
    url: (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
  
    // Ethereum address validation
    ethereumAddress: (address: string): boolean => {
      return /^0x[a-fA-F0-9]{40}$/.test(address);
    },
  
    // Content length validation
    contentLength: (text: string, min = 0, max = Infinity): boolean => {
      const length = text.trim().length;
      return length >= min && length <= max;
    },
  
    // Word count validation
    wordCount: (text: string, min = 0, max = Infinity): boolean => {
      const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      return words >= min && words <= max;
    },
  
    // Image file validation
    imageFile: (file: File): boolean => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      return allowedTypes.includes(file.type);
    },
  
    // File size validation
    fileSize: (file: File, maxSizeMB = 10): boolean => {
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      return file.size <= maxSizeBytes;
    }
  };
  
  // src/utils/helpers/constants.ts
  export const CONSTANTS = {
    // Network constants
    SUPPORTED_CHAIN_IDS: [42161, 10, 137, 8453],
    DEFAULT_CHAIN_ID: 42161,
  
    // Token constants
    TOKEN_DECIMALS: 18,
    MAX_UINT256: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  
    // Voting constants
    QUADRATIC_VOTING_POWER_DIVISOR: 1000,
    MIN_VOTING_PERIOD: 86400, // 1 day in seconds
    MAX_VOTING_PERIOD: 604800, // 7 days in seconds
  
    // Story constants
    MIN_STORY_TITLE_LENGTH: 3,
    MAX_STORY_TITLE_LENGTH: 100,
    MIN_STORY_DESCRIPTION_LENGTH: 10,
    MAX_STORY_DESCRIPTION_LENGTH: 500,
    MIN_CHAPTER_CONTENT_LENGTH: 100,
    MAX_CHAPTER_CONTENT_LENGTH: 50000,
  
    // File upload constants
    MAX_FILE_SIZE_MB: 10,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
  
    // UI constants
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    SEARCH_DEBOUNCE_MS: 300,
    TOAST_DURATION: 5000,
  
    // Analytics events
    ANALYTICS_EVENTS: {
      STORY_CREATED: 'story_created',
      CHAPTER_READ: 'chapter_read',
      VOTE_CAST: 'vote_cast',
      PROPOSAL_SUBMITTED: 'proposal_submitted',
      USER_REGISTERED: 'user_registered',
    }
  };