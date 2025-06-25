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
