"use client";

import { getGigContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/providers";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useLoading } from "../useLoading";

const useGetClientCreatedGigs = () => {
    const { address, isConnected } = useAccount();
    const [createdGigs, setCreatedGigs] = useState<string[] | null>(null);
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [error, setError] = useState<string | null>(null);

  const fetchClientCreatedGigs = useCallback(async () => {
    if (!address) {
        toast.error("Wallet not connected");
        return;
    }

    startLoading();
    setError(null);

    try {
      const contract = getGigContract(readOnlyProvider);
      const response = await contract.getClientCreatedGigs(address);
      setCreatedGigs(response);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message.includes("Invalid gig ID")
        ? "No gigs found for this client"
        : "Failed to fetch client created gigs";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching gigs:", error);
      setCreatedGigs(null);
    } finally {
      stopLoading();
    }
  }, [address, startLoading, stopLoading]);

  useEffect(() => {
    fetchClientCreatedGigs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return { createdGigs, isLoading, error };
};

export default useGetClientCreatedGigs;