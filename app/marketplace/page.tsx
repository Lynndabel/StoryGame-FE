"use client";
import { useState, useMemo } from "react";
import Filter from "@/components/Marketplace/Filter";
import JobCard from '@/components/Marketplace/JobListingCard/JobCard';
import SearchSortBar from "@/components/Marketplace/Search";
import Pagination from "@/components/Marketplace/Pagnation";
import MarketHeader from "@/components/Marketplace/MarketHeader";
import HeroBanner from "@/components/Marketplace/HeroBanner";
import { filters } from "@/utils/filters";
import { usePathname } from "next/navigation";
import axios from "@/app/API/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { Job } from "@/utils/job";
import Footer from "@/components/LandingPage/Footer";
import { formatUnits } from "ethers";

export default function MarketPlace(): JSX.Element {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobsPerPage, setJobsPerPage] = useState<number>(4);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('Most Recent');
  
  const pathname = usePathname();
  
  const isActive = (path: string): boolean => pathname === path;

  const toggleFilter = (): void => {
    setShowFilter(!showFilter);
  };
  
  const fetchGigs = async (): Promise<ApiJob[]> => {
    const backendResponse = await axios.get("/api/gigs");
    return backendResponse.data?.gigs;
  };
  
  const { isLoading, data } = useQuery({
    queryKey: ["gigs"],
    queryFn: fetchGigs,
  });

interface ApiJob {
  id?: string;
  _id?: string;
  createdAt?: string;
  posted_at?: string;
  title?: string;
  job_title?: string;
  preferredLocation?: string;
  location?: string;
  preferred_location?: string;
  language?: string;
  experienceLevel?: string;
  experience_level?: string;
  skill_level?: string;

  projectDuration?: { weeks: number };
  project_duration?: { weeks: number };
  duration_weeks?: number;
  duration?: number;

  price?: number;
  budget?: number;
  amount?: number;

  paymentType?: string;
  payment_type?: string;
  payment?: string;
  type?: string;
  application_type?: string;

  projectDescription?: string;
  project_description?: string;
  description?: string;

  skillCategory?: string[] ;
  skill_category?: string[] ;
  tags?: string[] ;
  skills?: string[] ;
  required_skills?: string[] ;

  files?: string[];
  attachments?: string[];
  images?: string[];
  image_urls?: string[];

  contextLink?: string;
  context_link?: string;
  reference_link?: string;

  notes?: string;
  additional_notes?: string;
  additional_info?: string;
  additionalProjectInfo?: string;

  status?: string;

  rating?: number;
  totalJobs?: number;
  total_jobs?: number;
  applicants?: [];

  client?: {
    id?: string;
    walletAddress?: string;
    verificationStatus?: boolean;
    verified?: boolean;
    about?: string;
    dateJoined?: string;
    date_joined?: string;
    location?: string;
    language?: string;
    status?: string;
    username?: string;
    name?: string;
    avatar?: string;
    moneySpent?: number;
    completed?: number;
    posted?: number;
    noProjectSpentMoney?: number;
    rating?: number;
  };

  client_address?: string;
  clientAddress?: string;
  client_description?: string;
  clientDescription?: string;
  client_name?: string;
}

  // Helper function to parse and normalize dates
  const parseJobDate = (dateInput: string | undefined): Date => {
    if (!dateInput) {
      return new Date(); // Current time if no date provided
    }
    
    // Handle common date formats from API
    const date = new Date(dateInput);
    
    // If parsing fails, return current time
    if (isNaN(date.getTime())) {
      return new Date();
    }
    
    return date;
  };

  // Transform API data to match your Job interface
  const transformApiData = (apiJobs: ApiJob[]): Job[] => {
    return apiJobs?.map((job: ApiJob, index: number) => {
      // Parse the creation date
      const createdDate = parseJobDate(job.createdAt || job.posted_at);
      const formattedPrice = Number(formatUnits(job.price ?? 404000000, 6));
      
      // Similar date handling for client dateJoined
      const clientJoinedDate = parseJobDate(job.client?.dateJoined || job.client?.date_joined);
      
      return {
        id: job.id || job._id || `api-job-${index}`,
        _id: job._id || job.id,
        createdAt: createdDate.toISOString(), // Pass actual timestamp, not relative time
        title: job.title || job.job_title || "Untitled Job",
        preferredLocation: job.preferredLocation || job.location || job.preferred_location || "Remote",
        language: job.language || "English",
        experienceLevel: job.experienceLevel || job.experience_level || job.skill_level || "Intermediate",
        
        projectDuration: {
          weeks: job.projectDuration?.weeks || 
                 job.project_duration?.weeks || 
                 job.duration_weeks || 
                 job.duration || 
                 2
        },
        
        price: formattedPrice || job.budget || job.amount || 0,
        paymentType: job.paymentType || job.payment_type || "Fixed",
        payment: job.payment || "Secured Payment",
        type: job.type || job.application_type || "Open Application",
        
        projectDescription: job.projectDescription || 
                           job.project_description || 
                           job.description || 
                           "No description provided",
        
        skillCategory: job.skillCategory || 
                      job.skill_category || 
                      job.tags || 
                      job.skills || 
                      job.required_skills || 
                      [],
        
        files: job.files || job.attachments || [],
        images: job.images || job.image_urls || [],
        contextLink: job.contextLink || job.context_link || job.reference_link,
        
        notes: job.notes || job.additional_notes || job.additional_info,
        status: job.status || "Open",
        
        client: {
          walletAddress: job.client?.walletAddress || 
                        job.client_address || 
                        job.clientAddress || 
                        "0x1234...5678",
          verificationStatus: job.client?.verificationStatus || 
                             job.client?.verified || 
                             false,
          about: job.client?.about || 
                 job.client_description || 
                 job.clientDescription || 
                 "Professional client",
          dateJoined: clientJoinedDate.toISOString(), // Pass actual timestamp
          location: job.client?.location || 
                   job.preferredLocation || 
                   "Remote",
          language: job.client?.language || 
                   job.language || 
                   "English",
          status: job.client?.status || "Active Client",
          username: job.client?.username || 
                   job.client?.name || 
                   job.client_name || 
                   "Anonymous",
          avatar: job.client?.avatar || "/client-avatar.png",
          id: job.client?.id || `client-${index}`,
          moneySpent: job.client?.moneySpent || 0,
          completed: job.client?.completed || 0,
          posted: job.client?.posted || 1,
          noProjectSpentMoney: job.client?.noProjectSpentMoney || 0,
          rating: job.client?.rating || 4.0,
        },
        
        rating: job.rating || 4.0,
        totalJobs: job.totalJobs || job.total_jobs || 1,
        applicants: job.applicants || [],
        additionalProjectInfo: job.additionalProjectInfo || job.additional_info,
        
        // Store original date for sorting purposes
        _originalCreatedAt: createdDate,
      };
    }) || [];
  };

  // Transform the API data when it's available
  const transformedApiJobs = data ? transformApiData(data) : [];
  
  // Combine all jobs
  const allJobs = transformedApiJobs;
  
  // Filter and sort jobs based on search and sort criteria
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = allJobs;
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.projectDescription ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.skillCategory ?? []).some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (job.client?.username ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.preferredLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case 'Most Recent':
          // Use the actual ISO timestamp for accurate sorting
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        
        case 'Oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        
        case 'Shortest Duration':
          return a.projectDuration.weeks - b.projectDuration.weeks;
        
        case 'Longest Duration':
          return b.projectDuration.weeks - a.projectDuration.weeks;
        
        case 'Highest Budget':
          return (b.price ?? 0) - (a.price ?? 0);
        
        case 'Lowest Budget':
          return (a.price ?? 0) - (b.price ?? 0);
        
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [allJobs, searchTerm, selectedSort]);
  
  // Calculate pagination
  const totalJobs = filteredAndSortedJobs.length;
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredAndSortedJobs.slice(startIndex, endIndex);
  
  // Handle pagination changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optionally scroll to top of job container
    const jobContainer = document.querySelector('.job-container');
    if (jobContainer) {
      jobContainer.scrollTop = 0;
    }
  };
  
  const handleJobsPerPageChange = (newJobsPerPage: number) => {
    setJobsPerPage(newJobsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  
  // Handle search changes
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  // Handle sort changes
  const handleSortChange = (newSort: string) => {
    setSelectedSort(newSort);
    setCurrentPage(1); // Reset to first page when sorting
  };
  
  return (
    <div className="w-screen">
      <MarketHeader toggleFilter={toggleFilter} isActive={isActive} />
      <HeroBanner />
      <div className="px-4 md:px-8 xl:px-16 py-8 gap-x-12 md:flex w-screen md:items-stretch">
        {showFilter && (
          <div className="md:hidden min-h-[60%]">
            <Filter filters={filters} />
          </div>
        )}
        <div className="hidden md:grid md:w-[25%] xl:w-[20%] md:h-full">
          <Filter filters={filters} />
        </div>
        
        <div className="flex flex-col gap-y-2 w-[90vw] md:flex-1 md:min-h-full">
          <div className="flex flex-col w-full">
            <div className="w-full">
              <SearchSortBar 
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                selectedSort={selectedSort}
                onSortChange={handleSortChange}
              />
            </div>
            <div className="w-full flex-1 mt-2">
              <div 
                className="overflow-y-auto space-y-4 w-full job-container" 
                style={{ backgroundColor: '#F2E8CF0A', minHeight: '680px', maxHeight: '78vh' }}
              >
                <style jsx>{`
                  .job-container {
                    scrollbar-width: thin;
                    scrollbar-color: #6b7280 transparent;
                  }
                  
                  .job-container::-webkit-scrollbar {
                    width: 6px;
                  }
                  
                  .job-container::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  
                  .job-container::-webkit-scrollbar-thumb {
                    background: #6b7280;
                    border-radius: 10px;
                    height: 40px;
                  }
                  
                  .job-container::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af;
                  }
                `}</style>
                
                <Loading show={isLoading} size="lg" fullScreen={false}>
                  {/* Display paginated jobs */}
                  {currentJobs.map((job: Job, index: number) => (
                    <JobCard 
                      key={job.id || job._id || `job-${startIndex + index}`} 
                      job={job} 
                      index={startIndex + index}
                    />
                  ))}
                  
                  {/* Show message if no jobs after filtering */}
                  {!isLoading && currentJobs.length === 0 && searchTerm && (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                      <p>No jobs found for &quot;{searchTerm}&quot;</p>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                  
                  {/* Show message if no jobs available at all */}
                  {!isLoading && allJobs.length === 0 && (
                    <div className="flex items-center justify-center h-40 text-gray-400">
                      No jobs available
                    </div>
                  )}
                </Loading>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Pagination 
              currentPage={currentPage}
              jobsPerPage={jobsPerPage}
              totalJobs={totalJobs}
              onPageChange={handlePageChange}
              onJobsPerPageChange={handleJobsPerPageChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}