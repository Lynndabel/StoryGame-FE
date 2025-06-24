"use client";

import { useCallback } from "react";
import { getProvider } from "@/constants/providers";
import { isSupportedChain } from "@/constants/chain";
import { getGigContract } from "@/constants/contracts";
import { toast } from "sonner";
import { useChainId, useAccount } from "wagmi";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";
import { useRouter } from "next/navigation";
import useApproveTransaction from "../Token/useApproveTransaction";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useCreateGig = () => {
    const chainId = useChainId();
    const { isConnected } = useAccount();
    const { walletProvider } = useAppKitProvider<Provider>('eip155');
    const router = useRouter();
    const approveTransaction = useApproveTransaction();

    return useCallback(
        async (formattedRoot: string, formattedDatabaseId: string, amount: number) => {
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
                await approveTransaction(amount);

                const gasEstimate = await contract.createGig.estimateGas(formattedRoot, formattedDatabaseId, amount);
                const txn = await contract.createGig(
                    formattedRoot,
                    formattedDatabaseId,
                    amount,
                    {
                        gasLimit: gasEstimate,
                    }
                );

                toast.message("Please wait while we process your transaction.");
                const receipt = await txn.wait();

                if (!receipt.status) {
                    throw new Error("Transaction failed");
                }

                toast.success("Gig created successfully");
                router.push("/manage-jobs/clients");
            } catch (error) {
                const err = error as ErrorWithReason;
                const errorMessage = err.reason === "Not a client" ? "You are not registered as a client." : "An error occurred while creating the gig.";
                toast.error(errorMessage);
                console.error("Gig creation error:", error);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId, isConnected]
    );
};

export default useCreateGig;