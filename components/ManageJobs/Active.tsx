// ActiveJob.tsx - FULL UPDATED CODE
"use client";
import { useState, useEffect } from "react";
import { Applied } from "@/utils/job";
import Image from "next/image";
import AnimatedDiv from "@/components/AnimatedDiv";
import { formatDate } from "@/utils/formatDate";
import RaiseDisputeModal from "./RaiseDisputeModal";

const ActiveJob = ({ job }: { job: Applied }) => {
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);

  const handleOpenDisputeModal = () => {
    setIsDisputeModalOpen(true);
  };

  const handleCloseDisputeModal = () => {
    setIsDisputeModalOpen(false);
  };

  useEffect(() => {
    if (isDisputeModalOpen) {
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    } else {
      document.body.style.backgroundColor = "";
    }

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [isDisputeModalOpen]);

  return (
    <AnimatedDiv
      initialX="100%"
      animateX={0}
      exitX={"-100%"}
      duration={1.0}
      className="hover:bg-[#F2E8CF0A] bg-[#F2E8CF0A] border border-[#FCFBF726] w-[92%] md:w-full rounded-xl flex flex-col p-6 gap-y-4"
    >
      {/* Posted Date - Top Left */}
      <div className="flex justify-start">
        <div className="bg-[#00F7FF17] px-3 py-1 rounded">
          <span className="text-[#4AC7CB] text-sm">
            Posted: {formatDate(job.job?.createdAt)}
          </span>
        </div>
      </div>

      {/* User Info Row - Wallet Address Left, Profile Right */}
      <div className="flex justify-between items-center">
        <span className="text-[#F9F1E2] text-lg font-alata">
          {job.job?.client?.walletAddress.slice(0, 4)}...
          {job.job?.client?.walletAddress.slice(-4)}
        </span>
        <div className="flex items-center gap-x-3">
          <span className="text-[#FFD700] text-sm cursor-pointer hover:underline">
            View Profile
          </span>
          <div className="rounded-full bg-[#FFD700] h-10 w-10 flex justify-center items-center cursor-pointer">
            <span className="relative h-6 w-6">
              <Image
                src="/messages.png"
                alt="Profile"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </span>
          </div>
        </div>
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

      {/* Price Section - Left Aligned with Icon */}
      <div className="flex items-start gap-x-3">
        <span className="relative h-8 w-8 mt-1 flex-shrink-0">
          <Image
            src="/market/money-2.svg"
            alt="Price"
            fill
            style={{ objectFit: "contain" }}
          />
        </span>
        <div className="flex flex-col">
          <span className="text-[#FFD700] text-2xl font-bold">
            ${job.job?.price || "1,500"}
            <span className="text-sm font-normal ml-1">(Fixed)</span>
          </span>
          <span className="text-[#B5B4AD] text-sm">
            ≈ ₦{job.job?.price ? (job.job.price * 1500).toLocaleString() : "2,250,000"}
          </span>
        </div>
      </div>

      {/* Dates Row - Start and End Date Side by Side */}
      <div className="flex items-center gap-x-8 text-sm text-[#B5B4AD]">
        <div className="flex items-center gap-x-2">
          <span className="relative h-4 w-4">
            <Image
              src="/calendar.png"
              alt="Start Date"
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
          <span>Start Date: {job?.startDate || "13/12/24"}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="relative h-4 w-4">
            <Image
              src="/endDate.png"
              alt="End Date"
              fill
              style={{ objectFit: "contain" }}
            />
          </span>
          <span>End Date: {job?.endDate || "27/12/24"}</span>
        </div>
      </div>

      {/* Status - Yellow Dot with Message */}
      <div className="flex items-center gap-x-2">
        <div className="bg-[#FFD700] h-3 w-3 rounded-full flex-shrink-0"></div>
        <span className="text-[#B5B4AD] text-sm italic">
          {job?.statusMsg || "Pending: Awaiting your acceptance."}
        </span>
      </div>

      {/* Action Buttons - Full Width Side by Side */}
      <div className="flex justify-between gap-[10px] mt-4">
        <button className="w-[232px] h-[43px] rounded-[4px] bg-[#FFD700] uppercase text-sm font-bold text-[#1A1203] hover:bg-[#E6C200] transition-colors px-6 py-3">
          MARK AS COMPLETE
        </button>
        <button 
          onClick={handleOpenDisputeModal}
          className="w-[232px] h-[43px] rounded-[4px] bg-[#262208] uppercase text-[#FCF8E3] font-bold text-sm hover:bg-[#333316] transition-colors px-6 py-3"
        >
          RAISE DISPUTE
        </button>
      </div>

      {/* Raise Dispute Modal */}
      <RaiseDisputeModal 
        isOpen={isDisputeModalOpen}
        onClose={handleCloseDisputeModal}
      />
    </AnimatedDiv>
  );
};

export default ActiveJob;