"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

// Define a type for the design items
interface ArtisanImage {
  title: string;
  src: string;
}

const designs: ArtisanImage[] = [
  { title: "Jewelry Designers", src: "/artisans/jeweler.png" },
  { title: "Metalworkers", src: "/artisans/blacksmith.png" },
  { title: "Tailor", src: "/artisans/tailor.png" },
  { title: "Baker", src: "/artisans/baker.png" },
];

const galleryButton: string[] = [
  "Jewelry Designers and Metalworkers",
  "Tailor and Baker",
];

interface Gallery {
  currentView: number;
  setCurrentView: React.Dispatch<React.SetStateAction<number>>;
}

const GalleryButton = ({ currentView, setCurrentView }: Gallery) => {
  return (
    <div className="flex gap-x-2">
      {galleryButton.map((button, index) => (
        <button
          key={button}
          className={`w-3 h-3 rounded-full ${currentView === index ? "bg-[#FFD700]" : "bg-white"} `}
          onClick={() => setCurrentView(index)} // Manual toggle
        />
      ))}
    </div>
  );
};

const Artisans = () => {
  const [currentView, setCurrentView] = useState<number>(0); // 0 for first, 1 for second

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev === 1 ? 0 : prev + 1)); // Toggle view
    }, 15000); // 30 seconds interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full md:w-[90%] justify-self-center md:px-2 md:px-1 overflow-x-hidden">
      <h4 className="font-alata text-[30px] md:text-[4vw] lg:text-[3vw] text-[#F9F1E2] p-4 md:p-0">
        Artisan Categories
      </h4>
      <div
        className={`flex gap-x-4 transition-transform duration-100 min-w-screen md:w-[180vw] w-[200vw] py-4 max-md:px-2 items-center `}
        style={{
          transform: `translateX(-${currentView * 50}%)`,
        }}
      >
        {designs.map((design) => (
          <div
            key={design.title}
            className=" relative h-[40vh] md:h-[60vh] w-full md:w-[45vw] md:px-8"
          >
            <Image
              src={design.src}
              alt={design.title}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="shadow-md rounded-md"
            />
            <p className="absolute top-4 left-4 px-4 py-2 text-[#FCFBF7] bg-[#F2E8CF0A] border-[0.23px] border-[#FFFFFF40] backdrop-blur-[54.42px] capitalize lg:min-w-24 text-center">
              {design.title}
            </p>
          </div>
        ))}
      </div>

      <div className="relative  justify-center  left-1/2 transform -translate-x-1/2  flex space-x-2">
        <GalleryButton
          currentView={currentView}
          setCurrentView={setCurrentView}
        />{" "}
      </div>
    </div>
  );
};

export default Artisans;
