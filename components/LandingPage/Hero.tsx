"use client"

import { useState, useEffect } from "react";
import FirstDesign from "./FirstDesign";
import SecondDesign from "./SecondDesign";

// Define a type for the design items
interface DesignItem {
  key: number;
  component: JSX.Element;
};

const Hero = () => {
  const [currentView, setCurrentView] = useState<number>(0); // 0 for first, 1 for second
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev === 0 ? 1 : 0)); // Toggle view
    }, 30000); // 30 seconds interval

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const designs: DesignItem[] = [{
    key: 0,
    component: <FirstDesign />
  }, {
    key: 1,
    component: <SecondDesign />
  }];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex transition-transform duration-1000`}
        style={{
          transform: `translateX(-${currentView * 100}%)`,
        }}
      >
        {designs.map(({key, component}) => (
          <div key={key} className={` min-w-full max-sm:h-[75vh] md:min-h-[80vh] lg:max-h-[100vh] no-scrollbar`}>
            {component}
          </div>
        ))}
      </div>

      <div className="absolute bottom-[5px] pt-2 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {designs.map(({key}) => (
          <button
            key={key}
            className={`w-3 h-3 rounded-full ${
              currentView === key ? "bg-[#FFD700]" : "bg-gray-400"
            }`}
            onClick={() => setCurrentView(key)} // Manual toggle
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
