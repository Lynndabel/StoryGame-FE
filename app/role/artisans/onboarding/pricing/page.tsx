"use client";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { useGetArtisanData } from "@/utils/store";
import {useRouter} from "next/navigation";
import { toast } from "sonner";

export default function Pricing() {
  const [checkedOption, setCheckedOption] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const { setRate, setAvailability } = useGetArtisanData();
  const router = useRouter();

  const handleNext = () => {
    if (price === null) {
      toast.error("Please set your price");
      return;
    }
    if (checkedOption === null) {
      toast.error("Please set your availability");
      return;
    }

    // multiply the price by 1000000 to convert it to USDT
    const convertedPrice = price * 1000000;
    setRate(convertedPrice);
    setAvailability(checkedOption === "available");
    console.log(convertedPrice, checkedOption);

    router.push("/role/artisans/onboarding/avatar");
  };

  const handlePrevious = () => {
    router.push("/role/artisans/onboarding/portfolio");
  }

  return (
    <div className="flex min-h-screen md:min-h-[80vh] md:max-h-screen w-screen items-start md:items-center justify-center overflow-y-scroll">
      <div className="flex flex-col text-[#F9F1E2] max-w-[95%] md:max-w-[80%] p-8 rounded-lg bg-opacity-80 shadow-lg shadow-second relative bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-4">
        <ProgressBar totalSteps={7} currentStep={5} />
        <h2 className="font-alata text-2xl md:text-3xl">
          Set Your Price & Schedule.
        </h2>
        <p className="font-merriweather text-start self-start md:w-[70%]">
          Let clients know your rates and when you&apos;re ready to work.
          Flexibility made easy!
        </p>

        <div className="flex flex-col self-start md:justify-between w-full py-4 gap-4 md:gap-8">
          <div className="flex flex-col gap-y-2">
            <p className="font-bold">
              Choose how you’d like to display your page’s pricing information.
            </p>
            <div className=" md:w-[75%]">
            <div className="flex items-center gap-x-2">
            <span className="bg-[#AEFF00] h-4 w-4 rounded-full"></span>
            <p className="">
              Starting at
            </p></div>
              <div className="flex gap-x-2 items-center px-8 ">
                <div className="w-[40%]">
                  <span className="text-xs text-[#FCFBF7]">Currency</span>
                  <div className="w-full flex items-center gap-x-2  bg-[#F2E8CF29] h-[50px] px-4 border rounded-md border-[#FCFBF726] shadow-md shadow-[#333333]">
                    <span className="relative h-8 w-8">
                      <Image
                        src="/usdt.png"
                        alt="token"
                        fill
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      ></Image>
                    </span>
                    {""}
                    <p>USDT</p>
                  </div>
                </div>
                <div className="w-[60%] self-end ">
                  <p className="text-xs text-[#FCFBF7]">Amount/Project</p>
                  <input
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    type="number"
                    placeholder="0.00"
                    min={0.0}
                    step={0.01}
                    className="w-full font-merriweather bg-[#F2E8CF29] p-[12px] border rounded-md border-[#FCFBF726] shadow-md shadow-[#333333] placeholder:text-base placeholder:text-[#D8D6CF] focus:outline-[#333333]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="font-bold">Are you available for projects?</p>
            <ul className="w-full p-4 space-y-2">
              <li className="flex gap-4">
                <div className="relative h-[20px] w-[20px]">
                  <input
                    type="checkbox"
                    onChange={() => setCheckedOption("available")}
                    checked={checkedOption === "available"}
                    className=" appearance-none h-[20px] w-[20px] border-2 rounded-full p-2 checked:border-0 checked:bg-[#04DF76] border-[#9A9992]"
                  />
                  {checkedOption === "available" && (
                    <FaCheck
                      size={12}
                      color={"#111A00"}
                      className="absolute top-[5px] left-[5px]"
                      onClick={() => setCheckedOption("available")}
                    />
                  )}
                </div>
                Available for new projects
              </li>
              <li className="flex gap-4">
                <div className="relative h-[20px] w-[20px]">
                  <input
                    type="checkbox"
                    onChange={() => setCheckedOption("not available")}
                    checked={checkedOption === "not available"}
                    className=" appearance-none h-[20px] w-[20px] border-2 rounded-full p-2 checked:border-0 checked:bg-[#04DF76] border-[#9A9992]"
                  />
                  {checkedOption === "not available" && (
                    <FaCheck
                      size={12}
                      color={"#111A00"}
                      className="absolute top-[5px] left-[5px]"
                      onClick={() => setCheckedOption("not available")}
                    />
                  )}
                </div>
                Not currenty available
              </li>
            </ul>
          </div>
        </div>

        <div className="flex font-merriweather w-full justify-between">
          <button onClick={handlePrevious} className="flex w-fit py-2 px-4 uppercase bg-[#262208] rounded-sm text-[#FCF8E3] font-bold text-sm md:text-base">
            Back
          </button>
          <button onClick={handleNext} className="flex w-fit py-2 px-4 uppercase bg-yellow rounded-sm text-[#1A1203] font-bold text-sm md:text-base">
            Next, Add Your Avatar
          </button>
        </div>
      </div>
    </div>
  );
}
