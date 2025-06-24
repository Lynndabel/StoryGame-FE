"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import ProgressBar from "@/components/ProgressBar";
import { suggestedSkillsArray } from "@/utils/skills";
import { toast } from "sonner";
import { useGetArtisanData } from "@/utils/store";
import {useRouter} from "next/navigation";

export default function Skills() {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { setSelectedSkills } = useGetArtisanData();
  const router = useRouter();

  const handleAddSkill = (skill: string) => {
    if (skills.length < 10 && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleNext = () => {
    if (skills.length < 1) {
      toast.error("No skill selected");
      return;
    }

    for (let i = 0; i < skills.length; i++) {
      setSelectedSkills(skills[i]);
    }

    router.push("/role/artisans/onboarding/bio");
  };

  const handlePrevious = () => {
    router.push("/role/artisans/onboarding/category");
  };

  const handleAddFromInput = () => {
    if (
      inputValue.trim() &&
      skills.length < 10 &&
      !skills.includes(inputValue.trim())
    ) {
      setSkills([...skills, inputValue.trim()]);
    }
    setInputValue("");
  };

  const handleRemoveSkill = (skill: string, e: React.MouseEvent) => {
    e.preventDefault();
    // Prevent event bubbling
    e.stopPropagation();
    setSkills(skills.filter((s) => s !== skill));
  };

  const filteredSuggestedSkills = suggestedSkillsArray.filter(
    (skill) => !skills.includes(skill)
  );

  return (
    <div className="flex min-h-[90vh] w-screen items-center md:items-end justify-center py-4">
      <div className="flex flex-col text-[#F9F1E2] w-[90vw] p-8 rounded-lg bg-opacity-80 shadow-lg md:w-[65%] lg:w-[50%] shadow-second relative 2xl:bottom-16 bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-2 md:gap-y-4">
        <ProgressBar totalSteps={7} currentStep={2} />
        <h2 className="font-alata text-2xl md:text-3xl md:w-[80%]">
          Nice! Now, let’s get specific, what are your skills?
        </h2>
        <p className="font-merriweather text-start self-start md:w-[70%]">
          Choose from the suggested list or type your unique skill to help
          clients find exactly what you do best.
        </p>

        {/* Selected Skills */}
        <div className="w-[80%] md:w-[60%] self-start py-8">
          <label>
            <p className="font-bold py-2">Your Skills</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={(e) => handleRemoveSkill(skill, e)}
                  className="flex items-center px-4 py-[4px] rounded-full bg-[#333333] text-white text-sm font-bold "
                >
                  {skill} <span className="ml-2 text-lg ">×</span>
                </button>
              ))}
            </div>
            <div className="relative">
              <Input
                placeholder="Enter your skills"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFromInput();
                  }
                }}
              />
              <button
                className="absolute right-2 top-4 bg-yellow px-3 py-1 text-sm flex items-center font-bold text-black rounded"
                onClick={handleAddFromInput}
              >
                Add
              </button>
            </div>
            <p className="text-end text-[#D8D6CF]">Max 10 skills</p>
          </label>
        </div>

        {/* Suggested Skills */}
        <div>
          <h3 className="font-bold mb-2">Suggested Skills</h3>
          <div className="flex flex-wrap  gap-2">
            {filteredSuggestedSkills.map((skill) => (
              <button
                key={skill}
                className="flex items-center px-4 py-[4px] rounded-full border border-[#B5B4AD] text-[#D8D6CF] text-sm font-bold  hover:bg-[#333333]"
                onClick={() => handleAddSkill(skill)}
              >
                {skill} <span className="ml-2 text-lg text-[#D8D6CF]">+</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex font-merriweather w-full justify-between mt-8">
          <button onClick={handlePrevious} className="flex w-fit py-2 px-4 uppercase bg-[#262208] rounded-sm text-[#FCF8E3] font-bold text-sm md:text-base">
            Back
          </button>
          <button onClick={handleNext} className="flex w-fit py-2 px-4 uppercase bg-yellow rounded-sm text-[#1A1203] font-bold text-sm md:text-base">
            Next, Add Bio
          </button>
        </div>
      </div>
    </div>
  );
}
