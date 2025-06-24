import React from "react";
import Image from "next/image";

interface NoJobsPageProps {
  onBrowseJobs?: () => void;
}

const NoJobsPage: React.FC<NoJobsPageProps> = ({ onBrowseJobs }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center shadow-xl">
        {/* Illustration */}
        <div className="mb-6">
          {/* Using a fixed size for the illustration container */}
          <div className="w-32 h-32 mx-auto relative">
            <Image
              src="/market/image 110.svg"
              alt="No active jobs illustration"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-white mb-6">
          <h2 className="text-xl font-semibold mb-3">
            You have no active jobs at the moment
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Once a client hires you, your jobs will appear here.
            <br />
            Keep an eye on your applications!
          </p>
        </div>

        {/* Browse Jobs Button */}
        <button
          onClick={onBrowseJobs}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 uppercase text-sm tracking-wide"
        >
          Browse Jobs
        </button>
      </div>
    </div>
  );
};

// Alternative version without full page background (for embedding in existing layouts)
export const NoJobsCard: React.FC<NoJobsPageProps> = ({ onBrowseJobs }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center shadow-xl mx-auto">
      {/* Illustration */}
      <div className="mb-6">
        <div className="w-32 h-32 mx-auto relative mb-6">
          <Image
            src="/market/image 110.svg"
            alt="No active jobs illustration"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="text-white mb-6">
        <h2 className="text-xl font-semibold mb-3">
          You have no active jobs at the moment
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Once a client hires you, your jobs will appear here.
          <br />
          Keep an eye on your applications!
        </p>
      </div>

      {/* Browse Jobs Button */}
      <button
        onClick={onBrowseJobs}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 uppercase text-sm tracking-wide"
      >
        Browse Jobs
      </button>
    </div>
  );
};

// Example usage as a page
const App: React.FC = () => {
  const handleBrowseJobs = () => {
    console.log("Navigate to browse jobs page");
    // Add your navigation logic here
  };

  return <NoJobsPage onBrowseJobs={handleBrowseJobs} />;
};

export default App;
