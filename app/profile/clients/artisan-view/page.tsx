"use client";
import ProfileHeader from "@/components/Profile/Header";
import Footer from "@/components/LandingPage/Footer";
import { usePathname } from "next/navigation";
import { Abdul, jobs } from "@/utils/job";
import CompletedProjects from "@/components/Profile/ViewCompletedProject";
import AccountCard from "@/components/Profile/ClientAccCard";

export default function ArtisanView() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <div className="fixed z-50 backdrop-blur-3xl bg-opacity-100 h-[75px] ">
        <ProfileHeader isActive={isActive} />
      </div>
      <div className="pt-24 px-4  flex flex-col gap-y-4 md:gap-y-8 md:px-16 2xl:px-32">
        <AccountCard client={Abdul}/>
        <CompletedProjects projects={jobs} />
        <Footer />
      </div>
    </div>
  );
}
