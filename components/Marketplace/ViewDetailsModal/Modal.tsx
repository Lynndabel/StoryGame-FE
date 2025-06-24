"use client";

import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ModalProps {
  children: ReactNode;
  closeFn: () => void;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  children, 
  closeFn, 
  showCloseButton = true 
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeFn();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [closeFn]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeFn();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="relative max-h-[95vh] max-w-[95vw] overflow-hidden">
          {showCloseButton && (
            <button
              onClick={closeFn}
              className="absolute top-4 right-4 z-10 p-2 bg-[#262208] hover:bg-[#3a3012] transition-colors rounded-full"
              aria-label="Close modal"
            >
              <Image
                src="/market/coin.svg"
                alt="Close"
                width={16}
                height={16}
                className="rotate-45"
              />
            </button>
          )}
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;