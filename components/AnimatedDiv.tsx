"use client";

import { ReactNode, MouseEventHandler } from "react";
import { motion } from "framer-motion";

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  initialX?: number | string;
  animateX?: number | string;
  exitX?: number | string;
  initialY?: number | string;
  animateY?: number | string;
  exitY?: number | string;
  duration?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedDiv = ({
  children,
  className = "",
  initialX = "0",
  animateX = 0,
  exitX = "0",
  initialY = "0",
  animateY = 0,
  exitY = "0",
  duration = 0.5,
  onClick,
}: AnimatedDivProps) => {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY }}
      animate={{ x: animateX, y: animateY }}
      exit={{ x: exitX, y: exitY }}
      transition={{ duration, ease: "easeInOut" }}
      className={`${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
