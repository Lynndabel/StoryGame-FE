import Image from "next/image";
import { Client } from "@/utils/job";

interface Details {
  detailValue: string | number;
  imgSrc: string;
}

const AccountCard = ({ client }: { client: Client }) => {
  const details: Details[] = [
    {
      imgSrc: "/language.png",
      detailValue: client.language,
    },
    {
      imgSrc: "/money.png",
      detailValue: `$${client.moneySpent} Spent`,
    },
    {
      imgSrc: "/location.png",
      detailValue: client.location,
    },
    {
      imgSrc: "/calendar.png",
      detailValue: `Joined ${client.dateJoined}`,
    },
    {
      imgSrc: "/totalJobs.png",
      detailValue: `${client.posted} Posted`,
    },
  ];

  return (
    <div className="flex max-w-full font-merriweather text-[#F9F1E2] bg-profile border border-[#FCFBF726] rounded-lg  gap-x-4 justify-between">
      <div className="flex flex-col md:flex-row gap-4  p-4 md:p-8">
        <span className=" h-72 min-w-72 w-fit max-w-[40vw] relative">
          {" "}
          <Image
            src={client.avatar}
            alt="avatar"
            fill
            className="object-fit rounded-xl"
          />
        </span>
        <div className="flex flex-col py-4 gap-y-4">
          <span className="flex text-[#F0FCF6]  self-start text-xs md:text-sm px-2  py-[3px] bg-[#04DF7621] border rounded-full border-[#04DF76]">
            Verified
          </span>
          <span className=" flex text-balance items-center gap-x-2">
            {client.about}{" "}
          </span>
          <div className=" font-merriweather self-start grid grid-cols-2 gap-[4px] ">
            {details.map((detail, index) => (
              <div
                key={detail.detailValue}
                className={`flex gap-2 p-2 ${
                  index === details.length - 1 && details.length % 2 !== 0
                    ? "col-span-2"
                    : ""
                }`}
              >
                <div className="flex gap-x-2 self-center relative h-[22px] w-[22px]">
                  <Image
                    src={detail.imgSrc}
                    alt={detail.imgSrc}
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

      <div className="hidden lg:flex relative  self-end items-end justify-end  h-[28vh] w-[30vw]">
        <Image
          src={"/client-artisan.png"}
          alt="Profile status"
          fill
          style={{ objectFit: "contain", objectPosition: "right bottom" }}
          className="opacity-50"
        />
      </div>
    </div>
  );
};

export default AccountCard;
