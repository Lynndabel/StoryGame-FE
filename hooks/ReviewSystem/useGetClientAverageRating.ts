"use client";

import { getReviewContract } from "@/constants/contracts";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { readOnlyProvider } from "@/constants/providers";
import { toast } from "sonner";

const useGetClientAverageRating = () => {
  const { address, isConnected } = useAccount();
  const [clientRating, setClientRating] = useState<number | null>(null);

  const fetchClientRating = useCallback(async () => {
    if (!address) return;

    try {
      const contract = getReviewContract(readOnlyProvider);
      const rating = await contract.getClientAverageRating(address);
      setClientRating(rating);
    } catch (error) {
      toast.error("Error checking client average rating");
      console.error("Error checking client rating:", error);
      setClientRating(null);
    }
  }, [address]);

  useEffect(() => {
    fetchClientRating();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return clientRating;
};

export default useGetClientAverageRating;