// import { useRouter } from "next/navigation";
import Bio from "@/components/Profile/Bio";
import Details from "@/components/Profile/Details";
import Skills from "@/components/Profile/Skills";
import Image from "next/image";
import { ArtisanProfileProps } from "@/utils/profile";
import { useState } from "react";
import Modal from "@/components/Modal";
import EditAbout from "@/components/Profile/EditModals/EditAbout";
import AnimatedDiv from "@/components/AnimatedDiv";

const About = ({profile}: {profile: ArtisanProfileProps} ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(profile);

  // const router = useRouter();

  // const handleEdit = () => {
  //   router.push("/role/artisans/onboarding/bio");
  // };

  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-[#F2E8CF0A] rounded-lg gap-y-8 md:gap-y-4 flex-col ">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl">About</h3>
        <button
         onClick={() => {
              setIsModalOpen(true);
            }}
          className="bg-[#262208] rounded-full flex items-center px-[10px] py-[6px] gap-x-2 hover:bg-[#262208]/80 transition-colors"
        >
          Edit{""}
          <span className="relative h-[28px] w-[28px] rounded-full bg-[#F2E8CF0A]">
            <Image
              src="/edit.png"
              alt="pen"
              fill
              className="object-contain p-2"
            />
          </span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 w-full md:grid-rows-1 ">
        <div className="md:col-span-1  h-full ">
          <Bio about={profile.about} />
        </div>
        <div className="md:col-span-1 flex flex-col gap-y-2 h-full ">
          <div className="h-full">
            {" "}
            <Details details={profile.details} />
          </div>
          <div className="h-full">
            {" "}
            <Skills skills={profile.skills} />
          </div>
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
            <div className="h-[90%]  overflow-y-scroll">
              <EditAbout
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

export default About;
