import React from 'react';
import { StoryCard } from './StoryCard';
import { UserProfileStoryCard } from './UserProfileStoryCard';
import { Story, UserProfileStory } from '../../types/story';
import { isUserProfileStory } from '@/utils/typeguards';

interface StoryCardWrapperProps {
  story: Story | UserProfileStory;
  variant?: 'default' | 'compact' | 'featured';
  onBookmark?: (id: string) => void;
}

export const StoryCardWrapper: React.FC<StoryCardWrapperProps> = ({
  story,
  variant = 'default',
  onBookmark
}) => {
  if (isUserProfileStory(story)) {
    return <UserProfileStoryCard story={story} onBookmark={onBookmark} />;
  }

  return (
    <StoryCard
      story={story}
      variant={variant}
      onBookmark={onBookmark}
    />
  );
};
