"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import Success from "./Success";

interface DisputeConfirmationModalProps {
  onCancel: () => void;
}

const DisputeConfirmationModal: React.FC<DisputeConfirmationModalProps> = ({
  onCancel,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onCancel(); // Close the entire modal flow
  };

  if (showSuccess) {
    return <Success onClose={handleSuccessClose} />;
  }

  return (
    <Modal closeFn={onCancel}>
      <div className="bg-[#333333] w-[90vw] max-w-md rounded-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-white font-bold text-xl border-b-2 border-yellow-400 pb-1">
            CONFIRM DISPUTE SUBMISSION
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <p className="text-[#D8D6CF] leading-relaxed">
            Once submitted, this dispute will be reviewed by our support team
            and may temporarily pause job progress and payments.
          </p>
          
          <p className="text-[#D8D6CF] leading-relaxed">
            Do you want to continue?
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
            onClick={handleConfirm}
            className="bg-[#FFD700] text-[#1A1203] font-bold py-3 px-6 rounded hover:opacity-90 transition-opacity flex-1"
          >
            YES, CONTINUE
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DisputeConfirmationModal;