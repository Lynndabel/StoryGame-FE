"use client";

import type { Applied } from "@/utils/job";
import AnimatedDiv from "@/components/AnimatedDiv";
import { useState } from "react";
import Modal from "../Modal";
import Image from "next/image";
import JobDetails from "../Marketplace/JobDetails";

const ClosedJob = ({ job }: { job: Applied }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AnimatedDiv
      initialX="100%"
      animateX={0}
      exitX={"-100%"}
      duration={1.0}
      className="group hover:bg-[#F2E8CF0A] border border-[#FCFBF726] w-[92%] md:w-full rounded-xl flex flex-col  gap-y-2 font-merriweather"
    >
      {/* Posted Date */}
      <div className="w-full bg-[#403F3E] p-4">
        <span className=" text-sm bg-[#00F7FF17] text-[#47F9FF] italic rounded-md p-[10px]">
          Posted: 2 weeks ago
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Client Address */}
        <div className="mb-2 flex justify-between">
          <p className="text-[#D8D6CF] text-[20px] font-merriweather">
            {job.job?.client?.walletAddress.slice(0, 4)}...
            {job.job?.client?.walletAddress.slice(-5)}
          </p>
          <div className="flex flex-col gap-x-2">
            <span className="text-[#FFD700]">View Profile</span>
            <p className="border-b border-yellow w-full"></p>
          </div>
        </div>

        {/* Job Title */}
        <div className="space-y-[4px]">
          <h2 className="text-[#F9F1E2] font-alata text-2xl font-bold">
            {job.job?.title}
          </h2>

          {/* Job Details */}
          <div className="flex items-center text-sm text-[#B5B4AD] mb-2">
            {/* <div className="flex w-full md:w-[90%] 2xl:w-[50%] gap-x-4 py-2 "> */}
            <div className="flex justify-center items-center gap-x-2 px-2 border-r border-[#FCFBF726] ">
              <Image
                src={"/location.png"}
                alt={job.job.preferredLocation}
                width="18"
                height="16"
              />
              <span className="font-merriweather text-[#D8D6CF]">
                {job.job.preferredLocation}
              </span>
            </div>
            <div className="flex justify-center items-center gap-x-2 px-2  border-r border-[#FCFBF726] ">
              <Image
                src={"/language.png"}
                alt={"language"}
                width="14"
                height="16"
              />
              <span className="font-merriweather text-[#D8D6CF]">
                {job.job.language}
              </span>
            </div>
            <div className="flex justify-center items-center gap-x-2 px-2 border-r border-[#FCFBF726] ">
              <Image
                src={"/calendar.png"}
                alt={"timeline"}
                width="18"
                height="16"
              />
              <span className="font-merriweather text-[#D8D6CF]">
                {job.job.projectDuration.weeks} weeks
              </span>
            </div>
            <div className="flex justify-center items-center gap-x-2 px-2 ">
              <Image
                src={"/expertise.png"}
                alt={job.job.experienceLevel}
                width="20"
                height="16"
              />
              <span className="font-merriweather text-[#D8D6CF]">
                {job.job.experienceLevel}
              </span>
            </div>

            {/* </div> */}
          </div>
        </div>

        {/* Price */}
        <div className="flex gap-x-2 items-center text-[#FFCC6D]">
          <div className="flex">
            <Image
              src="/money-2.png"
              alt="Amount"
              width="18"
              height="18"
              className="hidden md:flex"
            />
          </div>
          <span className="text-[#FFCC6D] text-2xl font-bold font-alata">
            ${job?.job?.price}
            <span className="text-sm font-normal text-[#FFCC6D]">(Fixed)</span>
          </span>
        </div>

        <div className="space-y-2">
          {/* Dates */}
          <div className="flex gap-x-2 flex-wrap">
            <span className="relative h-[20px] w-[20px] self-center ">
              {" "}
              <Image
                src="/calendar.png"
                alt="Calendar"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </span>
            <p className="font-merriweather self-center text-sm md:text-base  lg:text-lg text-[#B5B4AD] pr-2 ">
              Start Date: {job?.startDate}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#980F0F] rounded-full"></div>
            <span className="text-[#F9F1E2] font-medium">
              Ended:{" "}
              <span className="text-[#B5B4AD] ">
                Client closed job without getting an artisan
              </span>
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="hidden md:flex  w-fit py-2 px-4 uppercase  bg-[#262208] rounded-md text-sm md:text-base text-[#FCF8E3] font-bold"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal closeFn={() => setIsModalOpen(false)}>
          <AnimatedDiv
            initialX="200%"
            animateX={0}
            exitX={"-100%"}
            duration={0.5}
            className="bg-[#333333] border border-[#FCFBF726] md:w-[60vw] h-[90vh] rounded-xl p-4 relative  "
          >
            <div className="h-[90%]  overflow-y-scroll">
              <JobDetails job={job.job} />
            </div>
          </AnimatedDiv>
        </Modal>
      )}
    </AnimatedDiv>
  );
};

export default ClosedJob;
