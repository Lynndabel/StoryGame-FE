"use client";
import { sponsors } from "@/utils/sponsors";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Sponsors = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let animationFrameId: number;

    const smoothScroll = () => {
      container.scrollLeft += 4;

      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="bg-[#26220826] flex gap-x-16 min-w-screen overflow-x-scroll h-36 w-full items-center justify-start"
    >
      {sponsors.map((sponsor) => (
        <Image
          src={sponsor.image}
          key={sponsor.name}
          alt={sponsor.name}
          width="241"
          height="91"
        />
      ))}
    </div>
  );
};

export default Sponsors;
