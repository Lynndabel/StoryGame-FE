"use client";

import { useCallback } from "react";
import { getProvider } from "@/constants/providers";
import { isSupportedChain } from "@/constants/chain";
import { getTokenContract } from "@/constants/contracts";
import { toast } from "sonner";
import { useChainId, useAccount } from "wagmi";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";

const useApproveTransaction = () => {
    const chainId = useChainId();
    const { isConnected, address } = useAccount();
    const { walletProvider } = useAppKitProvider<Provider>('eip155');

    return useCallback(
        async (amount: number) => {
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
            const contract = getTokenContract(signer);

            try {
                const balance = await contract.balanceOf(address);
                if (balance < amount) {
                    toast.error("Insufficient token balance");
                    return;
                }

                const estimateGas = await contract.approve.estimateGas(process.env.PAYMENT_PROCESSOR, amount);
                const txn = await contract.approve(process.env.PAYMENT_PROCESSOR, amount, { gasLimit: estimateGas });
                toast.message("Please wait while we process your transaction.");
                const receipt = await txn.wait();

                if (!receipt.status) {
                    throw new Error("Transaction failed");
                }
                toast.success("Approval successfully given");
            } catch (error) {
                const err = error as Error;
                toast.error(`An error occurred while giving approval: ${err.message}`);
                console.error("Approval error:", error);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId, isConnected, walletProvider, address]
    );
};

export default useApproveTransaction;