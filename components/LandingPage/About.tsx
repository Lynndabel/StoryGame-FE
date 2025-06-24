import Image from "next/image";

const About = () => {
  return (
    <div className="grid lg:grid-cols-2 p-4 gap-4 place-self-center self-center place-content-center md:h-full w-[90vw]  font-merriweather">
      <div className="h-[400px] md:h-[50vh] lg:h-full lg:col-span-1 md:w-full  relative ">
        <Image
          src="/about.png"
          alt="An artisan"
          className="rounded-xl"
          fill
          style={{ objectFit: 'cover' }}

        />
      </div>
      <div
        className="bg-about border-2 lg:col-span-1  md:border-1 border-[#FCFBF726] flex flex-col justify-between md:h-fit md:w-full px-8 md:py-4 md:justify-self-center rounded-xl backdrop-blur-[100px] z-10"
      >
        <p className="py-8 uppercase text-[#FCFBF7]">About</p>
        <div className="flex flex-col text-balance md:gap-y-4">
          <p className="font-alata text-[#F9F1E2] text-lg font-bold  md:text-4xl py-2">Crafted for Artisans, Trusted by Clients.</p>
          <div className="grid md:flex text-lg py-2  md:gap-4 md:py-4 ">
            <span>We understand that making the leap to digital can feel daunting. That’s why we built our platform with simplicity and safety at its core. Integrating user-friendly design with blockchain technology </span>
            <span>that ensures artisans can  confidently showcase their work, maintain ownership, and attract clients who value authenticity and craftsmanship. Your craft deserves to be seen. with us, you are accessible. </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
