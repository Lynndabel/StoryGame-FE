// src/components/story/StoryCard.tsx
import React from 'react';
import Link from 'next/link';
//import { motion } from 'framer-motion';
import { 
  MdAutoStories,
  MdPerson,
  MdAccessTime,
  MdBookmark,
  MdBookmarkBorder,
  MdVisibility,
  MdHowToVote
} from 'react-icons/md';
import { FiTrendingUp } from 'react-icons/fi';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    description: string;
    creator: string;
    currentChapter: number;
    totalChapters: number;
    isActive: boolean;
    createdAt: string;
    genre: string;
    views: number;
    votes: number;
    isBookmarked?: boolean;
    coverImage?: string;
    tags: string[];
  };
  variant?: 'default' | 'compact' | 'featured';
  onBookmark?: (id: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ 
  story, 
  variant = 'default',
  onBookmark 
}) => {
  const cardVariants = {
    default: 'h-auto',
    compact: 'h-32 flex-row',
    featured: 'h-80',
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmark?.(story.id);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (variant === 'compact') {
    return (
      <Link href={`/stories/${story.id}`}>
        <Card hover className={`${cardVariants.compact} p-4`}>
          <div className="flex items-center space-x-4 w-full">
            {/* Cover Image */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
              {story.coverImage ? (
                <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <MdAutoStories className="w-8 h-8 text-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold text-sm truncate">{story.title}</h3>
                  <p className="text-dark-300 text-xs mt-1 line-clamp-2">{story.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={story.isBookmarked ? MdBookmark : MdBookmarkBorder}
                  onClick={handleBookmark}
                  className="!p-1 flex-shrink-0"
                />
              </div>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-dark-400">
                <span>{story.currentChapter}/{story.totalChapters} chapters</span>
                <span>{formatNumber(story.views)} views</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/stories/${story.id}`}>
        <Card hover className={`${cardVariants.featured} relative overflow-hidden`}>
          {/* Background Image/Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent z-10" />
          {story.coverImage ? (
            <img src={story.coverImage} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500" />
          )}

          {/* Content */}
          <div className="relative z-20 p-6 h-full flex flex-col justify-end">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="primary" size="sm">{story.genre}</Badge>
                {story.isActive && <Badge variant="success" size="sm">Active</Badge>}
              </div>
              
              <h3 className="text-white font-bold text-xl leading-tight">{story.title}</h3>
              <p className="text-dark-200 text-sm line-clamp-2">{story.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-dark-300">
                  <div className="flex items-center space-x-1">
                    <MdAutoStories className="w-4 h-4" />
                    <span>{story.currentChapter}/{story.totalChapters}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MdVisibility className="w-4 h-4" />
                    <span>{formatNumber(story.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MdHowToVote className="w-4 h-4" />
                    <span>{formatNumber(story.votes)}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  icon={story.isBookmarked ? MdBookmark : MdBookmarkBorder}
                  onClick={handleBookmark}
                  className="text-white hover:text-primary-400"
                />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/stories/${story.id}`}>
      <Card hover className={cardVariants.default}>
        {/* Cover Image */}
        <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
          {story.coverImage ? (
            <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
          ) : (
            <MdAutoStories className="w-12 h-12 text-white" />
          )}
          
          {/* Bookmark Button */}
          <Button
            variant="ghost"
            size="sm"
            icon={story.isBookmarked ? MdBookmark : MdBookmarkBorder}
            onClick={handleBookmark}
            className="absolute top-3 right-3 !p-2 bg-dark-900/70 hover:bg-dark-900/90 text-white"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Tags & Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="primary" size="sm">{story.genre}</Badge>
              {story.isActive && <Badge variant="success" size="sm">Active</Badge>}
            </div>
            {story.currentChapter > story.totalChapters * 0.8 && (
              <Badge variant="warning" size="sm" icon={FiTrendingUp}>Hot</Badge>
            )}
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-white font-semibold text-lg line-clamp-2 mb-2">{story.title}</h3>
            <p className="text-dark-300 text-sm line-clamp-3">{story.description}</p>
          </div>

          {/* Author & Time */}
          <div className="flex items-center space-x-1 text-dark-400 text-sm">
            <MdPerson className="w-4 h-4" />
            <span className="truncate">{story.creator}</span>
            <span>•</span>
            <MdAccessTime className="w-4 h-4" />
            <span>{new Date(story.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-dark-700">
            <div className="flex items-center space-x-4 text-sm text-dark-400">
              <div className="flex items-center space-x-1">
                <MdAutoStories className="w-4 h-4" />
                <span>{story.currentChapter}/{story.totalChapters} chapters</span>
              </div>
              <div className="flex items-center space-x-1">
                <MdVisibility className="w-4 h-4" />
                <span>{formatNumber(story.views)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-primary-400 text-sm font-medium">
              <MdHowToVote className="w-4 h-4" />
              <span>{formatNumber(story.votes)}</span>
            </div>
          </div>

          {/* Tags */}
          {story.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {story.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {story.tags.length > 3 && (
                <span className="px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded-md">
                  +{story.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};
