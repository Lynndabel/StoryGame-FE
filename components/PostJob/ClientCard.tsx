import { Client } from "@/utils/job";
import Image from "next/image";

interface Details {
  detailValue: string;
  imgSrc: string;
}

const ClientCard = ({ client }: { client: Client }) => {
  const details: Details[] = [
    {
      imgSrc: "/language.png",
      detailValue: client.language || "Not specified",
    },
    {
      imgSrc: "/location.png",
      detailValue: client.location || "Not specified",
    },
    {
      imgSrc: "/level.png",
      detailValue: client.status || "Not specified",
    },
  ];

  return (
    <div className="max-w-full font-merriweather text-[#F9F1E2] bg-profile border border-[#FCFBF726] rounded-lg  gap-x-4 ">
      <div className="flex self-end gap-x-2 justify-end p-2">
        {" "}
        <div className="bg-[#262208] rounded-full flex items-center text-xs md:text-base p-2 md:px-[10px] md:py-[6px] gap-x-2">
          Edit{" "}
          <span className="relative h-[18px] w-[18px] md:h-[28px] md:w-[28px] rounded-full bg-[#F2E8CF0A]">
            <Image
              src={"/edit.png"}
              alt="pen"
              fill
              className="object-contain p-[2px] md:p-2"
            />
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex  gap-x-2 md:gap-4 p-2 md:p-8">
          <span className=" h-44 w-44 md:h-72 md:w-72 relative">
            {" "}
            <Image
              src={client.avatar || "/avatar.png"}
              alt={`${client.username}'s avatar`}
              fill
              className="object-fit rounded-xl"
            />
            <button className="absolute right-[4px] top-[4px] md:top-2 flex w-fit justify-center items-center p-2  bg-[#262208] rounded-[3px] text-[#FCF8E3] font-bold text-xs md:text-sm">
              Change Avatar{" "}
              <span className="relative left-[4px] h-[18px] w-[18px] md:h-[28px] md:w-[28px]">
                <Image
                  src={"/edit.png"}
                  alt="pen"
                  fill
                  className="object-contain p-[2px] md:p-[6px]"
                />
              </span>
            </button>
          </span>

          <div className="flex flex-col justify-center py-4 gap-y-2">
            <div className="font-alata font-bold text-lg xl:text-[35px] text-[#FCF8F0] uppercase flex max-sm:gap-x-2">
              {client.username}{" "}
            </div>

            <div className=" py-2 font-merriweather w-full self-start flex flex-col gap-2">
              {details.map((detail, index) => (
                <div
                  key={index}
                  className={`flex gap-2 p-2 ${
                    index === details.length - 1 && details.length % 2 !== 0
                      ? "col-span-2"
                      : ""
                  }`}
                >
                  <div className="flex gap-x-2 self-center relative h-[22px] w-[22px]">
                    <Image
                      src={detail.imgSrc}
                      alt="User Image"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="capitalize  self-center text-start text-[#F9F1E2]">
                    {detail.detailValue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex  justify-end items-end">
          <div className="hidden lg:flex relative  self-end items-end justify-end  h-[23vh] w-[30vw]">
            <Image
              src={"/client-artisan.png"}
              alt="Profile status"
              fill
              sizes="(max-width: 768px) 0vw, (max-width: 1200px) 192px, 192px"
              style={{ objectFit: "contain", objectPosition: "right bottom" }}
              className="opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
