"use client";
import Image from "next/image";

const ClientTokenUsage = ({
  available,
  spent,
}: {
  available: number;
  spent: number;
}) => {
  return (
    <div className="h-full w-full overflow-hidden bg-[#F2E8CF0A] rounded-lg border border-[#FCFBF726] flex flex-col justify-between ">
      <div className=" p-6  font-merriweather text-[#F9F1E2]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Image src={"/wallet.png"} alt={"coin"} width="18" height="18" />
              <h3 className="text-sm text-[#D8D6CF] ">Token Usage</h3>
            </div>
            <p className="text-xs px-8 text-[#B5B4AD]">
              Use tokens to post jobs and hire top artisans.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between px-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-[#B5B4AD]">Available</span>
              </div>
              <div className="text-2xl font-bold text-[#FFCC6D] font-alata">
                {available} <span className="text-sm font-normal">USDT</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-[#CFE0A8] rounded-full"></div>
                <span className="text-sm text-[#B5B4AD]">Total Spent</span>
              </div>
              <div className="text-2xl font-bold text-[#FFCC6D] font-alata">
                {spent} <span className="text-sm font-normal">USDT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex relative self-end items-end justify-end  h-[16vh] w-full">
        <Image
          src={"/client-style.png"}
          alt="Profile status"
          fill
          style={{ objectFit: "contain", objectPosition: "center bottom" }}
          className="opacity-50 w-full"
        />
      </div>
    </div>
  );
};

export default ClientTokenUsage;
