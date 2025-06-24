import { PortfolioProps } from "@/utils/profile";
import Image from "next/image";

const PreviewPortfolio = ({ portfolio }: { portfolio: PortfolioProps[] }) => {
  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-profile border border-[#FCFBF726] rounded-lg h-full gap-y-8 max-w-full  flex-col">
        <h3 className="text-2xl font-bold">Portfolio</h3>
      <div className="min-w-screen flex overflow-x-scroll gap-x-4">
        {portfolio.map((project) => (
          <div
            key={project.imgSrc[0]}
            className="bg-[#F2E8CF0A] rounded-lg h-[45vh] min-w-[90%] md:min-w-[35%] md:max-w-[50%] lg:min-w-[20%] 2xl:max-w-[25%] flex flex-col items-start px-4 py-2 md:p-2 gap-y-4"
          >
            <span className="relative h-[20vh] md:h-[70%] w-full">
              <Image
                src={project.imgSrc[0]}
                alt="Project image"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </span>
            <h3 className="font-bold text-lg md:text-2xl px-2 text-[#F9F1E2]">
              {project.title}
            </h3>
            <p className="text-[#B5B4AD] px-2">{project.desc}</p>
            <div className="flex justify-between w-full pb-4 ">
              <div>
                Duration: <span className="font-bold">{project.duration}</span>
              </div>
              <div className="flex gap-x-2">
              <div
                className="flex gap-x-2 relative  h-8 justify-end"
              >
                <p className="text-[#E0D8A8] hidden md:flex flex text-end self-center ">
                  Learn More
                </p>
                <Image src="/next.png" alt="next" width={"30"} height={"30"} />
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPortfolio;
