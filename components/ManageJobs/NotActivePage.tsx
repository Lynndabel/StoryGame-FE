import React from 'react';
import Image from 'next/image';

const NoActiveJobs: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F2E8CF0A' }}>
      <div className="text-center max-w-md mx-auto px-6">
        {/* Image with faint yellow line underneath */}
        <div className="mb-8">
          <div className="inline-block">
            <Image
              src="/image 110.svg"
              alt="Feedback selection interface"
              width={200}
              height={150}
              className="mx-auto"
            />
            {/* Faint yellow line under the image */}
            <div 
              className="w-full h-px mt-4 mx-auto opacity-30"
              style={{ backgroundColor: '#FFD700' }}
            ></div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          You have no active jobs at the moment
        </h1>

        {/* Subtitle text */}
        <p className="text-gray-600 text-base mb-8 leading-relaxed">
          Once a client hires you, your jobs will appear here.<br />
          Keep an eye on your applications!
        </p>

        {/* Browse Jobs Button */}
        <button
          className="px-8 py-3 font-semibold text-black rounded-md hover:opacity-90 transition-opacity duration-200"
          style={{ backgroundColor: '#FFD700' }}
        >
          BROWSE JOBS
        </button>
      </div>
    </div>
  );
};

export default NoActiveJobs;