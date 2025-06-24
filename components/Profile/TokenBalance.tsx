"use client";

import type React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";

interface EarningsDisplayProps {
  availableAmount: number;
  totalEarned: number;
  craftcoinBalance: number;
  onClaimCraftcoin: () => void;
  onBuyCraftcoin: () => void;
}

const EarningsDisplay: React.FC<EarningsDisplayProps> = ({
  availableAmount,
  totalEarned,
  craftcoinBalance,
  onClaimCraftcoin,
  onBuyCraftcoin,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="space-y-2 font-merriweather h-full">
      {/* Earnings Card */}
      <div className="bg-[#F2E8CF0A] border border-[#FCFBF726] rounded-lg p-4 ">
        <div className="flex items-center gap-2 mb-1">
          <Image src={"/wallet.png"} alt={"coin"} width="18" height="18" />{" "}
          <h2 className="text-base text-[#F9F1E2]">Earnings</h2>
        </div>
        <p className="text-sm text-[#D8D6CF] mb-2">
          Your earnings, in tokens. withdraw when you&apos;re ready.
        </p>

        <div className="flex justify-between px-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#04DF76] rounded-full"></div>
              <span className="text-sm text-[#B5B4AD]">Available</span>
            </div>
            <div className="text-2xl font-bold text-[#FFCC6D] font-alata">
              {availableAmount} <span className="text-lg">USDT</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#47F9FF] rounded-full"></div>
              <span className="text-sm text-[#B5B4AD]">Total Earned</span>
            </div>
            <div className="text-2xl font-bold text-[#FFCC6D] font-alata">
              {totalEarned} <span className="text-lg">USDT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Craftcoin Balance Card */}
      <div className="bg-[#F2E8CF0A] relative border border-[#FCFBF726] rounded-lg p-5 lg:py-2 ">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <Image src={"/coin.png"} alt={"coin"} width="18" height="18" />{" "}
            <h2 className="text-base text-[#F9F1E2]">Craftcoin Balance</h2>
          </div>
          <IoIosInformationCircleOutline
            className="h-5 w-5 text-[#8B8B8B] cursor-help transition-colors hover:text-[#F9F1E2]"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className="absolute right-0 top-6 w-64 p-3 bg-[#1A1A1A] rounded text-xs text-[#B5B4AD] border border-[#3A3A3A] z-10 shadow-lg transition-opacity">
              You can only claim once a month! Your last claim sets the next
              date.
              <div className="absolute -top-2 right-2 w-3 h-3 bg-[#1A1A1A] border-t border-l border-[#3A3A3A] transform rotate-45"></div>
            </div>
          )}{" "}
        </div>

        <p className="text-sm text-[#B5B4AD] mb-2">
          Want more jobs? Use CraftCoins to apply and get hired.
        </p>

        <div className="mb-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-[#B5B4AD]">Available</span>
          </div>
          <div className="text-2xl font-bold text-[#FFCC6D] font-alata">
            {craftcoinBalance} <span className="text-lg">CFT</span>
          </div>
        </div>

        <div className="hidden md:flex lg:hidden xl:flex w-full justify-between">
          <button
            onClick={onClaimCraftcoin}
            className="bg-[#FFD700] text-[#1A1203]  py-2 px-4 rounded-[4px] uppercase text-sm hover:bg-[#FFD700]/90 transition-colors"
          >
            Claim Craftcoin
          </button>

          <button
            onClick={onBuyCraftcoin}
            className=" text-[#FFD700] border border-[#FFD700]  py-2 px-4 rounded-[4px] uppercase text-sm   transition-colors"
          >
            Buy Craftcoin
          </button>
        </div>

        <div className="md:hidden flex lg:flex xl:hidden w-full justify-between">
          <button
            onClick={onClaimCraftcoin}
            className="bg-[#FFD700] text-[#1A1203]  py-2 px-4 rounded-[4px] uppercase text-sm hover:bg-[#FFD700]/90 transition-colors"
          >
            Claim
          </button>

          <button
            onClick={onBuyCraftcoin}
            className=" text-[#FFD700] border border-[#FFD700]  py-2 px-4 rounded-[4px] uppercase text-sm   transition-colors"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarningsDisplay;
