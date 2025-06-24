import Image from "next/image";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row relative bottom-[50px] lg:bottom-0  p-8 gap-4 justify-center  max-lg:items-center lg:h-[700px]  font-merriweather">
      <div className="bg-about border-2 md:border-1 border-[#FCFBF726] flex flex-col justify-between lg:w-[45%] md:w-[90%] w-[90vw] md:justify-self-center p-8 rounded-xl backdrop-blur-md">
        <p className="py-8 uppercase text-[#FCFBF7]">How It Works</p>
        <div className="flex flex-col  lg:gap-y-4  gap-y-2 py-2">
          <div className="grid md:text-[25px] md:leading-6 xl:leading-7 p-4 gap-4 bg-[#F2E8CF0A] border-[0.5px] border-[#FFFFFF40] rounded-md ">
            <span className="text-[#FCF8F0] font-alata text-[20px]">
              Connect Wallet{" "}
            </span>
            <div className="flex sm:text-[18px] leading-5">
              <span className="text-[#D8D6CF] font-merriweather">
                Start by connecting your Web3 wallet through decentralized
                access.{" "}
              </span>
              <Link
                href="/register"
                className="flex gap-x-2 relative animate-slideInLeft w-[50%] h-8 justify-end"
              >
                <p className="text-[#E0D8A8] hidden md:flex flex text-end self-center ">
                  Learn More
                </p>
                <Image src="/next.png" alt="next" width={"30"} height={"30"} />
              </Link>
            </div>
          </div>
          <div className="grid md:text-[25px] md:leading-6 xl:leading-7 p-4 gap-4 bg-[#F2E8CF0A] border-[0.5px] border-[#FFFFFF40] rounded-md">
            <span className="text-[#FCF8F0] font-alata text-[20px]">
              {" "}
              Find or Become an Artisan{" "}
            </span>
            <div className="flex sm:text-[18px] leading-5">
              <span className="text-[#D8D6CF] font-merriweather">
                Are you looking to hire an artisan or offer your skills? Select
                the option that fits you.{" "}
              </span>
              <Link
                href="/register"
                className="flex gap-x-2 relative animate-slideInLeft w-[50%] h-8 justify-end"
              >
                <p className="text-[#E0D8A8] hidden md:flex flex text-end self-center ">
                  Learn More
                </p>
                <Image src="/next.png" alt="next" width={"30"} height={"30"} />
              </Link>
            </div>
          </div>
          <div className="grid md:text-[25px] md:leading-6 xl:leading-7 p-4 gap-4  bg-[#F2E8CF0A] border-[0.5px] border-[#FFFFFF40] rounded-md ">
            <span className="text-[#FCF8F0] font-alata text-[20px]">
              Secure Payments
            </span>
            <div className="flex sm:text-[18px] leading-5 justify-between ">
              <span className="text-[#D8D6CF] font-merriweather">
                All transactions happen securely with cryptocurrency, ensuring a
                fast and trustless process.{" "}
              </span>
              <Link
                href="/register"
                className="flex gap-x-2 relative animate-slideInLeft w-[50%] h-8 justify-end"
              >
                <p className="text-[#E0D8A8] hidden md:flex flex text-end self-center ">
                  Learn More
                </p>
                <Image src="/next.png" alt="next" width={"30"} height={"30"} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:flex  md:w-[90%] w-[90vw] lg:h-full h-[40vh] md:h-[50vh] lg:w-[45%] relative md:justify-self-center">
        <Image
          src="/site.png"
          alt="An artisan"
          className="rounded-xl"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};
export default HowItWorks;
