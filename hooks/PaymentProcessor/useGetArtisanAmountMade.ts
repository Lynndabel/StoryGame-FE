"use client";

import { getPaymentProcessorContract } from "@/constants/contracts";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { readOnlyProvider } from "@/constants/providers";
import { toast } from "sonner";
import { formatUnits } from "ethers";

const useGetArtisanAmountMade = () => {
  const { address, isConnected } = useAccount();
  const [amountMade, setAmountMade] = useState<number | null>(null);

  const checkAmountMade = useCallback(async () => {
    if (!address) return;

    try {
      const contract = getPaymentProcessorContract(readOnlyProvider);
      const resp = await contract.getArtisanAmountMade(address);
      const formattedAmount = formatUnits(resp, 6)
      setAmountMade(parseFloat(formattedAmount));
    } catch (error) {
      toast.error("Error checking amount made by artisan");
      console.error("Error checking amount made:", error);
      setAmountMade(null);
    }
  }, [address]);

  useEffect(() => {
    checkAmountMade();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return amountMade;
};

export default useGetArtisanAmountMade;