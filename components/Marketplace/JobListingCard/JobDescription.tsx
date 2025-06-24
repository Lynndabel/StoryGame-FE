"use client";
import React, { useRef, useEffect, useState } from "react";
import { JobDescriptionProps } from "@/utils/types"

const JobDescription: React.FC<JobDescriptionProps> = ({ 
  job, 
  jobId, 
  isExpanded, 
  onToggle 
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkIfTextIsClamped = () => {
      if (textRef.current && job.projectDescription) {
        // Give the DOM time to render
        setTimeout(() => {
          if (textRef.current) {
            // Compare scrollHeight with clientHeight when clamped
            const isCurrentlyClamped = textRef.current.scrollHeight > textRef.current.clientHeight;
            setShowReadMore(isCurrentlyClamped);
            setIsChecking(false);
          }
        }, 50);
      }
    };

    setIsChecking(true);
    checkIfTextIsClamped();
  }, [job.projectDescription]);

  // Don't show the button while we're checking
  if (isChecking) {
    return (
      <>
        <style jsx>{`
          .job-description {
            font-family: Merriweather;
            font-weight: 400;
            font-size: 16px;
            line-height: 156%;
            letter-spacing: 0%;
            color: #D8D6CF;
          }

          .job-description-collapsed {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
        
        <div className="mb-4">
          <p 
            ref={textRef}
            className="job-description mb-2 job-description-collapsed"
          >
            {job.projectDescription}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx>{`
        .job-description {
          font-family: Merriweather;
          font-weight: 400;
          font-size: 16px;
          line-height: 156%;
          letter-spacing: 0%;
          color: #D8D6CF;
        }

        .job-description-collapsed {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      {/* Description */}
      <div className="mb-4">
        <p 
          ref={textRef}
          className={`job-description mb-2 ${!isExpanded && showReadMore ? 'job-description-collapsed' : ''}`}
        >
          {job.projectDescription}
        </p>
        
        {/* Only show read more/less button if text is actually clamped */}
        {showReadMore && (
          <button 
            className="text-xs font-medium" 
            style={{ color: '#fbbf24' }}
            onClick={() => onToggle(jobId)}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </>
  );
};

export default JobDescription;