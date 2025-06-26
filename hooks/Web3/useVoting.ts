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

