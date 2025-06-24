"use client";
import { appliedJobFilters } from "@/utils/filters";
import { Applications } from "@/utils/job";
import AppliedJob from "@/components/ManageJobs/Applied";
import ManageJobs from "@/components/ManageJobs/Job";

export default function AppliedJobs() {
  return (
    <div>
      <ManageJobs
        title={"You haven't applied for any job yets"}
        desc={
          "Browse available jobs and start applying to secure your next gig."
        }
        imageSrc={"/applied.png"}
        filters={appliedJobFilters}
        jobs={Applications}
        JobStatus={AppliedJob}
        jobType={"applied"}
        pageDetails={"Keep track of the jobs you’ve applied for. Monitor responses and follow up on your applications with ease."}
      />
    </div>
  );
}
