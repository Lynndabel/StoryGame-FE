"use client";

import { getGigContract } from "@/constants/contracts";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { readOnlyProvider } from "@/constants/providers";
import { toast } from "sonner";

const useGetClientGigCount = () => {
  const { address, isConnected } = useAccount();
  const [gigCount, setGigCount] = useState<number | null>(null);

  const fetchGigCount = useCallback(async () => {
    if (!address) return;

    try {
      const contract = getGigContract(readOnlyProvider);
      const count = await contract.getClientGigCount(address);
      setGigCount(count);
    } catch (error) {
      toast.error("Error checking gig count for client");
      console.error("Error checking gig count:", error);
      setGigCount(null);
    }
  }, [address]);

  useEffect(() => {
    fetchGigCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return gigCount;
};

export default useGetClientGigCount;