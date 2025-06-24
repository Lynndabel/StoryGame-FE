// src/components/voting/ProposalCard.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MdHowToVote,
  MdPerson,
  MdAccessTime,
  MdVisibility,
  MdThumbUp,
  MdThumbDown,
  MdSchedule,
  MdCheckCircle,
  MdCancel,
  MdTrendingUp
} from 'react-icons/md';
import { FiClock, FiUsers } from 'react-icons/fi';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProposalCardProps {
  proposal: {
    id: string;
    storyId: string;
    storyTitle: string;
    chapterNumber: number;
    title: string;
    content: string;
    author: string;
    submissionTime: string;
    votes: {
      total: number;
      for: number;
      against: number;
      userVote?: 'for' | 'against' | null;
    };
    status: 'active' | 'passed' | 'rejected' | 'expired';
    timeRemaining: number; // in seconds
    proposalType: 'continuation' | 'branch' | 'remix' | 'merge';
    views: number;
    isCanonical?: boolean;
  };
  variant?: 'default' | 'compact' | 'detailed';
  onVote?: (proposalId: string, vote: 'for' | 'against') => void;
  showStoryLink?: boolean;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  variant = 'default',
  onVote,
  showStoryLink = true,
}) => {
  const [isVoting, setIsVoting] = useState(false);

  const formatTimeRemaining = (seconds: number) => {
    if (seconds <= 0) return 'Expired';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'primary';
      case 'passed': return 'success';
      case 'rejected': return 'error';
      case 'expired': return 'warning';
      default: return 'primary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'continuation': return MdTrendingUp;
      case 'branch': return MdCancel;
      case 'remix': return MdCheckCircle;
      case 'merge': return MdHowToVote;
      default: return MdHowToVote;
    }
  };

  const handleVote = async (vote: 'for' | 'against') => {
    if (isVoting || proposal.votes.userVote) return;
    
    setIsVoting(true);
    try {
      await onVote?.(proposal.id, vote);
    } finally {
      setIsVoting(false);
    }
  };

  const votePercentage = proposal.votes.total > 0 
    ? (proposal.votes.for / proposal.votes.total) * 100 
    : 0;

  if (variant === 'compact') {
    return (
      <Card hover className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Chapter Info */}
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold">
              {proposal.chapterNumber}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-white font-medium truncate">{proposal.title}</h3>
                <Badge 
                  variant={getStatusColor(proposal.status) as any} 
                  size="sm"
                >
                  {proposal.status}
                </Badge>
              </div>
              
              {showStoryLink && (
                <Link href={`/stories/${proposal.storyId}`} className="text-primary-400 hover:text-primary-300 text-sm transition-colors">
                  {proposal.storyTitle}
                </Link>
              )}
              
              <div className="flex items-center space-x-4 text-xs text-dark-400 mt-1">
                <span className="flex items-center space-x-1">
                  <MdPerson className="w-3 h-3" />
                  <span>{proposal.author}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FiClock className="w-3 h-3" />
                  <span>{formatTimeRemaining(proposal.timeRemaining)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Voting */}
          <div className="flex items-center space-x-3 ml-4">
            <div className="text-right text-sm">
              <div className="text-white font-medium">{formatNumber(proposal.votes.total)}</div>
              <div className="text-dark-400">votes</div>
            </div>
            
            {proposal.status === 'active' && (
              <div className="flex space-x-1">
                <Button
                  variant={proposal.votes.userVote === 'for' ? 'primary' : 'ghost'}
                  size="sm"
                  icon={MdThumbUp}
                  onClick={() => handleVote('for')}
                  disabled={isVoting || !!proposal.votes.userVote}
                  className="!px-2"
                />
                <Button
                  variant={proposal.votes.userVote === 'against' ? 'secondary' : 'ghost'}
                  size="sm"
                  icon={MdThumbDown}
                  onClick={() => handleVote('against')}
                  disabled={isVoting || !!proposal.votes.userVote}
                  className="!px-2"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  const TypeIcon = getTypeIcon(proposal.proposalType);

  return (
    <Link href={`/proposals/${proposal.id}`}>
      <Card hover className="relative overflow-hidden">
        {/* Status Indicator */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
          proposal.status === 'active' ? 'from-primary-500 to-secondary-500' :
          proposal.status === 'passed' ? 'from-accent-500 to-accent-600' :
          proposal.status === 'rejected' ? 'from-red-500 to-red-600' :
          'from-yellow-500 to-yellow-600'
        }`} />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <TypeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Badge variant={getStatusColor(proposal.status) as any} size="sm">
                  {proposal.status}
                </Badge>
                <Badge variant="info" size="sm">
                  Chapter {proposal.chapterNumber}
                </Badge>
                {proposal.isCanonical && (
                  <Badge variant="success" size="sm" icon={MdCheckCircle}>
                    Canonical
                  </Badge>
                )}
              </div>
              <h3 className="text-white font-semibold text-lg mt-1">{proposal.title}</h3>
            </div>
          </div>

          {proposal.status === 'active' && (
            <div className="text-right">
              <div className="text-dark-400 text-sm mb-1">Time left</div>
              <div className="text-white font-medium">
                {formatTimeRemaining(proposal.timeRemaining)}
              </div>
            </div>
          )}
        </div>

        {/* Story Link */}
        {showStoryLink && (
          <Link 
            href={`/stories/${proposal.storyId}`}
            className="inline-block text-primary-400 hover:text-primary-300 text-sm mb-3 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {proposal.storyTitle}
          </Link>
        )}

        {/* Content Preview */}
        <p className="text-dark-300 text-sm line-clamp-3 mb-4">
          {proposal.content}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center space-x-4 text-sm text-dark-400 mb-4">
          <div className="flex items-center space-x-1">
            <MdPerson className="w-4 h-4" />
            <span>{proposal.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MdAccessTime className="w-4 h-4" />
            <span>{new Date(proposal.submissionTime).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MdVisibility className="w-4 h-4" />
            <span>{formatNumber(proposal.views)}</span>
          </div>
        </div>

        {/* Voting Section */}
        <div className="border-t border-dark-700 pt-4">
          {/* Vote Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-dark-400 mb-1">
              <span>Support</span>
              <span>{Math.round(votePercentage)}%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${votePercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Vote Stats & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-accent-400">
                <MdThumbUp className="w-4 h-4" />
                <span>{formatNumber(proposal.votes.for)}</span>
              </div>
              <div className="flex items-center space-x-1 text-red-400">
                <MdThumbDown className="w-4 h-4" />
                <span>{formatNumber(proposal.votes.against)}</span>
              </div>
              <div className="flex items-center space-x-1 text-dark-400">
                <FiUsers className="w-4 h-4" />
                <span>{formatNumber(proposal.votes.total)} total</span>
              </div>
            </div>

            {proposal.status === 'active' && (
              <div className="flex space-x-2">
                <Button
                  variant={proposal.votes.userVote === 'for' ? 'primary' : 'outline'}
                  size="sm"
                  icon={MdThumbUp}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleVote('for');
                  }}
                  disabled={isVoting || !!proposal.votes.userVote}
                  loading={isVoting && proposal.votes.userVote !== 'against'}
                >
                  Support
                </Button>
                <Button
                  variant={proposal.votes.userVote === 'against' ? 'secondary' : 'outline'}
                  size="sm"
                  icon={MdThumbDown}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleVote('against');
                  }}
                  disabled={isVoting || !!proposal.votes.userVote}
                  loading={isVoting && proposal.votes.userVote !== 'for'}
                >
                  Oppose
                </Button>
              </div>
            )}
          </div>

          {/* User Vote Indicator */}
          {proposal.votes.userVote && (
            <div className="mt-2 text-sm">
              <span className="text-dark-400">You voted </span>
              <span className={proposal.votes.userVote === 'for' ? 'text-accent-400' : 'text-red-400'}>
                {proposal.votes.userVote === 'for' ? 'in support' : 'against'}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

