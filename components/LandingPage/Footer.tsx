import Image from "next/image";
import Link from "next/link";
import { FooterLinks } from "@/components/LandingPage";
import { socials } from "@/utils/socials";

const Footer = () => {
  return (
    <footer className="flex flex-col lg:flex-row gap-y-8 gap-x-4 py-4 md:p-4  lg:p-1 lg:h-[50vh] justify-center  items-center rounded-md">
      {/* Left container */}
      <div className="bg-footer flex-grow w-[90vw]  lg:w-[35%] h-full justify-center lg:h-[90%] border-[1px] p-8 border-[#FCFBF726] rounded-lg">
        <div className="flex md:px-2 gap-x-2 items-center font-mooli">
          <Image src="/logo.png" alt="CraftLink logo" width={22} height={49} />
          <span className="text-[20px] md:text-[28px]">
            Craft{""}
            <span className="bg-[#FFD700] text-[#1A1203] rounded-sm">Link</span>
          </span>
        </div>
        <div className="grid md:flex lg:flex-col md:justify-between h-full lg:h-[90%] items-start text-start gap-x-8">
          <p className="py-4 md:self-end lg:self-start font-merriweather md:w-[25%] lg:w-[65%] xl:w-[50%] text-[#FCFDFF] text-[20px]">
            Empower Your Craft, Connect with Clients.
          </p>
          <div className="flex gap-x-4 justify-center items-center lg:self-center border-[0.74px] border-[#FFFFFF40] rounded-xl drop-shadow-md h-[85px] md:h-[70px] w-fit md:max-w-[30vw] lg:min-w-[25vw] xl:min-w-[40%] md:w-fit px-[5px] md:px-[1vw]">
            {socials.map((social) => (
              <Link href={social.link} key={social.socialsType}>
                <Image
                  alt={social.socialsType}
                  src={social.imageSrc}
                  width="45"
                  height="45"
                  className="bg-[#FFD7001A] rounded-md p-[1vw] md:p-[0.5vw]"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right container */}
      <div className="flex flex-col flex-grow w-[90vw]  h-full gap-y-2 lg:h-[90%]">
        <div className="grid grid-cols-2 lg:flex bg-footer gap-y-4 max-lg:items-center justify-center lg:justify-between border-[1px] lg:h-[70%] p-8 border-[#FCFBF726] rounded-lg">
          <FooterLinks />
        </div>
        <div className="bg-footer flex font-merriweather items-center px-4 text-[#9A9992] text-sm justify-between h-24 lg:h-[30%] rounded-lg border-[1px] border-[#FCFBF726]">
          <span>All rights reserved</span>
          <span>© Copyright 2024</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer
