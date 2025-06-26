// src/utils/api/stories.ts
import axios from 'axios';
import { Story, Chapter, CreateStoryRequest, ApiResponse, QueryParams, SearchFilters } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const storiesApi = {
  // Get all stories with pagination and filters
  async getStories(params?: QueryParams): Promise<ApiResponse<Story[]>> {
    const response = await api.get('/stories', { params });
    return response.data;
  },

  // Get a single story by ID
  async getStory(id: string): Promise<ApiResponse<Story>> {
    const response = await api.get(`/stories/${id}`);
    return response.data;
  },

  // Create a new story
  async createStory(data: CreateStoryRequest): Promise<ApiResponse<Story>> {
    const formData = new FormData();
    
    // Add text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'coverImage' && value !== undefined) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });

    // Add cover image if provided
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    const response = await api.post('/stories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Update story
  async updateStory(id: string, data: Partial<Story>): Promise<ApiResponse<Story>> {
    const response = await api.put(`/stories/${id}`, data);
    return response.data;
  },

  // Delete story
  async deleteStory(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/stories/${id}`);
    return response.data;
  },

  // Get story chapters
  async getStoryChapters(storyId: string, params?: QueryParams): Promise<ApiResponse<Chapter[]>> {
    const response = await api.get(`/stories/${storyId}/chapters`, { params });
    return response.data;
  },

  // Bookmark/unbookmark story
  async toggleBookmark(storyId: string): Promise<ApiResponse<{ bookmarked: boolean }>> {
    const response = await api.post(`/stories/${storyId}/bookmark`);
    return response.data;
  },

  // Follow/unfollow story
  async toggleFollow(storyId: string): Promise<ApiResponse<{ following: boolean }>> {
    const response = await api.post(`/stories/${storyId}/follow`);
    return response.data;
  },

  // Search stories
  async searchStories(query: string, filters?: SearchFilters): Promise<ApiResponse<Story[]>> {
    const response = await api.get('/stories/search', {
      params: { q: query, ...filters }
    });
    return response.data;
  },

  // Get trending stories
  async getTrendingStories(timeframe = '7d'): Promise<ApiResponse<Story[]>> {
    const response = await api.get('/stories/trending', {
      params: { timeframe }
    });
    return response.data;
  },

  // Get featured stories
  async getFeaturedStories(): Promise<ApiResponse<Story[]>> {
    const response = await api.get('/stories/featured');
    return response.data;
  }
};

