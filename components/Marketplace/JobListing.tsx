// "use client";
// import React, { useState } from "react";
// import { Client, jobs } from "@/utils/job";
// import { FiMapPin } from "react-icons/fi";
// import { FaCheckCircle, FaCircle } from "react-icons/fa";

// const JobListing = () => {
//   const [expandedJobs, setExpandedJobs] = useState(new Set());
//   const [expandedTags, setExpandedTags] = useState(new Set());
//   const formatPrice = (price: number) => {
//     const nairaEquivalent = price * 1500; // Rough conversion rate
//     return {
//       usd: price,
//       naira: nairaEquivalent.toLocaleString()
//     };
//   };

//   const formatDuration = (weeks: number) => {
//     if (weeks === 1) return "1 Week";
//     return `${weeks} Weeks`;
//   };

//   const getVisibleTags = (tags: string[], maxVisible = 5) => {
//     if (!tags) return { visible: [], remaining: 0 };
//     const visible = tags.slice(0, maxVisible);
//     const remaining = Math.max(0, tags.length - maxVisible);
//     return { visible, remaining };
//   };

//   const toggleReadMore = (jobId: string | number) => {
//     const newExpandedJobs = new Set(expandedJobs);
//     if (newExpandedJobs.has(jobId)) {
//       newExpandedJobs.delete(jobId);
//     } else {
//       newExpandedJobs.add(jobId);
//     }
//     setExpandedJobs(newExpandedJobs);
//   };

//   const toggleTags = (jobId: string | number) => {
//     const newExpandedTags = new Set(expandedTags);
//     if (newExpandedTags.has(jobId)) {
//       newExpandedTags.delete(jobId);
//     } else {
//       newExpandedTags.add(jobId);
//     }
//     setExpandedTags(newExpandedTags);
//   };

//   return (
//     <div className="flex flex-col gap-y-0 w-full min-h-[80vh]">
//       <style jsx>{`
//         .job-container {
//           scrollbar-width: thin;
//           scrollbar-color: #6b7280 transparent;
//         }
        
//         .job-container::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .job-container::-webkit-scrollbar-track {
//           background: transparent;
//         }
        
//         .job-container::-webkit-scrollbar-thumb {
//           background: #6b7280;
//           border-radius: 10px;
//           height: 40px;
//         }
        
//         .job-container::-webkit-scrollbar-thumb:hover {
//           background: #9ca3af;
//         }

//         .posted-badge {
//           font-family: Merriweather;
//           font-weight: 400;
//           font-style: italic;
//           font-size: 13px;
//           line-height: 120%;
//           letter-spacing: 0%;
//           color: #47F9FF;
//         }

//         .job-title {
//           font-family: Alata;
//           font-weight: 400;
//           font-size: 39px;
//           line-height: 120%;
//           letter-spacing: 0%;
//           color: #F9F1E2;
//         }

//         .job-details {
//           font-family: Merriweather;
//           font-weight: 400;
//           font-size: 16px;
//           line-height: 120%;
//           letter-spacing: 0%;
//           color: #D8D6CF;
//         }

//         .job-price {
//           font-family: Alata;
//           font-weight: 400;
//           font-size: 32px;
//           line-height: 120%;
//           letter-spacing: 0%;
//           color: #FFCC6D;
//         }

//         .job-payment-type {
//           font-family: Alata;
//           font-weight: 400;
//           color: #FFCC6D;
//           align-self: flex-end;
//         }

//         .job-description {
//           font-family: Merriweather;
//           font-weight: 400;
//           font-size: 16px;
//           line-height: 156%;
//           letter-spacing: 0%;
//           color: #D8D6CF;
//         }

//         .job-description-collapsed {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }

//         .job-tags {
//           font-family: Merriweather;
//           font-weight: 400;
//           font-size: 13px;
//           line-height: 120%;
//           letter-spacing: 0%;
//           color: #D8D6CF;
//         }

//         .tag-pill {
//           height: 40px;
//           padding: 12px 16px;
//           gap: 10px;
//           border-radius: 50px;
//           border: 1px solid #FFFFFF40;
//           background-color: #26220826;
//           width: fit-content;
//         }

//         .status-text {
//           font-family: Merriweather;
//           font-weight: 400;
//           font-style: italic;
//           font-size: 13px;
//           line-height: 120%;
//           letter-spacing: 0%;
//           color: #FCF7F7;
//         }

//         .view-details-btn {
//           width: 319px;
//           height: 43px;
//           padding: 12px 24px;
//           gap: 10px;
//           border-radius: 4px;
//           background-color: #262208;
//         }

//         .job-card {
//           border-radius: 16px;
//           padding: 24px;
//           background-color: #F2E8CF0A;
//         }
//       `}</style>
      
//       <div className="job-container overflow-y-auto space-y-4 w-full" style={{ backgroundColor: '#F2E8CF0A', minHeight: '600px', maxHeight: '80vh' }}>
//         {jobs.map((job, index) => (
//           <div 
//             key={job.id || index} 
//             className="job-card"
//           >
//             {/* Posted Time */}
//             <div className="mb-4">
//               <span 
//                 className="posted-badge px-3 py-1 rounded"
//                 style={{ backgroundColor: '#00F7FF17' }}
//               >
//                 Posted: {job.createdAt}
//               </span>
//             </div>

//             {/* Job Title */}
//             <h2 className="job-title mb-3">
//               {job.title}
//             </h2>

//             {/* Job Details Row */}
//             <div className="flex items-center gap-4 mb-4">
//               <div className="flex items-center gap-1">
//                 <FiMapPin className="w-3 h-3" />
//                 <span className="job-details">{job.preferredLocation}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <img src="/market/tabler_flag.svg" alt="Language" className="w-3 h-3" />
//                 <span className="job-details">{job.language}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <img src="/market/calendar-tick.svg" alt="Duration" className="w-3 h-3" />
//                 <span className="job-details">{formatDuration(job.projectDuration.weeks)}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <img src="/market/medal-star.svg" alt="Experience" className="w-3 h-3" />
//                 <span className="job-details">{job.experienceLevel}</span>
//               </div>
//             </div>

//             {/* Price Section */}
//             <div className="mb-4">
//               <div className="flex items-end gap-2 mb-1">
//                 <div className="flex items-center gap-2">
//                   <img src="/market/money-2.svg" alt="Price" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(74%) sepia(85%) saturate(353%) hue-rotate(358deg) brightness(101%) contrast(97%)' }} />
//                   <span className="job-price">
//                     ${job.price?.toLocaleString()}
//                   </span>
//                 </div>
//                 <span className="job-payment-type text-sm">({job.paymentType})</span>
//               </div>
//               <div className="text-gray-400 text-xs">
//                 ≈ ₦{formatPrice(job.price || 0).naira}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mb-4">
//               <p className={`job-description mb-2 ${!expandedJobs.has(job.id || index) ? 'job-description-collapsed' : ''}`}>
//                 {job.projectDescription}
//               </p>
//               <button 
//                 className="text-xs font-medium" 
//                 style={{ color: '#fbbf24' }}
//                 onClick={() => toggleReadMore(job.id || index)}
//               >
//                 {expandedJobs.has(job.id || index) ? 'Read Less' : 'Read More'}
//               </button>
//             </div>

//             {/* Tags */}
//             <div className="mb-4">
//               <div className="flex flex-wrap gap-1">
//                 {(() => {
//                   const jobId = job.id || index;
//                   const isTagsExpanded = expandedTags.has(jobId);
//                   const { visible, remaining } = getVisibleTags(job.tags || job.skillCategory || [], isTagsExpanded ? (job.tags || job.skillCategory || []).length : 5);
                  
//                   return (
//                     <>
//                       {visible.map((tag, tagIndex) => (
//                         <span
//                           key={tagIndex}
//                           className="job-tags tag-pill flex items-center justify-center"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                       {remaining > 0 && !isTagsExpanded && (
//                         <span
//                           className="job-tags tag-pill flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
//                           onClick={() => toggleTags(jobId)}
//                         >
//                           +{remaining}
//                         </span>
//                       )}
//                       {isTagsExpanded && (job.tags || job.skillCategory || []).length > 5 && (
//                         <span
//                           className="job-tags tag-pill flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
//                           onClick={() => toggleTags(jobId)}
//                         >
//                           Show Less
//                         </span>
//                       )}
//                     </>
//                   );
//                 })()}
//               </div>
//             </div>

//             {/* Status and Action Row */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 {/* Secured Payment */}
//                 <div className="flex items-center gap-1">
//                   <FaCheckCircle className="w-3 h-3" style={{ color: '#fbbf24' }} />
//                   <span className="status-text">{job.payment}</span>
//                 </div>
                
//                 {/* Open Application */}
//                 <div className="flex items-center gap-1">
//                   <FaCircle className="w-3 h-3" style={{ color: '#10b981' }} />
//                   <span className="status-text">{job.type}</span>
//                 </div>
//               </div>

//               {/* View Details Button */}
//               <button 
//                 className="view-details-btn text-xs font-medium text-white hover:opacity-90 transition-opacity"
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobListing;