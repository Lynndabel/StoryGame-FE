import { DetailsProps } from "@/utils/profile";
import Image from "next/image";
import { LiaToggleOnSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";

const PreviewDetails = ({ details }: { details: DetailsProps }) => {
  const router = useRouter();
  const displayPrice = details.pricing / 1000000;

  return (
    <div className="md:flex grid grid-cols-2  md:flex-col gap-4">
      <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start">
          <h3 className="text-lg">Location</h3>
         
        </div>
        <div className="flex  items-start justify-start gap-x-2">
          <Image
            src={"/location.png"}
            alt={"location"}
            width="22"
            height="22"
          />
          <span className="text-[#D8D6CF]">{details.location}</span>
        </div>
      </div>
      <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start">
          <h3 className="text-lg">Language</h3>
          <div className="flex ">
          <span className="relative h-[33px] w-[33px] ">
            <Image
              src={"/add-square.png"}
              alt="add"
              fill
              className="object-contain p-2"
            />
          </span>
          <span className="relative h-[33px] w-[33px] ">
            <Image
              onClick={() => router.push("/role/artisans/onboarding/bio")}
              src={"/edit.png"}
              alt="pen"
              fill
              className="object-contain p-2"
            />
          </span>
          </div>
        </div>
        <div className="flex  items-start justify-start gap-x-2">
          <Image
            src={"/language.png"}
            alt={"language"}
            width="18"
            height="18"
          />
          <span className="text-[#D8D6CF]">{details.language}</span>
        </div>
      </div>
      <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start">
          <h3 className="text-lg">Experience</h3>
          
          <span className="relative h-[33px] w-[33px] ">
            <Image
              onClick={() => router.push("/role/artisans/onboarding/bio")}
              src={"/edit.png"}
              alt="pen"
              fill
              className="object-contain p-2"
            />
          </span>
        </div>
        <div className="flex  items-start justify-start gap-x-2">
          <Image
            src={"/expertise.png"}
            alt={"expertise"}
            width="22"
            height="22"
          />
          <span className="text-[#D8D6CF]">{details.experience}</span>
        </div>
      </div>
      <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start">
          <h3 className="text-lg">Availability</h3>
          <LiaToggleOnSolid size={22} color={"#FFD700"}/>
        </div>
        <div className="flex  items-start justify-start gap-x-2">
          <Image
            onClick={() => router.push("/role/artisans/onboarding/pricing")}
            src={"/calendar.png"}
            alt={"calendar"}
            width="22"
            height="22"
          />
          <span className="text-[#D8D6CF]">{details.availability ? "Available to work" : "Unavailable at the moment"}</span>
        </div>
      </div>
      <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start">
          <h3 className="text-lg">Pricing</h3>
          
          <span className="relative h-[33px] w-[33px] ">
            <Image
              onClick={() => router.push("/role/artisans/onboarding/pricing")}
              src={"/edit.png"}
              alt="pen"
              fill
              className="object-contain p-2"
            />
          </span>
        </div>
        <div className="flex  items-start justify-start gap-x-2">
          <Image
            src={"/money.png"}
            alt={"money"}
            width="22"
            height="22"
          />
          <span className="text-[#D8D6CF]">${displayPrice}/Project</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewDetails;
