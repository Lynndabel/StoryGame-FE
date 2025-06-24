import React from 'react';
import { Job } from '@/utils/job';

interface SimilarJobsProps {
  currentJobId?: string;
  allJobs: Job[]; // You'll need to pass this from your parent component
}

const SimilarJobs: React.FC<SimilarJobsProps> = ({ currentJobId, allJobs }) => {
  // Filter out current job and get similar ones (you can improve this logic)
  const similarJobs = allJobs
    .filter(job => job.id !== currentJobId || job._id !== currentJobId)
    .slice(0, 3); // Show only 3 similar jobs

  if (similarJobs.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#F2E8CF0A] text-start rounded-lg w-full p-4 space-y-4">
      <p className="text-[#B5B4AD]">SIMILAR JOBS</p>
      <p className="text-[#D8D6CF] text-sm mb-4">
        Explore other related opportunities to this project.
      </p>
      
      <div className="space-y-3">
        {similarJobs.map((job) => {
          const displayPrice = job.price ? job.price / 1000000 : 0;
          
          return (
            <div 
              key={job.id || job._id}
              className="flex justify-between items-center p-3 border border-[#FCFBF726] rounded-lg hover:bg-[#26220826] transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <h4 className="text-[#D8D6CF] font-medium text-sm line-clamp-1">
                  {job.title}
                </h4>
                <p className="text-[#B5B4AD] text-xs mt-1">
                  ${displayPrice} Budget
                </p>
              </div>
              <span className="text-[#FCF8E3] text-xs bg-[#262208] px-2 py-1 rounded">
                View
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarJobs;