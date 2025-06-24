"use client";

import Image from "next/image";
import type { ArtisanProfileProps } from "@/utils/profile";
import { useRouter } from "next/navigation";
import EditProfile from "./EditModals/EditProfile";
import { editProfile } from "@/utils/profile";
import { useState } from "react";
import Modal from "../Modal";
import AnimatedDiv from "../AnimatedDiv";

interface ProfileCardProps {
  profile: ArtisanProfileProps;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(editProfile);

  const router = useRouter();
  const handleBrowseJobs = () => {
    router.push("/marketplace");
  };

  // const setIsModalOpen = (isOpen: boolean) => {
  //   // Placeholder function, replace with actual modal logic
  //   console.log("Modal open state:", isOpen);
  // };

  return (
    <div className="bg-[#F2E8CF0A] lg:flex rounded-lg p-4 h-full border border-[#FCFBF726] text-[#F9F1E2] font-merriweather">
      <div className="lg:hidden flex justify-end">
        <div className="flex items-start">
          <button
            className="bg-[#262208] rounded-full flex items-center px-3 py-2 gap-x-2 text-sm hover:bg-[#262208]/80 transition-colors"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Edit{""}
            <span className="relative h-6 w-6 rounded-full bg-[#F2E8CF0A]">
              <Image
                src="/edit.png"
                alt="edit"
                fill
                className="object-contain p-1"
              />
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full relative">
        <div className="flex-shrink-0">
          <div className="relative h-72 w-72">
            <Image
              src={profile.about.avatar || "/placeholder.svg"}
              alt="Profile avatar"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4  justify-center w-full items-start relative lg:left-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-[#FCF8F0] uppercase">
                #{profile.about.username}
              </h2>
              <span className="flex text-[#F0FCF6] text-xs px-2 py-1 bg-[#04DF7621] border rounded-full border-[#04DF76]">
                Verified
              </span>
            </div>
            <p className="text-xl font-semibold text-[#FCF8F0] mb-2">
              {profile.about.jobTitle}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-[#D8D6CF]">
            <div className="flex items-center gap-2">
              <Image
                src="/location.png"
                alt="location"
                width={16}
                height={16}
              />
              <span>{profile.details.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Available to work</span>
            </div>
          </div>

          <div>
            <button
              onClick={handleBrowseJobs}
              className="bg-yellow text-[#1A1203] font-bold px-6 py-2 rounded-md uppercase text-sm hover:bg-yellow/90 transition-colors"
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </div>
      <div className="hidden w-[25%] lg:flex justify-end">
        <div className="flex items-start">
          <button
            className="bg-[#262208] rounded-full flex items-center px-3 py-2 gap-x-2 text-sm hover:bg-[#262208]/80 transition-colors"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Edit{""}
            <span className="relative h-6 w-6 rounded-full bg-[#F2E8CF0A]">
              <Image
                src="/edit.png"
                alt="edit"
                fill
                className="object-contain p-1"
              />
            </span>
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
            className="bg-[#333333] border border-[#FCFBF726] md:w-[50vw] lg:w-[35vw] h-[90vh] rounded-xl p-4 relative  "
          >
            <div className="h-[90%] overflow-y-scroll relative top-2">
              <EditProfile
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentData={profileData}
                onSave={setProfileData}
              />
            </div>
          </AnimatedDiv>
        </Modal>
      )}
    </div>
  );
};

export default ProfileCard;
