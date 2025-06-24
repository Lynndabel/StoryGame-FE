import Image from "next/image";
import Link from "next/link";
import Button from "../OutlineButton";
import MobileGallery from "./MobileGallery";
import { useState, useEffect, useRef } from "react";
import { links } from "@/utils/links";

const SecondDesign = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const curr = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (curr) {
      observer.observe(curr);
    }

    return () => {
      if (curr) {
        observer.unobserve(curr);
      }
    };
  }, []);
  return (
    <div className="flex flex-col bg-[url('/bg.png')] h-full">
      <div className="bg-[#333333] bg-opacity-80 h-full">
        <div className="flex justify-between md:p-4">
          <p
            ref={ref}
            className={`font-alata text-balance self-center  text-[#F9F1E2] text-[37px] md:text-[95px] relative md:right-8 lg:right-[3vw] 2xl:right-[5vw]  text-center md:leading-[100px] py-8 lg:py-2 md:w-[80vw] lg:w-full px-4  ${
              inView ? "animate-slideInLeft" : ""
            } `}
          >
            Empower Your <span className="text-[#FFD700]">Crafts</span>, Connect
            with Clients.{" "}
              <Link href={links.browseJob} className="text-base relative bottom-2 lg:bottom-4">
                <Button text="Visit Marketplace" />
              </Link>
          </p>
          <Image
            src="/bg-square.png"
            alt="background"
            width="80"
            height="50"
            className="w-[20%] hidden lg:flex relative right-16"
          />
        </div>
        <div
          className={`hidden md:flex md:px-4 lg:px-1 justify-center ${
            inView ? "animate-slideInRight" : ""
          }`}
        >
          <Image src="/crafts.png" alt="Crafts" width="1200" height="80" />
        </div>
        <div className={`md:hidden  ${inView ? "animate-slideInLeft" : ""}`}>
          <MobileGallery />
        </div>
        <div className="flex md:justify-between justify-center py-8">
          <div className="self-end hidden md:flex">
            {" "}
            <Link
              href="#about"
              className="flex relative left-8 px-4 gap-x-2 animate-slideInLeft"
            >
              <Image src="/down.png" alt="about" width={"40"} height={"40"} />
              <p className="text-[#E0D8A8] self-center uppercase">Learn More</p>
            </Link>
          </div>
          <p
            className={`max-sm:hidden w-[85%] md:w-[45%] text-balance font-merriweather text-[20px] lg:text-[25px] text-[#FCFBF7] relative md:right-8 ${
              inView ? "animate-slideInRight" : ""
            }`}
          >
            {" "}
            Whether you’re a seasoned artisan or exploring new horizons, and
            need a secure space for your craft to shine and form meaningful
            connections with clients who appreciate your work.{" "}
            <span className="p-2 text-[16px]"></span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SecondDesign;
