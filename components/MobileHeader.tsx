"use client";

import ConnectWallet from "./ConnectWallet";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { links } from "@/utils/links";
import { MdOutlineMenu } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import { userCard } from "@/utils/profile";
import Image from "next/image";

interface Header { 
  toggleFilter: () => void;
  isActive: (path: string) => boolean;
}
const MobileHeader = ({ toggleFilter, isActive }: Header) => {
  const menuItems = [
    { href: links.artisans_profile, label: "Profile" },
    { href: links.browseJob, label: "Browse Jobs" },
    { href: links.applied, label: "Manage Jobs" },
    { href: links.message, label: "Messages" },
    { href: links.resources, label: "Resources" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#333333] bg-opacity-[98%] bg-header z-10 ">
      <div className="flex w-screen justify-between border-b-[0.5px] border-[#FCFBF726] px-4 md:px-16 items-center py-4 h-24   font-merriweather">
        <div className="flex md:hidden">
          <MdOutlineMenu color={"#F9F1E2"} size={32} onClick={toggleMenu} />
        </div>
        <Link href="/">
          <div className="flex md:px-2 gap-x-4 items-center font-mooli">
            <span className="text-[20px] md:text-[28px]">
              Craft{""}
              <span className="bg-[#FFD700] text-[#1A1203] rounded-sm">
                Link{""}
              </span>
            </span>
          </div>
        </Link>

        <div className="flex gap-x-2 items-center ">
          <ConnectWallet />
          {userCard && (
            <div className="relative rounded-full h-8 w-8">
              <Link href={userCard.profilePage}>
                <Image
                  src={userCard.image}
                  alt="Profile pic"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                />{" "}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="border-b-[0.5px] border-[#FCFBF726] flex items-center gap-x-4 md:gap-x-8 text-lg text-[#B5B4AD] shadow-md w-screen py-8 px-4">
        <SearchBar />
        <CiFilter color={"#F9F1E2"} size={32} onClick={toggleFilter} />
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-[#333333] bg-opacity-[98%] bg-header z-30">
          <div className="absolute top-2 right-1 flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-[#FFD700] text-[50px]"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <div className=" mt-8 p-8 grid gap-y-4 text-lg text-[#B5B4AD] w-screen">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <p
                  className={`${
                    isActive(item.href)
                      ? "text-yellow font-bold py-2 border-b border-[#FCFBF726]"
                      : "hover:text-yellow py-2 border-b border-[#FCFBF726]"
                  }`}
                >
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
