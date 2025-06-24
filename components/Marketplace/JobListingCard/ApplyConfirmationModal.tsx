"use client";
import React from "react";

interface ApplyConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  craftCoinsRequired?: number;
}

const ApplyConfirmationModal: React.FC<ApplyConfirmationModalProps> = ({
  onCancel,
  onConfirm,
  craftCoinsRequired = 50
}) => {
  return (
    <div className="bg-[#333333] w-[90vw] max-w-md rounded-xl p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-white font-bold text-xl border-b-2 border-yellow pb-1">
          READY TO APPLY?
        </h1>
        <button
          onClick={onCancel}
          className="text-[#B5B4AD] hover:text-white text-2xl"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-8">
        <p className="text-[#D8D6CF] leading-relaxed">
          Application requires{" "}
          <span className="font-semibold" style={{ color: "#FAB427" }}>
            {craftCoinsRequired} CraftCoins
          </span>
          .
        </p>
        <p className="text-[#D8D6CF] leading-relaxed">
          You are about to apply for this job. Make sure you have reviewed the job
          details and are confident in your skills.
        </p>
        <p className="text-[#D8D6CF] leading-relaxed">
          Once you apply, the client will review your profile to decide if you are
          the right fit.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="bg-[#262208] text-[#FCF8E3] font-medium py-3 px-6 rounded hover:opacity-90 transition-opacity"
        >
          CANCEL
        </button>
        <button
          onClick={onConfirm}
          className="text-[#1A1203] font-bold py-3 px-6 rounded hover:opacity-90 transition-opacity flex-1"
          style={{ backgroundColor: '#FFD700' }}
        >
          YES, APPLY FOR JOB
        </button>
      </div>
    </div>
  );
};

export default ApplyConfirmationModal;