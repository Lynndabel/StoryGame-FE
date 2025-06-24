// src/pages/stories/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { StoryDetail } from '@/components/Story/StoryDetail';
import { Loading } from '@/components/UI/Loading';
import { Button } from '@/components/UI/Button';
import { storiesApi } from '@/utils/api/stories';
import { Story, Chapter } from '@/types';

const StoryPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [story, setStory] = useState<Story | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchStoryData = async () => {
      setLoading(true);
      try {
        const [storyResponse, chaptersResponse] = await Promise.all([
          storiesApi.getStory(id),
          storiesApi.getStoryChapters(id),
        ]);

        if (storyResponse.success && storyResponse.data) {
          setStory(storyResponse.data);
        } else {
          throw new Error(storyResponse.error || 'Failed to fetch story');
        }

        if (chaptersResponse.success && chaptersResponse.data) {
          setChapters(chaptersResponse.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" text="Loading story..." />
        </div>
      </Layout>
    );
  }

  if (error || !story) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-red-400 text-lg mb-2">
            {error || 'Story not found'}
          </div>
          <div className="text-dark-400 mb-4">
            The story you're looking for doesn't exist or has been removed.
          </div>
          <Button variant="primary" onClick={() => router.push('/stories')}>
            Browse Stories
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StoryDetail
            story={story}
            chapters={chapters}
            onBookmark={() => {}}
            onFollow={() => {}}
            onVote={() => {}}
            onCreateChapter={() => router.push(`/stories/${id}/create-chapter`)}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default StoryPage;

