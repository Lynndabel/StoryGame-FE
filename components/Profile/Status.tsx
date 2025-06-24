// import Image from "next/image";

interface StatusProps {
  title: string;
  // shortDesc?: string;
  // imageSrc: string;
  desc: string;
  // button: string;
  // clientButton?: string;
  // onClick?: () => void;
  // clientOnClick?: () => void;
}

const Status = ({
  title,
  desc,
 
}: StatusProps) => {
  return (
    <div className=" text-[#F9F1E2] font-merriweather  flex justify-between">
      <div className=" gap-y-4 flex flex-col">
        <span className="flex flex-col gap-y-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm italic">{desc}</p>
        </span>
        {/* <div className="flex gap-x-4">
          <button
            onClick={onClick}
            className="flex w-fit py-2 px-4 uppercase  bg-yellow rounded-md text-[#1A1203] font-bold text-sm md:text-base"
          >
            {button}
          </button>
          {clientButton && (
            <button
              onClick={clientOnClick}
              className="flex w-fit py-2 px-4 uppercase  bg-[#262208] rounded-md text-[#FCF8E3] font-bold text-sm md:text-base"
            >
              {clientButton}
            </button>
          )}
        </div> */}
      </div>
      {/* <div className="hidden md:flex relative h-44 w-44 ">
        <Image
          src={imageSrc}
          alt="Profile status"
          fill
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div> */}
    </div>
  );
};

export default Status;
