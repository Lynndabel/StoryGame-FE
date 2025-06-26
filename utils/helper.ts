// src/utils/web3/helpers.ts
import { ethers } from 'ethers';

export const formatAddress = (address: string, length = 4): string => {
  if (!address) return '';
  return `${address.slice(0, 2 + length)}...${address.slice(-length)}`;
};

export const formatTokenAmount = (amount: string | number, decimals = 18, precision = 4): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (num === 0) return '0';
  
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
  
  return num.toFixed(precision).replace(/\.?0+$/, '');
};

export const parseTokenAmount = (amount: string, decimals = 18): bigint => {
  return ethers.parseUnits(amount, decimals);
};

export const formatTokenAmountFromWei = (amount: bigint, decimals = 18, precision = 4): string => {
  const formatted = ethers.formatUnits(amount, decimals);
  return formatTokenAmount(formatted, decimals, precision);
};

export const calculateQuadraticVoteCost = (votes: number): number => {
  return votes * votes;
};

export const calculateQuadraticVoteWeight = (tokens: number): number => {
  return Math.floor(Math.sqrt(tokens));
};

export const isValidAddress = (address: string): boolean => {
  try {
    ethers.getAddress(address);
    return true;
  } catch {
    return false;
  }
};

export const getExplorerUrl = (chainId: number, hash: string, type: 'tx' | 'address' = 'tx'): string => {
  const network = SUPPORTED_NETWORKS[chainId];
  if (!network) return '';
  
  return `${network.explorerUrl}/${type}/${hash}`;
};

export const waitForTransaction = async (
  provider: ethers.Provider,
  hash: string,
  confirmations = 1
): Promise<ethers.TransactionReceipt> => {
  return provider.waitForTransaction(hash, confirmations);
};

