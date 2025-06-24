"use client";

import { getGigContract } from "@/constants/contracts";
import { readOnlyProvider } from "@/constants/providers";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

const useGetGigInfo = (databaseId: string) => {
  const [gigInfo, setGigInfo] = useState<{
    client: string;
    hiredArtisan: string;
    paymentId: number;
    rootHash: string;
    artisanComplete: boolean;
    isCompleted: boolean;
    isClosed: boolean;
  } | null>(null);

  const fetchGigInfo = useCallback(async () => {
    if (!databaseId || gigInfo) return;

    try {
      const contract = getGigContract(readOnlyProvider);
      const gigData = await contract.getGigInfo(databaseId);
      setGigInfo({
        client: gigData[0],
        hiredArtisan: gigData[1],
        paymentId: Number(gigData[2]),
        rootHash: gigData[3],
        artisanComplete: gigData[4],
        isCompleted: gigData[5],
        isClosed: gigData[6],
      });
    } catch (error) {
      toast.error("Error fetching gig information");
      console.error("Error fetching gig info:", error);
      setGigInfo(null);
    }
  }, [databaseId, gigInfo]);

  useEffect(() => {
    fetchGigInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return gigInfo;
};

export default useGetGigInfo;