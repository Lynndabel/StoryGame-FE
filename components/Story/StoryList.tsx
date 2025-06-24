
// src/components/story/StoryList.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdViewModule, MdViewList } from 'react-icons/md';
import { UserProfileStoryCard } from './UserProfileStoryCard';
import { StoryCardWrapper } from './StoryCardWrapper';
import { Story, UserProfileStory } from '../../types/story';
import { isUserProfileStory } from '@/utils/typeguards'; // Correct path from components/Story/StoryList.tsx
import { Button } from '../UI/Button';
import { Loading } from '../UI/Loading';

interface StoryListProps {
  stories: (Story | UserProfileStory)[];
  loading?: boolean;
  error?: string;
  showFeatured?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const StoryList: React.FC<StoryListProps> = ({
  stories,
  loading = false,
  error,
  showFeatured = true,
  onLoadMore,
  hasMore = false,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('trending');
  const [filterBy, setFilterBy] = useState('all');

  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'active', label: 'Most Active' },
  ];

  const filterOptions = [
    { value: 'all', label: 'All Stories' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'scifi', label: 'Sci-Fi' },
    { value: 'mystery', label: 'Mystery' },
  ];

  const featuredStories = stories.slice(0, 3);
  const regularStories = stories.slice(showFeatured ? 3 : 0);

  if (loading && stories.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loading size="lg" text="Loading amazing stories..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-red-400 text-lg mb-2">Failed to load stories</div>
        <div className="text-dark-400 mb-4">{error}</div>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-dark-300 text-lg mb-2">No stories found</div>
        <div className="text-dark-400 mb-4">Be the first to create an amazing story!</div>
        <Button variant="gradient" href="/create">
          Create Story
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Stories */}
      {showFeatured && featuredStories.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {isUserProfileStory(story) ? (
                  <UserProfileStoryCard story={story} />
                ) : (
                  <StoryCardWrapper story={story} variant="featured" />
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-white">
          {showFeatured ? 'All Stories' : 'Stories'}
        </h2>
        
        <div className="flex items-center space-x-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Filter */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex bg-dark-800 border border-dark-600 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              icon={MdViewModule}
              onClick={() => setViewMode('grid')}
              className="!py-1.5 !px-2"
            />
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              icon={MdViewList}
              onClick={() => setViewMode('list')}
              className="!py-1.5 !px-2"
            />
          </div>
        </div>
      </div>

      {/* Stories Grid/List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {regularStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {isUserProfileStory(story) ? (
                <UserProfileStoryCard story={story} />
              ) : (
                <StoryCardWrapper 
                  story={story} 
                  variant={viewMode === 'list' ? 'compact' : 'default'} 
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            loading={loading}
          >
            Load More Stories
          </Button>
        </div>
      )}
    </div>
  );
};

