import Image from "next/image";
import Button from "../OutlineButton";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { links } from "@/utils/links";

const FirstDesign = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const curr = ref.current
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
    <div className="relative h-full">
      <Image
        src="/carpentry.png"
        alt="background image"
        fill
        style={{ objectFit: "cover", objectPosition: "50% 22%" }}
        priority
      />
      <div className="absolute inset-0 flex flex-col gap-y-4 md:gap-y-8 justify-center items-center bg-primary h-[100%] self-end ">
        <p
          ref={ref}
          className={`lg:w-[50%] font-alata  text-balance text-[#F9ECD4] text-[34px]  md:text-[95px] relative  text-center md:leading-[100px] ${
            inView ? "animate-slideInLeft" : ""
          } `}
        >
          The Perfect Place to{" "}
          <span className="border-b-4 border-[#FFD700]">Hire</span> or{" "}
          <span className="border-b-4 border-[#FFD700]">Get Hired</span>
        </p>
        <p
          className={`md:max-w-[45%] max-sm:leading-8  text-[25px] font-merriweather bottom-24 text-center px-4  ${
            inView ? "animate-slideInRight" : ""
          }`}
        >
          Connect with skilled artisans or find the clients you’ve been waiting
          for securely and effortlessly.
        </p>
        <div className="animate-slideInLeft">
        <Link  href={links.browseJob}>
          <Button text="Visit Marketplace" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FirstDesign;
