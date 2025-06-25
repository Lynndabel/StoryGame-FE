// src/utils/hooks/useWeb3.ts
import { useState, useEffect, useCallback } from 'react';
import { Web3Provider, ContractService } from '@/utils/web3';
import { TokenBalances, TransactionStatus } from '@/types';

export const useWeb3 = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<number>(0);
  const [balances, setBalances] = useState<TokenBalances>({
    eth: 0,
    story: 0,
    read: 0,
    voting_power: 0,
  });
  const [contractService, setContractService] = useState<ContractService | null>(null);

  const web3Provider = new Web3Provider();

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const { provider, signer, address } = await web3Provider.connect();
      const network = await provider.getNetwork();
      
      setAccount(address);
      setChainId(Number(network.chainId));
      setIsConnected(true);

      // Initialize contract service
      const service = new ContractService(provider, signer);
      await service.initializeContracts(Number(network.chainId));
      setContractService(service);

      // Get initial balances
      await refreshBalances();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    web3Provider.disconnect();
    setIsConnected(false);
    setAccount('');
    setChainId(0);
    setBalances({ eth: 0, story: 0, read: 0, voting_power: 0 });
    setContractService(null);
  }, []);

  const switchNetwork = useCallback(async (targetChainId: number) => {
    try {
      await web3Provider.switchNetwork(targetChainId);
      setChainId(targetChainId);
      
      // Reinitialize contracts for new network
      if (contractService) {
        await contractService.initializeContracts(targetChainId);
        await refreshBalances();
      }
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  }, [contractService]);

  const refreshBalances = useCallback(async () => {
    if (!account || !contractService) return;

    try {
      const [ethBalance, storyBalance] = await Promise.all([
        web3Provider.getBalance(account),
        contractService.getTokenBalance(account),
      ]);

      // Calculate voting power (quadratic voting)
      const storyAmount = parseFloat(storyBalance);
      const votingPower = Math.floor(Math.sqrt(storyAmount));

      setBalances({
        eth: parseFloat(ethBalance),
        story: storyAmount,
        read: 0, // TODO: Implement READ token balance
        voting_power: votingPower,
      });
    } catch (error) {
      console.error('Failed to refresh balances:', error);
    }
  }, [account, contractService]);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
          refreshBalances();
        }
      };

      const handleChainChanged = (chainId: string) => {
        setChainId(parseInt(chainId, 16));
        refreshBalances();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [account, disconnect, refreshBalances]);

  // Auto-connect if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      if (window.ethereum && localStorage.getItem('wallet_connected') === 'true') {
        try {
          await connect();
        } catch (error) {
          console.error('Auto-connect failed:', error);
        }
      }
    };

    autoConnect();
  }, [connect]);

  // Save connection state
  useEffect(() => {
    localStorage.setItem('wallet_connected', isConnected.toString());
  }, [isConnected]);

  return {
    // State
    isConnected,
    isConnecting,
    account,
    chainId,
    balances,
    contractService,
    
    // Methods
    connect,
    disconnect,
    switchNetwork,
    refreshBalances,
  };
};

