import { formatDate } from "@/utils/formatDate";
import { Job } from "@/utils/job";
import Image from "next/image";

const CompletedProjects = ({ projects }: { projects: Job[] }) => {
  return (
    <div className="text-[#F9F1E2] font-merriweather bg-[#F2E8CF0A] p-2 md:p-8 rounded-xl gap-y-4 flex h-full flex-col">
      <div className="flex w-full justify-between py-4">
        <h3 className="text-xl font-bold">Completed Projects</h3>
        <button className="bg-[#262208] rounded-md flex items-center px-[10px] py-[6px] gap-x-2">
          View All
        </button>
      </div>
      {projects.slice(0, 2).map((project) => (
        <div
          key={formatDate(project.createdAt)}
          className="bg-profile max-sm:border-[0.5px] max-sm:border-[#FCFBF726] rounded-md p-4"
        >
          <div className="flex gap-8 w-full justify-between">
            <div className="flex flex-col ">
              <div className="flex flex-col  text-start py-4 gap-y-4">
                <div className="flex flex-col w-fit gap-x-[22px]">
                  <h3 className=" font-alata text-xl md:text-3xl font-bold">
                    {project.title}{" "}
                  </h3>
                  <div className=" py-2 font-merriweather w-full self-start flex flex-wrap  gap-4">
                    <div className={`flex gap-2`}>
                      <div className="flex gap-x-2 self-center relative h-[22px] w-[22px]">
                        <Image
                          src={"/money.png"}
                          alt="amount"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="capitalize italic  self-center text-start text-[#F9F1E2]">
                        ${project.price}
                      </span>
                    </div>
                    <div className={`flex gap-2`}>
                      <div className="flex gap-x-2 self-center relative h-[22px] w-[22px]">
                        <Image
                          src={"/calendar.png"}
                          alt={"timeline"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="capitalize italic  self-center text-start text-[#F9F1E2]">
                        Completed in {project.projectDuration.weeks} weeks
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span>Completed by:</span>
                  <span className="text-[#D8D6CF]">
                    {project.client.walletAddress.slice(0, 6)}...
                    {project.client.walletAddress.slice(21)}
                  </span>{" "}
                  <button className="bg-[#262208] space-x-2 rounded-md md:rounded-full text-[#FCF8E3] py-2 px-4">
                    View Profile
                  </button>
                </div>
                <div className="flex  text-sm items-center justify-start gap-x-2">
                  <Image
                    src={"/star.png"}
                    alt={"star"}
                    width="22"
                    height="22"
                  />
                  <span className="flex self-center items-center italic font-bold text-[#F9F1E2]">
                    {project.rating}/5
                  </span>
                  <p className=" text-[#D8D6CF]">
                    {project.completedBy?.review}
                  </p>
                </div>
              </div>
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
      ))}
    </div>
  );
};

export default CompletedProjects;
