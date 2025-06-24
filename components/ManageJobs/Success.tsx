"use client";
import React from "react";
import Modal from "../Modal";

interface SuccessModalProps {
  onClose: () => void;
  onBrowseJobs?: () => void;
  onViewDispute?: () => void;
}

const Success: React.FC<SuccessModalProps> = ({
  onClose,
  onBrowseJobs,
  onViewDispute,
}) => {
  const handleBrowseJobs = () => {
    onBrowseJobs?.();
    onClose();
  };

  const handleViewDispute = () => {
    onViewDispute?.();
    onClose();
  };

  return (
    <Modal closeFn={onClose}>
      <div className="bg-[#3a3a3a] w-[480px] h-[580px] rounded-2xl p-8 relative shadow-2xl flex flex-col justify-between">
        {/* Main Content */}
        <div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white font-bold text-2xl tracking-wide">
              SUCCESSFUL
              <div className="w-24 h-1 bg-[#FFD700] mt-2"></div>
            </h1>
          </div>

          {/* Success Icon - Larger */}
          <div className="flex justify-center mb-8">
            <img 
              src="/market/GreenMark.svg" 
              alt="Success" 
              className="w-64 h-64"
            />
          </div>

          {/* Content - Larger and Better Styled */}
          <div className="text-center px-4">
            <p className="text-[#D1D5DB] text-xl leading-relaxed font-medium">
              Dispute raised successfully.
            </p>
            <p className="text-[#D1D5DB] text-xl leading-relaxed font-medium mt-2">
              Our support team will review it and respond within 
              <span className="text-[#FFD700] font-semibold"> 7 working days</span>.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBrowseJobs}
            className="bg-[#4A4A2A] text-[#F5F5DC] font-medium py-4 px-8 rounded text-base tracking-wide hover:opacity-90 transition-opacity"
          >
            BROWSE JOBS
          </button>
          <button
            onClick={handleViewDispute}
            className="bg-[#FFD700] text-[#1A1A1A] font-bold py-4 px-8 rounded text-base tracking-wide hover:opacity-90 transition-opacity"
          >
            VIEW DISPUTE
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Success;