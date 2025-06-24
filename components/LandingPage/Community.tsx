const Community = () => {
  return (
    <div className="bg-[#26220826] md:rounded-md w-[100vw] md:px-[5vw] p-8 mt-4 font-merriweather">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left side - Text content */}
        <div className="flex-1">
          <p className="text-sm md:text-base text-[#F9F1E2] mb-4">CONNECT, COLLABORATE, CREATE</p>
          <h2 className="font-alata text-2xl md:text-4xl lg:text-5xl text-[#F9F1E2] leading-tight">
            Join Our Artisan Community
          </h2>
        </div>
        
        {/* Right side - Email signup form */}
        <div className="flex-1 max-w-md">
          <label className="block text-sm md:text-base text-[#F9F1E2] mb-2">
            Email Address
          </label>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 h-12 rounded-sm px-4 text-base focus:outline-[#1A1203] placeholder:text-[#D8D6CF] bg-[#F2E8CF0A] border border-[#F2E8CF0A]"
            />
            <button className="bg-[#FFD700] text-[#1A1203] font-bold h-12 px-6 rounded-sm whitespace-nowrap">
              JOIN FOR FREE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;