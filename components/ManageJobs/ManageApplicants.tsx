"use client";

import type React from "react";

import Filter from "@/components/Marketplace/Filter";
import { useFilterState } from "@/context/filter";
import type { Applied } from "@/utils/job";
import type { FilterProps } from "@/utils/filters";
import Pagination from "./JobsPagination";
import { useState } from "react";
import ApplicantCard from "./ApplicantCard";
import Image from "next/image";

interface ManageJobProps {
  job: Applied;
  filters: FilterProps[];
  jobType: string;
}

const ManageApplicants = ({
  job,
  filters,
  jobType,
}: Readonly<ManageJobProps>) => {
  const { filterState } = useFilterState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const totalPages = Math.ceil(job.job.applicants.length / itemsPerPage);

  return (
    <div className="grid h-full w-full space-y-4">
      <div className="space-y-4  p-6 border-b-[0.3px]  border-[#FCFBF726] flex justify-between w-full">
        {/* Job Title */}
        <div className="space-y-[7px]">
          <h2 className="text-[#F9F1E2] font-alata text-2xl font-bold">
            {job.job?.title}
          </h2>

          {/* Job Details */}
          <div className="flex items-center text-sm text-[#B5B4AD] mb-2">
            {/* <div className="flex w-full md:w-[90%] 2xl:w-[50%] gap-x-4 py-2 "> */}
            <div className="flex justify-center items-center gap-x-2 px-2 border-r border-[#FCFBF726] ">
              <Image
                src={"/location.png"}
                alt={"location"}
                width="18"
                height="16"
              />
              <span className="font-merriweather text-[#D8D6CF]">
                {job.job.preferredLocation}
              </span>
            </div>
            <div className="flex justify-center items-center gap-x-2 px-2  border-r border-[#FCFBF726] ">
              <Image
                src={"/language.png"}
                alt={"language"}
                width="14"
                height="16"
              />
              <span className="font-merriweather text-[#D8D6CF]">
                {job.job.language}
              </span>
            </div>
            <div className="flex justify-center items-center gap-x-2 px-2 border-r border-[#FCFBF726] ">
              <Image
                src={"/calendar.png"}
                alt={"timeline"}
                width="18"
                height="16"
              />
              <span className="font-merriweather text-[#D8D6CF]">
                {job.job.projectDuration.weeks} weeks
              </span>
            </div>
            <div className="flex justify-center items-center gap-x-2 px-2 ">
              <Image
                src={"/expertise.png"}
                alt={job.job.experienceLevel}
                width="20"
                height="16"
              />
              <span className="font-merriweather text-[#D8D6CF]">
                {job.job.experienceLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="flex gap-x-2 items-center text-[#FFCC6D]">
          <div className="flex">
            <Image
              src="/money-2.png"
              alt="Amount"
              width="18"
              height="18"
              className="hidden md:flex"
            />
          </div>
          <span className="text-[#FFCC6D] text-2xl font-bold font-alata">
            ${job?.job?.price}
            <span className="text-sm font-normal text-[#FFCC6D]">(Fixed)</span>
          </span>
        </div>
      </div>
      <div className="gap-x-8 py-2 px-6 md:flex w-full">
        {filterState && (
          <div className="md:hidden min-h-[60%]">
            <Filter filters={filters} />
          </div>
        )}
        <div className="hidden md:grid md:w-[25%] min-h-[60%]">
          <Filter filters={filters} />
        </div>
        <div className="grid gap-y-4 w-[90vw] md:w-[75%] h-full">
          {/* Jobs List */}
          <div className="space-y-4">
            {job.job.applicants.map((applicant) => (
              <ApplicantCard applicant={applicant} job={job.job} key={applicant?.about} />
            ))}
          </div>

          {/* Pagination */}
          {
            <div className="">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages} // Calculate based on total items
                itemsPerPage={itemsPerPage}
                totalItems={job.job.applicants.length} // This should come from your actual data
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(items) => {
                  setItemsPerPage(items);
                  setCurrentPage(1); // Reset to first page when changing items per page
                }}
                itemType={`${jobType} Jobs`}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ManageApplicants;
