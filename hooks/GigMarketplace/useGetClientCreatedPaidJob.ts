"use client";

import { getGigContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/providers";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useLoading } from "../useLoading";
import useGetClientCreatedGigs from "./useGetClientCreatedGigs";

const useGetClientCreatedPaidJobs = () => {
  const { address, isConnected } = useAccount();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { createdGigs, isLoading: gigsLoading, error: gigsError } = useGetClientCreatedGigs();
  const [createdPaidJobs, setCreatedPaidJobs] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClientCreatedPaidJobs = useCallback(async () => {
    if (!address) {
      setCreatedPaidJobs(null);
      setError("Wallet not connected");
      toast.error("Wallet not connected");
      return;
    }

    if (!createdGigs || createdGigs.length === 0) {
      setCreatedPaidJobs([]);
      setError(null);
      return;
    }

    if (gigsError) {
      setCreatedPaidJobs(null);
      setError(gigsError);
      return;
    }

    startLoading();
    setError(null);

    try {
      const contract = getGigContract(readOnlyProvider);
      const createdPaidJobsList: string[] = [];

      for (const databaseId of createdGigs) {
        const gigInfo = await contract.getGigInfo(databaseId);
        if (
          gigInfo[5] || // isCompleted
          gigInfo[1] !== "0x0000000000000000000000000000000000000000" // hiredArtisan != address(0)
        ) {
          createdPaidJobsList.push(databaseId);
        }
      }

      setCreatedPaidJobs(createdPaidJobsList);
    } catch (err: unknown) {
      let errorMessage;
      if ((err as Error).message.includes("User rejected")) {
           errorMessage = "Invalid gig ID provided";
        } else {
          errorMessage = "Failed to fetch client open jobs";
        }
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching paid jobs:", err);
      setCreatedPaidJobs(null);
    } finally {
      stopLoading();
    }
  }, [address, createdGigs, gigsError, startLoading, stopLoading]);

  useEffect(() => {
    if (isConnected && !gigsLoading) {
      fetchClientCreatedPaidJobs();
    } else {
      setCreatedPaidJobs(null);
      setError(null);
    }
  }, [isConnected, gigsLoading, fetchClientCreatedPaidJobs]);

  return { createdPaidJobs, isLoading: isLoading || gigsLoading, error: error || gigsError };
};

export default useGetClientCreatedPaidJobs;