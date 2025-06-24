"use client";

import { useCallback } from "react";
import { getProvider } from "@/constants/providers";
import { isSupportedChain } from "@/constants/chain";
import { getRegistryContract } from "@/constants/contracts";
import { toast } from "sonner";
import { useStoreIPFS } from "@/utils/store";
import { useChainId, useAccount } from "wagmi";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";
import { useRouter } from "next/navigation";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useRegisterClient = () => {
    const chainId = useChainId();
    const { isConnected } = useAccount();
    const { walletProvider } = useAppKitProvider<Provider>('eip155');
    const { ipfsUrl } = useStoreIPFS();
    const router = useRouter();

    return useCallback(
        async () => {
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
            const contract = getRegistryContract(signer);

            try {
                const estimateGas = await contract.registerAsClient.estimateGas(ipfsUrl);
                const txn = await contract.registerAsClient(ipfsUrl, { gasLimit: estimateGas });
                
                toast.message("Please wait while we process your transaction.");
                const receipt = await txn.wait();

                if (!receipt.status) {
                    throw new Error("Transaction failed");
                }
                toast.success("Account created");
                router.push("/role/clients/claim-token");
            } catch (error) {
                const err = error as ErrorWithReason;
                const errorMessage = err.reason === "User already registered" ? "You are already registered as an client." : "An error occurred while registering.";
                toast.error(errorMessage);
                console.error("Registration error:", error);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId, isConnected, walletProvider]
    );
};

export default useRegisterClient;