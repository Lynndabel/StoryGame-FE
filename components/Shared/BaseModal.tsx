// components/shared/BaseModal.tsx
"use client";
import React, { ReactNode } from "react";
import Link from "next/link";

interface BaseModalProps {
  title: string;
  content: ReactNode[];
  onCancel: () => void;
  cancelText?: string;
  primaryButton: {
    text: string;
    type: 'button' | 'link';
    action?: () => void;
    href?: string;
    className?: string;
  };
  titleBorderColor?: string;
  className?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  title,
  content,
  onCancel,
  cancelText = "CANCEL",
  primaryButton,
  titleBorderColor = "border-yellow",
  className = ""
}) => {
  const renderPrimaryButton = () => {
    const defaultButtonClasses = "text-[#1A1203] font-bold py-3 px-6 rounded hover:opacity-90 transition-opacity flex-1 text-center";
    const buttonClasses = primaryButton.className || defaultButtonClasses;
    const buttonStyle = { backgroundColor: '#FFD700' };

    if (primaryButton.type === 'link' && primaryButton.href) {
      return (
        <Link
          href={primaryButton.href}
          className={buttonClasses}
          style={buttonStyle}
        >
          {primaryButton.text}
        </Link>
      );
    }

    return (
      <button
        onClick={primaryButton.action}
        className={buttonClasses}
        style={buttonStyle}
      >
        {primaryButton.text}
      </button>
    );
  };

  return (
    <div className={`bg-[#333333] w-[90vw] max-w-md rounded-xl p-6 relative ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h1 className={`text-white font-bold text-xl border-b-2 pb-1 ${titleBorderColor}`}>
          {title}
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
        {content.map((paragraph, index) => (
          <div key={index}>
            {paragraph}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="bg-[#262208] text-[#FCF8E3] font-medium py-3 px-6 rounded hover:opacity-90 transition-opacity"
        >
          {cancelText}
        </button>
        {renderPrimaryButton()}
      </div>
    </div>
  );
};

export default BaseModal;