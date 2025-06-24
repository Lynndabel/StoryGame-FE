"use client";
import { FC } from "react";
import useApplyForGig from "@/hooks/GigMarketplace/useApplyForGig";

const Apply: FC<{
  onCancel?: () => void;
  databaseId?: string;
}> = ({onCancel, databaseId}) => {
  const applyForGig = useApplyForGig();

  const handleApply = async () => {
    applyForGig(databaseId!);
  };

  return (
    <div className="p-8 grid gap-y-2">
      <div className="py-2 border-b border-[#FCFBF726]">
        <h1 className="border-b-2 border-yellow py-2 text-[#FCFBF7] w-fit font-bold">READY TO APPLY</h1>
      </div>
      <span>
        Before you apply, make sure you’ve reviewed the job details carefully.
        This step confirms your interest and readiness to take on this project.
        The client will review your profile and decide if you’re the right fit.
      </span>
      <span className="py-2">Are you sure you want to proceed?</span>
      <div className="flex justify-between">
        <button onClick={onCancel} className="bg-[#262208] rounded-md text-[#FCF8E3] py-2 px-4">Cancel</button>
        <button onClick={handleApply} className="bg-yellow rounded-md font-bold text-[#1A1203] py-2 px-4">Yes, Apply For Job</button>
      </div>
    </div>
  );
};
export default Apply;
