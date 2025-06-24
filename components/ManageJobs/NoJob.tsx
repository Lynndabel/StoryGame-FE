import Image from "next/image";
import useIsArtisan from '@/hooks/Registry/useIsArtisan';
// import useIsClient from '@/hooks/Registry/useIsClient';

interface NoJobProps {
  title: string;
  desc: string;
  imageSrc: string;
  jobType: string;
}

const NoJob = ({ title, desc, imageSrc, jobType }: NoJobProps) => {
  const isArtisan = useIsArtisan();
  // const isClient = useIsClient();

  // Determine content based on user type
  const getContent = () => {
    if (isArtisan) {
      return {
        title: "No Active Jobs Yet",
        desc: "",
        imageSrc: "/man.svg",
        buttonText: "POST JOB",
        showDesc: false
      };
    } else {
      return {
        title: title,
        desc: desc,
        imageSrc: imageSrc,
        buttonText: "BROWSE JOBS",
        showDesc: true
      };
    }
  };

  const content = getContent();

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#F2E8CF0A' }}
    >
      <div className="grid font-merriweather text-[#F9F1E2] text-center py-8 lg:py-16 gap-y-8 justify-self-center w-[80%] md:w-[70%] lg:w-[40%] items-center">
        <span>
          <p className="font-bold text-2xl">{content.title}</p>
          {content.showDesc && <p>{content.desc}</p>}
        </span>
        
        <div className="place-self-center relative h-[50vh] w-[70%]">
          <Image
            src={content.imageSrc}
            alt="No job"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
          {/* Faint yellow line under the image */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px opacity-30"
            style={{ backgroundColor: '#FFD700', top: '100%', marginTop: '1rem' }}
          ></div>
        </div>

        {jobType !== "disputed" && (
          <button 
            className="justify-self-center md:w-[40%] rounded-md text-[#1A1203] px-4 py-2 font-bold font-merriweather hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: '#FFD700' }}
          >
            {content.buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default NoJob;