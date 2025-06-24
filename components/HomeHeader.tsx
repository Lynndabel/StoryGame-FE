"use client";
import { useEffect, useState } from 'react';
import Image from "next/image";
import ConnectWallet from "./ConnectWallet";
import SearchBar from "./SearchBar";
import Link from "next/link";
// import { links } from "@/utils/links";
import type { AccountCard } from "@/utils/profile";
import { toast } from "sonner";
import useIsArtisan from '@/hooks/Registry/useIsArtisan';
import useIsClient from '@/hooks/Registry/useIsClient';

// interface Header {
//   isActive: (path: string) => boolean;
// }

const HomeHeader = () => {
  const [userCard, setUserCard] = useState<AccountCard | null>(null);
  const isArtisan = useIsArtisan();
  const isClient = useIsClient();

  // Menu items array
  // const menuItems = [
  //   { href: links.browseJob, label: "Browse Jobs" },
  //   { href: links.applied, label: "Manage Jobs" },
  //   { href: links.message, label: "Messages" },
  //   { href: links.resources, label: "Resources" },
  // ];

  useEffect(() => {
    const determineUserRole = async () => {
      try {
        // Set the user card based on role
        if (isArtisan) {
          setUserCard({
            type: "artisan",
            image: "/profile.png", // You might want to fetch this from IPFS
            profilePage: "/profile/artisans",
          });
        } else if (isClient) {
          setUserCard({
            type: "client",
            image: "/profile.png", // You might want to fetch this from IPFS
            profilePage: "/profile/clients",
          });
        } else {
          setUserCard(null);
        }
      } catch (error) {
        console.error("Error determining user role:", error);
        toast.error("Error loading profile");
        setUserCard(null);
      }
    };

    determineUserRole();
  }, [isArtisan, isClient]);

  return (
    <div className="bg-[#333333] bg-opacity-[98%] bg-header z-10 ">
      <div className="flex w-screen justify-between border-b-[0.5px] border-[#FCFBF726] px-4 lg:px-8 2xl:px-16 items-center py-4 h-32 font-merriweather">
        <Link href="/">
          <div className="flex md:px-2 gap-x-4 items-center font-mooli">
            <Image
              src="/logo.png"
              alt="CraftLink logo"
              width={22}
              height={49}
            />
            <span className="text-[20px] md:text-[28px]">
              Craft{""}
              <span className="bg-[#FFD700] text-[#1A1203] rounded-sm">
                Link
              </span>
            </span>
          </div>
        </Link>

        <SearchBar />
        <div className="flex gap-x-4 items-center ">
          <ConnectWallet />
          {userCard && (
            <div className="relative rounded-full h-12 w-12">
              <Link href={userCard.profilePage}>
                <Image
                  src={userCard.image}
                  alt="Profile pic"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* <div className="border-b-[0.5px] border-[#FCFBF726] flex gap-x-8 text-lg text-[#B5B4AD] shadow-md w-screen py-8 md:px-16">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <p
              className={`${
                isActive(item.href)
                  ? "text-yellow font-bold"
                  : "hover:text-yellow"
              }`}
            >
              {item.label}
            </p>
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default HomeHeader;