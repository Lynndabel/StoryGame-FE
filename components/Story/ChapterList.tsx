// src/components/story/ChapterList.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdViewList, MdViewModule,MdSort,
  MdFilterList,
  MdPlaylistAdd
} from 'react-icons/md';
import { ChapterCard } from './ChapterCard';
import { Button } from '../UI/Button';
import { Loading } from '../UI/Loading';

interface ChapterListProps {
  chapters: Array<any>;
  storyId: string;
  loading?: boolean;
  canCreateChapter?: boolean;
  onCreateChapter?: () => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  storyId,
  loading = false,
  canCreateChapter = false,
  onCreateChapter,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState('chapter');
  const [filterBy, setFilterBy] = useState('all');

  const sortOptions = [
    { value: 'chapter', label: 'Chapter Order' },
    { value: 'newest', label: 'Newest First' },
    { value: 'votes', label: 'Most Voted' },
    { value: 'views', label: 'Most Viewed' },
  ];

  const filterOptions = [
    { value: 'all', label: 'All Chapters' },
    { value: 'canonical', label: 'Canonical Only' },
    { value: 'proposals', label: 'Proposals' },
    { value: 'my-chapters', label: 'My Chapters' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loading size="lg" text="Loading chapters..." />
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-dark-300 text-lg mb-2">No chapters yet</div>
        <div className="text-dark-400 mb-4">Be the first to write a chapter for this story!</div>
        {canCreateChapter && (
          <Button variant="gradient" icon={MdPlaylistAdd} onClick={onCreateChapter}>
            Write Chapter
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-white">Chapters</h2>
          <span className="text-dark-400">({chapters.length})</span>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Create Chapter Button */}
          {canCreateChapter && (
            <Button
              variant="gradient"
              size="sm"
              icon={MdPlaylistAdd}
              onClick={onCreateChapter}
            >
              Write Chapter
            </Button>
          )}

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
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              icon={MdViewList}
              onClick={() => setViewMode('list')}
              className="!py-1.5 !px-2"
            />
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              icon={MdViewModule}
              onClick={() => setViewMode('grid')}
              className="!py-1.5 !px-2"
            />
          </div>
        </div>
      </div>

      {/* Chapters */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ChapterCard 
                chapter={chapter} 
                variant={viewMode === 'list' ? 'compact' : 'default'} 
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

