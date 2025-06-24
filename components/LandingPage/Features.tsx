import { features } from "@/utils/features"
import Image from "next/image"

const Features = () => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-center p-4 md:px-[6.3vw] gap-4 font-merriweather">
      <div className="grid grid-cols-2 lg:contents gap-4 lg:gap-4 w-full">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col md:gap-4 gap-y-2 rounded-lg shadow-md bg-[#F2E8CF0A] border-[#FFFFFF40] border-[0.5px] backdrop-blur-[120px] px-4 md:px-8 py-4 
                      lg:flex-1 lg:w-auto w-full
                      h-[280px] md:h-[320px] lg:h-[400px]"
          >
            <div className="bg-[#AEFF0005] rounded-full border-1 shadow-lg md:w-24 w-16 h-16 md:h-24 flex items-center justify-center mb-2 md:mb-1 flex-shrink-0">
              <Image
                src={feature.icon || "/placeholder.svg"}
                alt={feature.title}
                width="56"
                height="56"
                className="self-center rounded-md"
              />
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <p className="font-alata text-lg md:text-xl lg:text-2xl leading-tight mb-2 md:mb-3 line-clamp-2">
                {feature.title}
              </p>
              <div className="relative flex-1 overflow-hidden">
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[#D8D6CF] overflow-y-auto pr-1 max-h-full">
                  {feature.details}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
