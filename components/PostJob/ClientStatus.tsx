import Image from "next/image";

interface StatusProps {
  title: string;
  shortDesc?: string;
  imageSrc: string;
  desc: string;
  button: string;
  clientButton?: string;
  onClick?: () => void;
  clientOnClick?: () => void;
}

const ClientStatus = ({ title, shortDesc, imageSrc, desc, button, clientButton, onClick, clientOnClick }: StatusProps) => {
  return (
    <div className="text-[#F9F1E2] font-merriweather bg-[#F2E8CF0A] rounded-xl flex justify-between">
      <div className="p-8 gap-y-4 flex  flex-col">
        <span className="flex flex-col gap-y-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm italic">{shortDesc}</p>
        </span>
        <span className="text-[#FCFBF7] lg:w-[60%]">{desc}</span>
        <div className="flex gap-x-4">
        <button onClick={onClick} className="flex w-fit py-2 px-4 uppercase  bg-yellow rounded-md text-[#1A1203] font-bold text-sm md:text-base">
          {button}
        </button>
        { clientButton && <button onClick={clientOnClick} className="flex w-fit py-2 px-4 uppercase  bg-[#262208] rounded-md text-[#FCF8E3] font-bold text-sm md:text-base">
          {clientButton}
        </button>}
        </div>
      </div>
      <div className="hidden md:flex self-end relative h-48 w-48 top-4 left-4 ">
        <Image
          src={imageSrc}
          alt="Profile status"
          fill
          sizes="(max-width: 768px) 0vw, (max-width: 1200px) 192px, 192px"
          style={{ objectFit: "contain", objectPosition: "right bottom" }}
        />
      </div>
    </div>
  );
};

export default ClientStatus;
