import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MdAutoStories,
  MdCreate,
  MdHowToVote,
  MdBookmark,
  MdSettings,
  MdNotifications
} from 'react-icons/md';
import { UserStats } from './UserStats';
import { StoryList } from '../story/StoryList';
import { Button } from '../UI/Button';
import { UserProfileStory } from '../../types/story';
import { Card } from '../UI/Card';
import { ProfileCard } from './ProfileCard';

interface UserProfileProps {
  user: {
    address: string;
    displayName?: string;
    bio?: string;
    avatar?: string;
    coverImage?: string;
    location?: string;
    website?: string;
    twitter?: string;
    github?: string;
    isVerified: boolean;
    isFollowing?: boolean;
    joinedDate: string;
    reputation: number;
    rank: string;
    followers: number;
    following: number;
  };
  stats: {
    totalStories: number;
    totalFollowers: number;
    totalFollowing: number;
    totalLikes: number;
    storiesCreated: number;
    totalVotes: number;
    bookmarks: number;
  };
  stories: UserProfileStory[];
  isOwnProfile?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  stats,
  stories,
  isOwnProfile = false,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MdAutoStories },
    { id: 'stories', label: 'Stories', icon: MdCreate, count: stats.storiesCreated },
    { id: 'votes', label: 'Votes', icon: MdHowToVote, count: stats.totalVotes },
    { id: 'bookmarks', label: 'Bookmarks', icon: MdBookmark, count: stats.bookmarks },
  ];

  if (isOwnProfile) {
    tabs.push(
      { id: 'settings', label: 'Settings', icon: MdSettings },
      { id: 'notifications', label: 'Notifications', icon: MdNotifications }
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <ProfileCard
        profile={user}
        isOwnProfile={isOwnProfile}
        onEdit={() => {}}
        onFollow={() => {}}
      />

      {/* Navigation Tabs */}
      <Card className="p-1">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-all
                ${activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'text-dark-400 hover:text-white hover:bg-dark-700'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${activeTab === tab.id ? 'bg-white/20' : 'bg-dark-600'}
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </Card>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <UserStats stats={stats} showDetailed={true} />
        )}

        {activeTab === 'stories' && (
          <StoryList
            stories={stories}
            showFeatured={false}
          />
        )}

        {activeTab === 'votes' && (
          <Card className="p-8 text-center">
            <MdHowToVote className="w-16 h-16 mx-auto mb-4 text-dark-400" />
            <h3 className="text-white font-semibold text-lg mb-2">Voting History</h3>
            <p className="text-dark-300 mb-4">
              View all the proposals you have voted on and track your voting impact.
            </p>
            <Button variant="primary">
              View Voting History
            </Button>
          </Card>
        )}

        {activeTab === 'bookmarks' && (
          <Card className="p-8 text-center">
            <MdBookmark className="w-16 h-16 mx-auto mb-4 text-dark-400" />
            <h3 className="text-white font-semibold text-lg mb-2">Saved Stories</h3>
            <p className="text-dark-300 mb-4">
              Your bookmarked stories and chapters for easy access.
            </p>
            <Button variant="primary">
              View Bookmarks
            </Button>
          </Card>
        )}

        {activeTab === 'settings' && isOwnProfile && (
          <Card className="p-8 text-center">
            <MdSettings className="w-16 h-16 mx-auto mb-4 text-dark-400" />
            <h3 className="text-white font-semibold text-lg mb-2">Account Settings</h3>
            <p className="text-dark-300 mb-4">
              Manage your profile, privacy settings, and preferences.
            </p>
            <Button variant="primary">
              Open Settings
            </Button>
          </Card>
        )}

        {activeTab === 'notifications' && isOwnProfile && (
          <Card className="p-8 text-center">
            <MdNotifications className="w-16 h-16 mx-auto mb-4 text-dark-400" />
            <h3 className="text-white font-semibold text-lg mb-2">Notifications</h3>
            <p className="text-dark-300 mb-4">
              Stay updated with voting alerts, story updates, and community activity.
            </p>
            <Button variant="primary">
              Manage Notifications
            </Button>
          </Card>
        )}
      </motion.div>
    </div>
  );
};