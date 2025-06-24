"use client";
import React from "react";
import { JobHeaderProps } from "@/utils/types";

const JobHeader: React.FC<JobHeaderProps> = ({ job }) => {
  return (
    <>
      <style jsx>{`
        .posted-badge {
          font-family: Merriweather;
          font-weight: 400;
          font-style: italic;
          font-size: 13px;
          line-height: 120%;
          letter-spacing: 0%;
          color: #47F9FF;
        }

        .job-title {
          font-family: Alata;
          font-weight: 400;
          font-size: 39px;
          line-height: 120%;
          letter-spacing: 0%;
          color: #F9F1E2;
        }
      `}</style>
      
      {/* Posted Time */}
      <div className="mb-4">
        <span 
          className="posted-badge px-3 py-1 rounded"
          style={{ backgroundColor: '#00F7FF17' }}
        >
          Posted: {job.createdAt}
        </span>
      </div>

      {/* Job Title */}
      <h2 className="job-title mb-3">
        {job.title}
      </h2>
    </>
  );
};

export default JobHeader;