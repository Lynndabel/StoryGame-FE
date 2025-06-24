//import HomeHeader from "../HomeHeader";
import MobileHeader from "../MobileHeader";
import MarketplaceHeader from "./FilterHeader";

interface Header {
  toggleFilter: () => void;
  isActive: (path: string) => boolean;
}

const MarketHeader = ({ toggleFilter, isActive }: Header) => {

  return (
    <div className="relative bg-header">
      <div className="hidden md:grid">
        <MarketplaceHeader isActive={isActive} />
      </div>
      <div className="grid md:hidden">
        <MobileHeader isActive={isActive} toggleFilter={toggleFilter} />
      </div>
    </div>
  );
};

export default MarketHeader;