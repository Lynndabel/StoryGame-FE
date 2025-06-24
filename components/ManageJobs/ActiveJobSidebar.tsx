// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
// import { FaCheck } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

// const Filter = () => {
  
//   // Define custom filter sections for this component to match screenshot
//   const customFilterSections = [
//     {
//       filter: "Status",
//       options: ["Accepted", "In Progress", "Pending Start"],
//       type: "checkbox"
//     },
//     {
//       filter: "Location", 
//       options: ["Remote", "On-site", "Hybrid"],
//       type: "dropdown"
//     },
//     {
//       filter: "Sort By",
//       options: ["Date", "Price", "Relevance"],
//       radioOptions: ["Most Recent", "Oldest"],
//       type: "mixed"
//     }
//   ];
  
//   const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({
//     "Status": true,
//     "Location": true, 
//     "Sort By": true,
//   });

//   // Status checkboxes state
//   const [statusChecked, setStatusChecked] = useState<{ [key: string]: boolean }>({
//     "Accepted": true,
//     "In Progress": false,
//     "Pending Start": false,
//   });

//   // Location dropdown state
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

//   // Sort By states
//   const [selectedSortCategory, setSelectedSortCategory] = useState("");
//   const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
//   const [sortByChecked, setSortByChecked] = useState<{ [key: string]: boolean }>({
//     "Most Recent": true,
//     "Oldest": false,
//   });

//   const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       Object.keys(dropdownRefs.current).forEach(key => {
//         if (dropdownRefs.current[key] && !dropdownRefs.current[key]?.contains(event.target as Node)) {
//           setLocationDropdownOpen(false);
//           setSortDropdownOpen(false);
//         }
//       });
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const toggleFilter = (filterName: string) => {
//     setOpenFilters((prevState) => ({
//       ...prevState,
//       [filterName]: !prevState[filterName],
//     }));
//   };

//   const handleStatusCheck = (option: string) => {
//     setStatusChecked((prevState) => ({
//       ...prevState,
//       [option]: !prevState[option]
//     }));
//   };

//   const handleSortByRadio = (option: string) => {
//     const updatedChecked = { ...sortByChecked };
//     Object.keys(updatedChecked).forEach(key => {
//       updatedChecked[key] = false;
//     });
//     updatedChecked[option] = true;
//     setSortByChecked(updatedChecked);
//   };

//   const selectLocationOption = (option: string) => {
//     setSelectedLocation(option);
//     setLocationDropdownOpen(false);
//   };

//   const selectSortOption = (option: string) => {
//     setSelectedSortCategory(option);
//     setSortDropdownOpen(false);
//   };

//   const handleReset = () => {
//     setStatusChecked({
//       "Accepted": true,
//       "In Progress": false,
//       "Pending Start": false,
//     });
//     setSelectedLocation("");
//     setSelectedSortCategory("");
//     setSortByChecked({
//       "Most Recent": true,
//       "Oldest": false,
//     });
//     setLocationDropdownOpen(false);
//     setSortDropdownOpen(false);
//   };

//   const filterHeight = 'calc(100vh - 216px)';

//   return (
//     <div className="max-sm:py-4">
//       <style jsx>{`
//         .filter-container {
//           background-color: #F2E8CF0A;
//           border-width: 0px 1px 1px 1px;
//           border-style: solid;
//           border-color: #FCFBF726;
//         }

//         .checkbox-container {
//           background-color: #0C0C0D0D;
//         }
        
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #6b7280 transparent;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #6b7280;
//           border-radius: 10px;
//           height: 40px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #9ca3af;
//         }

//         .cards-container {
//           width: 400px;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           height: 100vh;
//         }

//         .filter-card {
//           width: 400px !important;
//           max-width: 400px !important;
//         }

//         .custom-dropdown {
//           position: relative;
//         }

//         .dropdown-button {
//           background-color: #333333;
//           border: 1px solid #4a5568;
//           border-radius: 0.375rem;
//           padding: 0.5rem 0.75rem;
//           width: 100%;
//           text-align: left;
//           color: #d1d5db;
//           cursor: pointer;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .dropdown-button:focus {
//           outline: none;
//           border-color: #6b7280;
//         }

//         .dropdown-menu {
//           position: absolute;
//           top: 100%;
//           left: 0;
//           right: 0;
//           z-index: 50;
//           background-color: #333333;
//           border: 1px solid #4a5568;
//           border-radius: 0.375rem;
//           margin-top: 0.25rem;
//           max-height: 200px;
//           overflow-y: auto;
//           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//         }

//         .dropdown-option {
//           padding: 0.5rem 0.75rem;
//           color: #d1d5db;
//           cursor: pointer;
//           transition: background-color 0.15s ease-in-out;
//         }

//         .dropdown-option:hover {
//           background-color: #F9F1E21C !important;
//           color: white;
//         }
//       `}</style>
      
//       <div className="cards-container">
        
//         <div 
//           className="filter-container filter-card rounded-md shadow-md px-2 overflow-y-scroll custom-scrollbar"
//           style={{ height: filterHeight, width: '400px', maxWidth: '400px' }}
//         >
//           {/* Header */}
//           <div className="flex justify-between px-2 py-4">
//             <span className="font-bold text-white text-xl">
//               Filter
//             </span>
//             <button 
//               onClick={handleReset}
//               className="gap-x-2 flex self-center hover:opacity-80 transition-opacity"
//             >
//               <span className="font-bold text-white text-sm">
//                 RESET
//               </span>
//               <div className="w-5 h-5 rounded-full flex items-center justify-center self-center" style={{ backgroundColor: '#FAB427' }}>
//                 <IoClose size={12} className="text-black" />
//               </div>
//             </button>
//           </div>
          
//           {/* Filter Sections */}
//           <div className="w-full flex flex-col gap-y-4 p-4">
//             {customFilterSections.map((section, index) => (
//               <div className={index < customFilterSections.length - 1 ? "py-2 border-b border-gray-700" : "py-2"} key={section.filter}>
//                 {/* Filter Header */}
//                 <button
//                   className="flex w-full justify-between"
//                   onClick={() => toggleFilter(section.filter)}
//                 >
//                   <span className="font-bold text-white">
//                     {section.filter}
//                   </span>
//                   {openFilters[section.filter] ? (
//                     <RiArrowDropUpLine size={24} className="text-white" />
//                   ) : (
//                     <RiArrowDropDownLine size={24} className="text-white" />
//                   )}
//                 </button>
                
//                 {/* Filter Content */}
//                 {openFilters[section.filter] && (
//                   <div className="px-2 mt-2">
//                     {/* Status - Checkboxes */}
//                     {section.filter === "Status" && (
//                       <div className="space-y-3 checkbox-container p-4 rounded-md border border-[#FCFBF726]">
//                         {section.options.map((option) => (
//                           <div key={option} className="flex gap-4">
//                             <div className="relative h-[20px] w-[20px]">
//                               <input
//                                 type="checkbox"
//                                 onChange={() => handleStatusCheck(option)}
//                                 checked={statusChecked[option]}
//                                 className="appearance-none h-[20px] w-[20px] border-2 rounded-sm p-2 checked:border-0 checked:bg-green-500 border-gray-500"
//                               />
//                               {statusChecked[option] && (
//                                 <FaCheck
//                                   size={12}
//                                   color={"white"}
//                                   className="absolute top-[4px] left-[4px] pointer-events-none"
//                                 />
//                               )}
//                             </div>
//                             <span className="text-gray-300">{option}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* Location - Dropdown */}
//                     {section.filter === "Location" && (
//                       <div className="checkbox-container p-2 rounded-md border border-[#FCFBF726]">
//                         <div 
//                           className="custom-dropdown"
//                           ref={el => dropdownRefs.current["Location"] = el}
//                         >
//                           <button
//                             type="button"
//                             className="dropdown-button"
//                             onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
//                           >
//                             <span>
//                               {selectedLocation || "Select category"}
//                             </span>
//                             <RiArrowDropDownLine 
//                               className={`text-gray-400 transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} 
//                               size={16} 
//                             />
//                           </button>
                          
//                           {locationDropdownOpen && (
//                             <div className="dropdown-menu">
//                               {section.options.map((option) => (
//                                 <div
//                                   key={option}
//                                   className="dropdown-option"
//                                   onClick={() => selectLocationOption(option)}
//                                 >
//                                   {option}
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {/* Sort By - Mixed dropdown + checkboxes */}
//                     {section.filter === "Sort By" && (
//                       <div className="space-y-4 checkbox-container p-4 rounded-md border border-[#FCFBF726]">
//                         {/* Sort Category Dropdown */}
//                         <div 
//                           className="custom-dropdown"
//                           ref={el => dropdownRefs.current["SortBy"] = el}
//                         >
//                           <button
//                             type="button"
//                             className="dropdown-button"
//                             onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
//                           >
//                             <span>
//                               {selectedSortCategory || "Select category"}
//                             </span>
//                             <RiArrowDropDownLine 
//                               className={`text-gray-400 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} 
//                               size={16} 
//                             />
//                           </button>
                          
//                           {sortDropdownOpen && (
//                             <div className="dropdown-menu">
//                               {section.options.map((option) => (
//                                 <div
//                                   key={option}
//                                   className="dropdown-option"
//                                   onClick={() => selectSortOption(option)}
//                                 >
//                                   {option}
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>

//                         {/* Sort Radio Options */}
//                         {section.radioOptions?.map((option) => (
//                           <div key={option} className="flex gap-4">
//                             <div className="relative h-[20px] w-[20px]">
//                               <input
//                                 type="checkbox"
//                                 onChange={() => handleSortByRadio(option)}
//                                 checked={sortByChecked[option]}
//                                 className="appearance-none h-[20px] w-[20px] border-2 rounded-sm p-2 checked:border-0 checked:bg-green-500 border-gray-500"
//                               />
//                               {sortByChecked[option] && (
//                                 <FaCheck
//                                   size={12}
//                                   color={"white"}
//                                   className="absolute top-[4px] left-[4px] pointer-events-none"
//                                 />
//                               )}
//                             </div>
//                             <span className="text-gray-300">{option}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;