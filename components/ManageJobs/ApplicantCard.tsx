"use client";

import { Artisan, Job } from "@/utils/job";
import Image from "next/image";
import { IoChatbubbleEllipses } from "react-icons/io5";
import AnimatedDiv from "@/components/AnimatedDiv";
import Modal from "../Modal";
import HireConfirmationModal from "./HireConfirmation";
import { useState } from "react";

const ApplicantCard = ({
  applicant,
  job,
}: {
  applicant: Artisan;
  job: Job;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Applicant Profile */}
      <div className="bg-[#F2E8CF0A] backdrop-blur-sm rounded-lg p-6 border border-[#FCFBF726]">
        <div className="flex gap-4 mb-6 w-full h-full">
          {/* Profile Image */}
          <div className="relative h-32 w-32 lg:h-48 lg:w-48 flex-shrink-0">
            <Image
              src={applicant.avatar || "/placeholder.svg"}
              alt={applicant.username}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-[#F9F1E2] uppercase">
                {applicant.username}
              </h3>
              <button className="text-yellow hover:text-yellow/80 transition-colors text-sm font-medium">
                View Profile
              </button>
            </div>

            <h4 className="text-lg text-[#B5B4AD] mb-4">
              {applicant.category}
            </h4>

            {/* Details */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#B5B4AD]">
              <div className="flex justify-center items-center gap-x-2 px-2 border-r border-[#FCFBF726]">
                <Image
                  src={"/location.png"}
                  alt={"location"}
                  width="18"
                  height="16"
                />
                <span className="font-merriweather text-[#D8D6CF]">
                  {applicant.location}
                </span>
              </div>
              <div className="flex justify-center items-center gap-x-2 px-2 border-r border-[#FCFBF726]">
                <Image
                  src={"/language.png"}
                  alt={"language"}
                  width="14"
                  height="16"
                />
                <span className="font-merriweather text-[#D8D6CF]">
                  {applicant.language}
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
                  {applicant.expertise}
                </span>
              </div>
              <div className="flex justify-center items-center gap-x-2 px-2">
                <Image
                  src={"/calendar.png"}
                  alt={"timeline"}
                  width="18"
                  height="16"
                />
                <span className="font-merriweather text-[#D8D6CF]">
                  <span>
                    {applicant?.available
                      ? "Available to work"
                      : "Not available"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h4 className="text-lg font-medium text-[#F9F1E2] mb-3">About</h4>
          <p className="text-[#B5B4AD] mb-4">{applicant.about}</p>

          {/* Skills */}
          <div className="flex flex-wrap p-2 gap-2">
            {applicant.profile.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="flex items-center px-4 py-[4px] rounded-full border border-[#FFFFFF40] text-[#D8D6CF] text-sm  bg-[#26220826]"
              >
                {skill}
              </span>
            ))}
            {applicant.profile.skills.length > 6 && (
              <span className="flex items-center px-2 py-[4px] text-[#AEFF00] text-sm italic">
                +{applicant.profile.skills.length - 6} More
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between w-full">
          <button
            className=" bg-yellow text-[#1A1203] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-yellow/90 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            Hire Artisan
          </button>
          <button className=" bg-[#262208] text-[#F9F1E2] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-[#3A3A3A] transition-colors flex items-center justify-center gap-2">
            <IoChatbubbleEllipses className="h-4 w-4" />
            Start Chat
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalOpen(false)}>
          <AnimatedDiv
            initialX="200%"
            animateX={0}
            exitX={"-100%"}
            duration={0.5}
            className="bg-[#333333] border border-[#FCFBF726] md:w-[40vw] lg:w-[35vw] rounded-xl p-4 relative"
          >
            <HireConfirmationModal
              onCancel={() => setIsModalOpen(false)}
              artisanName={applicant.username}
              projectTitle={job.title}
              budget={job.price}
              duration={job.projectDuration.weeks}
            />
          </AnimatedDiv>
        </Modal>
      )}
    </div>
  );
};

export default ApplicantCard;
