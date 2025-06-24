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

const useApplyForGig = () => {
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
                const gasEstimate = await contract.applyForGig.estimateGas(databaseId);
                const txn = await contract.applyForGig(databaseId, { gasLimit: gasEstimate });

                toast.message("Please wait while we process your transaction.");
                const receipt = await txn.wait();

                if (!receipt.status) {
                    throw new Error("Transaction failed");
                }

                toast.success("Application Submitted");
                router.push("/manage-jobs/artisans");
            } catch (error) {
                const err = error as ErrorWithReason;
                let errorText: string;

                if (err?.reason === "Invalid gig ID") {
                    errorText = "The gig ID is invalid";
                }
                else if (err?.reason === "Not registered as an artisan") {
                    errorText = "You must register as an artisan to apply for gigs";
                }
                else if (err?.reason === "Unverified artisan") {
                    errorText = "You must be a verified artisan to apply for gigs";
                }
                else if (err?.reason === "Gig is closed") {
                    errorText = "This gig is closed for applications";
                }
                else if (err?.reason === "Artisan already hired") {
                    errorText = "An artisan has already been hired for this gig";
                }
                else {
                    // console.log(err?.message);
                    
                    errorText ="Trying to resolve error!";
                }

                toast.warning(`Error: ${errorText}`);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId, isConnected]
    );
};

export default useApplyForGig;