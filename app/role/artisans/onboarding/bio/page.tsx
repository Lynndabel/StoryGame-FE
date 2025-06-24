"use client";

import ProgressBar from "@/components/ProgressBar";
import Select from "@/components/Select";
import { LevelOfExperience, PreferedLanguage } from "@/utils/filters";
import { toast } from "sonner";
import { useGetArtisanData } from "@/utils/store";
import { useRouter } from "next/navigation";

export default function Bio() {
  const {
    experienceLevel,
    preferredLanguage,
    yearsOfExperience,
    tagline,
    bio,
    setExperienceLevel,
    setPreferredLanguage,
    setYearsOfExperience,
    setTagline,
    setBio,
  } = useGetArtisanData();
  const maxLength = 1000;
  const minLength = 300;

  const router = useRouter();

  const handleExperienceLevel = (level: string) => {
    setExperienceLevel(level);
  };

  const handlePreferredLanguage = (language: string) => {
    setPreferredLanguage(language);
  };

  const handleYearsOfExperience = (years: string) => {
    setYearsOfExperience(parseInt(years));
  };

  const handleTagline = (tagline: string) => {
    setTagline(tagline);
  };

  const handleBio = (bio: string) => {
    if (bio.length <= maxLength) {
      setBio(bio);
    }
  };

  const handleNext = () => {
    if (experienceLevel == "") {
      toast.error("Please select your level of experience");
      return;
    } else if (preferredLanguage == "") {
      toast.error("Please select your preferred language");
      return;
    } else if (yearsOfExperience < 1) {
      toast.error("Please select your years of experience");
      return;
    } else if (tagline == "") {
      toast.error("Please enter your service tagline");
      return;
    } else if (bio == "") {
      toast.error("Please enter your bio");
      return;
    }

    router.push("/role/artisans/onboarding/portfolio");
  };

  const handlePrevious = () => {
    router.push("/role/artisans/onboarding/skills");
  };

  return (
    <div className="flex max-sm:min-h-screen md:max-h-fit w-screen items-center  md:items-start  justify-center overflow-y-scroll">
      <div className="flex flex-col text-[#F9F1E2] max-w-[95%] md:max-w-[80%]  p-8 rounded-lg bg-opacity-80  shadow-lg shadow-second  relative   bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-4 ">
        <ProgressBar totalSteps={7} currentStep={3} />
        <h2 className="font-alata text-2xl md:text-3xl ">
          Almost There! Let&apos;s Fine-Tune Your Profile.
        </h2>
        <p className="font-merriweather text-start self-start md:w-[70%]">
          Tell us a little more about yourself to help clients get to know you
          better. You’re just a few steps away from showcasing your skills!
        </p>

        <div className="flex flex-col md:flex-row self-start md:justify-between w-full gap-4 ">
          <div className="flex flex-col gap-4 md:w-[50%]">
            <div className="w-full">
              <Select
                onSelect={handleExperienceLevel}
                filters={LevelOfExperience}
                placeholder={"Select your level of experience"}
              />{" "}
            </div>
            <div className="w-full md:hidden">
              {" "}
              <Select
                onSelect={handlePreferredLanguage}
                filters={PreferedLanguage}
                placeholder={"Select your language"}
              />{" "}
            </div>
            <div className="w-full">
              {" "}
              <p className="font-bold">How Long Have You Been Practicing?</p>
              <div className="flex items-start  w-full gap-x-2 ">
                <div className="w-[50%] py-4 ">
                  <input
                    onChange={(e) => handleYearsOfExperience(e.target.value)}
                    type={"number"}
                    placeholder={"0"}
                    min={0}
                    className="w-full font-merriweather bg-[#F2E8CF29] p-[12px] border rounded-md border-[#FCFBF726] shadow-md shadow-[#333333] placeholder:text-base placeholder:text-[#D8D6CF] focus:outline-[#333333]"
                  />
                </div>
                <div className="w-[50%] self-center relative">
                  <div
                    className="flex self-center items-center justify-between bg-[#F2E8CF29] p-[12px] w-full rounded-md border border-[#FCFBF726] relative
                    text-[#F9F1E2]"
                  >
                    Year(s)
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <p className="font-bold">Service Tagline</p>
              <textarea
                onChange={(e) => handleTagline(e.target.value)}
                placeholder="E.g Sustainable Wed3 Fashion Designer"
                className="h-24 focus:outline-[#262208] w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-2 placeholder:py-2 text-[#FCFBF7] placeholder:italic px-4 py-2"
              ></textarea>
            </div>
            <div>
              <p className="font-bold">Bio</p>
              <textarea
                onChange={(e) => handleBio(e.target.value)}
                value={bio}
                placeholder="Write a brief description about your expertise or passion for your craft"
                minLength={minLength}
                maxLength={maxLength}
                className="h-44 focus:outline-[#262208] w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-4 placeholder:py-2 text-[#FCFBF7] placeholder:italic px-4 py-2"
              />
              <p className="text-right text-sm text-[#D8D6CF] self-end mt-1">
                {bio.length} / {maxLength}
              </p>
            </div>
          </div>
          <div className="md:w-[50%] flex flex-col gap-4">
            <div className="w-full hidden md:flex">
              {" "}
              <Select
                onSelect={handlePreferredLanguage}
                filters={PreferedLanguage}
                placeholder={"Select your language"}
              />{" "}
            </div>
            <div className="hidden md:grid ">
              <p className="font-bold">Service Tagline</p>
              <textarea
                onChange={(e) => handleTagline(e.target.value)}
                placeholder="E.g Sustainable Wed3 Fashion Designer"
                className="h-24 focus:outline-[#262208] w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-2 placeholder:py-2 text-[#FCFBF7] placeholder:italic px-4 py-2"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex font-merriweather w-full justify-between">
          <button
            onClick={handlePrevious}
            className="flex w-fit py-2 px-4 uppercase bg-[#262208] rounded-sm text-[#FCF8E3] font-bold text-sm md:text-base"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex w-fit py-2 px-4 uppercase  bg-yellow rounded-sm text-[#1A1203] font-bold text-sm md:text-base"
          >
            Next, Add portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
