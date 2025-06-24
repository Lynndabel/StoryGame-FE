import React from 'react';
import Image from 'next/image';

interface CoreValue {
  id: number;
  title: string;
  description: string;
}

const CoreValues: React.FC = () => {
  const coreValues: CoreValue[] = [
    {
      id: 1,
      title: "Trust First",
      description: "We build with trust at the center. From secure payments to clear communication and fair job processes."
    },
    {
      id: 3,
      title: "Craft Over Noise",
      description: "We value genuine skill and dedication over hype, spotlighting the quality of your craft, not just the noise."
    },
    {
      id: 2,
      title: "Equal Access",
      description: "We believe everyone deserves a seat at the table—regardless of location, background, or experience level."
    },
    {
      id: 4,
      title: "Growth-Minded",
      description: "We're here to support artisans in building sustainable careers, and they can grow with us. When you grow, we grow."
    }
  ];

  return (
    <section className="bg-[#333333] py-16 lg:py-24">
      <div className="w-full">
        {/* Title */}
        <div className="px-6 lg:px-12 xl:px-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semi-bold tracking-wide text-[#F9F1E2] mb-16 lg:mb-24">
            CORE VALUES
          </h2>
        </div>
        
        {/* Core Values Grid */}
        <div className="px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {coreValues.map((value) => (
              <div key={value.id} className="relative bg-[#F2E8CF0A] rounded-lg p-8 lg:p-10 xl:p-12 h-80 lg:h-96 xl:h-[420px] overflow-hidden hover:bg-[#F2E8CF15] transition-colors duration-300">
                {/* Yellow icon square */}
                <div className="bg-[#FFD700] w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 flex items-center justify-center mb-6 lg:mb-8">
                  <Image
                    src="/articon.svg"
                    alt="Core value icon"
                    width={24}
                    height={24}
                    className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7"
                  />
                </div>
                
                {/* Title */}
                <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-6 lg:mb-8 text-white">
                  {value.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#B0B0B0] text-sm lg:text-base xl:text-lg leading-relaxed">
                  {value.description}
                </p>
                
                {/* Large number overlay - positioned in bottom right */}
                <div className="absolute bottom-6 lg:bottom-8 xl:bottom-10 right-6 lg:right-8 xl:right-10 text-7xl lg:text-8xl xl:text-9xl font-bold text-[#F2E8CF29] opacity-20 lg:opacity-30 leading-none">
                  #{value.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;