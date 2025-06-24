import { clientDate } from "@/utils/clientDate";
import Image from "next/image";

export interface Client {
  walletAddress: string;
  verificationStatus: boolean;
  dateJoined: string;
  description?: string;
}

const ClientDetails = ({ client }: { client: Client }) => {
  return (
    <div className="bg-[#F2E8CF0A] text-start rounded-lg w-full p-4 h-fit space-y-4">
      <p className="text-[#B5B4AD]">CLIENT INFO</p>
      <div className="space-y-3">
        <span className="flex gap-x-2">
          {client?.walletAddress.slice(0, 7)}...
          {client?.walletAddress.slice(37)}
          {!client?.verificationStatus ? (
            <span className="text-[#F0FCF6] self-center text-xs md:text-sm px-2 bg-[#980F0F21] border rounded-full border-[#980F0F]">
              Payment Not Verified
            </span>
          ) : (
            <span className="text-[#F0FCF6] self-center text-xs md:text-sm px-2 bg-[#04DF7621] border rounded-full border-[#04DF76]">
              Payment Verified
            </span>
          )}
        </span>
        {client?.description && (
          <p className="text-[#D8D6CF] font-merriweather text-sm leading-relaxed">
            {client.description}
          </p>
        )}
      </div>
      <div className="flex gap-4 flex-wrap">
        <span className="relative h-[20px] w-[20px] self-center">
          <Image
            src="/calendar.png"
            alt="Calendar"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </span>
        <p className="font-merriweather self-center text-[#B5B4AD]">
          Member since {clientDate(client?.dateJoined)}
        </p>
        <button className="bg-[#262208] space-x-2 rounded-full text-[#FCF8E3] py-2 px-4">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ClientDetails;