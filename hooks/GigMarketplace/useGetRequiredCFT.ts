"use client";

import { getGigContract } from "@/constants/contracts";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { readOnlyProvider } from "@/constants/providers";
import { toast } from "sonner";
import { useLoading } from "../useLoading";
import { formatEther } from "ethers";

const useGetRequiredCFT = (databaseId: string) => {
  const { address, isConnected } = useAccount();
  const [requiredCFT, setRequiredCFT] = useState<number | null>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const fetchRequiredCFT = useCallback(async () => {
    if (!address) {
        toast.error("Wallet not connected");
        return;
    }

    if (!databaseId) {
      toast.error("Database ID is required");
      return;
    }

    startLoading();

    try {
      const contract = getGigContract(readOnlyProvider);
      const count = await contract.getRequiredCFT(databaseId);
      setRequiredCFT(parseFloat(formatEther(count)));
    } catch (error) {
      toast.error("Error checking required CFT for job");
        console.error("Error checking required CFT:", error);
        setRequiredCFT(null);
    } finally {
      stopLoading();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, databaseId]);

  useEffect(() => {
    fetchRequiredCFT();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return { requiredCFT, isLoading };
};

export default useGetRequiredCFT;