// src/components/story/ChapterCard.tsx
import React from 'react';
import Link from 'next/link';
//import { motion } from 'framer-motion';
import {  MdPerson, MdAccessTime, MdHowToVote, MdVisibility, MdStar,MdLock, MdCheckCircle} from 'react-icons/md';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';

interface ChapterCardProps {
  chapter: {
    id: string;
    storyId: string;
    chapterNumber: number;
    title: string;
    content: string;
    author: string;
    votes: number;
    views: number;
    isCanonical: boolean;
    isLocked: boolean;
    publishedAt: string;
    readingTime: number;
  };
  variant?: 'default' | 'compact';
  onVote?: (chapterId: string) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  variant = 'default',
  onVote,
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onVote?.(chapter.id);
  };

  if (variant === 'compact') {
    return (
      <Link href={`/stories/${chapter.storyId}/chapters/${chapter.id}`}>
        <Card hover className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Chapter Number */}
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold">
                {chapter.chapterNumber}
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-white font-medium">{chapter.title}</h3>
                  {chapter.isCanonical && (
                    <Badge variant="success" size="sm" icon={MdCheckCircle}>
                      Canonical
                    </Badge>
                  )}
                  {chapter.isLocked && (
                    <Badge variant="warning" size="sm" icon={MdLock}>
                      Locked
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-dark-400">
                  <span className="flex items-center space-x-1">
                    <MdPerson className="w-4 h-4" />
                    <span>{chapter.author}</span>
                  </span>
                  <span>{chapter.readingTime} min read</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <div className="text-sm text-dark-400">
                {formatNumber(chapter.views)} views
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={MdHowToVote}
                onClick={handleVote}
                className="text-primary-400"
              >
                {formatNumber(chapter.votes)}
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/stories/${chapter.storyId}/chapters/${chapter.id}`}>
      <Card hover className="relative">
        {/* Chapter Number Badge */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg z-10">
          {chapter.chapterNumber}
        </div>

        {/* Status Badges */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          {chapter.isCanonical && (
            <Badge variant="success" size="sm" icon={MdCheckCircle}>
              Canonical
            </Badge>
          )}
          {chapter.isLocked && (
            <Badge variant="warning" size="sm" icon={MdLock}>
              Locked
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="pt-12 space-y-4">
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">{chapter.title}</h3>
            <p className="text-dark-300 text-sm line-clamp-3">{chapter.content}</p>
          </div>

          {/* Author & Meta */}
          <div className="flex items-center space-x-4 text-sm text-dark-400">
            <div className="flex items-center space-x-1">
              <MdPerson className="w-4 h-4" />
              <span>{chapter.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MdAccessTime className="w-4 h-4" />
              <span>{chapter.readingTime} min read</span>
            </div>
            <span>{new Date(chapter.publishedAt).toLocaleDateString()}</span>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-dark-700">
            <div className="flex items-center space-x-4 text-sm text-dark-400">
              <div className="flex items-center space-x-1">
                <MdVisibility className="w-4 h-4" />
                <span>{formatNumber(chapter.views)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MdStar className="w-4 h-4 text-yellow-400" />
                <span>4.8</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              icon={MdHowToVote}
              onClick={handleVote}
              className="text-primary-400 hover:text-primary-300"
            >
              {formatNumber(chapter.votes)} votes
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};