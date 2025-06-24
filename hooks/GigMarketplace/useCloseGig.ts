"use client";

import { useCallback } from "react";
import { getProvider } from "@/constants/providers";
import { isSupportedChain } from "@/constants/chain";
import { getGigContract } from "@/constants/contracts";
import { toast } from "sonner";
import { useChainId, useAccount } from "wagmi";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";
import { useRouter } from "next/navigation";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useCloseGig = () => {
    const chainId = useChainId();
    const { isConnected } = useAccount();
    const { walletProvider } = useAppKitProvider<Provider>('eip155');
    const router = useRouter();

    return useCallback(
        async (databaseId: string) => {
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
            const contract = getGigContract(signer);

            try {
                const gasEstimate = await contract.closeGig.estimateGas(databaseId);
                const txn = await contract.closeGig(
                    databaseId,
                    { gasLimit: gasEstimate }
                );
                
                toast.message("Please wait while we process your transaction.");
                const receipt = await txn.wait();

                if (!receipt.status) {
                    throw new Error("Transaction failed");
                }

                toast.success("Gig closed successfully and he funds have been refunded.");
                router.push("/manage-jobs/clients");
            } catch (error) {
                const err = error as ErrorWithReason;
                let errorMessage = "An error occurred while closing the gig.";
                
                if (err.reason === "Not gig owner") {
                    errorMessage = "You are not the owner of this gig.";
                } else if (err.reason === "Cannot close active gig") {
                    errorMessage = "You cannot close an active gig.";
                } else if (err.reason === "Gig already Completed || Closed") {
                    errorMessage = "This gig has already been completed or closed.";
                } else if (err.reason === "Invalid gig ID") {
                    errorMessage = "This gig is invalid or does not exist.";
                }
                
                toast.error(errorMessage);
                console.error("Close gig error:", error);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId, isConnected]
    );
};

export default useCloseGig;
