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

const useUpdateGigInfo = () => {
    const chainId = useChainId();
    const { isConnected } = useAccount();
    const { walletProvider } = useAppKitProvider<Provider>('eip155');
    const router = useRouter();

    return useCallback(
        async (databaseId: string, newRootHash: string) => {
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
                const gasEstimate = await contract.updateGigInfo.estimateGas(databaseId, newRootHash);
                const txn = await contract.updateGigInfo(
                    databaseId, 
                    newRootHash, 
                    { gasLimit: gasEstimate }
                );
                
                toast.message("Please wait while we process your transaction.");
                const receipt = await txn.wait();

                if (!receipt.status) {
                    throw new Error("Transaction failed");
                }

                toast.success("Gig information updated successfully");
                router.push("/manage-jobs/clients");
            } catch (error) {
                const err = error as ErrorWithReason;
                const errorMessage = err.reason === "Not gig owner" 
                    ? "You are not the owner of this gig." 
                    : err.reason === "Gig finished"
                    ? "This gig is already completed or closed."
                    : "An error occurred while updating the gig information.";
                toast.error(errorMessage);
                console.error("Gig update error:", error);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId, isConnected]
    );
};

export default useUpdateGigInfo;