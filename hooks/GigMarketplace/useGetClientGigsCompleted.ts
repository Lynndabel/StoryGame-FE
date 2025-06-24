"use client";

import { getGigContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/providers";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useLoading } from "../useLoading";
import useGetClientCreatedGigs from "./useGetClientCreatedGigs";

const useGetClientGigsCompleted = () => {
  const { address, isConnected } = useAccount();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { createdGigs, isLoading: gigsLoading, error: gigsError } = useGetClientCreatedGigs();
  const [clientGigsCompleted, setClientGigsCompleted] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClientCreatedPaidJobs = useCallback(async () => {
    if (!address) {
      setClientGigsCompleted(null);
      setError("Wallet not connected");
      toast.error("Wallet not connected");
      return;
    }

    if (!createdGigs || createdGigs.length === 0) {
      setClientGigsCompleted([]);
      setError(null);
      return;
    }

    if (gigsError) {
      setClientGigsCompleted(null);
      setError(gigsError);
      return;
    }

    startLoading();
    setError(null);

    try {
      const contract = getGigContract(readOnlyProvider);
      const completedJobsList: string[] = [];

      for (const databaseId of createdGigs) {
        const gigInfo = await contract.getGigInfo(databaseId);
        if (gigInfo[5]) // isCompleted
          {
            completedJobsList.push(databaseId);
          }
      }

      setClientGigsCompleted(completedJobsList);
    } catch (err: unknown) {
       let errorMessage;
      if ((err as Error).message.includes("User rejected")) {
           errorMessage = "Invalid gig ID provided";
        } else {
          errorMessage = "Failed to fetch client open jobs";
        }
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching completed jobs:", err);
      setClientGigsCompleted(null);
    } finally {
      stopLoading();
    }
  }, [address, createdGigs, gigsError, startLoading, stopLoading]);

  useEffect(() => {
    if (isConnected && !gigsLoading) {
      fetchClientCreatedPaidJobs();
    } else {
      setClientGigsCompleted(null);
      setError(null);
    }
  }, [isConnected, gigsLoading, fetchClientCreatedPaidJobs]);

  return { clientGigsCompleted, isLoading: isLoading || gigsLoading, error: error || gigsError };
};

export default useGetClientGigsCompleted;