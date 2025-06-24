"use client";

import { getRegistryContract } from "@/constants/contracts";
import { useAccount } from "wagmi";
import { readOnlyProvider } from "@/constants/providers";
import { useEffect, useState, useCallback } from "react";
import IPFS from "@/hooks/useIPFS";
import { toast } from "sonner";
import useIsArtisan from "./useIsArtisan";

const useGetArtisanDetails = () => {
  const isArtisan = useIsArtisan();
  const { fetchFromIPFS } = IPFS();
  const { address, isConnected } = useAccount();
  const [artisanDetails, setArtisanDetails] = useState<{
    username: string;
    location: string;
  } | null>(null);

  const fetchArtisanDetails = useCallback(async () => {
    if (!address || isArtisan === null || artisanDetails) return;

    try {
      if (!isArtisan) {
        toast.error("Please create an artisan account");
        return;
      }

      const contract = getRegistryContract(readOnlyProvider);
      const details = await contract.getArtisanDetails(address);
      const ipfsHash = details[0];

      if (ipfsHash) {
        const fetchedDetail = await fetchFromIPFS(ipfsHash);
        setArtisanDetails(JSON.parse(fetchedDetail));
      }
    } catch (error) {
      toast.error("Error fetching artisan details");
      console.error("Error:", error);
      setArtisanDetails(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isArtisan, fetchFromIPFS]);

  useEffect(() => {
    fetchArtisanDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return artisanDetails;
};

export default useGetArtisanDetails;