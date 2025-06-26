// src/utils/hooks/useWeb3.ts (Updated for Wagmi)
import { useAccount, useNetwork, useBalance, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';

export const useWeb3 = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const { data: ethBalance } = useBalance({
    address,
    watch: true,
  });

  // You can add custom token balances here
  const [tokenBalances, setTokenBalances] = useState({
    story: 0,
    read: 0,
    voting_power: 0,
  });

  const connect = async () => {
    openConnectModal?.();
  };

  return {
    // State
    isConnected,
    isConnecting,
    account: address,
    chainId: chain?.id,
    networkName: chain?.name,
    balances: {
      eth: parseFloat(ethBalance?.formatted || '0'),
      ...tokenBalances,
    },
    
    // Methods
    connect,
    disconnect,
    switchNetwork: async (chainId: number) => {
      // Wagmi handles this automatically with RainbowKit
    },
    refreshBalances: async () => {
      // Balances auto-refresh with Wagmi
    },
  };
};