"use client";
import { Job } from "@/utils/job";
import Image from "next/image";
import Modal from "./Modal";
import AnimatedDiv from "@/components/AnimatedDiv";
import React, { useState } from "react";
import AttachedFiles from "../AttachedFiles";
import AttachedLinks from "./AttachedLinks";
import SimilarJobs from "./SimilarJobs";
import Apply from "../Apply";
import ClientDetails from "../ClientDetails";
import { MdOutlineReport } from "react-icons/md";
import { jobs } from "@/utils/job"; // Import the jobs array for similar jobs

interface TitleDetails {
  name?: string;
  imgSrc: string;
}

interface JobDetailsInfo {
  detail: string;
  detailValue?: string;
  imgSrc: string;
}

export interface Client {
  walletAddress: string;
  verificationStatus: boolean;
  dateJoined: string;
  description?: string;
}

const JobDetails = ({ job }: { job: Job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(job);

  const client: Client = {
    walletAddress: job.clientAddress || "",
    verificationStatus: job.client?.verificationStatus || true,
    dateJoined: job.client?.dateJoined || job.createdAt,
    description: job.client?.about || job.clientDescription
  };

  const titleDetails: TitleDetails[] = [
    {
      imgSrc: "/location.png",
      name: job.preferredLocation,
    },
    {
      imgSrc: "/language.png",
      name: job.language ? job.language : "English",
    },
    {
      imgSrc: "/calendar.png",
      name: `${job.projectDuration.weeks} Weeks`,
    },
    {
      imgSrc: "/expertise.png",
      name: job.experienceLevel,
    },
  ];

  const displayPrice = job.price ? job.price / 1000000 : 0;
  const jobDetailsInfo: JobDetailsInfo[] = [
    {
      imgSrc: "/money.png",
      detail: "Budget",
      detailValue: `$${displayPrice}`,
    },
    {
      imgSrc: "/expertise.png",
      detail: "Experience",
      detailValue: job.experienceLevel,
    },
    {
      imgSrc: "/calendar.png",
      detail: "Duration",
      detailValue: `${job.projectDuration.weeks} Weeks`,
    },
  ];

  return (
    <div className="text-start font-merriweather w-full flex items-start gap-y-6 flex-col h-full">
      {/* Job Header Section */}
      <div className="w-full flex flex-col items-start p-6 space-y-4">
        <span className="text-cyan-400 text-sm font-medium">
          Posted: Just Now
        </span>
        <h2 className="font-alata text-3xl text-white leading-tight">
          {job.title}
        </h2>
        <div className="flex items-center gap-6 text-sm text-[#B5B4AD]">
          {titleDetails.map((details) => (
            <div
              key={details.imgSrc}
              className="flex items-center gap-2"
            >
              <Image
                src={details.imgSrc}
                alt={"detalls"}
                width={16}
                height={16}
              />
              <span>{details.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Budget, Experience, Duration Cards */}
      <div className="font-merriweather w-full self-start p-4 bg-[#F2E8CF0A] rounded-lg text-fontPrimary flex flex-wrap gap-4">
        {jobDetailsInfo.map((details) => (
          <div
            key={details.detail}
            className="rounded-xl flex-1 min-w-[200px] grid gap-y-4 p-4 border border-[#FCFBF726]"
          >
            <div className="flex gap-x-2">
              <Image
                src={details.imgSrc}
                alt={details.detail}
                width="24"
                height="24"
              />
              <span className="font-bold text-[#B5B4AD]">{details.detail}</span>
            </div>
            <span className="capitalize text-start text-[#F9F1E2] text-lg font-medium">
              {details.detailValue}
              {details.detail === "Budget" && (
                <span className="text-[#B5B4AD] font-normal text-sm ml-1">
                  (Negotiable)
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Detailed Description */}
      <div className="w-full space-y-4">
        <p className="text-[#B5B4AD] text-sm font-medium tracking-wide">DETAILED DESCRIPTION</p>
        <p className="text-[#D8D6CF] whitespace-pre-wrap leading-relaxed text-sm">
          {job.projectDescription}
        </p>
      </div>

      {/* Required Skills */}
      <div className="bg-[#F2E8CF0A] rounded-lg w-full p-4">
        <p className="text-[#B5B4AD] text-start mb-4">REQUIRED SKILLS</p>
        <div className="flex flex-wrap gap-3">
          {job?.skillCategory?.map((tag) => (
            <span
              key={tag}
              className="bg-[#26220826] text-[#D8D6CF] border rounded-full border-[#FFFFFF40] text-sm px-4 py-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-[#F2E8CF0A] text-start rounded-lg w-full p-4">
        <p className="text-[#B5B4AD] mb-3">ADDITIONAL NOTES</p>
        <p className="text-[#D8D6CF] leading-relaxed">
          {job.notes || job.additionalProjectInfo || "No additional notes provided."}
        </p>
      </div>

      {/* Attached Files */}
      <div className="bg-[#F2E8CF0A] text-start rounded-lg w-full p-4">
        <p className="text-[#B5B4AD] mb-4">ATTACHED FILES</p>
        <div className="flex flex-wrap gap-4">
          <AttachedFiles files={job.files} />
        </div>
      </div>

      {/* Attached Links */}
      {job.contextLink && (
        <AttachedLinks contextLink={job.contextLink} />
      )}

      {/* Action Buttons */}
      <div className="flex gap-x-4 w-full">
        <button
          className="bg-yellow text-[#1A1203] font-merriweather font-bold rounded-md py-3 px-6 hover:bg-yellow/90 transition-colors"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          APPLY FOR JOB
        </button>
        <button className="flex gap-x-2 items-center text-[#E5D1D1] hover:text-[#FCF8E3] transition-colors">
          <MdOutlineReport size={20} />
          <span>Report this Job</span>
        </button>
      </div>

      {/* Client Details */}
      <div className="w-full">
        <ClientDetails client={client} />
      </div>

      {/* Similar Jobs */}
      <SimilarJobs 
        currentJobId={job.id || job._id} 
        allJobs={jobs} 
      />

      {/* Apply Modal */}
      {isModalOpen && (
        <Modal closeFn={() => setIsModalOpen(false)}>
          <AnimatedDiv
            initialX="200%"
            animateX={0}
            exitX={"-100%"}
            duration={0.5}
            className="bg-[#333333] border border-[#FCFBF726] md:w-[50vw] rounded-xl p-4 relative"
          >
            <Apply 
              onCancel={() => setIsModalOpen(false)} 
              databaseId={job.id || job._id} 
            />
          </AnimatedDiv>
        </Modal>
      )}
    </div>
  );
};

export default JobDetails;