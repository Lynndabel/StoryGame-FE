"use client";

import { useCallback } from "react";
import { useAccount, useChainId, useSignMessage } from "wagmi";
import { toast } from "sonner";
import { isSupportedChain } from "@/constants/chain";
import { ethers } from "ethers";
import { useLoading } from "../useLoading";

export const useHireArtisan = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const RELAYER_URL = process.env.RELAYER_URL;

  const hireArtisan = useCallback(
    async (databaseId: string, artisanAddress: string) => {
      if (!isConnected || !address) {
        toast.warning("Please connect your wallet first.");
        return;
      }
      if (!isSupportedChain(chainId)) {
        toast.warning("Unsupported network. Please switch to the correct network.");
        return;
      }
      if (!databaseId || !ethers.isAddress(artisanAddress)) {
        toast.error("Invalid gig ID or artisan address");
        return;
      }

      startLoading();
      try {
        const functionName = "hireArtisan";
        const params = { databaseId, artisanAddress };
        const gaslessMessage = JSON.stringify({ functionName, user: address, params });
        const gaslessSignature = await signMessageAsync({ message: gaslessMessage });

        if (!RELAYER_URL) {
          throw new Error("Relayer URL is not defined");
        }
        const response = await fetch(`${RELAYER_URL}/gasless-transaction`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            functionName,
            user: address,
            params,
            signature: gaslessSignature,
          }),
        });

        const result = await response.json();
        if (result.success) {
          toast.success("Artisan hired successfully");
        } else {
          toast.error(`Error: ${result.message}`);
        }
      } catch (error: unknown) {
        if ((error as Error).message.includes("User rejected")) {
          toast.info("Signature request cancelled");
        } else {
          toast.error("Error during hiring artisan");
          console.error(error);
        }
      } finally {
        stopLoading();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, isConnected, chainId, signMessageAsync]
  );

  return { hireArtisan, isLoading };
};