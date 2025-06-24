"use client";
import React from "react";
import Link from "next/link";

interface ArtisanSignupModalProps {
  onCancel: () => void;
  onSignIn?: () => void;
}

const ArtisanSignupModal: React.FC<ArtisanSignupModalProps> = ({
  onCancel,
}) => {
  return (
    <div className="bg-[#333333] w-[90vw] max-w-md rounded-xl p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-white font-bold text-xl border-b-2 border-yellow-400 pb-1">
          WANT TO APPLY? Join as an Artisan
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
          Only artisans can apply for jobs. To continue, please sign in or create 
          an artisan account.
        </p>
        
        <p className="text-[#D8D6CF] leading-relaxed">
          Switching to an artisan profile lets you showcase your skills and 
          connect with clients who need your craft.
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
        <Link
          href="/role/artisans/signin"
          className="text-[#1A1203] font-bold py-3 px-6 rounded hover:opacity-90 transition-opacity flex-1 text-center"
          style={{ backgroundColor: '#FFD700' }}
        >
          SIGN IN
        </Link>
      </div>
    </div>
  );
};

export default ArtisanSignupModal;