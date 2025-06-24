// src/components/story/StoryDetail.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MdPerson,
  MdAccessTime,
  MdVisibility,
  MdHowToVote,
  MdBookmark,
  MdBookmarkBorder,
  MdShare,
  MdFlag,
  MdEdit,
  MdAutoStories,
  MdTrendingUp
} from 'react-icons/md';
import { FiExternalLink, FiUsers } from 'react-icons/fi';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { ChapterList } from './ChapterList';

interface StoryDetailProps {
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
    followers: number;
    isBookmarked?: boolean;
    isFollowing?: boolean;
    coverImage?: string;
    tags: string[];
    branches: Array<{
      id: string;
      name: string;
      fromChapter: number;
      creator: string;
    }>;
    collaborators: Array<{
      address: string;
      chaptersContributed: number;
      totalVotes: number;
    }>;
  };
  chapters: Array<any>;
  onBookmark?: () => void;
  onFollow?: () => void;
  onVote?: () => void;
  onCreateChapter?: () => void;
}

export const StoryDetail: React.FC<StoryDetailProps> = ({
  story,
  chapters,
  onBookmark,
  onFollow,
  onVote,
  onCreateChapter,
}) => {
  const [activeTab, setActiveTab] = useState('chapters');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const completionPercentage = story.totalChapters > 0 
    ? (story.currentChapter / story.totalChapters) * 100 
    : 0;

  const tabs = [
    { id: 'chapters', label: 'Chapters', count: chapters.length },
    { id: 'branches', label: 'Branches', count: story.branches.length },
    { id: 'collaborators', label: 'Collaborators', count: story.collaborators.length },
    { id: 'about', label: 'About', count: null },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-80 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl overflow-hidden relative">
          {story.coverImage && (
            <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
          
          {/* Story Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-3">
                  <Badge variant="primary" size="md">{story.genre}</Badge>
                  {story.isActive && <Badge variant="success" size="md">Active</Badge>}
                  {completionPercentage > 80 && (
                    <Badge variant="warning" size="md" icon={MdTrendingUp}>Hot</Badge>
                  )}
                </div>
                
                <h1 className="text-4xl font-bold text-white leading-tight">{story.title}</h1>
                
                <div className="flex items-center space-x-6 text-white/80">
                  <div className="flex items-center space-x-1">
                    <MdPerson className="w-5 h-5" />
                    <span>{story.creator}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MdAccessTime className="w-5 h-5" />
                    <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiUsers className="w-5 h-5" />
                    <span>{formatNumber(story.followers)} followers</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 ml-6">
                <Button
                  variant={story.isBookmarked ? 'secondary' : 'outline'}
                  size="md"
                  icon={story.isBookmarked ? MdBookmark : MdBookmarkBorder}
                  onClick={onBookmark}
                >
                  {story.isBookmarked ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant={story.isFollowing ? 'secondary' : 'primary'}
                  size="md"
                  onClick={onFollow}
                >
                  {story.isFollowing ? 'Following' : 'Follow'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Actions Bar */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{story.currentChapter}</div>
              <div className="text-sm text-dark-400">Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(story.views)}</div>
              <div className="text-sm text-dark-400">Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(story.votes)}</div>
              <div className="text-sm text-dark-400">Votes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{story.collaborators.length}</div>
              <div className="text-sm text-dark-400">Contributors</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="md" icon={MdShare}>
              Share
            </Button>
            <Button variant="ghost" size="md" icon={MdFlag}>
              Report
            </Button>
            <Button variant="gradient" size="md" icon={MdHowToVote} onClick={onVote}>
              Vote
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {story.totalChapters > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-dark-400 mb-2">
              <span>Story Progress</span>
              <span>{Math.round(completionPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </Card>

      {/* Description */}
      <Card className="p-6">
        <p className="text-dark-200 text-lg leading-relaxed">{story.description}</p>
        
        {/* Tags */}
        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-dark-700 text-dark-300 text-sm rounded-lg hover:bg-dark-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Tabs */}
      <div className="border-b border-dark-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-dark-400 hover:text-dark-200'
                }
              `}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'chapters' && (
          <ChapterList 
            chapters={chapters} 
            storyId={story.id}
            canCreateChapter={true}
            onCreateChapter={onCreateChapter}
          />
        )}
        
        {activeTab === 'branches' && (
          <div className="space-y-4">
            {story.branches.map((branch) => (
              <Card key={branch.id} hover className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{branch.name}</h3>
                    <p className="text-dark-400 text-sm">
                      Branches from Chapter {branch.fromChapter} • Created by {branch.creator}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" icon={FiExternalLink}>
                    Explore
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'collaborators' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {story.collaborators.map((collaborator, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                    {collaborator.address.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {collaborator.address.slice(0, 6)}...{collaborator.address.slice(-4)}
                    </div>
                    <div className="text-dark-400 text-sm">
                      {collaborator.chaptersContributed} chapters • {collaborator.totalVotes} votes
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Story Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dark-400">Created</span>
                    <span className="text-white">{new Date(story.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-400">Genre</span>
                    <span className="text-white">{story.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-400">Status</span>
                    <span className="text-white">{story.isActive ? 'Active' : 'Completed'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-400">Chapters</span>
                    <span className="text-white">{story.currentChapter}/{story.totalChapters || '∞'}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

