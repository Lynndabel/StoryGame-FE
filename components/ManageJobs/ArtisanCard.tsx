"use client"

import Image from "next/image"
import { IoLocationOutline, IoChatbubbleEllipses } from "react-icons/io5"
import { RiGlobalLine, RiTimeLine, RiCheckboxCircleLine } from "react-icons/ri"

interface ArtisanCardProps {
  artisan: {
    id: string
    name: string
    title: string
    avatar: string
    location: string
    language: string
    experience: string
    isAvailable: boolean
    tagline: string
    skills: string[]
  }
  onHire: () => void
  onStartChat: () => void
  onViewProfile: () => void
}

const ArtisanCard = ({ artisan, onHire, onStartChat, onViewProfile }: ArtisanCardProps) => {
  const displayedSkills = artisan.skills.slice(0, 3)
  const remainingSkills = artisan.skills.length - 3

  return (
    <div className="bg-[#2A2A2A] border border-[#444444] rounded-lg p-6 text-[#F9F1E2] font-merriweather">
      {/* Header Section */}
      <div className="flex gap-4 mb-6">
        {/* Profile Image */}
        <div className="relative h-32 w-32 flex-shrink-0">
          <Image
            src={artisan.avatar || "/placeholder.svg?height=128&width=128"}
            alt={artisan.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-[#F9F1E2]">{artisan.name}</h2>
            <button
              onClick={onViewProfile}
              className="text-yellow hover:text-yellow/80 transition-colors text-sm font-medium"
            >
              View Profile
            </button>
          </div>

          <h3 className="text-lg text-[#B5B4AD] mb-4">{artisan.title}</h3>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#B5B4AD]">
            <div className="flex items-center gap-1">
              <IoLocationOutline className="h-4 w-4" />
              <span>{artisan.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiGlobalLine className="h-4 w-4" />
              <span>{artisan.language}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiTimeLine className="h-4 w-4" />
              <span>{artisan.experience}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiCheckboxCircleLine className="h-4 w-4 text-green-500" />
              <span>{artisan.isAvailable ? "Available to work" : "Not available"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-[#F9F1E2] mb-3">About</h4>
        <p className="text-[#B5B4AD] mb-4">{artisan.tagline}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {displayedSkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-[#1A1A1A] border border-[#444444] rounded-full text-sm text-[#B5B4AD]"
            >
              {skill}
            </span>
          ))}
          {remainingSkills > 0 && (
            <span className="px-3 py-1 bg-[#1A1A1A] border border-[#444444] rounded-full text-sm text-yellow">
              +{remainingSkills} More
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onHire}
          className="flex-1 bg-yellow text-[#1A1203] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-yellow/90 transition-colors"
        >
          Hire Artisan
        </button>
        <button
          onClick={onStartChat}
          className="flex-1 bg-[#1A1A1A] text-[#F9F1E2] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2"
        >
          <IoChatbubbleEllipses className="h-4 w-4" />
          Start Chat
        </button>
      </div>
    </div>
  )
}

export default ArtisanCard
