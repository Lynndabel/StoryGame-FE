import React from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import Link from 'next/link';

interface UserProfileStoryCardProps {
  story: UserProfileStory;
  onBookmark?: (id: string) => void;
}

export const UserProfileStoryCard: React.FC<UserProfileStoryCardProps> = ({ 
  story, 
  onBookmark 
}) => {
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmark?.(story.id);
  };

  return (
    <Link href={`/stories/${story.id}`}>
      <Card hover className="p-4">
        {/* Cover Image */}
        {story.coverImage && (
          <div className="relative w-full h-48 bg-dark-700 rounded-lg overflow-hidden mb-4">
            <img 
              src={story.coverImage} 
              alt={story.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-lg line-clamp-2">
            {story.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-dark-400">
            <span>{new Date(story.createdAt).toLocaleDateString()}</span>
            <span>{story.likes} likes</span>
          </div>

          {/* Bookmark Button */}
          <Button
            variant="ghost"
            size="sm"
            icon={story.isBookmarked ? MdBookmark : MdBookmarkBorder}
            onClick={handleBookmark}
            className="text-white hover:text-primary-400 mt-2"
          />
        </div>
      </Card>
    </Link>
  );
};
