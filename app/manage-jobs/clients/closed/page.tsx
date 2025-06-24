"use client";
import { appliedJobFilters } from "@/utils/filters";
import {  Closed } from "@/utils/job";
import ClosedJob from "@/components/ManageJobs/Closed";
import ManageJobs from "@/components/ManageJobs/Job";

export default function ClosedJobs() {
  return (
    <div>
      <ManageJobs
        title={"No closed jobs at the moment."}
        desc={"Jobs that were closed without proceeding will show up here. Keep applying for more opportunities!"}
        imageSrc={"/closed.png"}
        filters={appliedJobFilters}
        jobs={Closed}
        JobStatus={ClosedJob}
        jobType={"closed"}
        pageDetails={"Review jobs that are no longer open. Understand why they were closed and learn from past opportunities."}
      />
    </div>
  );
}
