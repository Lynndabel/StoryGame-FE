"use client";

import ProgressBar from "@/components/ProgressBar";
import Select from "@/components/Select";
import { ArtisanCategory } from "@/utils/filters";
import { useGetArtisanData } from "@/utils/store";
import {useRouter} from "next/navigation";
import { toast } from "sonner";

export default function Category() {
  const { category, setCategory } = useGetArtisanData();
  const router = useRouter();

  const handleCategorySelection = (category: string) => {
    setCategory(category);
  };

  const handleNext = () => {
    if (category == "") {
      toast.error("Category not selected");
      return;
    }

    router.push("/role/artisans/onboarding/skills");
  };

  return (
    <div className="flex h-[80vh] w-screen  items-center md:items-end justify-center py-4">
      <div className="flex flex-col text-[#F9F1E2] max-sm:w-[90vw] p-8 rounded-lg bg-opacity-80  shadow-lg shadow-second  relative 2xl:bottom-16  bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-4 ">
        <ProgressBar totalSteps={7} currentStep={1} />
        <h2 className="font-alata text-2xl md:text-3xl md:w-[70%]">
          Awesome! What Kind of Artisan Are You?
        </h2>
        <p className="font-merriweather text-start self-start md:w-[70%]">
          Select the category that best describes your craft to help clients
          find you faster.
        </p>

        <div className="w-[80%] md:w-[60%] self-start py-8">
          <Select onSelect={handleCategorySelection} filters={ArtisanCategory} placeholder={"Select category"}/>
        </div>
        <div className="flex font-merriweather w-full justify-end">
        
          <button onClick={handleNext} className="flex w-fit py-2 px-4 uppercase  bg-yellow rounded-sm text-[#1A1203] font-bold text-sm md:text-base">
            Next, Add your Skills
          </button>
          </div>
      </div>
    </div>
  );
}
