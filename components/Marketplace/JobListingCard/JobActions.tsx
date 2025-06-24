"use client";
import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { JobActionsProps } from "@/utils/types";

// Extend existing JobActionsProps with new properties
interface UpdatedJobActionsProps extends JobActionsProps {
  onViewDetails: () => void;
  jobStatus: {
    text: string;
    color: string;
  };
}

const JobActions: React.FC<UpdatedJobActionsProps> = ({ job, onViewDetails, jobStatus }) => {
  return (
    <>
      <style jsx>{`
        .status-text {
          font-family: Merriweather;
          font-weight: 400;
          font-style: italic;
          font-size: 13px;
          line-height: 120%;
          letter-spacing: 0%;
          color: #FCF7F7;
        }

        .view-details-btn {
          width: 319px;
          height: 43px;
          padding: 12px 24px;
          gap: 10px;
          border-radius: 4px;
          background-color: #262208;
        }
      `}</style>
      
      {/* Status and Action Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Secured Payment */}
          <div className="flex items-center gap-1">
            <FaCheckCircle className="w-3 h-3" style={{ color: '#fbbf24' }} />
            <span className="status-text">{job.payment}</span>
          </div>
          
          {/* Dynamic Application Status */}
          <div className="flex items-center gap-1">
            <FaCircle className="w-3 h-3" style={{ color: jobStatus.color }} />
            <span className="status-text">{jobStatus.text}</span>
          </div>
        </div>

        <button 
          className="view-details-btn text-xs font-medium text-white hover:opacity-90 transition-opacity"
          onClick={onViewDetails}
        >
          View Details
        </button>
      </div>
    </>
  );
};

export default JobActions;