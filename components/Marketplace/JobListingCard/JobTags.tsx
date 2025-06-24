"use client";
import React from "react";
import { JobTagsProps } from "@/utils/types";

const JobTags: React.FC<JobTagsProps> = ({ 
  job, 
  jobId, 
  isExpanded, 
  onToggle 
}) => {
  const getVisibleTags = (tags: string[], maxVisible: number = 5) => {
    if (!tags) return { visible: [], remaining: 0 };
    const visible = tags.slice(0, maxVisible);
    const remaining = Math.max(0, tags.length - maxVisible);
    return { visible, remaining };
  };

  const tags = job.tags || job.skillCategory || [];
  const { visible, remaining } = getVisibleTags(
    tags, 
    isExpanded ? tags.length : 5
  );

  return (
    <>
      <style jsx>{`
        .job-tags {
          font-family: Merriweather;
          font-weight: 400;
          font-size: 13px;
          line-height: 120%;
          letter-spacing: 0%;
          color: #D8D6CF;
        }

        .tag-pill {
          height: 40px;
          padding: 12px 16px;
          gap: 10px;
          border-radius: 50px;
          border: 1px solid #FFFFFF40;
          background-color: #26220826;
          width: fit-content;
        }
      `}</style>
      
      {/* Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {visible.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="job-tags tag-pill flex items-center justify-center"
            >
              {tag}
            </span>
          ))}
          {remaining > 0 && !isExpanded && (
            <span
              className="job-tags tag-pill flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onToggle(jobId)}
            >
              +{remaining}
            </span>
          )}
          {isExpanded && tags.length > 5 && (
            <span
              className="job-tags tag-pill flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onToggle(jobId)}
            >
              Show Less
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default JobTags;