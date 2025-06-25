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


