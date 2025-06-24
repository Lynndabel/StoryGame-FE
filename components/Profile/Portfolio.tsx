import { PortfolioProps } from "@/utils/profile";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import AnimatedDiv from "@/components/AnimatedDiv";
import EditPortfolio from "./EditModals/EditPortfolio";

const Portfolio = ({ portfolio }: { portfolio: PortfolioProps[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioProps>();

  useEffect(() => {
    if (portfolioData) {
      portfolio.push(portfolioData);
      setPortfolioData(undefined);
    }
  }, [portfolio, portfolioData]);

  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-[#F2E8CF0A] rounded-lg h-full gap-y-8 max-w-full  flex-col">
      <div className="flex justify-between">
        <h3 className="text-2xl">Portfolio</h3>
        <div className=" flex items-center gap-x-2">
          <span className="relative h-[32px] w-[32px] rounded-full bg-[#262208]">
            <Image
              src={"/link.png"}
              alt="pen"
              fill
              className="object-contain p-2"
            />
          </span>
          <button
            className="hidden bg-[#262208] rounded-full md:flex  text-sm items-center px-[10px] py-[6px] gap-x-2"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Portfolio{" "}
            <span className="bg-[#F2E8CF0A]  rounded-full w-[18px] h-[18px] text-lg flex justify-center items-center">
              +
            </span>{" "}
          </button>
          <span className="bg-[#262208]  rounded-full h-[32px] w-[32px] text-xl flex text-[#FCFBF7] md:hidden justify-center items-center">
            +
          </span>{" "}
        </div>
      </div>
      <div className="min-w-screen flex overflow-x-scroll gap-x-4">
        {portfolio.map((project) => (
          <div
            key={project.imgSrc[0]}
            className="bg-[#F2E8CF0A] rounded-lg h-[45vh] lg:h-fit min-w-[90%] md:min-w-[35%] md:max-w-[50%] lg:min-w-[20%] lg:max-w-[42%] 2xl:max-w-[25%] flex flex-col items-start px-4 py-2 md:p-2 gap-y-4"
          >
            <span className="relative h-[20vh] md:h-[40vh] w-full ">
              <Image
                src={project.imgSrc[0]}
                alt="Project image"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </span>
            <h3 className="font-bold text-lg md:text-xl px-2 text-[#F9F1E2]">
              {project.title}
            </h3>
            <p className="text-[#B5B4AD] px-2 text-sm">{project.desc}</p>
            <div className="flex justify-between w-full  ">
              <div>
                Duration:{" "}
                <span className="font-bold">{project.duration}</span>
              </div>
              <div className="flex gap-x-2">
                <span className="relative h-[32px] w-[32px] rounded-full bg-[#F2E8CF0A]">
                  <Image
                    src={"/trash.png"}
                    alt="pen"
                    fill
                    className="object-contain p-2"
                  />
                </span>
                <span className="relative h-[32px] w-[32px] rounded-full bg-[#F2E8CF0A]">
                  <Image
                    src={"/edit-2.png"}
                    alt="pen"
                    fill
                    className="object-contain p-2"
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal closeFn={() => setIsModalOpen(false)}>
          <AnimatedDiv
            initialX="200%"
            animateX={0}
            exitX={"-100%"}
            duration={0.5}
            className="bg-[#333333] border border-[#FCFBF726] md:w-[40vw] h-[90vh] rounded-xl p-4 relative  "
          >
            <div className="h-[90%]  overflow-y-scroll">
              <EditPortfolio
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={setPortfolioData}
              />
            </div>
          </AnimatedDiv>
        </Modal>
      )}
    </div>
  );
};

export default Portfolio;
