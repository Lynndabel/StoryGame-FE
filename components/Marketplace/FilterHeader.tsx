"use client"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import ConnectWallet from "../ConnectWallet"
import SearchBar from "../SearchBar"
import Link from "next/link"
import { links } from "@/utils/links"


// import useIsArtisan from "@/hooks/Registry/useIsArtisan"
// import useIsClient from "@/hooks/Registry/useIsClient"
import { FiUser, FiMenu, FiHelpCircle, FiBell, FiSettings, FiFileText} from "react-icons/fi"

import { useGetUserRole } from "@/utils/store";

interface Header {
  isActive: (path: string) => boolean
}

const MarketplaceHeader = ({ isActive }: Header) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const { role } = useGetUserRole();
  const isArtisan = role === "artisan";
  const isClient = role === "client";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Menu items array
  const menuItems = [
    { href: links.browseJob, label: "Browse Jobs" },
    { href: links.applied, label: "Manage Jobs" },
    { href: links.message, label: "Messages" },
    { href: links.resources, label: "Resources" },
  ]

  const handleProfileAction = (action: string) => {
    console.log(`Profile action: ${action}`)
    setIsProfileDropdownOpen(false)
  }

  // Get user role text for display
  const getUserRoleText = () => {
    if (isArtisan) return "Artisan"
    if (isClient) return "Client"
    return "Visitor"
  }

  // Get user image based on role - using same logic as getUserRoleText
  const getUserImage = () => {
    if (isArtisan) return "/profile.png" // or "/artisan-profile.png" if you have different images
    if (isClient) return "/profile.png"  // or "/client-profile.png" if you have different images
    return "/placeholder.svg" // default image for visitors
  }

  // Get profile page based on role - using same logic as getUserRoleText
  const getProfilePage = () => {
    if (isArtisan) return "/profile/artisans"
    if (isClient) return "/profile/clients"
    return "/"
  }

  // Check if user has a valid role (replaces the userCard state)
  const hasValidRole = isArtisan || isClient

  return (
    <div className="bg-[#333333] bg-opacity-[98%] bg-header z-10">
      <div className="flex w-full justify-between items-center px-4 lg:px-8 2xl:px-16 py-3 h-20 font-merriweather">
        {/* Logo */}
        <Link href="/">
          <div className="flex gap-x-2 items-center font-mooli">
            <Image src="/logo.png" alt="CraftLink logo" width={18} height={40} />
            <span className="text-[20px] md:text-[24px] text-white">
              Craft{""}
              <span className="bg-[#FFD700] text-[#1A1203] px-1 rounded-sm">Link</span>
            </span>
          </div>
        </Link>

        {/* Center Navigation Menu - Hidden on mobile */}
        <div
          className="hidden lg:flex gap-x-8 items-center text-white"
          style={{
            fontFamily: "Merriweather",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "120%",
            letterSpacing: "0%",
          }}
        >
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <p
                className={`${
                  isActive(item.href)
                    ? "border-b-2 border-[#FFD700] pb-1"
                    : "hover:border-b-2 hover:border-[#FFD700] hover:pb-1"
                } transition-all duration-300 ease-in-out cursor-pointer`}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex gap-x-3 items-center">
          {/* Search Bar - Hidden on small screens */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Right Side Container - Wrapping hamburger, profile, and connect wallet */}
          <div className="bg-[#26220840] rounded-lg px-3 py-2">
            <div className="flex gap-x-3 items-center">
              {/* Conditional Authentication Section */}
            {!isArtisan && !isClient ? (
              // Visitors - Show Sign In Button
              <Link href="/role/artisans/signin">
                <button className="bg-[#FFD700] hover:bg-[#E6C200] text-[#1A1203] font-semibold px-4 py-2 rounded text-sm transition-colors">
                  SIGN IN
                </button>
              </Link>
            ) : (
              // Artisans & Clients - Show Connect Wallet and Profile
              <>
                <ConnectWallet />
                {hasValidRole ? (
                  <div className="relative" ref={profileDropdownRef}>
                    {/* Profile Section with Image and Role Text Below */}
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        className="rounded-full h-8 w-8 overflow-hidden hover:ring-2 hover:ring-[#FFD700] transition-all"
                      >
                        <Image
                          src={getUserImage()}
                          alt="Profile pic"
                          width={32}
                          height={32}
                          style={{ objectFit: "cover" }}
                        />
                      </button>
                      {/* Role Text Below Profile Image */}
                      <span className="text-white text-xs font-medium mt-1 text-center">
                        {getUserRoleText()}
                      </span>
                    </div>

                    {/* Profile Dropdown */}
                    {isProfileDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-[#333333] rounded-lg shadow-lg border border-[#555555] py-2 z-50">
                        <Link href={getProfilePage()}>
                          <button
                            onClick={() => handleProfileAction("view-profile")}
                            className="flex items-center space-x-3 w-full text-left px-4 py-3 text-white hover:bg-[#444444] hover:text-[#FFD700] transition-colors"
                          >
                            <FiUser className="w-4 h-4" />
                            <span>View Profile</span>
                          </button>
                        </Link>
                        <button
                          onClick={() => handleProfileAction("settings")}
                          className="flex items-center space-x-3 w-full text-left px-4 py-3 text-white hover:bg-[#444444] hover:text-[#FFD700] transition-colors"
                        >
                          <FiSettings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={() => handleProfileAction("help")}
                          className="flex items-center space-x-3 w-full text-left px-4 py-3 text-white hover:bg-[#444444] hover:text-[#FFD700] transition-colors"
                        >
                          <FiHelpCircle className="w-4 h-4" />
                          <span>Help</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative" ref={profileDropdownRef}>
                    {/* Fallback Profile Section for users without profile image */}
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        className="p-2 border border-[#555555] rounded hover:bg-[#444444] transition-colors"
                      >
                        <FiUser className="w-4 h-4 text-white" />
                      </button>
                      {/* Role Text Below Profile Icon */}
                      <span className="text-white text-xs font-medium mt-1 text-center">
                        {getUserRoleText()}
                      </span>
                    </div>

                    {/* Profile Dropdown for users without profile image */}
                    {isProfileDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-[#333333] rounded-lg shadow-lg border border-[#555555] py-2 z-50">
                        <button
                          onClick={() => handleProfileAction("create-profile")}
                          className="flex items-center space-x-3 w-full text-left px-4 py-3 text-white hover:bg-[#444444] hover:text-[#FFD700] transition-colors"
                        >
                          <FiUser className="w-4 h-4" />
                          <span>Create Profile</span>
                        </button>
                        <button
                          onClick={() => handleProfileAction("settings")}
                          className="flex items-center space-x-3 w-full text-left px-4 py-3 text-white hover:bg-[#444444] hover:text-[#FFD700] transition-colors"
                        >
                          <FiSettings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button - Now contains the filter options */}
            <div className="relative" ref={mobileMenuRef}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-[#444444] rounded transition-colors"
              >
                <FiMenu className="w-4 h-4 text-white" />
              </button>

              {/* Mobile Menu Dropdown - Now contains filter options */}
              {isMobileMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-[#333333] rounded-lg shadow-lg border border-[#555555] py-2 z-50">
                  {/* Search Bar for mobile */}
                  <div className="px-4 py-2 md:hidden">
                    <SearchBar />
                  </div>
                  <div className="border-t border-[#555555] mt-2 pt-2 md:hidden"></div>
                  
                  {/* Filter Options (previously in Filter dropdown) */}
                  <button
                    onClick={() => {
                      console.log("Selected: Help & FAQs")
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-white hover:bg-[#444444] hover:text-[#FFD700] transition-colors"
                  >
                    <FiHelpCircle className="w-4 h-4" />
                    <span>Help & FAQs</span>
                  </button>
                  <button
                    onClick={() => {
                      console.log("Selected: Notification")
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-white hover:bg-[#444444] hover:text-[#FFD700] transition-colors"
                  >
                    <FiBell className="w-4 h-4" />
                    <span>Notification</span>
                  </button>
                  <button
                    onClick={() => {
                      console.log("Selected: Settings")
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-white hover:bg-[#444444] hover:text-[#FFD700] transition-colors"
                  >
                    <FiSettings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      console.log("Selected: Terms and Policies")
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-white hover:bg-[#444444] hover:text-[#FFD700] transition-colors"
                  >
                    <FiFileText className="w-4 h-4" />
                    <span>Terms and Policies</span>
                  </button>

                  {/* Bottom Connect Wallet Button */}
                  <div className="border-t border-[#555555] mt-2 pt-2 px-4">
                    <div onClick={() => setIsMobileMenuOpen(false)}>
                      <ConnectWallet />
                    </div>
                  </div>
                </div>
              )}
            </div>
                      </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplaceHeader