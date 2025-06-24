"use client";
import ProfileHeader from "@/components/Profile/Header";
import Footer from "@/components/LandingPage/Footer";
import About from "@/components/Profile/About";
import Portfolio from "@/components/Profile/Portfolio";
import Review from "@/components/Profile/Review";
import Settings from "@/components/Profile/Settings";
import ProfileCard from "@/components/Profile/ProfileCard";
import EarningsDisplay from "@/components/Profile/TokenBalance";
import type { ArtisanProfileProps } from "@/utils/profile"
import { transformBackendProfileData } from "@/utils/transformBackendProfileData"
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import useGetArtisanDetails from "@/hooks/Registry/useGetArtisanDetails";
import axios from "@/app/API/axios";
import { toast } from "sonner";
import useGetTokenBalance from "@/hooks/Token/useGetTokenBalance";
import useGetCraftCoinBalance from "@/hooks/CraftCoin/useGetCraftCoinBalance";
import useGetArtisanAmountMade from "@/hooks/PaymentProcessor/useGetArtisanAmountMade";
import { useMint } from "@/hooks/Gasless/useMint";
import useCanMintCraftCoin from "@/hooks/CraftCoin/useCanMintCraftCoin";

export default function Profile() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const { address } = useAccount()
  const detail = useGetArtisanDetails()
  const [profile, setProfile] = useState<ArtisanProfileProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const tokenBalance = useGetTokenBalance();
  const craftCoinBalance = useGetCraftCoinBalance();
  const checkAmountMade = useGetArtisanAmountMade();
  const { mint } = useMint();
  const { canMint, nextMintTime, isLoading: mintLoading } = useCanMintCraftCoin();

  useEffect(() => {
    const fetchArtisanProfile = async () => {
      if (!address) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(`/api/artisans/${address}`);
        const artisanData = response.data.artisan;

        if (detail) {
          const transformedProfile = transformBackendProfileData(artisanData, detail, address);
          setProfile(transformedProfile);
        }
      } catch (err) {
        console.error("Error fetching artisan profile:", err)
        setError("Failed to load artisan profile.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtisanProfile()
  }, [address, detail])

  if (isLoading || mintLoading || !profile) {
    return <Loading show={false} />
  }

  if (error) {
    return <div>{error}</div>
  }

  const handleClaimCraftcoin = async () => {
    if (!canMint) {
      if (nextMintTime) {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = nextMintTime - currentTime;
        const daysRemaining = Math.ceil(timeRemaining / (60 * 60 * 24));
        toast.info(`Please wait ${daysRemaining} day${daysRemaining > 1 ? "s" : ""} until next mint time.`);
      } else {
        toast.error("Unable to determine next mint time. Please try again later.");
      }
      return;
    }
    await mint();
  };

  const handleBuyCraftcoin = () => {
    // Here you would typically redirect to a purchase page or open a modal
    toast.info("To be implemented soon...");
    console.log("Buying Craftcoin...");
  };

  return (
    <div>
      <div className="fixed z-50 backdrop-blur-3xl bg-opacity-100 h-[75px] w-full">
        <ProfileHeader isActive={isActive} />
      </div>
      <div className="pt-24 px-4 flex flex-col gap-y-4  md:px-16 2xl:px-32">
        <div className="w-fit pt-8">
          <h1 className="font-bold text-xl">PROFILE</h1>
          <p className="border-b-2 border-yellow w-[80%]"></p>
        </div>

        {/* New Profile Header Section */}
        <div className="grid lg:grid-cols-3 gap-2">
          <div className="lg:col-span-2 h-full">
            <ProfileCard profile={profile} />
          </div>
          <div className="lg:col-span-1 h-full">
            <EarningsDisplay
              availableAmount={tokenBalance ?? 404}
              totalEarned={checkAmountMade ?? 404}
              craftcoinBalance={craftCoinBalance ?? 404}
              onClaimCraftcoin={handleClaimCraftcoin}
              onBuyCraftcoin={handleBuyCraftcoin}
            />
          </div>
        </div>

        <About profile={profile}/>

        <Portfolio portfolio={profile.portfolio} />
        {profile.reviews && <Review reviews={profile.reviews} />}
        <Settings />
        <Footer />
      </div>
    </div>
  );
}
