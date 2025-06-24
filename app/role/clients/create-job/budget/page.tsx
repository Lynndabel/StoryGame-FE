// Component
"use client";
import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useGetJobData } from "@/utils/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useAppKitProvider, type Provider } from "@reown/appkit/react";
import { getProvider } from "@/constants/providers";

// Constants
const MINIMUM_AMOUNT = 5;
const CURRENCY = {
  symbol: "USDT",
  icon: "/usdt.png",
};

// Utility functions
const validateAmount = (amount: number): boolean => {
  return !isNaN(amount) && amount >= MINIMUM_AMOUNT;
};

export default function Budget() {
  const minAmount = MINIMUM_AMOUNT;
  // States
  const [walletInfo, setWalletInfo] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Hooks
  const router = useRouter();
  const { setAmount, amount } = useGetJobData();
  const { isConnected } = useAccount();
  const { walletProvider } = useAppKitProvider<Provider>('eip155');

  const displayAmount = amount / 1000000;

  // Effects
  useEffect(() => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
    }
  }, [isConnected]);

  // Handlers
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setHasError(false);

    if (isNaN(value) || value < minAmount) {
      setHasError(true);
      return;
    }

    const convertedAmount = value * 1000000;

    setAmount(convertedAmount);
  };

  const handleNext = async () => {
    try {
      setIsLoading(true);

      if (!isConnected) {
        toast.error("Please connect your wallet first");
        return;
      }

      if (!walletProvider) {
        toast.error("Wallet provider not available. Please try reconnecting your wallet.");
        return;
      }

      if (!validateAmount(amount)) {
        toast.error("Please provide a valid amount > $5");
        return;
      }

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      if (!signer) {
        toast.warning("Wallet not connected");
        router.push("/");
        return;
      }

      // Add any additional validation or blockchain interaction here

      router.push("/role/clients/create-job/preview");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] md:max-h-screen w-screen items-start md:items-center justify-center overflow-y-scroll">
      <div className="flex flex-col text-[#F9F1E2] max-w-[95%] md:w-[60%] lg:w-[40%] p-8 rounded-lg bg-opacity-80 shadow-lg shadow-second relative bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-4">
        <ProgressBar totalSteps={5} currentStep={4} />

        <h2 className="font-alata text-2xl md:text-3xl">Set Your Budget</h2>

        <p className="font-merriweather text-start self-start md:w-[70%]">
          How much are you willing to pay? Set a budget that reflects the value
          of the work.
        </p>

        <div className="flex flex-col self-start md:justify-between w-full md:w-[70%] py-4 gap-8">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2">
              <span className="bg-[#AEFF00] h-4 w-4 rounded-full"></span>
              <p>Set your price:</p>
            </div>

            <div className="md:w-[75%]">
              <span className="text-sm font-bold text-[#FCFBF7]">
                Enter your price here
              </span>

              <div className="flex gap-x-2 items-center">
                <div>
                  <span className="text-xs text-[#FCFBF7]">Currency</span>
                  <div className="w-full flex items-center gap-x-2 bg-[#F2E8CF29] h-[50px] px-4 border rounded-md border-[#FCFBF726] shadow-md shadow-[#333333]">
                    <span className="relative h-8 w-8">
                      <Image
                        src={CURRENCY.icon}
                        alt="token"
                        fill
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </span>
                    <p>{CURRENCY.symbol}</p>
                  </div>
                </div>

                <div className="w-[60%] self-end">
                  <p className="text-xs text-[#FCFBF7]">Amount/Project</p>
                  <input
                    onChange={handleAmountChange}
                    type="number"
                    placeholder="0.00"
                    min={minAmount}
                    step={0.01}
                    className={`w-full font-merriweather bg-[#F2E8CF29] p-[12px] border rounded-md shadow-md shadow-[#333333] placeholder:text-base placeholder:text-[#D8D6CF] focus:outline-[#333333] ${
                      hasError ? "border-red-500" : "border-[#FCFBF726]"
                    }`}
                  />
                  {hasError && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter a valid amount
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {walletInfo && (
            <div className="bg-[#333333] rounded-xl p-8 grid gap-y-4 shadow-md shadow-[#33333340]">
              <div className="flex py-2 justify-between border-b border-[#FCFBF726]">
                <span className="flex gap-x-[3px] text-[#FCFBF7] w-fit font-bold">
                  <h1 className="border-b-2 border-yellow">Ensure Your</h1>
                  <h1>Wallet is Ready</h1>
                </span>
                <IoCloseSharp
                  size={25}
                  color="#E5D1D1"
                  className="cursor-pointer"
                  onClick={() => setWalletInfo(false)}
                />
              </div>
              <span className="text-sm text-[#BFB9AE]">
                To post this job, please ensure you have the required amount of
                [${displayAmount || 0}] in your connected wallet. We will reserve the
                funds once this Job is posted.;
              </span>
            </div>
          )}
        </div>

        <div className="flex font-merriweather w-full">
          <button
            onClick={handleNext}
            disabled={isLoading || hasError || !amount || !isConnected}
            className="flex w-fit py-2 px-4 uppercase bg-yellow rounded-md text-[#1A1203] font-bold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Job Preview"}
          </button>
        </div>
      </div>
    </div>
  );
}
