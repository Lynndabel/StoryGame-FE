"use client";

import { useCallback, useState } from "react";
import { useAccount, useChainId, useSignMessage } from "wagmi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isSupportedChain } from "@/constants/chain";
import { useLoading } from "../useLoading";

export const useRegisterClient = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const RELAYER_URL = process.env.RELAYER_URL;
  const [error, setError] = useState<string | null>(null);

  const registerAsClient = useCallback(
    async (ipfsUrl: string) => {
      if (!isConnected || !address) {
        toast.warning("Please connect your wallet first.");
        return false;
      }
      if (!isSupportedChain(chainId)) {
        toast.warning("Unsupported network. Please switch to the correct network.");
        return false;
      }
      if (!ipfsUrl) {
        toast.error("IPFS hash is required");
        return false;
      }

      startLoading();
      try {
        const functionName = "registerAsClient";
        const params = { ipfsUrl };
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
        if (!result.success) {
          setError(result.message);
          return false;
        }
        return true;
      } catch (error: unknown) {
        if ((error as Error).message.includes("User rejected")) {
          toast.info("Signature request cancelled");
        } else {
          toast.error("Error during client registration");
          console.error(error);
        }
        return false;
      } finally {
        stopLoading();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, isConnected, chainId, signMessageAsync, router]
  );

  return { registerAsClient, isLoading, error };
};