"use client";

import { getRegistryContract } from "@/constants/contracts"
import { readOnlyProvider } from "@/constants/providers";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useLoading } from "../useLoading";

const useIsArtisan = () => {
  const { address, isConnected } = useAccount();
  const [isArtisan, setIsArtisan] = useState<boolean | null>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const checkIsArtisan = useCallback(async () => {
    if (!address) return;

    startLoading();
    try {
      const contract = getRegistryContract(readOnlyProvider);
      const resp = await contract.isArtisan(address);
      setIsArtisan(resp);
    } catch (error) {
      const typedError = error as { code?: string; message?: string };
      if (typedError.code === "BAD_DATA" || typedError.message?.includes("could not decode result data")) {
        setIsArtisan(false);
      } else {
        toast.error("Error checking user role");
        console.error("Error checking if user is artisan:", error);
        setIsArtisan(null);
      }
    } finally {
      stopLoading();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    checkIsArtisan();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return { isArtisan, isLoading };
};

export default useIsArtisan;