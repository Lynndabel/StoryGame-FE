"use client";
import AccountCard from "@/components/Profile/AccountCard";
import ProfileHeader from "@/components/Profile/Header";
import PreviewAbout from "@/components/Profile/PeviewAbout";
import PreviewSkills from "@/components/Profile/PreviewSkills";
import { dummyProfile } from "@/utils/profile";
import { usePathname } from "next/navigation";
import Footer from "@/components/LandingPage/Footer";
import PreviewPortfolio from "@/components/Profile/PreviewPortfolio";
import Works from "@/components/Profile/WorkHistory";
import PreviewReview from "@/components/Profile/PreviewReview";

export default function ClientProfileView() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <div className="fixed z-50 backdrop-blur-3xl bg-opacity-100 h-[75px] ">
        <ProfileHeader isActive={isActive} />
      </div>
      <div className="pt-32 px-4  flex flex-col gap-y-4 md:gap-y-8 md:px-8 xl:px-16 2xl:px-32">
        <AccountCard artisan={dummyProfile} />
        <div className="grid lg:grid-cols-2  gap-4">
          <PreviewAbout about={dummyProfile.about} />{" "}
          <PreviewSkills skills={dummyProfile.skills} />
        </div>
        <PreviewPortfolio portfolio={dummyProfile.portfolio} />
        <div className="grid lg:grid-cols-2  gap-4">
          <Works works={dummyProfile.works} />
          <PreviewReview reviews={dummyProfile.reviews} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
