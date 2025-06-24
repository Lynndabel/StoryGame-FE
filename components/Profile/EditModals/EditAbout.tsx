"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Select from "@/components/Select";
import Input from "@/components/Input";
import { LevelOfExperience, PreferedLanguage } from "@/utils/filters";
import { suggestedSkillsArray } from "@/utils/skills";
import { toast } from "sonner";
import { ArtisanProfileProps } from "@/utils/profile";

interface AboutEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ArtisanProfileProps;
  onSave: (data: ArtisanProfileProps) => void;
}

const AboutEditModal: React.FC<AboutEditModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}) => {
  const [experienceLevel, setExperienceLevel] = useState(
    currentData.details.experience
  );
  const [preferredLanguage, setPreferredLanguage] = useState(
    currentData.details.language
  );
  const [yearsOfExperience, setYearsOfExperience] = useState(
    currentData.details.yearOfExperience || 0
  );
  const [tagline, setTagline] = useState(currentData.details.tagline);
  const [bio, setBio] = useState(currentData.about.desc);
  const [skills, setSkills] = useState<string[]>(currentData.skills || []);
  const [inputValue, setInputValue] = useState<string>("");

  const maxBioLength = 300;
  const maxTaglineLength = 150;

  useEffect(() => {
    if (isOpen) {
      setExperienceLevel(currentData.details.experience);
      setPreferredLanguage(currentData.details.language);
      setYearsOfExperience(currentData.details.yearOfExperience || 0);
      setTagline(currentData.details.tagline);
      setBio(currentData.about.desc);
      setSkills(currentData.skills || []);
    }
  }, [isOpen, currentData]);

  const handleAddSkill = (skill: string) => {
    if (skills.length < 10 && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
    e.stopPropagation();
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    if (experienceLevel === "") {
      toast.error("Please select your level of experience");
      return;
    }
    if (preferredLanguage === "") {
      toast.error("Please select your preferred language");
      return;
    }
    if (yearsOfExperience < 1) {
      toast.error("Please enter your years of experience");
      return;
    }
    if (tagline === "") {
      toast.error("Please enter your service tagline");
      return;
    }
    if (bio === "") {
      toast.error("Please enter your bio");
      return;
    }

    onSave({
      details: {
        experience: experienceLevel,
        language: preferredLanguage,
        yearOfExperience: yearsOfExperience,
        tagline: tagline,
        location: currentData.details.location,
        availability: currentData.details.availability,
        pricing: currentData.details.pricing,
        walletAddress: currentData.details.walletAddress,
      },
      about: {
        avatar: currentData.about.avatar,
        title: currentData.about.title,
        username: currentData.about.username,
        jobTitle: currentData.about.jobTitle,
        desc: bio,
      },
      skills: skills,
      portfolio: currentData.portfolio,
      reviews: currentData.reviews,
    });
    onClose();
  };

  const handleBioChange = (value: string) => {
    if (value.length <= maxBioLength) {
      setBio(value);
    }
  };

  const handleTaglineChange = (value: string) => {
    if (value.length <= maxTaglineLength) {
      setTagline(value);
    }
  };

  const filteredSuggestedSkills = suggestedSkillsArray.filter(
    (skill) => !skills.includes(skill)
  );

  if (!isOpen) return null;

  return (
    <div className=" rounded-lg w-full max-w-4xl p-2 h-full text-[#F9F1E2] font-merriweather">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-[#444444]">
        <div>
          <h2 className="text-xl font-bold text-[#F9F1E2]">EDIT ABOUT</h2>
          <div className="w-16 h-1 bg-yellow mt-1"></div>
        </div>

        
      </div>

      <div className="p-6 space-y-6">
        {/* Description */}
        <p className="text-[#B5B4AD] text-sm">
          Tell us about yourself – You can mention your years of experience,
          industry background, key skills.
        </p>

        {/* Bio Section */}
        <div>
          <div className="block mb-2">
            <span className="text-[#F9F1E2] font-medium">Bio</span>
          </div>
          <div className="relative">
            <textarea
              value={bio}
              onChange={(e) => handleBioChange(e.target.value)}
              placeholder="Write a brief description about your expertise or passion for your craft"
              className="w-full h-32 bg-[#F2E8CF29] border border-[#444444] rounded-lg px-4 py-3 text-[#F9F1E2] placeholder:text-[#666666] focus:outline-none focus:border-yellow resize-none"
            />
            <div className="absolute bottom-2 right-2 text-xs text-[#666666]">
              {bio.length}/{maxBioLength}
            </div>
          </div>
        </div>

        {/* Experience Level and Preferred Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Select
              onSelect={setExperienceLevel}
              filters={LevelOfExperience}
              placeholder="Select your level of experience"
            />
          </div>

          <div>
            <Select
              onSelect={setPreferredLanguage}
              filters={PreferedLanguage}
              placeholder="Select language"
            />
          </div>
        </div>

        {/* Years of Experience and Service Tagline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="block mb-2">
              <span className="text-[#F9F1E2] font-medium">
                How Long Have You Been Practicing?
              </span>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={yearsOfExperience || ""}
                  onChange={(e) =>
                    setYearsOfExperience(Number.parseInt(e.target.value) || 0)
                  }
                  min={0}
                  className="w-full bg-[#F2E8CF29] border border-[#444444] rounded-lg px-4 py-3 text-[#F9F1E2] focus:outline-none focus:border-yellow"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col"></div>
              </div>
              <div className="w-24">
                <div className="bg-[#F2E8CF29] border border-[#444444] rounded-lg px-4 py-3 text-[#F9F1E2] flex items-center justify-center">
                  Year(s)
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="block mb-2">
              <span className="text-[#F9F1E2] font-medium">
                Service Tagline
              </span>
            </div>
            <div className="relative">
              <textarea
                value={tagline}
                onChange={(e) => handleTaglineChange(e.target.value)}
                placeholder="E.g Sustainable Web3 Fashion Designer"
                className="w-full h-24 bg-[#F2E8CF29] border border-[#444444] rounded-lg px-4 py-3 text-[#F9F1E2] placeholder:text-[#666666] focus:outline-none focus:border-yellow resize-none"
              />
              <div className="absolute bottom-2 right-2 text-xs text-[#666666]">
                {tagline.length}/{maxTaglineLength}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <div className="block mb-2">
            <span className="text-[#F9F1E2] font-medium">Your Skills</span>
          </div>

          {/* Selected Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={(e) => handleRemoveSkill(skill, e)}
                  className="flex items-center px-3 py-1 rounded-full border border-[#666666] text-[#F9F1E2] text-sm hover:border-[#F9F1E2] transition-colors"
                >
                  {skill}
                  <span className="ml-2 text-[#666666] hover:text-[#F9F1E2]">
                    ×
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Add Skill Input */}
          <div className="relative mb-2">
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
          </div>
          <p className="text-xs text-[#666666] mb-4">Max 10 skills</p>

          {/* Suggested Skills */}
          <div>
            <h4 className="text-[#F9F1E2] font-medium mb-3">
              Suggested Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {filteredSuggestedSkills.slice(0, 20).map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleAddSkill(skill)}
                  className="flex items-center px-3 py-1 rounded-full border border-[#666666] text-[#F9F1E2] text-sm hover:border-[#F9F1E2] transition-colors"
                >
                  {skill}
                  <span className="ml-2 text-[#666666]">+</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-6 border-t border-[#444444] flex justify-end">
        <button
          onClick={handleSave}
          className="bg-yellow text-[#1A1203] font-bold px-8 py-3 rounded uppercase text-sm hover:bg-yellow/90 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AboutEditModal;
