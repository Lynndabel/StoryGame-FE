const PreviewSkills = ({skills}: {skills: string[]}) => {
    return <div className="flex h-full font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-profile border border-[#FCFBF726] rounded-lg h-full gap-y-8  flex-col">
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Skills</h3>
          </div>
          <div className=" bg-[#F2E8CF0A] w-full h-fit border-[0.5px] p-4 h-40 rounded-md border-[#FCFBF726]  shadow-md shadow-[#00000040] gap-2">
            <div className="flex flex-wrap py-2 px-4 gap-x-2 gap-y-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center px-4 py-[4px] rounded-full border border-[#FFFFFF40] text-[#D8D6CF] text-sm font-bold  bg-[#26220826]"
              >
                {skill}
              </span>
            ))}
            </div>
          </div>
        
    </div>
}

export default PreviewSkills