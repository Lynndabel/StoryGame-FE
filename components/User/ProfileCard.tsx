// src/components/user/ProfileCard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MdEdit,
  MdVerified,
  MdLocationOn,
  MdLink,
  MdCalendarToday,
  MdMoreVert
} from 'react-icons/md';
import { FiTwitter, FiGithub, FiGlobe } from 'react-icons/fi';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ProfileCardProps {
  profile: {
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
  isOwnProfile?: boolean;
  onEdit?: () => void;
  onFollow?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isOwnProfile = false,
  onEdit,
  onFollow,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'legend': return 'from-yellow-400 to-yellow-600';
      case 'expert': return 'from-purple-400 to-purple-600';
      case 'advanced': return 'from-blue-400 to-blue-600';
      case 'intermediate': return 'from-green-400 to-green-600';
      case 'beginner': return 'from-gray-400 to-gray-600';
      default: return 'from-primary-400 to-primary-600';
    }
  };

  const socialLinks = [
    { platform: 'website', url: profile.website, icon: FiGlobe, label: 'Website' },
    { platform: 'twitter', url: profile.twitter, icon: FiTwitter, label: 'Twitter' },
    { platform: 'github', url: profile.github, icon: FiGithub, label: 'GitHub' },
  ].filter(link => link.url);

  return (
    <Card className="overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 relative">
        {profile.coverImage && (
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {isOwnProfile ? (
            <Button
              variant="ghost"
              size="sm"
              icon={MdEdit}
              onClick={onEdit}
              className="bg-black/50 hover:bg-black/70"
            >
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant={profile.isFollowing ? 'secondary' : 'primary'}
                size="sm"
                onClick={onFollow}
                className="bg-black/50 hover:bg-black/70"
              >
                {profile.isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={MdMoreVert}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-black/50 hover:bg-black/70 !px-2"
              />
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        {/* Avatar & Basic Info */}
        <div className="flex items-start space-x-4 -mt-12 mb-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-2xl border-4 border-dark-900 overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {(profile.displayName || profile.address).slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            
            {/* Rank Badge */}
            <div className={`absolute -bottom-2 -right-2 px-2 py-1 bg-gradient-to-r ${getRankColor(profile.rank)} rounded-lg text-white text-xs font-bold`}>
              {profile.rank}
            </div>
          </motion.div>

          <div className="flex-1 pt-8">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-xl font-bold text-white">
                {profile.displayName || formatAddress(profile.address)}
              </h2>
              {profile.isVerified && (
                <MdVerified className="w-5 h-5 text-primary-400" />
              )}
            </div>
            
            <p className="text-dark-300 font-mono text-sm mb-3">
              {formatAddress(profile.address)}
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm">
              <div>
                <span className="text-white font-medium">{formatNumber(profile.followers)}</span>
                <span className="text-dark-400 ml-1">followers</span>
              </div>
              <div>
                <span className="text-white font-medium">{formatNumber(profile.following)}</span>
                <span className="text-dark-400 ml-1">following</span>
              </div>
              <Badge variant="primary" size="sm">
                {profile.reputation} rep
              </Badge>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-dark-200 mb-4 leading-relaxed">
            {profile.bio}
          </p>
        )}

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          {profile.location && (
            <div className="flex items-center space-x-2 text-dark-400 text-sm">
              <MdLocationOn className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-dark-400 text-sm">
            <MdCalendarToday className="w-4 h-4" />
            <span>Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex items-center space-x-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-dark-400 hover:text-primary-400 transition-colors"
                title={link.label}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};