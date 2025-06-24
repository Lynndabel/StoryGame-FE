export interface UserProfileStory {
  id: string;
  title: string;
  coverImage?: string;
  createdAt: string;
  likes: number;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  creator: string;
  currentChapter: number;
  totalChapters: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  genre: string;
  tags: string[];
  views: number;
  votes: number;
  followers: number;
  isBookmarked?: boolean;
  isFollowing?: boolean;
  coverImage?: string;
  branchPoints: number[];
  branches: StoryBranch[];
  collaborators: StoryCollaborator[];
  metadata: StoryMetadata;
}

export interface StoryBranch {
  id: string;
  storyId: string;
  name: string;
  description: string;
  fromChapter: number;
  creator: string;
  isActive: boolean;
  createdAt: string;
  chapterCount: number;
}

export interface StoryCollaborator {
  id: string;
  userId: string;
  role: string;
  joinedAt: string;
}

export interface StoryMetadata {
  wordCount: number;
  readingTime: number;
  lastUpdated: string;
}
