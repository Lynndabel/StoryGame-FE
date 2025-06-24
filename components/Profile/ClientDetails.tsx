import { Client } from "@/utils/job";
import Image from "next/image";

const ClientDetails = ({ client }: { client: Client }) => {
  return (
    <div className="md:flex grid grid-cols-2  md:flex-col gap-4">
      <div className="flex col-span-2 md:flex-col border border-[#FCFBF726] gap-x-4 gap-y-2 p-4 rounded-xl bg-[#F2E8CF0A]">
        <div className="w-full h-44 max-w-44 lg:h-56 lg:max-w-56 p-4 relative">
          <Image
            src={client.avatar}
            alt="avatar"
            fill
            className="object-fit rounded-xl"
          />
          <button className="absolute right-[4px] top-[4px] md:top-2 flex w-fit justify-center items-center p-2 md:px-2 md:py-[4px]  bg-[#262208] rounded-full md:rounded-[3px] text-[#FCF8E3] font-bold text-xs md:text-sm">
            <p className="hidden md:flex">Change Avatar </p>
            <span className="relative md:left-[4px] h-[18px] w-[18px] md:h-[28px] md:w-[28px]">
              <Image
                src={"/edit.png"}
                alt="pen"
                fill
                className="object-contain p-[2px] md:p-[6px]"
              />
            </span>
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="font-alata text-2xl uppercase py-2">
            {" "}
            {client.username}
          </span>
          <span className="w-full text-sm md:text-base">{client.about}</span>
        </div>
      </div>
      <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start justify-start">
          <h3 className="text-lg font-bold">Location</h3>
        </div>
        <div className="flex  items-start justify-start gap-x-2">
          <Image
            src={"/location.png"}
            alt={"location"}
            width="22"
            height="22"
          />
          <span className="text-[#D8D6CF]">{client.location}</span>
        </div>
      </div>
      <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start justify-start">
          <h3 className="text-lg font-bold">Language</h3>
          <div className="flex ">
            <span className="relative h-[33px] w-[33px] ">
              <Image
                src={"/add-square.png"}
                alt="add"
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
          <span className="text-[#D8D6CF]">{client.language}</span>
        </div>
      </div>
      <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-2 md:px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start justify-start">
          <h3 className="text-lg font-bold">Hiring History</h3>
        </div>
        <div className="flex  items-start justify-start gap-x-2 w-full">
          <p className="w-4 h-4 rounded-full bg-[#AEFF00]"></p>
          <span className="text-[#D8D6CF]">{client.posted} jobs Posted</span>
        </div>
        <div className="flex  items-start justify-start gap-x-2 w-full">
          <Image
            src={"/totalJobs.png"}
            alt={"totalJobs"}
            width="22"
            height="22"
          />
          <span className="text-[#D8D6CF]">{client.posted} jobs Completed</span>
        </div>
      </div>
      <div className="flex flex-col border border-[#FCFBF726] gap-y-2 px-2 md:px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <div className="flex justify-between items-start justify-start">
          <h3 className="text-lg font-bold">Total Amount Spent</h3>
        </div>
        <div className="flex  items-start justify-start gap-x-2 w-full">
          <Image src={"/money.png"} alt={"money"} width="22" height="22" />
          <span className="text-[#D8D6CF]">${client.moneySpent}</span>
        </div>
        <div className="flex  items-start justify-start gap-x-2 w-full">
          <Image src={"/totalJobs.png"} alt={"totalJobs"} width="22" height="22" />
          <span className="text-[#D8D6CF]">
            Across {client.noProjectSpentMoney} project
          </span>
        </div>
      </div>
      <div className="flex flex-col max-sm:col-span-2  border border-[#FCFBF726] gap-y-4 px-4 py-2 rounded-xl bg-[#F2E8CF0A]">
        <h3 className="text-lg font-bold">Rating</h3>

        <div className="flex flex-col gap-y-2">
          <div className="flex  text-sm items-center justify-start gap-x-2">
            <Image src={"/star.png"} alt={"star"} width="22" height="22" />
            <span className="flex self-end italic font-bold text-[#F9F1E2]">
              {client.rating}/5
            </span>
          </div>
          <span className="text-[#D8D6CF]">
            Encourage your clients to leave feedback after completing a project
            to improve your rating!
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
