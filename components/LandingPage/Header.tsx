"use client";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import Button from "../Button";
import AnimatedDiv from "@/components/AnimatedDiv";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  // Menu items array (updated to route-based navigation)
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/features", label: "Features" },
    { href: "/marketplace", label: "Visit Marketplace" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    router.push("/role/artisans/signin");
  };

  return (
    <div>
      <div className="bg-header w-screen bg-opacity-100 flex justify-between border-b-[0.5px] border-[#FCFBF726] shadow-lg px-4 md:px-8 items-center py-4 font-merriweather">
        <Link href="/">
          <div className="flex md:px-2 gap-x-4 items-center font-mooli">
            <Image src="/logo.png" alt="CraftLink logo" width={22} height={49} />
            <span className="text-[20px] md:text-[28px]">
              Craft
              <span className="bg-[#FFD700] text-[#1A1203] rounded-sm">Link</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex gap-x-8 text-lg text-[#F9F1E2]">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#FFD700]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Sign In Button */}
        <div className="hidden lg:flex">
          {/* <Link href={links.register}> */}
          <Button onClick={handleLogin} text="Sign In" />
          {/* </Link> */}
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex lg:hidden">
          <MdOutlineMenu color="#FFD700" size={32} onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile Menu Slide-In */}
      {isMenuOpen && (
        <AnimatedDiv
          initialX="100%"
          animateX={0}
          exitX={"-100%"}
          duration={1.0}
          className="fixed inset-0 w-screen h-screen bg-[#333333] bg-opacity-50 z-10"
        >
          <div className="relative top-8 right-1 flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-[#FFD700] text-3xl"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 bg-[#1A1A1A] text-[#F9F1E2] h-full p-6 text-xl rounded-md">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="hover:text-[#FFD700]"
              >
                {item.label}
              </Link>
            ))}
            <Button onClick={handleLogin} text="Get Started" />
          </div>
        </AnimatedDiv>
      )}
    </div>
  );
};

export default Header;
