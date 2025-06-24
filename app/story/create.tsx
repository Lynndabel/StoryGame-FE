// src/pages/stories/create.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { CreateStoryForm } from '@/components/story/CreateStoryForm';
import { storiesApi } from '@/utils/api/stories';
import { useNotifications } from '@/utils/hooks/useNotifications';
import { CreateStoryRequest } from '@/types';

const CreateStoryPage: React.FC = () => {
  const router = useRouter();
  const { success, error } = useNotifications();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateStoryRequest) => {
    setLoading(true);
    try {
      const response = await storiesApi.createStory(data);
      
      if (response.success && response.data) {
        success('Story created successfully!');
        router.push(`/stories/${response.data.id}`);
      } else {
        throw new Error(response.error || 'Failed to create story');
      }
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to create story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CreateStoryForm onSubmit={handleSubmit} loading={loading} />
        </motion.div>
      </div>
    </Layout>
  );
};

export default CreateStoryPage;

