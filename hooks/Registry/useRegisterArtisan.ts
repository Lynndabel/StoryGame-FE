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
  code?: number;
};

const useRegisterArtisan = () => {
    const chainId = useChainId();
    const { isConnected } = useAccount();
    const { walletProvider } = useAppKitProvider<Provider>('eip155');
    const { ipfsUrl } = useStoreIPFS();
    const router = useRouter();

    return useCallback(
        async () => {
            if (!isConnected) {
                toast.warning("Please connect your wallet first.");
                return false;
            }
            if (!isSupportedChain(chainId)) {
                toast.warning("Unsupported network. Please switch to the correct network.");
                return false;
            }

            if (!walletProvider) {
                toast.error("Wallet provider is not available. Please try reconnecting your wallet.");
                return false;
            }

            if (!ipfsUrl) {
                toast.error("IPFS URL is not available. Please upload your data first.");
                return false;
            }

            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();
            const contract = getRegistryContract(signer);

            try {
                const estimateGas = await contract.registerAsArtisan.estimateGas(ipfsUrl);
                const txn = await contract.registerAsArtisan(ipfsUrl, { gasLimit: estimateGas });
                
                toast.message("Please wait while we process your transaction.");
                const receipt = await txn.wait();

                if (!receipt.status) {
                    throw new Error("Transaction failed");
                }
                toast.success("Account created");
                router.push("/role/artisans/onboarding/category");
                return true;
            } catch (error) {
                const err = error as ErrorWithReason;
                let errorMessage = "An error occurred while registering.";
                if (err.code === 4001 || err.message?.includes("user denied")) {
                errorMessage = "Transaction rejected by user.";
                } else if (err.reason === "User already registered") {
                errorMessage = "You are already registered as an artisan.";
                }
                toast.error(errorMessage);
                console.error("Registration error:", error);
                return false;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chainId, isConnected, walletProvider]
    );
};

export default useRegisterArtisan;