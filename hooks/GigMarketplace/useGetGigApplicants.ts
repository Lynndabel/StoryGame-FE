"use client";

import { getGigContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/providers";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useLoading } from "../useLoading";

const useGetGigApplicants = () => {
    const { address, isConnected } = useAccount();
    const [gigApplicants, setGigApplicants] = useState<string[] | null>(null);
    const { isLoading, startLoading, stopLoading } = useLoading();

  const fetchGigApplicants = useCallback(async () => {
    if (!address) {
        toast.error("Wallet not connected");
        return;
    }

    startLoading();

    try {
      const contract = getGigContract(readOnlyProvider);
      const response = await contract.getGigApplicants(address);
      setGigApplicants(response);
    } catch (error) {
      toast.error("Error fetching gig applicants");
      console.error("Error fetching gig applicants:", error);
      setGigApplicants(null);
    } finally {
      stopLoading();
    }
  }, [address, startLoading, stopLoading]);

  useEffect(() => {
    fetchGigApplicants();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return { gigApplicants, isLoading };
};

export default useGetGigApplicants;