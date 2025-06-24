import Image from 'next/image';

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Easy Payments - Text LEFT, Icon RIGHT */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex gap-4">
              <div className="flex-1 p-8">
                <h3 className="text-white text-3xl font-medium mb-4 leading-tight">
                  Easy Payments<br />In & Out
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Pay in crypto or local currency. Withdraw earnings however it suits you—securely and fast.
                </p>
              </div>
              <div 
                className="w-32 flex items-center justify-center"
                style={{ backgroundColor: '#F2E8CF0A' }}
              >
                <Image
                  src="/Group1.svg"
                  alt="Easy Payments"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
            </div>
          </div>
          
          {/* Smart Matching - Text LEFT, Icon RIGHT */}
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-12">
              <div className="flex-1">
                <h3 className="text-white text-3xl font-medium mb-4 leading-tight">
                  Smart Matching
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our platform recommends top artisans based on your project needs, location, and timeline—so you hire with confidence.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div 
                  className="w-28 h-28 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#F2E8CF0A' }}
                >
                  <Image
                    src="/Group2.svg"
                    alt="Smart Matching"
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Direct Communication - Icon LEFT, Text RIGHT */}
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-12">
              <div className="flex-shrink-0">
                <div 
                  className="w-28 h-28 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#F2E8CF0A' }}
                >
                  <Image
                    src="/Group3.svg"
                    alt="Direct Communication"
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white text-3xl font-medium mb-4 leading-tight">
                  Direct<br />Communication
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Message artisans directly to discuss job progress, share updates, and keep everything on track—all in one place.
                </p>
              </div>
            </div>
          </div>
          
          {/* Guaranteed Payments - Text LEFT, Icon RIGHT */}
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-12">
              <div className="flex-1">
                <h3 className="text-white text-3xl font-medium mb-4 leading-tight">
                  Guaranteed<br />Payments
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We hold funds securely until the job is done. No chasing, no delays—just peace of mind.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div 
                  className="w-28 h-28 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#F2E8CF0A' }}
                >
                  <Image
                    src="/Group4.svg"
                    alt="Guaranteed Payments"
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;