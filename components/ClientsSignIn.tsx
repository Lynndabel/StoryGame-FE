"use client";
import Image from "next/image";
import Button from "./Button";
import { toast } from "sonner";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAccount } from "wagmi";
import useIsClient from "@/hooks/Registry/useIsClient";
import { useGetUserRole } from "@/utils/store";
import useHasClaimed from "@/hooks/Token/useHasClaimed";

interface WelcomeProps {
  image: string;
  role: string;
}

const ClientsSignIn = ({ image, role }: WelcomeProps) => {
  const { address, isConnected } = useAccount();
  const { isClient, isLoading: clientCheckLoading } = useIsClient();
  const router = useRouter();
  const { setRole } = useGetUserRole();
  const hasClaimed = useHasClaimed();

  const handleSignIn = () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet to continue.");
      return;
    }

    setRole(role);

    if (hasClaimed) {
      if (isClient) {
        toast.success("Welcome back, client!");
        router.push("/profile/clients");
      } else {
        router.push("/authenticate/register/client");
      }
    } else {
      toast.info("Please claim your test USDT.");
      router.push("/role/clients/claim-token");
    }
  };

  return (
    <Loading show={clientCheckLoading}>
      <div className="flex md:items-center justify-center w-full h-[90vh] gap-y-8 gap-x-4 py-4 md:py-1">
        <div className="hidden md:flex relative h-[90%] md:w-[45%] lg:w-[40w] xl:w-[38vw]">
          <Image
            src={image}
            alt={role}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="rounded-lg  border border-[#FCFBF726] md:border-0 shadow-lg h-[80%] md:h-[90%] bg-[#F2E8CF0A] flex flex-col items-center justify-between w-[90%] md:w-[45vw] gap-y-4 p-4">
          <div></div>
          <div className="flex flex-col justify-end items-center gap-y-4 py-8">
            <p className="font-alata text-3xl px-2 lg:text-[2.5vw] text-center text-[#F9F1E2] leading-8 ">
              Welcome! Great to Have You Here
            </p>

            <span className="text-center text-[#D8D6CF] px-4 lg:px-2 font-merriweather">
             Sign in, find trusted artisans, and get your projects done by skilled hands.
            </span>
            <Button
              onClick={handleSignIn}
              text={"Sign in as Client"}
              style={"font-normal"}
            />
            <div className="flex text-center text-[#F9F1E2] gap-2 relative bottom-[12px] ">
              Not an client?{" "}
              <Link
                href="/role/artisans/signin"
                className="text-yellow font-bold"
              >
                Sign in as Artisan
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center text-center text-sm">
            <span className="text-[#D8D6CF]">
              By Continuing, you agree to CraftLink’s Privacy Policy
            </span>
            <span className="text-[#AEFF00] font-bold text-center">
              Terms and Conditions
            </span>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default ClientsSignIn;
