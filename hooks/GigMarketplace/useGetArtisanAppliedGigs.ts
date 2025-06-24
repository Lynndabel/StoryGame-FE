"use client";

import { getGigContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/providers";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useLoading } from "../useLoading";

const useGetArtisanAppliedGigs = () => {
    const { address, isConnected } = useAccount();
    const [appliedGigs, setAppliedGigs] = useState<string[] | null>(null);
    const { isLoading, startLoading, stopLoading } = useLoading();

  const fetchClientCreatedGigs = useCallback(async () => {
    if (!address) {
        toast.error("Wallet not connected");
        return;
    }

    startLoading();

    try {
      const contract = getGigContract(readOnlyProvider);
      const response = await contract.getArtisanAppliedGigs(address);
      setAppliedGigs(response);
    } catch (error) {
      toast.error("Error fetching artisan applied gigs");
      console.error("Error fetching applied gigs:", error);
      setAppliedGigs(null);
    } finally {
      stopLoading();
    }
  }, [address, startLoading, stopLoading]);

  useEffect(() => {
    fetchClientCreatedGigs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return { appliedGigs, isLoading };
};

export default useGetArtisanAppliedGigs;