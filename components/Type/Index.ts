// src/types/index.ts

// Re-export all types
export * from '.Story';
export * from '.User';
export * from '.Voting';
export * from '.Web3';

// src/types/story.ts
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
  address: string;
  displayName?: string;
  chaptersContributed: number;
  totalVotes: number;
  joinedAt: string;
  reputation: number;
}

export interface StoryMetadata {
  expectedLength?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  isOpenForCollaboration: boolean;
  minReputationToContribute?: number;
  contentWarnings?: string[];
  licenses?: string[];
}

export interface Chapter {
  id: string;
  storyId: string;
  chapterNumber: number;
  branchId?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorDisplayName?: string;
  votes: number;
  views: number;
  isCanonical: boolean;
  isLocked: boolean;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number; // in minutes
  wordCount: number;
  ipfsHash?: string;
  metadata: ChapterMetadata;
}

export interface ChapterMetadata {
  contentType: 'text' | 'multimedia';
  hasImages: boolean;
  hasAudio: boolean;
  hasVideo: boolean;
  contentWarnings?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  themes?: string[];
  characterIntroductions?: string[];
  plotPoints?: string[];
}

export interface CreateStoryRequest {
  title: string;
  description: string;
  genre: string;
  tags: string[];
  firstChapterTitle: string;
  firstChapterContent: string;
  expectedChapters?: number;
  isOpenForCollaboration: boolean;
  coverImage?: File;
  metadata: Partial<StoryMetadata>;
}

export interface CreateChapterRequest {
  storyId: string;
  chapterNumber: number;
  branchId?: string;
  title: string;
  content: string;
  attachments?: File[];
  metadata: Partial<ChapterMetadata>;
}

export type StoryStatus = 'active' | 'completed' | 'paused' | 'cancelled';
export type StoryGenre = 
  | 'fantasy' 
  | 'science-fiction' 
  | 'mystery' 
  | 'romance' 
  | 'thriller' 
  | 'horror' 
  | 'adventure' 
  | 'historical-fiction' 
  | 'literary-fiction' 
  | 'young-adult' 
  | 'comedy' 
  | 'drama' 
  | 'other';

// src/types/voting.ts
export interface Proposal {
  id: string;
  storyId: string;
  storyTitle: string;
  chapterNumber: number;
  branchId?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorDisplayName?: string;
  submissionTime: string;
  submissionFee: number;
  votes: ProposalVotes;
  status: ProposalStatus;
  proposalType: ProposalType;
  timeRemaining: number; // in seconds
  views: number;
  isCanonical?: boolean;
  attachments?: ProposalAttachment[];
  metadata: ProposalMetadata;
}

export interface ProposalVotes {
  total: number;
  for: number;
  against: number;
  abstain: number;
  userVote?: VoteDirection | null;
  breakdown: VoteBreakdown[];
}

export interface VoteBreakdown {
  direction: VoteDirection;
  count: number;
  totalTokens: number;
  averageWeight: number;
}

export interface VotingRound {
  id: string;
  storyId: string;
  chapterNumber: number;
  proposalIds: string[];
  startTime: string;
  endTime: string;
  totalVotes: number;
  totalParticipants: number;
  winningProposal?: string;
  isFinalized: boolean;
  quorumReached: boolean;
  metadata: VotingRoundMetadata;
}

export interface VotingRoundMetadata {
  minimumVotes: number;
  quorumPercentage: number;
  votingDuration: number; // in seconds
  proposalThreshold: number;
  allowedVoters?: string[]; // if restricted
}

export interface Vote {
  id: string;
  roundId: string;
  proposalId: string;
  voter: string;
  direction: VoteDirection;
  weight: number;
  tokensUsed: number;
  timestamp: string;
  transactionHash: string;
}

export interface VotingPower {
  address: string;
  totalTokens: number;
  availableTokens: number;
  usedTokens: number;
  votingWeight: number; // calculated using quadratic voting
  delegatedTo?: string;
  delegatedFrom?: string[];
}

export interface ProposalAttachment {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  ipfsHash?: string;
}

export interface ProposalMetadata {
  additionalNotes?: string;
  inspirations?: string[];
  characterDevelopment?: string[];
  plotAdvancement?: string[];
  estimatedReadingTime: number;
  wordCount: number;
}

export type ProposalStatus = 'draft' | 'submitted' | 'active' | 'passed' | 'rejected' | 'expired' | 'implemented';
export type ProposalType = 'continuation' | 'branch' | 'remix' | 'merge';
export type VoteDirection = 'for' | 'against' | 'abstain';

export interface CreateProposalRequest {
  storyId: string;
  chapterNumber: number;
  branchId?: string;
  title: string;
  content: string;
  proposalType: ProposalType;
  expectedDuration: number; // in days
  additionalNotes?: string;
  attachments?: File[];
  submissionFee: number;
}

export interface VoteRequest {
  proposalId: string;
  direction: VoteDirection;
  weight: number;
  tokensToUse: number;
}

// src/types/user.ts
export interface User {
  address: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  discord?: string;
  isVerified: boolean;
  joinedDate: string;
  lastActiveAt: string;
  reputation: number;
  rank: UserRank;
  stats: UserStats;
  preferences: UserPreferences;
  badges: UserBadge[];
}

export interface UserStats {
  // Creation Stats
  storiesCreated: number;
  chaptersWritten: number;
  proposalsSubmitted: number;
  
  // Engagement Stats
  totalVotes: number;
  totalViews: number;
  storiesRead: number;
  chaptersRead: number;
  bookmarks: number;
  
  // Social Stats
  followers: number;
  following: number;
  
  // Economic Stats
  tokensEarned: number;
  tokensSpent: number;
  revenueEarned: number; // in ETH/USD
  
  // Activity Stats
  streak: number; // consecutive days active
  lastActive: string;
  totalSessions: number;
  averageSessionTime: number; // in minutes
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  
  // Reading Preferences
  autoBookmark: boolean;
  readingSpeed: 'slow' | 'normal' | 'fast';
  fontSize: 'small' | 'medium' | 'large';
  
  // Privacy Settings
  showActivity: boolean;
  showStats: boolean;
  allowMessages: boolean;
  
  // Content Filters
  contentWarnings: string[];
  blockedGenres: string[];
  minimumReputation: number;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: string;
  criteria: string;
}

export interface UserActivity {
  id: string;
  type: ActivityType;
  timestamp: string;
  metadata: Record<string, any>;
  isPublic: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface Following {
  follower: string;
  following: string;
  followedAt: string;
  notifications: boolean;
}

export type UserRank = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'legend';
export type ActivityType = 
  | 'story_created' 
  | 'chapter_written' 
  | 'vote_cast' 
  | 'story_read' 
  | 'user_followed' 
  | 'badge_earned' 
  | 'reputation_milestone';

export type NotificationType = 
  | 'vote_started'
  | 'vote_ended'
  | 'proposal_accepted'
  | 'proposal_rejected'
  | 'new_chapter'
  | 'new_follower'
  | 'mention'
  | 'badge_earned'
  | 'reputation_changed'
  | 'story_featured';

// src/types/web3.ts
export interface Web3Context {
  // Connection State
  isConnected: boolean;
  isConnecting: boolean;
  account?: string;
  provider?: any;
  signer?: any;
  
  // Network State
  chainId?: number;
  networkName?: string;
  isCorrectNetwork: boolean;
  
  // Balance State
  balances: TokenBalances;
  
  // Methods
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
  refreshBalances: () => Promise<void>;
}

export interface TokenBalances {
  eth: number;
  story: number;
  read: number;
  voting_power: number;
}

export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  contracts: ContractAddresses;
}

export interface ContractAddresses {
  storyRegistry: string;
  chapterNFT: string;
  votingManager: string;
  proposalManager: string;
  revenueDistributor: string;
  storyToken: string;
  readerRewards: string;
  storyGovernance: string;
  accessManager: string;
  emergencyPause: string;
}

export interface TransactionStatus {
  hash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations?: number;
  gasUsed?: number;
  effectiveGasPrice?: number;
  error?: string;
}

export interface ContractCall {
  contract: string;
  method: string;
  args: any[];
  value?: number;
  gasLimit?: number;
  gasPrice?: number;
}

export interface Web3Error {
  code: number;
  message: string;
  data?: any;
}

// Transaction Types
export interface CreateStoryTx extends ContractCall {
  contract: 'storyRegistry';
  method: 'createStory';
  args: [string, string]; // title, description
}

export interface SubmitProposalTx extends ContractCall {
  contract: 'proposalManager';
  method: 'submitProposal';
  args: [string, number, number, string, string, string, number]; // storyId, chapterNumber, branchId, title, content, ipfsHash, proposalType
  value: number; // submission fee
}

export interface CastVoteTx extends ContractCall {
  contract: 'votingManager';
  method: 'castVote';
  args: [string, string, number]; // roundId, proposalId, weight
}

// Event Types
export interface StoryCreatedEvent {
  storyId: string;
  creator: string;
  title: string;
  timestamp: string;
  transactionHash: string;
}

export interface ProposalSubmittedEvent {
  proposalId: string;
  storyId: string;
  author: string;
  chapterNumber: number;
  timestamp: string;
  transactionHash: string;
}

export interface VoteCastEvent {
  roundId: string;
  proposalId: string;
  voter: string;
  weight: number;
  timestamp: string;
  transactionHash: string;
}

// src/types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, any>;
}

// Search and Filter Types
export interface SearchParams {
  query: string;
  type?: 'stories' | 'authors' | 'chapters' | 'proposals' | 'all';
  filters?: SearchFilters;
  sort?: SortOptions;
  pagination?: PaginationParams;
}

export interface SearchFilters {
  genre?: string[];
  status?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
  reputation?: {
    min: number;
    max?: number;
  };
  votes?: {
    min: number;
    max?: number;
  };
  hasImages?: boolean;
  isVerified?: boolean;
  language?: string[];
}

export interface SortOptions {
  field: 'created_at' | 'updated_at' | 'votes' | 'views' | 'reputation' | 'relevance';
  direction: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SearchResult {
  id: string;
  type: 'story' | 'author' | 'chapter' | 'proposal';
  title: string;
  subtitle?: string;
  description?: string;
  author?: string;
  thumbnail?: string;
  verified?: boolean;
  score: number; // relevance score
  highlights?: string[]; // highlighted text matches
}

// Real-time Updates
export interface RealtimeEvent {
  type: string;
  data: any;
  timestamp: string;
  userId?: string;
}

export interface WebSocketMessage {
  event: string;
  data: any;
  id?: string;
}

// File Upload
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FileUpload {
  file: File;
  progress: UploadProgress;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

// Analytics
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  userId?: string;
  sessionId: string;
  timestamp: string;
}

export interface UserAnalytics {
  pageViews: number;
  timeSpent: number; // in seconds
  actions: Record<string, number>;
  referrer?: string;
  device: string;
  browser: string;
}