"use client"

import type React from "react"
import { useState } from "react"
import Input from "@/components/Input"
import ProgressBar from "@/components/ProgressBar"
import { suggestedSkillsArray } from "@/utils/skills"
import Select from "@/components/Select"
import { LevelOfExperience, ArtisanLocation } from "@/utils/filters"
import { useGetJobData } from "@/utils/store"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Title() {
  const [inputValue, setInputValue] = useState<string>("")
  const router = useRouter()
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const {
    setJobTitle,
    setJobLocation,
    setExperienceRequired,
    addSkill,
    removeSkill,
    jobTitle,
    jobLocation,
    experienceRequired,
    requiredSkills,
  } = useGetJobData()

  const handleAddSkill = (skill: string) => {
    if (requiredSkills.length < 10 && !requiredSkills.includes(skill)) {
      addSkill(skill)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddFromInput = () => {
    if (inputValue.trim() && requiredSkills.length < 10 && !requiredSkills.includes(inputValue.trim())) {
      addSkill(inputValue.trim())
    }
    setInputValue("")
  }

  const handleRemoveSkill = (skill: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeSkill(skill)
  }

  const filteredSuggestedSkills = suggestedSkillsArray.filter((skill) => !requiredSkills.includes(skill))

  const handleNext = () => {
    setIsUploading(true)

    if (jobTitle === "") {
      toast.error("Please enter a job title")
      setIsUploading(false)
      return
    }
    if (experienceRequired === "") {
      toast.error("Please select your level of experience")
      setIsUploading(false)
      return
    }
    if (jobLocation === "") {
      toast.error("Please select a location")
      setIsUploading(false)
      return
    }

    if (requiredSkills.length === 0) {
      toast.error("Please add at least one required skill")
      setIsUploading(false)
      return
    }
    console.log(jobTitle, jobLocation, experienceRequired, requiredSkills)
    router.push("/role/clients/create-job/details")
    setIsUploading(false)
  }

  const handlePrevious = () => {
    router.push("/role/clients/onboarding")
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center py-8">
      <div className="flex flex-col text-[#F9F1E2] w-[90vw] p-8 rounded-lg bg-opacity-80 shadow-lg md:w-[65%] lg:w-[50%] xl:w-[45%] shadow-second bg-[#F2E8CF0A] backdrop-blur-sm border border-[#FCFBF7]/20">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar totalSteps={5} currentStep={1} />
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="font-alata text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight">
            Start with a Clear Job Title and Skills
          </h2>
          <p className="font-merriweather text-[#B5B4AD] text-base md:text-lg leading-relaxed max-w-2xl">
            Write a title that grabs attention and gives artisans a clear idea of your project. This is the first thing
            they will see.
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-4">
          {/* Title and Selects Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Job Title */}
            <div className="space-y-3">
              <label className="block">
                <span className="font-bold text-[#F9F1E2] text-lg mb-2 block">Title</span>
                <textarea
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="E.g Seeking a Fashion Designer for a New Clothing Line"
                  className="w-full h-32 font-merriweather bg-[#F2E8CF]/10 backdrop-blur-sm border border-[#FCFBF7]/20 rounded-lg px-4 py-3 text-[#FCFBF7] placeholder:text-[#B5B4AD] placeholder:italic focus:outline-none focus:ring-2 focus:ring-yellow/50 focus:border-yellow/50 resize-none transition-all duration-200"
                />
              </label>
            </div>

            {/* Experience and Location Selects */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block">
                  <Select
                    onSelect={(value) => setExperienceRequired(value)}
                    filters={LevelOfExperience}
                    placeholder="Select your level of experience"
                  />
                </label>
              </div>

              <div className="space-y-3">
                <label className="block">
                  <Select
                    onSelect={(value) => setJobLocation(value)}
                    filters={ArtisanLocation}
                    placeholder="Select location"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Required Skills Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-[#F9F1E2] text-lg">Required Skill</h3>

              {/* Selected Skills */}
              {requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {requiredSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={(e) => handleRemoveSkill(skill, e)}
                      className="flex items-center px-4 py-2 rounded-full bg-[#333333] hover:bg-[#444444] text-white text-sm font-medium transition-colors duration-200 group"
                    >
                      {skill}
                      <span className="ml-2 text-lg group-hover:text-red-400 transition-colors duration-200">×</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Add Skill Input */}
              <div className="relative max-w-md">
                <Input
                  placeholder="Enter your skills"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddFromInput()
                    }
                  }}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow hover:bg-yellow/90 px-4 py-2 text-sm font-bold text-[#1A1203] rounded transition-colors duration-200"
                  onClick={handleAddFromInput}
                >
                  Add
                </button>
              </div>

              <p className="text-[#B5B4AD] text-sm">Max 10 skills ({10 - requiredSkills.length} remaining)</p>
            </div>

            {/* Suggested Skills */}
            {filteredSuggestedSkills.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-bold text-[#F9F1E2]">Suggested Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {filteredSuggestedSkills.slice(0, 12).map((skill) => (
                    <button
                      key={skill}
                      className="flex items-center px-4 py-2 rounded-full border border-[#B5B4AD]/40 text-[#D8D6CF] text-sm font-medium hover:bg-[#333333] hover:border-[#B5B4AD] transition-all duration-200"
                      onClick={() => handleAddSkill(skill)}
                    >
                      {skill}
                      <span className="ml-2 text-lg text-[#B5B4AD]">+</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#FCFBF7]/20">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 uppercase bg-[#262208] hover:bg-[#262208]/80 rounded-lg text-[#FCF8E3] font-bold text-sm md:text-base transition-colors duration-200"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={isUploading}
            className="px-6 py-3 uppercase bg-yellow hover:bg-yellow/90 rounded-lg text-[#1A1203] font-bold text-sm md:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Processing..." : "Next, Job Details"}
          </button>
        </div>
      </div>
    </div>
  )
}
