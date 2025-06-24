"use client";
import { appliedJobFilters } from "@/utils/filters";
import { Actives } from "@/utils/job";
import ActiveJob from "@/components/ManageJobs/Active";
import ManageJobs from "@/components/ManageJobs/Job";

export default function ActiveJobs() {
  return (
    <div>
      <ManageJobs
        title={"You have no active jobs at the moment"}
        desc={"Once a client hires you, your jobs will appear here. Keep an eye on your applications!"}
        imageSrc={"/active.png"}
        filters={appliedJobFilters}
        jobs={Actives}
        JobStatus={ActiveJob}
        jobType={"active"}
        pageDetails={"View the jobs you’re currently working on. Submit updates, chat with clients, and stay on top of deadlines."}
      />
    </div>
  );
}
