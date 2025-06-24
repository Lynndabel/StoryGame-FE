import { Story, UserProfileStory } from '../types/story';

export const isUserProfileStory = (story: Story | UserProfileStory): story is UserProfileStory => {
  return !('description' in story);
};
