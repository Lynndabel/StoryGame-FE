import { Job } from "@/utils/job";
import Image from "next/image";

interface Details {
  detailValue: string;
  imgSrc: string;
}

const ProjectDetails = ({ project }: { project: Job }) => {
  const details: Details[] = [
    {
      imgSrc: "/money.png",
      detailValue: `$${project.price}`,
    },
    {
      imgSrc: "/calendar.png",
      detailValue:`${project.projectDuration.weeks} weeks`,
    },
    {
      imgSrc: "/expertise.png",
      detailValue: project.experienceLevel,
    },
  ];

  const hasAttachments = project.files.length > 0 || project.images.length > 0;
  return (
    <div className="text-[#F9F1E2] font-merriweather bg-[#F2E8CF0A] p-4 md:p-8 rounded-xl flex  flex-col justify-between">
      <div className="flex w-full justify-between">
        <h3 className="text-2xl">Project Details</h3>
        <div className="bg-[#262208] rounded-full flex items-center px-[10px] py-[6px] gap-x-2">
          Edit{" "}
          <span className="relative h-[28px] w-[28px] rounded-full bg-[#F2E8CF0A]">
            <Image
              src={"/edit.png"}
              alt="pen"
              fill
              className="object-contain p-2"
            />
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-col lg:grid lg:grid-cols-5 md:gap-8 xl:gap-16 w-full justify-between">
          <div className="flex flex-col col-span-3">
            <div className=" py-2 font-merriweather w-full self-start flex flex-wrap  gap-2">
              {details.map((detail, index) => (
                <div
                  key={detail.detailValue}
                  className={`flex gap-2 p-2 ${
                    index === details.length - 1 && details.length % 2 !== 0
                      ? "col-span-2"
                      : ""
                  }`}
                >
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
            <div>
              <div className="flex flex-col  text-start py-4 gap-y-4">
                <div className="flex w-fit gap-x-[22px]">
                  <h3 className=" font-alata text-3xl font-bold">
                    {project.title}{" "}
                  </h3>{" "}
                  <span className="relative md:right-4 flex h-8 w-8 rounded-full bg-[#F2E8CF0A]">
                    <Image
                      src={"/edit.png"}
                      alt="pen"
                      fill
                      className="object-contain p-2"
                    />
                  </span>
                </div>
                <p className="text-lg">{project.projectDescription}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 pt-8">
              <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Required Skills</h3>
                <div className="bg-[#262208] rounded-full flex items-center px-[10px] py-[6px] gap-x-2">
                  Edit{" "}
                  <span className="relative h-[28px] w-[28px] rounded-full bg-[#F2E8CF0A]">
                    <Image
                      src={"/edit.png"}
                      alt="pen"
                      fill
                      className="object-contain p-2"
                    />
                  </span>
                </div>
              </div>
              <div className=" bg-[#F2E8CF0A] w-full h-fit border-[0.5px] p-4 rounded-md border-[#FCFBF726]  shadow-md shadow-[#00000040] gap-2">
                <div className="flex flex-wrap py-2 px-4 gap-x-2 gap-y-4">
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
          </div>
          <div className="bg-[#F2E8CF0A] w-full h-fit relative col-span-2 lg:top-12 p-4 py-8 rounded-xl flex  gap-y-4 flex-col">
            <div className="flex justify-between">
              <h3 className="text-2xl font-bold">References</h3>
              <span className="relative h-[28px] w-[28px] rounded-full bg-[#F2E8CF0A]">
                <Image
                  src={"/edit.png"}
                  alt="pen"
                  fill
                  className="object-contain p-2"
                />
              </span>
            </div>
            <div className="backdrop-blur-[120px] rounded-xl border-[0.5px] px-2 py-4 border-[#FCFBF726] shadow-md shadow-[#00000040]">
              <div className="opacity-100">
                <p className="text-[#FCFBF7]">ATTACHED FILES</p>
                {hasAttachments ? (
                  <div className="flex flex-wrap min-w-[25vw] max-w-[35vw] gap-x-2 h-[15vh] py-2">
                    {project.files.map((file) => (
                      <div key={file} className="relative h-[80%] w-[20%]">
                        <Image
                          src={file}
                          alt="Attached file"
                          fill
                          sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 7vw"
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
                          sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 7vw"
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[15vh] text-[#FCFBF7] opacity-50">
                    NO FILES ATTACHED
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;
