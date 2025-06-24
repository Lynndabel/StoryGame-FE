"use client";
import React from "react";
import { FiMapPin } from "react-icons/fi";
import { JobDetailsProps } from "@/utils/types";

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  const formatDuration = (weeks: number): string => {
    if (weeks === 1) return "1 Week";
    return `${weeks} Weeks`;
  };

  return (
    <>
      <style jsx>{`
        .job-details {
          font-family: Merriweather;
          font-weight: 400;
          font-size: 16px;
          line-height: 120%;
          letter-spacing: 0%;
          color: #D8D6CF;
        }
      `}</style>
      
      {/* Job Details Row */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <FiMapPin className="w-3 h-3" />
          <span className="job-details">{job.preferredLocation}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src="/market/tabler_flag.svg" alt="Language" className="w-3 h-3" />
          <span className="job-details">{job.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src="/market/calendar-tick.svg" alt="Duration" className="w-3 h-3" />
          <span className="job-details">{formatDuration(job.projectDuration.weeks)}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src="/market/medal-star.svg" alt="Experience" className="w-3 h-3" />
          <span className="job-details">{job.experienceLevel}</span>
        </div>
      </div>
    </>
  );
};

export default JobDetails;