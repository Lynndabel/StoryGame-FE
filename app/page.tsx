import {
  Features,
  Header,
  Hero,
  Sponsors,
  About,
  Artisans,
  HowItWorks,
  FooterLinks,
  Community,
  Faqs,
} from "@/components/LandingPage";
import { socials } from "@/utils/socials";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen overflow-hidden bg-[#333333] text-white">
      <main className="w-screen md:grid">
        <div className="fixed bg-[#333333] z-50 backdrop-blur-3xl bg-opacity-100 ">
          <Header />
        </div>
        <section id="home" className="relative pt-16">
          <Hero />
        </section>
        <Sponsors />
        <section id="features">
          <Features />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="howItWorks" className="pb-8">
          <HowItWorks />
        </section>
        <div className="relative bottom-16 lg:bottom-0 py-8 md:mb-16 flex flex-col bg-[#F2E8CF0A] lg:w-[90vw] w-screen  items-center justify-self-center self-center h-[80vh] lg:rounded-lg   ">
          <p className="font-alata md:text-[56px] text-[35px] text-center text-[#F9F1E2]">
            Getting Started is Easy!
          </p>
          <p className="font-merriweather text-center text-[20px] text-[#D8D6CF md:w-[50%] px-4 md:px-1">
            Watch this quick video to learn how to showcase your skills, find
            clients, and grow your business on Craftlink.
          </p>
          <p className="flex gap-x-2 items-center font-merriweather text-center text-[16px] text-[#E0D8A8] py-8">
            Watch Now to Get Started!{" "}
            <Image src="/down.png" alt="about" width={"40"} height={"40"} />
          </p>
          <div className="relative flex justify-center md:h-[100%] h-[70%] md:w-[80%] w-[90%]">
            <Image
              src={"/getStarted.png"}
              alt={"intro video"}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="shadow-lg rounded-lg"
            />
          </div>
        </div>
        <Artisans />
        <div className="flex justify-center">
          <div className="flex flex-col relative bg-[#FFD700] items-center md:w-[90%] min-h-[45vh] h-fit w-[95vw] rounded-md  py-4 my-4">
            <Image
              src="/bg-blend.png"
              alt="background blend"
              fill
              className="z-20 opacity-70 mix-blend-overlay"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <p className="uppercase items-start font-merriweather text-center text-[#0D0800] py-8">
              {" "}
              Hire Artisians
            </p>
            <p className="text-[#0D0800] font-alata text-[24px] sm:text-[40px] md:text-[4vw] self-center text-center w-[80%] md:w-[60%] py-8  md:leading-[60px] lg:leading-[4vw]">
              {" "}
              Ready to Transform Your Projects?
            </p>
            <button className="bg-[#262208] text-[#FCF8E3] self-center uppercase sm:w-[25%] md:w-[20%] lg:w-[15%] shadow-sm rounded-sm p-4">
              Get Started
            </button>
          </div>
        </div>
      </main>
      <div className="relative md:flex  flex-col bg-blend-overlay">
        <Faqs />

        <div className="hidden md:flex absolute pointer-events-none right-0 top-4 self-end h-[40vh] w-[35vw]">
          <Image
            src="/bg-square1.png"
            alt="background grid"
            fill
            className="opacity-40 "
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className=" hidden absolute top-1/2 self-start left-16  pointer-events-none md:flex h-[40vh] w-[35vw] z-0">
          <Image
            src="/bg-square1.png"
            alt="background grid"
            fill
            className=" opacity-40"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
      <div className="relative z-10">
    <Community />
  </div>

  <footer
  id="resources"
  className="flex md:bg-faq flex-col lg:flex-row gap-y-8 gap-x-4 py-4 lg:px-16 lg:p-4 lg:h-[50vh] justify-center items-center rounded-md"
>
  {/* Left container */}
  <div className="bg-footer flex-grow w-[90vw] md:w-[90%] lg:w-[35%] h-full justify-center lg:h-[90%] border-[1px] p-8 border-[#FCFBF726] rounded-lg">
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
      <div className="flex gap-x-4 justify-center items-center lg:self-center border-[0.74px] border-[#FFFFFF40] rounded-xl drop-shadow-md md:h-[70px] h-[85px] w-fit md:max-w-[30vw] lg:min-w-[25vw] xl:min-w-[40%]  px-[5px] md:px-[1vw]">
        {socials.map((social) => (
          <Link  href={social.link} key={social.socialsType}>
            <Image
              alt={social.socialsType}
              src={social.imageSrc}
              width="45"
              height="45"
              className="bg-[#FFD7001A] rounded-md p-[0.5vw]"
            />
          </Link>
        ))}
      </div>
    </div>
  </div>

  {/* Right container */}
  <div className="flex flex-col flex-grow w-[90vw] md:w-[90%] h-full gap-y-2 lg:h-[90%]">
    <div className="grid grid-cols-2 lg:flex bg-footer gap-y-4 max-lg:items-center justify-center lg:justify-between border-[1px] lg:h-[70%] p-8 border-[#FCFBF726] rounded-lg">
      <FooterLinks />
    </div>
    <div className="bg-footer flex font-merriweather items-center px-4 text-[#9A9992] text-sm justify-between h-24 lg:h-[30%] rounded-lg border-[1px] border-[#FCFBF726]">
      <span>All rights reserved</span>
      <span>© Copyright 2024</span>
    </div>
  </div>
</footer>

    </div>
  );
}
