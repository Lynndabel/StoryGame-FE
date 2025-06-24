"use client";

import { getCraftCoinContract } from "@/constants/contracts";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { readOnlyProvider } from "@/constants/providers";
import { useLoading } from "../useLoading";

const useCanMintCraftCoin = () => {
  const { address, isConnected } = useAccount();
  const [canMint, setCanMint] = useState(false);
  const [nextMintTime, setNextMintTime] = useState<number | null>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const checkMintEligibility = useCallback(async () => {
    if (!address) {
        setCanMint(false);
        setNextMintTime(null);
        return;
    };

    startLoading();

    try {
      const contract = getCraftCoinContract(readOnlyProvider);
      const nextTime = await contract.nextMintTime(address);
      const nextTimeNumber = Number(nextTime);
      setNextMintTime(nextTimeNumber);

      const currentTime = Math.floor(Date.now() / 1000);
      setCanMint(currentTime >= nextTimeNumber);
    } catch (error) {
      console.error("Error checking mint eligibility:", error);
      setCanMint(false);
      setNextMintTime(null);
    } finally {
      stopLoading();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    checkMintEligibility();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return { canMint, nextMintTime, isLoading };
};

export default useCanMintCraftCoin;