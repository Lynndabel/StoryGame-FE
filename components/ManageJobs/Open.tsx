"use client";

import type { Applied } from "@/utils/job";
import AnimatedDiv from "@/components/AnimatedDiv";
import Image from "next/image";
// import { formatDate } from "@/utils/formatDate"
// import { IoChatbubbleEllipses } from "react-icons/io5";

const OpenJob = ({ job }: { job: Applied }) => {
  const applicants = job.job?.applicants;

  return (
    <AnimatedDiv
      initialX="100%"
      animateX={0}
      exitX={"-100%"}
      duration={1.0}
      className=" border border-[#FCFBF726] w-[92%] md:w-full rounded-xl flex flex-col  gap-y-2 font-merriweather"
    >
      {/* Posted Date */}
      <div className="w-full bg-[#403F3E] p-4">
        <span className=" text-sm bg-[#00F7FF17] text-[#47F9FF] italic rounded-md p-[10px]">
          Posted: 2 weeks ago
        </span>
      </div>

      <div className="p-4 space-y-4 flex justify-between w-full">
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
                alt={"location"}
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
          </div>
        </div>

        {/* Budget */}
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
      </div>

      {/* Applications Section */}
      {applicants && applicants.length > 0 ? (
        <>
          {/* First Applicant Featured */}
          <div className="bg-blurBg backdrop-blur-[200px]  rounded-lg p-6">
            <div className="flex gap-4 mb-6 w-full h-full ">
              {/* Profile Image */}
              <div className="relative h-32 w-32 flex-shrink-0">
                <Image
                  src={applicants[0].avatar}
                  alt="Protoblack"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-[#F9F1E2] uppercase">
                   {applicants[0].username}
                  </h3>
                  <button className="text-yellow hover:text-yellow/80 transition-colors text-sm font-medium">
                    View Profile
                  </button>
                </div>

                <h4 className="text-lg text-[#B5B4AD] mb-4">
                  Fashion Designer
                </h4>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#B5B4AD]">
                  {/* <div className="flex items-center text-sm text-[#B5B4AD] mb-2"> */}
                  <div className="flex justify-center items-center gap-x-2 px-2 border-r border-[#FCFBF726] ">
                    <Image
                      src={"/location.png"}
                      alt={"location"}
                      width="18"
                      height="16"
                    />
                    <span className="font-merriweather text-[#D8D6CF]">
                      {applicants[0].location}
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
                      {applicants[0].language}
                    </span>
                  </div>

                  <div className="flex justify-center items-center gap-x-2 px-2 border-r border-[#FCFBF726]">
                    <Image
                      src={"/expertise.png"}
                      alt={"expertise"}
                      width="20"
                      height="16"
                    />
                    <span className="font-merriweather text-[#D8D6CF]">
                      {applicants[0].expertise}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-x-2 px-2  ">
                    <Image
                      src={"/calendar.png"}
                      alt={"timeline"}
                      width="18"
                      height="16"
                    />
                    <span className="font-merriweather text-[#D8D6CF]">
                      <span>Available to work</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          {/* <div className="mb-6">
              <h4 className="text-lg font-medium text-[#F9F1E2] mb-3">About</h4>
              <p className="text-[#B5B4AD] mb-4">{applicants[0].about}</p>

              {/* Skills */}
          {/* <div className="flex flex-wrap p-2 gap-2">
                {applicants[0].profile.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center px-4 py-[4px] rounded-full border border-[#FFFFFF40] text-[#D8D6CF] text-sm font-bold bg-[#26220826]"
                  >
                    {skill}
                  </span>
                ))}
                {applicants[0].profile.skills.length > 6 && (
                  <span className="flex items-center px-2 py-[4px] text-[#AEFF00] text-sm italic ">
                    +{applicants[0].profile.skills.length - 6} More
                  </span>
                )}
              </div>
            </div> }

            {/* Action Buttons */}
          {/* <div className="flex gap-3">
              <button className="flex-1 bg-yellow text-[#1A1203] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-yellow/90 transition-colors">
                Hire Artisan
              </button>
              <button className="flex-1 bg-[#2A2A2A] text-[#F9F1E2] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-[#3A3A3A] transition-colors flex items-center justify-center gap-2">
                <IoChatbubbleEllipses className="h-4 w-4" />
                Start Chat
              </button>
            </div>
          </div> */}
          {/* Applications Summary */}
          <div className="bg-[#333333] border border-[#F2E8CF0A] rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium text-[#F9F1E2] mb-1">
                  {applicants.length} Applications Received
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <p className="text-[#B5B4AD] text-sm">
                    Under Review: You have applications to review
                  </p>
                </div>
              </div>
              <button className="bg-yellow text-[#1A1203] font-bold py-2 px-4 rounded uppercase text-sm hover:bg-yellow/90 transition-colors">
                View All Applicants
              </button>
            </div>
          </div>
        </>
      ) : (
        /* No Applications State */
        <div className="bg-[#333333] rounded-lg p-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#F9F1E2] mb-2 border-b-2 border-yellow pb-2 inline-block">
                No Applications Yet
              </h3>
            </div>

            <div className="space-y-4 text-[#B5B4AD] mb-6">
              <p>
                No artisan has applied for this job yet. Closing the job will
                remove it from the marketplace, and artisans will no longer see
                it.
              </p>
              <p className="font-medium">Do you want to close this job?</p>
            </div>

            <div className="flex gap-3 justify-center">
              <button className="bg-[#2A2A2A] text-[#F9F1E2] font-bold py-3 px-6 rounded uppercase text-sm hover:bg-[#3A3A3A] transition-colors">
                Keep Job Open
              </button>
              <button className="bg-yellow text-[#1A1203] font-bold py-3 px-6 rounded uppercase text-sm hover:bg-yellow/90 transition-colors">
                Yes, Close Job
              </button>
            </div>
          </div>
        </div>
      )}
    </AnimatedDiv>
  );
};

export default OpenJob;
