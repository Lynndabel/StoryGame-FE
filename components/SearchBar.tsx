import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="flex border items-center justify-between border-[#FCFBF726] rounded-full w-full md:w-[300px] h-[40px] px-3 shadow-md bg-[#333333]">
      <div className="flex gap-2 w-[75%] font-merriweather">
        <select className="text-sm p-1 bg-inherit text-[#FFFFFFC7] focus:outline-none">
          <option value="client" className="bg-[#333333]">Clients</option>
          <option value="artisan" className="bg-[#333333]">Artisans</option>
        </select>
        <input 
          placeholder="Search"
          className="px-2 text-sm border-l border-[#FFFFFF73] text-[#B5B4AD] focus:outline-none flex-1 bg-inherit ml-2 pl-3"
        />
      </div>
      <button className="flex items-center justify-center text-[#D8D6CF] hover:text-yellow focus:text-yellow w-[20%] h-full relative font-merriweather">
        <div className="w-4 h-4 relative">
          <Image
            src="/search-normal.png"
            alt="search button"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
        <span className="hidden lg:flex text-xs ml-1"></span>
      </button>
    </div>
  );
};

export default SearchBar;