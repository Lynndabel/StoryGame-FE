"use client";
import React from "react";
import { jobs } from "@/utils/job";
import JobCard from "./JobCard";

const JobListing: React.FC = () => {
  return (
    <div 
      className="job-container space-y-4 w-full" 
      style={{ minHeight: '600px' }}
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
      
      {jobs.map((job, index) => (
        <JobCard key={job.id || index} job={job} index={index} />
      ))}
    </div>
  );
};

export default JobListing;