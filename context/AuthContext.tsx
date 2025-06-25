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

