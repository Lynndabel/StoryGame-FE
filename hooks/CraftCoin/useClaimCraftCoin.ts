"use client";

import { useCallback } from "react";
import { getProvider } from "@/constants/providers";
import { isSupportedChain } from "@/constants/chain";
import { getCraftCoinContract } from "@/constants/contracts";
import { toast } from "sonner";
import { useChainId, useAccount } from "wagmi";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";
import { useRouter } from "next/navigation";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useClaimCraftCoin = () => {
    const chainId = useChainId();
    const { isConnected } = useAccount();
    const { walletProvider } = useAppKitProvider<Provider>('eip155');
    const router = useRouter();

    return useCallback(
        async () => {
            if (!walletProvider) {
                toast.error("Wallet provider is not available. Please try reconnecting your wallet.");
                return;
            }

            if (!isConnected) {
                toast.warning("Please connect your wallet first.");
                return;
            }
            if (!isSupportedChain(chainId)) {
                toast.warning("Unsupported network. Please switch to the correct network.");
                return;
            }

            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();
            const contract = getCraftCoinContract(signer);

            try {
                const estimateGas = await contract.mint.estimateGas();
                const tx = await contract.mint({ gasLimit: estimateGas });

                toast.message("Please wait while we process your transaction.");
                const receipt = await tx.wait();

                if (!receipt.status) {
                    throw new Error("Transaction failed");
                }
                toast.success("CraftCoin claimed successfully");
            } catch (error) {
                const err = error as ErrorWithReason;
                const errorMessage = err.reason === "Cannot mint yet" ? "You have wait 30 days from the last claim time to claim again." : "An error occurred while claiming the token.";
                toast.error(errorMessage);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId, isConnected, walletProvider, router]
    );
};

export default useClaimCraftCoin;