"use client"

import Image from "next/image"
import { IoLocationOutline } from "react-icons/io5"
import { RiGlobalLine, RiTimeLine, RiCheckboxCircleLine, RiMoneyDollarCircleLine } from "react-icons/ri"

interface JobCardProps {
  job: {
    id: string
    title: string
    postedDate: string
    location: string
    language: string
    duration: string
    experience: string
    budget: number
    currency: string
    localCurrency?: {
      amount: number
      symbol: string
    }
    applicationsCount: number
    underReview: number
  }
  artisan: {
    name: string
    title: string
    avatar: string
    location: string
    language: string
    experience: string
    isAvailable: boolean
  }
  onViewAllApplicants: () => void
  onHireArtisan?: () => void
  onStartChat?: () => void
}

const JobCard = ({ job, artisan, onViewAllApplicants }: JobCardProps) => {
  return (
    <div className="bg-[#2A2A2A] border border-[#444444] rounded-lg p-6 text-[#F9F1E2] font-merriweather">
      {/* Posted Date */}
      <div className="mb-4">
        <p className="text-cyan-400 text-sm">Posted: {job.postedDate}</p>
      </div>

      {/* Job Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#F9F1E2] mb-3">{job.title}</h2>

          {/* Job Details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#B5B4AD] mb-4">
            <div className="flex items-center gap-1">
              <IoLocationOutline className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiGlobalLine className="h-4 w-4" />
              <span>{job.language}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiTimeLine className="h-4 w-4" />
              <span>{job.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiTimeLine className="h-4 w-4" />
              <span>{job.experience}</span>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow text-xl font-bold mb-1">
            <RiMoneyDollarCircleLine className="h-5 w-5" />
            <span>
              ${job.budget.toLocaleString()}
              <span className="text-sm font-normal">({job.currency})</span>
            </span>
          </div>
          {job.localCurrency && (
            <p className="text-[#B5B4AD] text-sm">
              ≈ {job.localCurrency.symbol}
              {job.localCurrency.amount.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Artisan Section */}
      <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6">
        <div className="flex gap-4">
          {/* Artisan Image */}
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={artisan.avatar || "/placeholder.svg?height=64&width=64"}
              alt={artisan.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Artisan Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#F9F1E2] mb-1">{artisan.name}</h3>
            <p className="text-[#B5B4AD] mb-2">{artisan.title}</p>

            {/* Artisan Details */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#B5B4AD]">
              <div className="flex items-center gap-1">
                <IoLocationOutline className="h-3 w-3" />
                <span>{artisan.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <RiGlobalLine className="h-3 w-3" />
                <span>{artisan.language}</span>
              </div>
              <div className="flex items-center gap-1">
                <RiTimeLine className="h-3 w-3" />
                <span>{artisan.experience}</span>
              </div>
              <div className="flex items-center gap-1">
                <RiCheckboxCircleLine className="h-3 w-3 text-green-500" />
                <span>{artisan.isAvailable ? "Available to work" : "Not available"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-medium text-[#F9F1E2] mb-1">{job.applicationsCount} Applications Received</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-[#B5B4AD] text-sm">Under Review: You have applications to review</p>
            </div>
          </div>
          <button
            onClick={onViewAllApplicants}
            className="bg-yellow text-[#1A1203] font-bold py-2 px-4 rounded uppercase text-sm hover:bg-yellow/90 transition-colors"
          >
            View All Applicants
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobCard
