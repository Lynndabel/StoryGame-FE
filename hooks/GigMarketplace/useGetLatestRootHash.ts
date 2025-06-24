"use client";

import { getGigContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/providers";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

const useGetLatestRootHash = () => {
  const [rootHash, setRootHash] = useState<string | null>(null);

  const fetchLatestRootHash = useCallback(async () => {
    if (rootHash) return;

    try {
      const contract = getGigContract(readOnlyProvider);
      const hash = await contract.getLatestRootHash();
      setRootHash(hash);
    } catch (error) {
      toast.error("Error fetching latest root hash");
      console.error("Error fetching latest root hash:", error);
      setRootHash(null);
    }
  }, [rootHash]);

  useEffect(() => {
    fetchLatestRootHash();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rootHash;
};

export default useGetLatestRootHash;