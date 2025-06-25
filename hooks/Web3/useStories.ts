// src/utils/hooks/useStories.ts
import { useState, useEffect, useCallback } from 'react';
import { Story, QueryParams, ApiResponse } from '@/types';
import { storiesApi } from '@/utils/api/stories';

export const useStories = (initialParams?: QueryParams) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchStories = useCallback(async (params?: QueryParams, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await storiesApi.getStories({
        page: append ? page : 1,
        limit: 20,
        ...initialParams,
        ...params,
      });

      if (response.success && response.data) {
        if (append) {
          setStories(prev => [...prev, ...response.data!]);
        } else {
          setStories(response.data);
          setPage(1);
        }

        setHasMore(response.pagination?.hasNextPage ?? false);
      } else {
        throw new Error(response.error || 'Failed to fetch stories');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [initialParams, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      fetchStories({ page: page + 1 }, true);
    }
  }, [loading, hasMore, page, fetchStories]);

  const refresh = useCallback(() => {
    setPage(1);
    fetchStories();
  }, [fetchStories]);

  useEffect(() => {
    fetchStories();
  }, []);

  return {
    stories,
    loading,
    error,
    hasMore,
    fetchStories,
    loadMore,
    refresh,
  };
};

// src/utils/hooks/useVoting.ts
import { useState, useCallback } from 'react';
import { Proposal, VoteRequest, TransactionStatus } from '@/types';
import { votingApi } from '@/utils/api/voting';
import { useWeb3 } from './useWeb3';

export const useVoting = () => {
  const { contractService, account } = useWeb3();
  const [votingStatus, setVotingStatus] = useState<Record<string, TransactionStatus>>({});

  const castVote = useCallback(async (proposalId: string, direction: 'for' | 'against', weight: number) => {
    if (!contractService || !account) {
      throw new Error('Wallet not connected');
    }

    setVotingStatus(prev => ({
      ...prev,
      [proposalId]: { status: 'pending' }
    }));

    try {
      // First, submit vote to API
      const voteRequest: VoteRequest = {
        proposalId,
        direction,
        weight,
        tokensToUse: weight * weight, // Quadratic cost
      };

      const apiResponse = await votingApi.castVote(voteRequest);
      if (!apiResponse.success) {
        throw new Error(apiResponse.error || 'Failed to submit vote');
      }

      // Then, submit to blockchain
      const roundId = '1'; // This would come from the proposal data
      const receipt = await contractService.castVote(roundId, proposalId, weight);

      setVotingStatus(prev => ({
        ...prev,
        [proposalId]: {
          status: 'confirmed',
          hash: receipt.hash,
          confirmations: receipt.confirmations,
        }
      }));

      return receipt;
    } catch (error) {
      setVotingStatus(prev => ({
        ...prev,
        [proposalId]: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Transaction failed'
        }
      }));
      throw error;
    }
  }, [contractService, account]);

  const getVotingPower = useCallback(async (address?: string) => {
    const targetAddress = address || account;
    if (!targetAddress) return null;

    try {
      const response = await votingApi.getVotingPower(targetAddress);
      return response.data;
    } catch (error) {
      console.error('Failed to get voting power:', error);
      return null;
    }
  }, [account]);

  const hasVoted = useCallback(async (roundId: string, address?: string) => {
    if (!contractService) return false;

    const targetAddress = address || account;
    if (!targetAddress) return false;

    try {
      return await contractService.hasVoted(roundId, targetAddress);
    } catch (error) {
      console.error('Failed to check voting status:', error);
      return false;
    }
  }, [contractService, account]);

  return {
    castVote,
    getVotingPower,
    hasVoted,
    votingStatus,
  };
};

// src/utils/hooks/useAuth.ts
import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { User } from '@/types';
import { usersApi } from '@/utils/api/users';
import { useWeb3 } from './useWeb3';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const { account, isConnected } = useWeb3();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async () => {
    if (!account) {
      throw new Error('No account connected');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await usersApi.getUser(account);
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('auth_token', account); // Simple auth for demo
      } else {
        throw new Error(response.error || 'Failed to get user data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [account]);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('auth_token');
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!account || !user) {
      throw new Error('Not authenticated');
    }

    setLoading(true);
    try {
      const response = await usersApi.updateUser(account, data);
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        throw new Error(response.error || 'Failed to update profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [account, user]);

  const refreshUser = useCallback(async () => {
    if (!account) return;

    try {
      const response = await usersApi.getUser(account);
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  }, [account]);

  // Auto-login when account changes
  useEffect(() => {
    if (isConnected && account && !user) {
      login().catch(console.error);
    } else if (!isConnected) {
      logout();
    }
  }, [isConnected, account, user, login, logout]);

  return {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    refreshUser,
  };
};

// src/context/Web3Context.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useWeb3 } from '@/utils/hooks/useWeb3';

interface Web3ContextType {
  isConnected: boolean;
  isConnecting: boolean;
  account: string;
  chainId: number;
  balances: any;
  contractService: any;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
  refreshBalances: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3Context must be used within Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const web3 = useWeb3();

  return (
    <Web3Context.Provider value={web3}>
      {children}
    </Web3Context.Provider>
  );
};

// src/context/AuthContext.tsx
import React, { createContext, ReactNode } from 'react';
import { useAuthProvider } from '@/utils/hooks/useAuth';

interface AuthContextType {
  user: any;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Calculate actual theme
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setActualTheme(mediaQuery.matches ? 'dark' : 'light');

      const handleChange = (e: MediaQueryListEvent) => {
        setActualTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setActualTheme(theme);
    }
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = actualTheme;
  }, [actualTheme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// src/utils/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

