"use client";

import { getReviewContract } from "@/constants/contracts";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { readOnlyProvider } from "@/constants/providers";
import { toast } from "sonner";

const useGetArtisanAverageRating = () => {
  const { address, isConnected } = useAccount();
  const [artisanRating, setArtisanRating] = useState<number | null>(null);

  const fetchArtisanRating = useCallback(async () => {
    if (!address) return;

    try {
      const contract = getReviewContract(readOnlyProvider);
      const rating = await contract.getArtisanAverageRating(address);
      setArtisanRating(rating);
    } catch (error) {
      toast.error("Error checking artisan average rating");
      console.error("Error checking artisan rating:", error);
      setArtisanRating(null);
    }
  }, [address]);

  useEffect(() => {
    fetchArtisanRating();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return artisanRating;
};

export default useGetArtisanAverageRating;