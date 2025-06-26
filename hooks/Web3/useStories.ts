// src/utils/hooks/useStories.ts
import { useState, useEffect, useCallback } from 'react';
import { Story, QueryParams, ApiResponse } from '@/types';
import { storiesApi } from '@/utils/api/stories';

export const useStories = (initialParams?: QueryParams) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchStories = useCallback(async (params?: QueryParams, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await storiesApi.getStories({
        page: append ? page : 1,
        limit: 20,
        ...initialParams,
        ...params,
      });

      if (response.success && response.data) {
        if (append) {
          setStories(prev => [...prev, ...response.data!]);
        } else {
          setStories(response.data);
          setPage(1);
        }

        setHasMore(response.pagination?.hasNextPage ?? false);
      } else {
        throw new Error(response.error || 'Failed to fetch stories');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [initialParams, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      fetchStories({ page: page + 1 }, true);
    }
  }, [loading, hasMore, page, fetchStories]);

  const refresh = useCallback(() => {
    setPage(1);
    fetchStories();
  }, [fetchStories]);

  useEffect(() => {
    fetchStories();
  }, []);

  return {
    stories,
    loading,
    error,
    hasMore,
    fetchStories,
    loadMore,
    refresh,
  };
};

