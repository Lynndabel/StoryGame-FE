"use client";
import ProfileHeader from "@/components/Profile/Header";
import Footer from "@/components/LandingPage/Footer";
import Status from "@/components/Profile/Status";
import Settings from "@/components/Profile/Settings";
import ClientProfileCard from "@/components/Profile/ClientProfileCard";
import ClientTokenUsage from "@/components/Profile/ClientTokenUsage";
import { usePathname } from "next/navigation";
import useGetClientDetails from "@/hooks/Registry/useGetClientDetails";
import useGetTokenBalance from "@/hooks/Token/useGetTokenBalance";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Profile() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const { clientData, isLoading: clientLoading, error: clientError } = useGetClientDetails();
  const tokenBalance = useGetTokenBalance();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (clientError) {
      setError(clientError);
    }
  }, [clientError]);

  if (clientLoading || error || !clientData) {
    return <Loading show={true} />;
  }

  const spent = clientData.moneySpent;

  return (
    <div>
      <div className="fixed z-50 backdrop-blur-3xl bg-opacity-100 h-[75px] w-full">
        <ProfileHeader isActive={isActive} />
      </div>
      <div className="pt-24 px-4 flex flex-col gap-y-4 md:px-16 2xl:px-32">
        <div className="w-fit pt-8">
          <h1 className="font-bold text-xl">PROFILE</h1>
          <p className="border-b-2 border-yellow w-[80%]"></p>
        </div>

        <Status
          title="You're All Set!"
          desc="Now that your profile is complete, start posting projects and connecting with top artisans today."
        />

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-full">
            <ClientProfileCard client={clientData} />
          </div>
          <div className="lg:col-span-1 h-full">
            <ClientTokenUsage available={tokenBalance ?? 404} spent={spent}/>
          </div>
        </div>

        <Settings />
        <Footer />
      </div>
    </div>
  );
}
