// utils/filters.ts
export interface FilterProps {
  filter: string;
  options: string[];
}

const Budget: string[] = ["Under $50", "$50 - $200", "$200 above", "Custom"];

const JobCategory: string[] = [
  "Fashion Designer",
  "Carpenter",
  "Electrician",
  "Mechanic",
  "Others",
];

const JobDuration: string[] = [
  "Short-term (1-3 months)",
  "Medium-term (3-6 months)",
  "Long-term (6+ months)",
];

const Duration: string[] = [
  "Week(s)",
  "Month(s)",
  "Year(s)",
]

const ExperienceLevel: string[] = [
  "BEGINNER",
  "INTERMEDIATE",
  "EXPERT"
]

// const Rating: string[] = [
//   "1 star",
//   "2 stars",
//   "3 stars",
//   "4 stars",
//   "5 stars"
// ]

// const JobHistory: string[] = [
//   "No Employment",
//   "1-9 Employments",
//   "10+ Employments"
// ]

const Location: string[] = [
  "Remote",
  "On-site",
  "Hybrid"
]

const Language: string[] = [
  "English",
  "Yoruba",
  "Hausa",
  "French",
  "Igbo",
  "Arabic",
  "Others"
]

const JobType: string[] = [
  "Fixed Price",
  "Negotiable Price"
]

const Deadline: string[] = [
  "1-3 days left",
  "4-7 days left",
  "More than 7 days left"
]

export const ArtisanCategory: FilterProps = {
  filter: "Artisan Category",
  options: JobCategory
}

export const LevelOfExperience: FilterProps = {
  filter: "Level of Experience",
  options: ExperienceLevel
}

export const PreferedLanguage: FilterProps = {
  filter: "Prefered Language",
  options: Language
}

export const Timeline: FilterProps = {
  filter: "",
  options: Duration
}

export const ArtisanLocation: FilterProps = {
  filter: "Preferred Location",
  options: Location
}

// Updated filters to match screenshot
export const filters: FilterProps[] = [
  {
    filter: "Budget",
    options: Budget,
  },
  {
    filter: "Location",
    options: Location,
  },
  {
    filter: "Job duration",
    options: JobDuration,
  },
  {
    filter: "Job Category",
    options: JobCategory,
  },
];

export const appliedJobFilters: FilterProps[] = [
  {
    filter: "Status",
    options: JobDuration,
  },
  {
    filter: "Job Type",
    options: JobType,
  },
  {
    filter: "Sort By",
    options: ExperienceLevel,
  },
  {
    filter: "Deadline",
    options: Deadline,
  },
  {
    filter: "Location",
    options: Location,
  },
];

export const disputedJobFilters: FilterProps[] = [
  { 
    filter: "Status", 
    options: ["Pending Client Action", "Pending Artisan Response", "Under Review", "Escalated"] 
  },
  { 
    filter: "Dispute Type", 
    options: ["Payment Not Released", "Work Quality", "Scope Change", "Delivery Delay", "Communication Issue"] 
  },
  { 
    filter: "Raised Date", 
    options: ["Last 7 days", "Last 30 days", "Last 3 months", "Older"] 
  },
  { 
    filter: "Sort By", 
    options: ["Date Raised", "Priority", "Amount", "Resolution Status"] 
  }
];