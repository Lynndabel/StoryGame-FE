"use client";

import { IoCheckmark, IoChatbubbleEllipses } from "react-icons/io5";

interface HireSuccessModalProps {
  onManageJob: () => void;
  onStartChat: () => void;
  artisanName: string;
}

const HireSuccessModal = ({
  onManageJob,
  onStartChat,
  artisanName,
}: HireSuccessModalProps) => {
  return (
    <div className=" rounded-lg p-8 w-full text-[#F9F1E2] font-merriweather relative text-center">
  
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#F9F1E2] mb-1">SUCCESSFUL</h2>
        <div className="w-16 h-1 bg-yellow rounded mx-auto"></div>
      </div>

      {/* Success Icon */}
      <div className="relative mb-8">
        {/* Decorative dots around the badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 relative">
            {/* Small decorative dots */}
            <div className="absolute top-4 left-12 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <div className="absolute bottom-4 right-12 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <div className="absolute top-6 left-16 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <div className="absolute bottom-6 right-16 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <div className="absolute top-12 left-6 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <div className="absolute bottom-12 right-6 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Main success badge with scalloped edges */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          {/* Scalloped badge background */}
          <div className="absolute inset-0 bg-green-500 rounded-full"></div>

          {/* Scalloped edge decorations */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full"></div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full"></div>
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full"></div>
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full"></div>

          <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>

          {/* Checkmark */}
          <IoCheckmark className="h-12 w-12 text-white relative z-10" />
        </div>
      </div>

      {/* Success Message */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#F9F1E2] mb-4">
          You&apos;ve Hired {artisanName}!
        </h3>
        <p className="text-[#B5B4AD] text-sm leading-relaxed">
          The artisan has been notified, and your payment is securely held in
          escrow. You can now chat, share files, and track progress from manage
          jobs.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onManageJob}
          className="flex-1 bg-[#1A1A1A] text-[#F9F1E2] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-[#2A2A2A] transition-colors"
        >
          Manage Job
        </button>
        <button
          onClick={onStartChat}
          className="flex-1 bg-yellow text-[#1A1203] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-yellow/90 transition-colors flex items-center justify-center gap-2"
        >
          <IoChatbubbleEllipses className="h-4 w-4" />
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default HireSuccessModal;
