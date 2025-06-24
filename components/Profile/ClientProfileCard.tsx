"use client";

import Image from "next/image";
import type { Client } from "@/utils/job";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../Modal";
import AnimatedDiv from "@/components/AnimatedDiv";
import EditProfile from "./EditModals/EditProfile";
import { editProfile } from "@/utils/profile";

interface ClientProfileCardProps {
  client: Client;
}

const ClientProfileCard = ({ client }: ClientProfileCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(editProfile);

  const router = useRouter();

  const handlePostJobs = () => {
    router.push("/role/clients/create-job/title");
  };

  return (
    <div className="bg-[#F2E8CF0A] xl:flex rounded-lg p-4 h-full border border-[#FCFBF726] text-[#F9F1E2] font-merriweather">
      <div className="xl:hidden flex justify-end">
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
              src={client.avatar || "/placeholder.svg"}
              alt="Profile avatar"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-4 w-full ">
          <div className="flex flex-col justify-between space-y-4 py-4">
            <div className="flex justify-between w-full px-2">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-[rgb(252,248,240)] uppercase">
                  #{client.username}
                </h2>
                <span className="flex text-[#F0FCF6] text-xs px-2 py-1 bg-[#04DF7621] border rounded-full border-[#04DF76]">
                  Verified
                </span>
              </div>
            </div>
            <p className="text-[#D8D6CF] text-sm xl:text-base xl:mb-4 text-balance w-full">
              {client.about}
            </p>

            <div className="grid w-full grid-cols-3  gap-2  text-sm">
              <div className="border-r border-[#FCFBF726]">
                <div className="flex items-center gap-2 text-[#B5B4AD] mb-1">
                  <Image
                    src="/location.png"
                    alt="location"
                    width={12}
                    height={14}
                  />
                  <span className="text-[10px] xl:text-xs">Location</span>
                </div>
                <p className="text-[#F9F1E2]  text-xs xl:text-sm">{client.location}</p>
              </div>

              <div className="border-r border-[#FCFBF726]">
                <div className="flex items-center gap-2 text-[#B5B4AD] mb-1">
                  <Image
                    src="/language.png"
                    alt="language"
                    width={12}
                    height={14}
                  />
                  <span className="text-[10px] xl:text-xs">Language</span>
                </div>
                <p className="text-[#F9F1E2] text-xs xl:text-sm">{client.language}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#B5B4AD] mb-1">
                  <Image
                    src="/totalJobs.png"
                    alt="language"
                    width={14}
                    height={14}
                  />
                  <span className="text-[10px] xl:text-xs">Hiring History</span>
                </div>
                <p className="text-[#F9F1E2] text-xs xl:text-sm">{client.posted} Jobs posted</p>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handlePostJobs}
              className="bg-yellow text-[#1A1203] px-6 py-2 rounded-[4px] uppercase text-sm hover:bg-yellow/90 transition-colors"
            >
              Post Jobs
            </button>
          </div>
        </div>
      </div>
      <div className="hidden w-[15%] xl:flex justify-end">
        <div><button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="bg-[#262208] rounded-full flex items-center px-3 py-2 gap-x-2 text-sm hover:bg-[#262208]/80 transition-colors"
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
            className="bg-[#333333] border border-[#FCFBF726] md:w-[60vw] h-[90vh] rounded-xl p-4 relative  "
          >
            <div className="h-[90%] overflow-y-scroll">
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

export default ClientProfileCard;
