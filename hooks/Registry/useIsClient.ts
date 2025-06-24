"use client";

import { getRegistryContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/providers";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useLoading } from "../useLoading";

const useIsClient = () => {
  const { address, isConnected } = useAccount();
  const [isClient, setIsClient] = useState<boolean | null>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const checkIsClient = useCallback(async () => {
    if (!address) return;

    startLoading();
    try {
      const contract = getRegistryContract(readOnlyProvider);
      const resp = await contract.isClient(address);
      setIsClient(resp);
    } catch (error) {
      const typedError = error as { code?: string; message?: string };
      if (typedError.code === "BAD_DATA" || typedError.message?.includes("could not decode result data")) {
        setIsClient(false);
      } else {
        toast.error("Error checking user role");
        console.error("Error checking if user is client:", error);
        setIsClient(null);
      }
    } finally {
      stopLoading();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    checkIsClient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return { isClient, isLoading };
};

export default useIsClient;