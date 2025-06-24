import { DetailsProps } from "@/utils/profile";
import Image from "next/image";

const Details = ({ details }: { details: DetailsProps }) => {
  return (
    <div className="flex flex-col gap-2 h-full ">
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="flex flex-col h-full border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
          <div className="flex  items-center justify-start gap-x-2">
            <Image
              src={"/language.png"}
              alt={"language"}
              width="12"
              height="12"
            />
            <h3 className="text-sm text-[#D8D6CF]">Language</h3>
          </div>
          <div className="flex  items-start justify-start gap-x-2">
            <span className="text-[#D8D6CF]">{details.language}</span>
          </div>
        </div>
        <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
          <div className="flex  items-center justify-start gap-x-2">
            <Image
              src={"/expertise.png"}
              alt={"expertise"}
              width="15"
              height="15"
            />
            <h3 className="text-sm text-[#D8D6CF]">Experience</h3>
          </div>
          <div className="flex  items-start justify-start gap-x-2">
            <span className="text-[#D8D6CF]">{details.experience}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col  gap-2 h-full">
        <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 pt-2 pb-8 rounded-xl bg-[#F2E8CF0A]">
          <div className="flex justify-between items-start justify-start">
            <h3 className="text-base">Service Tagline</h3>
          </div>
          <div className="flex  items-start justify-start gap-x-2">
            {details.tagline}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
