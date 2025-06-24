// src/pages/stories/index.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdFilterList, MdSort } from 'react-icons/md';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { StoryList } from '@/components/story/StoryList';
import { FilterTabs } from '@/components/common/FilterTabs';
import { SearchBar } from '@/components/common/SearchBar';
import { useStories } from '@/utils/hooks/useStories';

const StoriesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { stories, loading, loadMore, hasMore } = useStories();

  const filterTabs = [
    { id: 'all', label: 'All Stories', count: 1247 },
    { id: 'trending', label: 'Trending', count: 23 },
    { id: 'new', label: 'New', count: 45 },
    { id: 'completed', label: 'Completed', count: 156 },
    { id: 'following', label: 'Following', count: 12 },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Discover Stories
            </h1>
            <p className="text-dark-300">
              Explore collaborative narratives from the community
            </p>
          </div>
          
          <Button variant="gradient" icon={MdAdd} href="/stories/create">
            Create Story
          </Button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Search Bar */}
          <div className="max-w-2xl">
            <SearchBar
              placeholder="Search stories, authors, or genres..."
              onSearch={handleSearch}
            />
          </div>

          {/* Filter Tabs */}
          <FilterTabs
            tabs={filterTabs}
            activeTab={activeFilter}
            onTabChange={setActiveFilter}
            variant="underline"
          />
        </motion.div>

        {/* Stories List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StoryList
            stories={stories}
            loading={loading}
            onLoadMore={loadMore}
            hasMore={hasMore}
            showFeatured={activeFilter === 'all'}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default StoriesPage;

