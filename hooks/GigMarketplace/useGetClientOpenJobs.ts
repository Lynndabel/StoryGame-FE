"use client";

import { getGigContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/providers";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useLoading } from "../useLoading";
import useGetClientCreatedGigs from "./useGetClientCreatedGigs";

const useGetClientOpenJobs = () => {
  const { address, isConnected } = useAccount();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { createdGigs, isLoading: gigsLoading, error: gigsError } = useGetClientCreatedGigs();
  const [openJobs, setOpenJobs] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClientOpenJobs = useCallback(async () => {
    if (!address) {
      setOpenJobs(null);
      setError("Wallet not connected");
      toast.error("Wallet not connected");
      return;
    }

    if (!createdGigs || createdGigs.length === 0) {
      setOpenJobs([]);
      setError(null);
      return;
    }

    if (gigsError) {
      setOpenJobs(null);
      setError(gigsError);
      return;
    }

    startLoading();
    setError(null);

    try {
      const contract = getGigContract(readOnlyProvider);
      const openJobsList: string[] = [];

      for (const databaseId of createdGigs) {
        const gigInfo = await contract.getGigInfo(databaseId);
        if (
          !gigInfo[5] && // !isCompleted
          !gigInfo[6] && // !isClosed
          gigInfo[1] === "0x0000000000000000000000000000000000000000" // hiredArtisan == address(0)
        ) {
          openJobsList.push(databaseId);
        }
      }

      setOpenJobs(openJobsList);
    } catch (err: unknown) {
      let errorMessage;
      if ((err as Error).message.includes("User rejected")) {
           errorMessage = "Invalid gig ID provided";
        } else {
          errorMessage = "Failed to fetch client open jobs";
        }
          setError(errorMessage);
          toast.error(errorMessage);
          console.error("Error fetching open jobs:", err);
          setOpenJobs(null);
    } finally {
      stopLoading();
    }
  }, [address, createdGigs, gigsError, startLoading, stopLoading]);

  useEffect(() => {
    if (isConnected && !gigsLoading) {
      fetchClientOpenJobs();
    } else {
      setOpenJobs(null);
      setError(null);
    }
  }, [isConnected, gigsLoading, fetchClientOpenJobs]);

  return { openJobs, isLoading: isLoading || gigsLoading, error: error || gigsError };
};

export default useGetClientOpenJobs;