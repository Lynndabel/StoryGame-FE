"use client";
import { Applied } from "@/utils/job";
import Image from "next/image";
import AnimatedDiv from "@/components/AnimatedDiv";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import RaiseDisputeModal from "./RaiseDisputeModal";
import Modal from "../Modal";

const DisputedJobCard = ({ job }: { job: Applied }) => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);


  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

 

  return (
    <AnimatedDiv
      initialX="100%"
      animateX={0}
      exitX={"-100%"} 
      duration={1.0}
      className="hover:bg-[#F2E8CF0A] bg-[#F2E8CF0A] border border-[#FCFBF726] w-full rounded-xl flex flex-col p-6 gap-y-4"
    >
      {/* Posted Date - Top Left with Cyan Background */}
      <div className="flex justify-start">
        <div className="bg-[#4AC7CB] bg-opacity-20 px-3 py-1 rounded">
          <span className="text-[#4AC7CB] text-sm italic">
            Posted: {formatDate(job.job?.createdAt) || "Two weeks ago"}
          </span>
        </div>
      </div>

      {/* Dispute Raised By Section */}
      <div className="flex flex-col gap-y-1">
        <span className="text-[#B5B4AD] text-sm">Dispute raised by: Artisan</span>
        <span className="text-[#F9F1E2] text-lg font-alata">
          {job.job?.client?.walletAddress.slice(0, 4)}...{job.job?.client?.walletAddress.slice(-4)}
        </span>
      </div>

      {/* Job Title - Large and Prominent */}
      <div className="w-full">
        <h3 className="font-merriweather text-2xl md:text-3xl text-white leading-tight">
          {job.job?.title}
        </h3>
      </div>

      {/* Job Details Row - Icons with Labels */}
      <div className="flex items-center gap-x-6 text-sm text-[#B5B4AD] flex-wrap">
        <div className="flex items-center gap-x-2">
          <span className="relative h-4 w-4">
            <Image
              src="/location.png"
              alt="Location"
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
          <span>{job.job?.preferredLocation || "Lagos, Nigeria"}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="relative h-4 w-4">
            <Image
              src="/language.png"
              alt="Language"
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
          <span>{job.job?.language || "English"}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="relative h-4 w-4">
            <Image
              src="/market/calendar-tick.svg"
              alt="Duration"
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
          <span>{job.job?.projectDuration?.weeks ? `${job.job.projectDuration.weeks} Weeks` : "2 Weeks"}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="relative h-4 w-4">
            <Image
              src="/market/medal-star.svg"
              alt="Skill"
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
          <span>{job.job?.experienceLevel || "Intermediate"}</span>
        </div>
      </div>

      {/* Bottom Section: 4-Column Grid + Button */}
      <div className="flex justify-between items-end">
        {/* Dispute Details Grid - 4 Columns with Separating Lines */}
        <div className="flex text-sm flex-1 divide-x divide-[#FCFBF726]">
          <div className="flex flex-col pr-8">
            <span className="text-[#B5B4AD] mb-2">Raised Date:</span>
            <span className="text-[#F9F1E2] font-bold text-lg">
              {job?.disputeRaisedDate || "13/12/24"}
            </span>
          </div>
          <div className="flex flex-col px-8">
            <span className="text-[#B5B4AD] mb-2">Dispute Type:</span>
            <span className="text-[#F9F1E2] font-medium italic">
              {job?.disputeType || "Payment not released"}
            </span>
          </div>
          <div className="flex flex-col px-8">
            <span className="text-[#B5B4AD] mb-2">Budget:</span>
            <div className="flex items-center gap-x-2">
              <span className="relative h-5 w-5">
                <Image
                  src="/market/money-2.svg"
                  alt="Price"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </span>
              <span className="text-[#FFD700] font-bold text-lg">
                ${job.job?.price || "1500"}<span className="text-sm font-normal">(Fixed)</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col pl-8">
            <span className="text-[#B5B4AD] mb-2">Resolution Status:</span>
            <div className="flex items-center gap-x-2">
              <div className="bg-[#04DF76] h-3 w-3 rounded-full flex-shrink-0"></div>
              <span className="text-[#B5B4AD] text-sm font-medium">
                {job?.disputeStatus === 'resolved' 
                  ? "Resolved: Payment Released to Artisan"
                  : "Pending: Awaiting Client Action"
                }
              </span>
            </div>
          </div>
        </div>

        {/* View Full Details Button - Bottom Right */}
        <div className="flex-shrink-0 ml-8">
          <button 
            onClick={() => setIsDetailsModalOpen(true)}
            className="bg-[#262208] hover:bg-[#333316] text-[#F9F1E2] px-6 py-2 rounded text-sm font-medium transition-colors uppercase"
          >
            VIEW FULL DETAILS
          </button>
        </div>
      </div>

      {/* Details Modal - You can implement this later */}
      {/* <DisputeDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        job={job}
      /> */}
      {isDetailsModalOpen && (
              <Modal closeFn={handleCloseDetailsModal}>
                <AnimatedDiv
                  initialX="200%"
                  animateX={0}
                  exitX={"-100%"}
                  duration={0.5}
                  className="bg-[#333333] border border-[#FCFBF726] md:w-[40vw] lg:w-[35vw] rounded-xl p-4 relative"
                >
                  <RaiseDisputeModal isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal} />
                </AnimatedDiv>
              </Modal>
            )}
    </AnimatedDiv>
  );
};

export default DisputedJobCard;