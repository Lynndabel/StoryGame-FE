"use client";
import ProgressBar from "@/components/ProgressBar";
import { useGetJobData } from "@/utils/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SetTimeline() {
  const { setDuration, duration } = useGetJobData();
  const router = useRouter();

  const handleNext = () => {
    if (!duration) {
      toast.error("Please set the project duration");
      return;
    }
    router.push("/role/clients/create-job/budget");
  };

  const handlePrevious = () => {
    router.push(" /role/clients/create-job/details");
  };

  return (
    <div className="flex min-h-[80vh] md:max-h-screen w-screen items-center justify-center overflow-y-scroll">
      <div className="flex flex-col text-[#F9F1E2] max-w-[95%] md:max-w-[50%] md:min-w-[35%] p-8 rounded-lg bg-opacity-80 shadow-lg shadow-second relative bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-4">
        <ProgressBar totalSteps={5} currentStep={3} />
        <h2 className="font-alata text-2xl md:text-3xl">
          Choose Your Timeline
        </h2>
        <p className="font-merriweather text-start self-start lg:w-[70%]">
          When do you need it done? Set a clear deadline to help artisans plan
          accordingly.
        </p>

        <div className="flex flex-col  w-full lg:w-[70%] py-8 gap-4 md:gap-8">
          <div>
            <p className="font-bold">
              What will be the project&apos;s duration?
            </p>
            <div className="flex items-start w-full gap-x-2">
              <div className=" py-4">
                <input
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  type="number"
                  placeholder="0"
                  min={0}
                  className="w-full font-merriweather bg-[#F2E8CF29] p-[12px] border rounded-md border-[#FCFBF726] shadow-md shadow-[#333333] placeholder:text-base placeholder:text-[#D8D6CF] focus:outline-[#333333]"
                />
              </div>
              <div className="w-[60%] self-center relative">
                <div
                  className="flex self-center items-center justify-between bg-[#F2E8CF29] p-[12px] w-full rounded-md border border-[#FCFBF726] relative
                    text-[#F9F1E2]"
                >
                  Week(s)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex font-merriweather w-full justify-between">
          <button
            onClick={handlePrevious}
            className="flex w-fit py-2 px-4 uppercase bg-[#262208] rounded-sm text-[#FCF8E3] font-bold text-sm md:text-base"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex w-fit py-2 px-4 uppercase bg-yellow rounded-sm text-[#1A1203] font-bold text-sm md:text-base"
          >
            Next, SET BUDGET
          </button>
        </div>
      </div>
    </div>
  );
}
