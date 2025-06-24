"use client";

import type React from "react";

import Filter from "@/components/Marketplace/Filter";
import { useFilterState } from "@/context/filter";
import type { Applied } from "@/utils/job";
import type { FilterProps } from "@/utils/filters";
import NoJob from "./NoJob";
import Pagination from "./JobsPagination";
import { useState, useMemo } from "react";

interface ManageJobProps {
  jobs: Applied[];
  title: string;
  desc: string;
  imageSrc: string;
  filters: FilterProps[];
  JobStatus: React.ComponentType<{
    job: Applied;
    key: string;
  }>;
  jobType: string;
  pageDetails?: string;
}

const ManageJobs = ({
  jobs = [],
  title,
  desc,
  imageSrc,
  filters,
  JobStatus,
  jobType,
  pageDetails,
}: Readonly<ManageJobProps>) => {
  const { filterState } = useFilterState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of jobs list when page changes
    const jobsContainer = document.querySelector(".jobs-container")
    if (jobsContainer) {
      jobsContainer.scrollTop = 0
    }
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1) // Reset to first page when changing items per page
    // Scroll to top when items per page changes
    const jobsContainer = document.querySelector(".jobs-container")
    if (jobsContainer) {
      jobsContainer.scrollTop = 0
    }
  }

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return jobs.slice(startIndex, endIndex);
  }, [jobs, currentPage, itemsPerPage]);

  return (
    <div className="grid h-full w-full">
      {jobs.length > 0 ? (
        <div className="w-full px-4 md:px-8 2xl:px-16 py-8">
          <p className="text-[#F9F1E2] py-4 w-[90%]">{pageDetails}</p>
          <div className="gap-x-8 md:flex w-full h-[480px]">
            {filterState && (
              <div className="md:hidden">
                <Filter filters={filters} />
              </div>
            )}
            <div className="hidden md:grid md:w-[25%] h-full overflow-auto">
              <Filter filters={filters} />
            </div>
            <div className="flex flex-col w-[90vw] md:w-[75%] h-full">
              {/* Jobs List - Scrollable Container */}
              <div className="jobs-container flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FCFBF726] scrollbar-track-[#9A9992] pr-2">
                {" "}
                <div className="space-y-4">
                  {paginatedJobs.map((job) => (
                    <JobStatus job={job} key={job?.job?.title} />
                  ))}
                </div>
              </div>

              {/* Pagination */}
              {
                <div className="pt-2">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages} // Calculate based on total items
                    itemsPerPage={itemsPerPage}
                    totalItems={jobs.length} // This should come from your actual data
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    itemType={jobType}
                  />
                </div>
              }
            </div>
          </div>
        </div>
      ) : (
        <NoJob
          title={title}
          desc={desc}
          imageSrc={imageSrc}
          jobType={jobType}
        />
      )}
    </div>
  );
};

export default ManageJobs;
