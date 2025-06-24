import Image from "next/image";

const MobileGallery = () => {
  const images = [
    { src: "/technician.png", alt: "Technician" },
    { src: "/carpenter.png", alt: "Carpenter" },
    { src: "/artist.png", alt: "Artist" },
    { src: "/baker.png", alt: "Baker" },
    { src: "/cobbler.png", alt: "Cobbler" },
    { src: "/carver.png", alt: "Statue Carver" },
    { src: "/weaver.png", alt: "Basket Weaver" },
    { src: "/potter.png", alt: "Potter" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Scrollable Thumbnails */}
      <div className="flex-1 overflow-x-scroll  flex items-center">
        <div className="flex gap-4 px-4 min-w-screen">
          {images.map((image) => (
            <div
              key={image.alt}
              className="cursor-pointer relative  w-[70vw] h-[40vh] py-4"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="shadow-md rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileGallery;
