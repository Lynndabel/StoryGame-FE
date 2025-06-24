"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import AnimatedDiv from "./AnimatedDiv";

export default function AnimatedWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <AnimatedDiv
        key={pathname}
        initialX={"0"}
        animateX={0}
        duration={0.5}
      >
        {children}
      </AnimatedDiv>
    </AnimatePresence>
  );
}
