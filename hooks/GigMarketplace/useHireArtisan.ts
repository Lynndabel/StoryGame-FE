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

const useHireArtisan = () => {
    const chainId = useChainId();
    const { isConnected } = useAccount();
    const { walletProvider } = useAppKitProvider<Provider>('eip155');
    const router = useRouter();

    return useCallback(
        async (databaseId: string, artisanAddress: string) => {
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
                const gasEstimate = await contract.hireArtisan.estimateGas(databaseId, artisanAddress);
                const txn = await contract.hireArtisan(
                    databaseId, 
                    artisanAddress, 
                    { gasLimit: gasEstimate }
                );
                
                toast.message("Please wait while we process your transaction.");
                const receipt = await txn.wait();

                if (!receipt.status) {
                    throw new Error("Transaction failed");
                }

                toast.success("Artisan hired successfully");
                router.push("/manage-jobs/clients/active");
            } catch (error) {
                const err = error as ErrorWithReason;
                let errorMessage = "An error occurred while hiring the artisan.";
                
                if (err.reason === "Not gig owner") {
                    errorMessage = "You don't own this gig.";
                } else if (err.reason === "Artisan already hired") {
                    errorMessage = "You have already hired an artisan for this gig.";
                } else if (err.reason === "Gig is closed") {
                    errorMessage = "This gig is already closed.";
                } else if (err.reason === "Not an applicant") {
                    errorMessage = "This artisan has not applied for the gig.";
                } else if (err.reason === "Invalid gig ID") {
                    errorMessage = "The gig ID is invalid.";
                }
                
                toast.error(errorMessage);
                console.error("Hire artisan error:", error);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId, isConnected]
    );
};

export default useHireArtisan;
