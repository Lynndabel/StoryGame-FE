"use client";

import { useCallback } from "react";
import { useAccount, useChainId, useSignMessage, useSignTypedData } from "wagmi";
import { toast } from "sonner";
import { ethers, formatEther } from "ethers";
import { useRouter } from "next/navigation";
import { getProvider } from "@/constants/providers";
import { getCraftCoinContract, getGigContract } from "@/constants/contracts";
import { isSupportedChain } from "@/constants/chain";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";
import { Address } from "viem";
import { useLoading } from "../useLoading";

const useApplyForGig = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { signTypedDataAsync } = useSignTypedData();
  const { signMessageAsync } = useSignMessage();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const RELAYER_URL = process.env.RELAYER_URL;

  const applyForGig = useCallback(
    async (databaseId: string) => {
      if (!isConnected || !address) {
        toast.warning("Please connect your wallet first.");
        return false;
      }
      if (!isSupportedChain(chainId)) {
        toast.warning("Unsupported network. Please switch to the correct network.");
        return false;
      }

      startLoading();
      try {
        const provider = getProvider(walletProvider);

        // Fetch required CFT for the gig
        const gigContract = getGigContract(provider);
        const requiredCFT = await gigContract.getRequiredCFT(databaseId);
        const formattedCFT = Number(formatEther(requiredCFT));

        // Fetch user's CFT balance
        const craftCoinContract = getCraftCoinContract(provider);
        const cftResp = await craftCoinContract.balanceOf(address);
        const cftBalance = Number(formatEther(cftResp));

        console.log("Required CFT for gig:", requiredCFT);
        console.log("formatted CFT for gig:", formattedCFT.toString());
        console.log("User CFT balance:", cftBalance);
        if (cftBalance < formattedCFT) {
          toast.error("Insufficient CFT balance to apply for this gig.");
          return;
        }

        // Fetch user's info from CraftCoin contract
        const nonce = await craftCoinContract.nonces(address);
        const name = await craftCoinContract.name();
        const version = await craftCoinContract.version?.() ?? "1";

        // Set deadline (1 hour from now)
        const deadline = Math.floor(Date.now() / 1000) + 3600;

        // Prepare permit message for CraftCoin
        const domain = {
          name: name,
          version: version,
          chainId: chainId,
          verifyingContract: process.env.CRAFT_COIN as Address,
        };

        const types = {
          Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        };

        const permitMessage = {
          owner: address,
          spender: process.env.GIG_MARKET_PLACE,
          value: requiredCFT.toString(),
          nonce: nonce.toString(),
          deadline: deadline.toString(),
        };

        // Sign permit message
        const permitSignature = await signTypedDataAsync({
          domain,
          types,
          primaryType: "Permit",
          message: permitMessage,
        });

        // Split permit signature into v, r, s
        const signature = ethers.Signature.from(permitSignature);
        const { v, r, s } = signature;

        // Prepare params for the gasless transaction
        const params = {
          databaseId,
          deadline: deadline.toString(),
          v,
          r,
          s,
        };

        // Prepare gasless transaction message
        const functionName = "applyForGig";
        const gaslessMessage = JSON.stringify({ functionName, user: address, params });

        // Sign the gasless transaction message
        const gaslessSignature = await signMessageAsync({ message: gaslessMessage });

        // Send request to the relayer backend
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
          toast.success("Application Submitted");
          router.push("/manage-jobs/artisans");
        } else {
          toast.error(`Error: ${result.message}`);
        }

        return true;
      } catch (error: unknown) {
        if ((error as Error).message.includes("User rejected")) {
          toast.info("Signature request cancelled");
        } else {
          toast.error("Error during application");
          console.error(error);
        }

        return false;
      } finally {
        stopLoading();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, isConnected, chainId, signTypedDataAsync, signMessageAsync, walletProvider, router]
  );

  return { applyForGig, isLoading };
};

export default useApplyForGig;