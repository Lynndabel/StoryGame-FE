// Extended Job interface that includes all properties from both files
export interface Job {
  // From @/utils/types (original)
  id?: string | number;
  title: string;
  createdAt: string;
  preferredLocation: string;
  language?: string; // Made optional to match job.ts
  projectDuration: {
    weeks: number;
  };
  experienceLevel: string;
  price?: number;
  paymentType?: string; // Made optional to match job.ts
  projectDescription?: string; // Made optional to match job.ts
  tags?: string[];
  skillCategory?: string[];
  payment?: string; // Made optional to match job.ts
  type?: string; // Made optional to match job.ts

  // From @/utils/job (additional properties)
  _id?: string;
  totalJobs?: number;
  rating?: number;
  notes?: string;
  artisans?: string;
  files?: string[]; // Made optional to handle cases where API doesn't provide
  images?: string[]; // Made optional to handle cases where API doesn't provide
  client?: Client; // Made optional to handle cases where API doesn't provide
  status?: string;
  applicants?: Artisan[];
  completedBy?: Artisan;
  contextLink?: string;
  additionalProjectInfo?: string;
  clientAddress?: string;
  clientDescription?: string;
}

// Import Client and Artisan from job.ts, or define them here
export interface Client {
  walletAddress: string;
  verificationStatus: boolean;
  about: string;
  dateJoined: string;
  location: string;
  language: string;
  status: string;
  username: string;
  avatar: string;
  id: string;
  moneySpent: number;
  completed: number;
  posted: number;
  noProjectSpentMoney: number;
  rating: number;
}

export interface Artisan {
  walletAddress: string;
  verificationStatus: boolean;
  about: string;
  dateJoined: string;
  id: string;
  location: string;
  language: string;
  expertise: string;
  rating: number;
  review?: string;
}

export interface Applied {
  startDate: string;
  status: string;
  statusMsg: string;
  job: Job;
  endDate?: string;
  rating?: number;
  feedback?: string;
  disputeType?: string;
  issue?: string;
}

// Component prop interfaces
export interface JobCardProps {
  job: Job;
  index: number;
}

export interface JobHeaderProps {
  job: Job;
}

export interface JobDetailsProps {
  job: Job;
}

export interface JobPricingProps {
  job: Job;
}

export interface JobDescriptionProps {
  job: Job;
  jobId: string | number;
  isExpanded: boolean;
  onToggle: (jobId: string | number) => void;
}

export interface JobTagsProps {
  job: Job;
  jobId: string | number;
  isExpanded: boolean;
  onToggle: (jobId: string | number) => void;
}

export interface JobActionsProps {
  job: Job;
}