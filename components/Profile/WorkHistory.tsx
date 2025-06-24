import { WorkHistory } from "@/utils/profile";

const Works = ({ works }: { works?: WorkHistory[] }) => {
  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-profile border border-[#FCFBF726] rounded-lg h-full gap-y-8 max-w-full  flex-col">
      <h3 className="text-2xl font-bold">Work History</h3>
      <div className="flex flex-col gap-8 px-4">
        {works?.map((work) => (
          <div key={work.detail} className="flex gap-x-4">
            <p className="h-4 w-4 p-2 rounded-full bg-[#AEFF00]"></p>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-xl">
                {work.title}
                ({work.start !== work.end
                  ? `${work.start}-${work.end}`
                  : work.end})
              </span>
              <div className="border-l-[3px] border-[#FCFBF726] px-4 md:w-[70%]  text-[#B5B4AD]">
                {work.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
