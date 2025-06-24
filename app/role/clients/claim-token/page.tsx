"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useLoading } from "@/hooks/useLoading";
import useHasClaimed from "@/hooks/Token/useHasClaimed";
import { toast } from "sonner";
import { useClaim } from "@/hooks/Gasless/useClaim";

export default function ClaimToken() {
  const { claim } = useClaim();
  const hasClaimed = useHasClaimed();
  const { isLoading } = useLoading();

  const handleClaim = async () => {
    if (hasClaimed) {
      toast.warning("Token already claimed.");
      return;
    }
    console.log("Claiming token...");
    claim();
  };
  return (
    <Loading show={isLoading}>
      <div className="flex h-[80vh] items-center justify-center">
        <div className="rounded-lg  border border-[#FCFBF726] md:border-0 shadow-lg h-[60vh] bg-[#F2E8CF0A] flex flex-col items-center justify-center w-[90%] md:w-[45vw] ">
          <p className="font-alata text-3xl md:text-[3vw] text-center text-[#F9F1E2] leading-8 md:leading-[3vw]">
            Claim USDT Token!
          </p>
          <span className="text-center text-[#D8D6CF] lg:w-[70%] text-balance md:p-8 p-4 font-merriweather">
            Use this token to test secure payments and experience seamless
            transactions.
          </span>
          <div className="relative h-[40%] w-[50%] p-4">
            <Image
              src="/claim-token.png"
              alt="token"
              fill
              style={{ objectFit: "contain" }}
              className=""
            />
          </div>
          <div className="relative top-4">
            {" "}
            <Button onClick={handleClaim} text={"Claim Token"} />
          </div>
        </div>
      </div>
    </Loading>
  );
}
