// src/utils/api/voting.ts
import { Proposal, VotingRound, Vote, CreateProposalRequest, VoteRequest, ApiResponse, QueryParams } from '@/types';

export const votingApi = {
  // Get all proposals
  async getProposals(params?: QueryParams): Promise<ApiResponse<Proposal[]>> {
    const response = await api.get('/proposals', { params });
    return response.data;
  },

  // Get proposal by ID
  async getProposal(id: string): Promise<ApiResponse<Proposal>> {
    const response = await api.get(`/proposals/${id}`);
    return response.data;
  },

  // Create new proposal
  async createProposal(data: CreateProposalRequest): Promise<ApiResponse<Proposal>> {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'attachments' && value !== undefined) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });

    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }

    const response = await api.post('/proposals', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Cast vote
  async castVote(data: VoteRequest): Promise<ApiResponse<Vote>> {
    const response = await api.post('/votes', data);
    return response.data;
  },

  // Get voting rounds
  async getVotingRounds(params?: QueryParams): Promise<ApiResponse<VotingRound[]>> {
    const response = await api.get('/voting-rounds', { params });
    return response.data;
  },

  // Get voting round by ID
  async getVotingRound(id: string): Promise<ApiResponse<VotingRound>> {
    const response = await api.get(`/voting-rounds/${id}`);
    return response.data;
  },

  // Get user's votes
  async getUserVotes(address: string, params?: QueryParams): Promise<ApiResponse<Vote[]>> {
    const response = await api.get(`/users/${address}/votes`, { params });
    return response.data;
  },

  // Get voting power
  async getVotingPower(address: string): Promise<ApiResponse<{ votingPower: number; tokensUsed: number }>> {
    const response = await api.get(`/users/${address}/voting-power`);
    return response.data;
  }
};

