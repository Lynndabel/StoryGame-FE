import { Job } from "@/utils/job";
import Image from "next/image";

interface Details {
  detailValue: string;
  imgSrc: string;
}

const OngoingProjects = ({ project }: { project: Job }) => {
  const details: Details[] = [
    {
      imgSrc: "/money.png",
      detailValue: `$${project.price}`,
    },
    {
      imgSrc: "/calendar.png",
      detailValue: `${project.projectDuration.weeks} weeks`,
    },
  ];
  return (
    <div className="text-[#F9F1E2] font-merriweather bg-[#F2E8CF0A] p-4 md:p-8 rounded-xl flex h-full flex-col">
      <div className="flex w-full justify-between">
        <h3 className="text-2xl font-bold">Ongoing Projects</h3>
        <button className="bg-[#262208] rounded-md flex items-center px-[10px] py-[6px] gap-x-2">
          View All
        </button>
      </div>
      <div>
        <div className="flex gap-8 w-full justify-between">
          <div className="flex flex-col ">
            <div>
              <div className="flex flex-col  text-start py-4 gap-y-4">
                <div className="flex flex-col w-fit gap-x-[22px]">
                  <h3 className=" font-alata text-3xl font-bold">
                    {project.title}{" "}
                  </h3>
                  <div className=" py-2 font-merriweather w-full self-start flex flex-wrap  gap-4">
                    {details.map((detail) => (
                      <div key={detail.detailValue} className={`flex gap-2`}>
                        <div className="flex gap-x-2 self-center relative h-[22px] w-[22px]">
                          <Image
                            src={detail.imgSrc}
                            alt={detail.detailValue}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="capitalize  self-center text-start text-[#F9F1E2]">
                          {detail.detailValue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-lg">{project.projectDescription}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-wrap py-2 gap-x-2 gap-y-4">
                {project.skillCategory?.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center px-4 py-[8px] rounded-full border border-[#FFFFFF40] text-[#D8D6CF] text-sm font-bold  bg-[#26220826]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:flex relative left-8 self-end items-end justify-end  h-[35vh] w-[35vw]">
            <Image
              src={"/style.png"}
              alt="Profile status"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "right bottom",
              }}
              className="opacity-50"
            />
          </div>
        </div>

        <div className="py-2">
          <div className="backdrop-blur-[120px] rounded-md bg-[#F2E8CF0A] border-[0.5px] px-2 py-4 border-[#FCFBF726] shadow-md shadow-[#00000040]">
            <div className="opacity-100 px-2">
              <p className="text-[#FCFBF7]">ATTACHED FILES</p>
              <div className="flex flex-wrap  min-w-full md:min-w-[25vw] max-w-fit gap-x-2 h-[15vh] py-2">
                {project.files.map((file) => (
                  <div key={file} className="relative h-[80%] w-[20%]">
                    <Image
                      src={file}
                      alt="Attached file"
                      fill
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                ))}
                {project.images.map((file) => (
                  <div key={file} className="relative h-[80%] w-[20%]">
                    <Image
                      src={file}
                      alt="Attached file"
                      fill
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingProjects;
