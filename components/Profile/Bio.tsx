import { AboutProps } from "@/utils/profile";

const Bio = ({ about }: { about: AboutProps }) => {

  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-[#F2E8CF0A] rounded-lg gap-y-8 md:gap-y-4 flex-col h-full border border-[#FCFBF726]">
      <div className="flex justify-between items-center">
        <h3 className="text-sm">Bio</h3>
       
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-start gap-4">
          <div className="">
            <p className="text-[#F9F1E2] leading-relaxed">{about.desc}</p>
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default Bio
