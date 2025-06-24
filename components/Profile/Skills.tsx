const Skills = ({ skills }: { skills: string[] }) => {
  return (
    <div className="flex  font-merriweather h-full text-[#F9F1E2] p-4  bg-[#F2E8CF0A] gap-4 rounded-md  flex-col border border-[#FCFBF726]">
      <div className="flex justify-between">
        <h3 className="text-base">Skills</h3>
      </div>
      <div className="  w-full h-full  rounded-md ">
        <div className="flex flex-wrap p-2 gap-2">
          {skills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="flex items-center px-4 py-[4px] rounded-full border border-[#FFFFFF40] text-[#D8D6CF] text-sm font-bold bg-[#26220826]"
            >
              {skill}
            </span>
          ))}
          {skills.length > 6 && (
            <span className="flex items-center px-2 py-[4px] text-[#AEFF00] text-sm italic ">
              +{skills.length - 6} More
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
