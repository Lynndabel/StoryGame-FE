// src/components/user/UserStats.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MdAutoStories,
  MdHowToVote,
  MdVisibility,
  MdTrendingUp,
  MdCreate,
  MdBookmark,
  MdStar,
  MdPeople
} from 'react-icons/md';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

interface UserStatsProps {
  stats: {
    storiesCreated: number;
    chaptersWritten: number;
    totalVotes: number;
    totalViews: number;
    storiesRead: number;
    chaptersRead: number;
    bookmarks: number;
    followers: number;
    following: number;
    reputation: number;
    tokensEarned: number;
    rank: string;
    joinedDate: string;
    streak: number;
  };
  showDetailed?: boolean;
}

export const UserStats: React.FC<UserStatsProps> = ({ stats, showDetailed = false }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'legend': return 'text-yellow-400';
      case 'expert': return 'text-purple-400';
      case 'advanced': return 'text-blue-400';
      case 'intermediate': return 'text-green-400';
      case 'beginner': return 'text-gray-400';
      default: return 'text-white';
    }
  };

  const primaryStats = [
    { label: 'Stories Created', value: stats.storiesCreated, icon: MdAutoStories, color: 'text-primary-400' },
    { label: 'Chapters Written', value: stats.chaptersWritten, icon: MdCreate, color: 'text-secondary-400' },
    { label: 'Total Votes', value: stats.totalVotes, icon: MdHowToVote, color: 'text-accent-400' },
    { label: 'Total Views', value: stats.totalViews, icon: MdVisibility, color: 'text-blue-400' },
  ];

  const readerStats = [
    { label: 'Stories Read', value: stats.storiesRead, icon: MdAutoStories },
    { label: 'Chapters Read', value: stats.chaptersRead, icon: MdCreate },
    { label: 'Bookmarks', value: stats.bookmarks, icon: MdBookmark },
    { label: 'Reading Streak', value: stats.streak, icon: MdTrendingUp, suffix: 'days' },
  ];

  const socialStats = [
    { label: 'Followers', value: stats.followers, icon: MdPeople },
    { label: 'Following', value: stats.following, icon: MdPeople },
    { label: 'Reputation', value: stats.reputation, icon: MdStar },
  ];

  if (!showDetailed) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {primaryStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-white mb-1">
                {formatNumber(stat.value)}
              </div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Your Statistics</h3>
          <div className="flex items-center space-x-3">
            <Badge variant="primary" size="md" icon={MdStar}>
              {stats.reputation} Rep
            </Badge>
            <Badge variant="secondary" size="md" className={getRankColor(stats.rank)}>
              {stats.rank}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {primaryStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-dark-700 flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(stat.value)}
              </div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Reading Stats */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Reading Activity</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {readerStats.map((stat, index) => (
            <div key={stat.label} className="text-center p-4 bg-dark-800 rounded-xl">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent-400" />
              <div className="text-xl font-bold text-white mb-1">
                {formatNumber(stat.value)}{stat.suffix && ` ${stat.suffix}`}
              </div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Social Stats */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialStats.map((stat, index) => (
            <div key={stat.label} className="text-center p-4 bg-dark-800 rounded-xl">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-secondary-400" />
              <div className="text-xl font-bold text-white mb-1">
                {formatNumber(stat.value)}
              </div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Progress Indicators */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Progress</h4>
        <div className="space-y-4">
          {/* Reputation Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-dark-300">Reputation Progress</span>
              <span className="text-white">{stats.reputation}/1000</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.reputation / 1000) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Tokens Earned */}
          <div className="flex justify-between items-center">
            <span className="text-dark-300">Total Tokens Earned</span>
            <span className="text-accent-400 font-bold">{formatNumber(stats.tokensEarned)} STORY</span>
          </div>

          {/* Member Since */}
          <div className="flex justify-between items-center">
            <span className="text-dark-300">Member Since</span>
            <span className="text-white">{new Date(stats.joinedDate).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};



