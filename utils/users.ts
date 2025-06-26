// src/utils/api/users.ts
import { User, UserStats, UserActivity, ApiResponse, QueryParams } from '@/types';

export const usersApi = {
  // Get user profile
  async getUser(address: string): Promise<ApiResponse<User>> {
    const response = await api.get(`/users/${address}`);
    return response.data;
  },

  // Update user profile
  async updateUser(address: string, data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await api.put(`/users/${address}`, data);
    return response.data;
  },

  // Get user statistics
  async getUserStats(address: string): Promise<ApiResponse<UserStats>> {
    const response = await api.get(`/users/${address}/stats`);
    return response.data;
  },

  // Get user activity
  async getUserActivity(address: string, params?: QueryParams): Promise<ApiResponse<UserActivity[]>> {
    const response = await api.get(`/users/${address}/activity`, { params });
    return response.data;
  },

  // Follow/unfollow user
  async toggleFollow(address: string): Promise<ApiResponse<{ following: boolean }>> {
    const response = await api.post(`/users/${address}/follow`);
    return response.data;
  },

  // Get user's followers
  async getFollowers(address: string, params?: QueryParams): Promise<ApiResponse<User[]>> {
    const response = await api.get(`/users/${address}/followers`, { params });
    return response.data;
  },

  // Get user's following
  async getFollowing(address: string, params?: QueryParams): Promise<ApiResponse<User[]>> {
    const response = await api.get(`/users/${address}/following`, { params });
    return response.data;
  }
};
