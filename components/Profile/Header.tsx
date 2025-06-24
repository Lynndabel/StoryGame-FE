"use client";
import Image from "next/image";
import ConnectWallet from "../ConnectWallet";
import Link from "next/link";
import { links } from "@/utils/links";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";

interface Header {
  isActive: (path: string) => boolean;
}

const ProfileHeader = ({ isActive }: Header) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: links.browseJob, label: "Browse Jobs" },
    { href: links.applied, label: "Manage Jobs" },
    { href: links.message, label: "Messages" },
    { href: links.resources, label: "Resources" },
  ];

  return (
    <div className="bg-[#333333] bg-opacity-[98%] bg-header z-10 ">
      <div className=" flex w-screen justify-between border-b-[0.5px] border-[#FCFBF726] px-4 lg:px-8 items-center py-4  gap-x-4 xl:gap-x-8 font-merriweather">
        <Link href="/">
          <div className="flex md:px-2 gap-x-4 items-center font-mooli">
            <Image
              src="/logo.png"
              alt="CraftLink logo"
              width={22}
              height={49}
            />
            <span className="text-[20px] hidden xl:flex md:text-[28px]">
              Craft{""}
              <span className="bg-[#FFD700] text-[#1A1203] rounded-sm">
                Link
              </span>
            </span>
          </div>
        </Link>
        <div className=" gap-x-4 xl:gap-x-8 lg:w-[50%] justify-center  hidden lg:flex text-lg text-[#B5B4AD]">
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
        </div>
      <div className="flex gap-x-4">
        <ConnectWallet />
        <div className="flex md:hidden">
          <MdOutlineMenu color={"#F9F1E2"} size={32} onClick={toggleMenu} />
        </div>
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
    </div>
  );
};

export default ProfileHeader;
