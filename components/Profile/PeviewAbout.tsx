import { AboutProps } from "@/utils/profile";

const PreviewAbout = ({ about }: { about: AboutProps }) => {
  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-profile border border-[#FCFBF726] rounded-lg  gap-y-8 flex-col">
        <h3 className="text-2xl font-bold">About</h3>
      <div className="flex flex-col px-2  items-center  text-start gap-y-4 lg:gap-y-8">
        <h3 className=" font-alata w-full pr-4 text-2xl md:text-3xl font-bold">
          {about.title}{" "}
        </h3>{" "}
        <p className="md:text-[20px] text-justify lg:columns-2 gap-8 lg:gap-16">
          {about.desc}
        </p>
      </div>
    </div>
  );
};

export default PreviewAbout;
