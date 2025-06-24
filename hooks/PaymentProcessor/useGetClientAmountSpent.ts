"use client";

import { getPaymentProcessorContract } from "@/constants/contracts";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { readOnlyProvider } from "@/constants/providers";
import { toast } from "sonner";
import { formatUnits } from "ethers";

const useGetClientAmountSpent = () => {
  const { address, isConnected } = useAccount();
  const [amountSpent, setAmountSpent] = useState<number | null>(null);

  const checkAmountSpent = useCallback(async () => {
    if (!address) return;

    try {
      const contract = getPaymentProcessorContract(readOnlyProvider);
      const resp = await contract.getClientAmountSpent(address);
      const formattedAmount = formatUnits(resp, 6);
      setAmountSpent(parseFloat(formattedAmount));
    } catch (error) {
      toast.error("Error checking amount spent by client");
      console.error("Error checking amount spent:", error);
      setAmountSpent(null);
    }
  }, [address]);

  useEffect(() => {
    checkAmountSpent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return amountSpent;
};

export default useGetClientAmountSpent;