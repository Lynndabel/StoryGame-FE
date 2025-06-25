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


