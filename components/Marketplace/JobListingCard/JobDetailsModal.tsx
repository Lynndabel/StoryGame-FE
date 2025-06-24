"use client";
import { Job } from "@/utils/types"; // Change to use the flexible Job type
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import AttachedFiles from "./AttachedFiles";
import { useGetUserRole } from "@/utils/store";

const JobDetailsModal = ({ job, onApplyClick }: { job: Job; onApplyClick: () => void }) => {
  const { role } = useGetUserRole();

  const displayPrice = job.price ?? 0;
  const isArtisan = role === "artisan";
  
  // Safe access to potentially missing properties
  const jobFiles = job.files || [];
  const jobImages = job.images || [];
  const jobSkills = job.skillCategory || job.tags || [];
  const jobClient = job.client || {
    walletAddress: "0x1234...5678",
    verificationStatus: false,
    about: "Professional client",
    dateJoined: "Recent",
  };
  const handleViewProfile = () => {
    if (isArtisan) {
      // Navigate to client profile page or trigger profile view
      console.log("Viewing client profile:", jobClient.walletAddress);
      // You can add navigation logic here, like:
      // router.push(`/client-profile/${jobClient.id}`) or similar
    }
  };
  

  return (
    <div className="text-start font-merriweather w-full flex items-start gap-y-6 flex-col">
      {/* Job Header */}
      <div className="w-full flex flex-col space-y-4">
        <div 
          className="w-fit px-3 py-1 rounded"
          style={{ backgroundColor: '#00F7FF17' }}
        >
          <span 
            className="text-sm font-medium italic"
            style={{ color: '#47F9FF' }}
          >
            Posted: {job.createdAt}
          </span>
        </div>
        <h2 className="font-alata text-3xl text-white leading-tight">
          {job.title}
        </h2>
        <div className="flex items-center gap-6 text-sm text-[#B5B4AD]">
          <div className="flex items-center gap-2">
            <FiMapPin className="w-4 h-4" />
            <span>{job.preferredLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/market/tabler_flag.svg"
              alt=""
              width={16}
              height={16}
            />
            <span>{job.language ?? "English"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/market/calendar-tick.svg"
              alt=""
              width={16}
              height={16}
            />
            <span>{`${job.projectDuration.weeks} Weeks`}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/market/medal-star.svg"
              alt=""
              width={16}
              height={16}
            />
            <span>{job.experienceLevel}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#F2E8CF0A] rounded-lg w-full p-4">
        <p className="text-[#B5B4AD] text-sm font-medium tracking-wide mb-4">DETAILED DESCRIPTION</p>
        <p className="text-[#D8D6CF] leading-relaxed">
          {job.projectDescription}
        </p>
      </div>

      {/* Budget/Experience/Duration Cards - AFTER Description */}
      <div className="bg-[#F2E8CF0A] rounded-lg w-full p-4">
        <div className="flex flex-wrap gap-4">
          <div className="rounded-xl flex-1 min-w-[200px] p-4 border border-[#FCFBF726]">
            <div className="flex gap-x-2 mb-4">
              <Image
                src="/market/money-2.svg"
                alt="Budget"
                width={24}
                height={24}
              />
              <span className="font-bold text-[#B5B4AD]">Budget</span>
            </div>
            <span className="text-[#F9F1E2] text-lg font-medium">
              ${displayPrice.toLocaleString()}
              <span className="text-[#B5B4AD] font-normal text-sm ml-1">
                ({job.paymentType})
              </span>
            </span>
          </div>

          <div className="rounded-xl flex-1 min-w-[200px] p-4 border border-[#FCFBF726]">
            <div className="flex gap-x-2 mb-4">
              <Image
                src="/market/medal-star.svg"
                alt="Experience"
                width={24}
                height={24}
              />
              <span className="font-bold text-[#B5B4AD]">Experience</span>
            </div>
            <span className="text-[#F9F1E2] text-lg font-medium">
              {job.experienceLevel}
            </span>
          </div>

          <div className="rounded-xl flex-1 min-w-[200px] p-4 border border-[#FCFBF726]">
            <div className="flex gap-x-2 mb-4">
              <Image
                src="/market/calendar-tick.svg"
                alt="Duration"
                width={24}
                height={24}
              />
              <span className="font-bold text-[#B5B4AD]">Duration</span>
            </div>
            <span className="text-[#F9F1E2] text-lg font-medium">
              {job.projectDuration.weeks} Weeks
            </span>
          </div>
        </div>
      </div>

      {/* Required Skills */}
      <div className="bg-[#F2E8CF0A] rounded-lg w-full p-4">
        <p className="text-[#B5B4AD] mb-4">REQUIRED SKILLS</p>
        <div className="flex flex-wrap gap-3">
          {jobSkills.map((tag, index) => (
            <span
              key={tag + index}
              className="bg-[#26220826] text-[#D8D6CF] border rounded-full border-[#FFFFFF40] text-sm px-4 py-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-[#F2E8CF0A] rounded-lg w-full p-4">
        <p className="text-[#B5B4AD] mb-3">ADDITIONAL NOTES</p>
        <p className="text-[#D8D6CF] leading-relaxed">
          {job.additionalProjectInfo ?? "Artisans selected for this project will receive a bonus for exceptional work and have the opportunity to collaborate on future collections."}
        </p>
      </div>

      {/* Attached Files - DYNAMIC */}
      {(jobFiles.length > 0 || jobImages.length > 0 || job.contextLink) && (
        <div className="bg-[#F2E8CF0A] rounded-lg w-full p-4">
          <p className="text-[#B5B4AD] mb-4">ATTACHED FILES</p>
          <AttachedFiles files={[...jobFiles, ...jobImages]} />
          
          {job.contextLink && (
            <>
              <p className="text-[#B5B4AD] mb-2 mt-4">ATTACHED LINKS</p>
              <a
                href={job.contextLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 underline text-sm"
                style={{ color: '#04DF76' }}
              >
                Example Design Inspiration
              </a>
            </>
          )}
        </div>
      )}

      {/* Apply Button - FIXED with onClick handler */}
      <div className="flex items-center gap-4 w-full">
        <button 
          onClick={onApplyClick}
          className="text-[#1A1203] font-bold rounded-md py-3 px-6 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#FFD700' }}
        >
          APPLY FOR JOB
        </button>
        <button 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          style={{ color: '#FFCC6D' }}
        >
          <Image src="/market/warning.svg" alt="Warning" width={16} height={16} />
          <span>Report this Job</span>
        </button>
      </div>

      {/* Client Info and Similar Jobs - Combined */}
      <div className="bg-[#F2E8CF0A] rounded-lg w-full p-4">
        {/* Client Info */}
        <p className="text-[#B5B4AD] mb-4">CLIENT INFO</p>
        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <span className="text-[#D8D6CF]">
              {jobClient.walletAddress
                ? `${jobClient.walletAddress.slice(0, 7)}...${jobClient.walletAddress.slice(-4)}`
                : '0x765k...abvc'}
            </span>
            <span
              className="text-[#F0FCF6] text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: '#04DF76' }}
            >
              Verified
            </span>
          </div>
          <p className="text-[#D8D6CF] text-sm">
            {jobClient.about ??
              job.clientDescription ??
              "We're a boutique clothing line based in Lagos, passionate about contemporary designs and collaborations with creative artisans"}
          </p>
          <div className="flex gap-4 items-center">
            <Image src="/market/calendar-tick.svg" alt="Calendar" width={16} height={16} />
            <span className="text-[#B5B4AD]">
              Joined {jobClient.dateJoined ? new Date(jobClient.dateJoined).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'January 2024'}
            </span>
            {isArtisan ? (
              <button 
                onClick={handleViewProfile}
                className="bg-[#262208] text-[#FCF8E3] py-2 px-4 rounded-full text-sm hover:bg-[#3a3012] transition-colors cursor-pointer"
              >
                View Profile
              </button>
            ) : (
              <span className="bg-[#1a1a1a] text-[#666] py-2 px-4 rounded-full text-sm cursor-not-allowed">
                View Profile
              </span>
            )}
          </div>
        </div>

        {/* Similar Jobs */}
        <p className="text-[#B5B4AD] mb-2">SIMILAR JOBS</p>
        <p className="text-[#D8D6CF] text-sm mb-4">
          Explore other related opportunities to this project.
        </p>
        <div className="space-y-3">
          <a
            href="/marketplace"
            className="block italic hover:opacity-80 transition-opacity"
            style={{ color: '#FAB427' }}
          >
            • Tailor Needed for Wedding Gowns - $800 Budget
          </a>
          <a
            href="/marketplace"
            className="block italic hover:opacity-80 transition-opacity"
            style={{ color: '#FAB427' }}
          >
            • Seamstress for Kids&apos; Clothing Line - $600 Budget
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;