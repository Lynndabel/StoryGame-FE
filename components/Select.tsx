"use client";
import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FilterProps } from "@/utils/filters";

const Select = ({
  filters,
  placeholder,
  onSelect,
}: {
  filters: FilterProps;
  placeholder: string;
  onSelect?: (value: string) => void;
}) => {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [checkedOption, setCheckedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("Others");

  const toggleFilter = () => setOpenFilters((prev) => !prev);

  const handleCheck = (option: string) => {
    setCheckedOption((prev) => (prev === option ? null : option));

    if (option === "Others") {
      onSelect?.(customInput);
    } else {
      onSelect?.(option);
    }

    toggleFilter();
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInput(e.target.value);
    if (checkedOption === "Others") {
      onSelect?.(e.target.value);
    }
  };

  const selected = () => {
    if (checkedOption) {
      if (checkedOption === "Others") {
        return customInput;
      }
      return checkedOption;
    }
    return placeholder;
  };

  return (
    <div className="py-2 grid gap-y-2 w-full">
      <span className="font-merriweather font-bold text-[#F9F1E2]">
        {filters.filter}
      </span>
      <button
        className="flex  w-full justify-between"
        onClick={() => toggleFilter()}
      >
        <div
          className={`flex items-center justify-between bg-[#F2E8CF29] py-2 px-4 text-start w-full rounded-md border border-[#FCFBF726] relative ${
            checkedOption ? "text-[#F9F1E2]" : " text-[#B5B4AD]"
          }`}
        >
          {selected()}
          {openFilters ? (
            <RiArrowDropUpLine size={32} color={"#B5B4AD"} />
          ) : (
            <RiArrowDropDownLine size={32} color={"#B5B4AD"} />
          )}
        </div>
      </button>
      {openFilters && (
        <div className="px-2 relative bottom-2">
          <ul className="w-full p-4 border-b-md shadow-md bg-[#26220826] border-t-0 border-[#FCFBF726] space-y-2">
            {filters?.options.map((option) => (
              <li key={option} className="flex gap-4">
                <div className="relative h-[20px] w-[20px]">
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(option)}
                    checked={checkedOption === option}
                    className=" appearance-none h-[20px] w-[20px] border-2 rounded-full p-2 checked:border-0 checked:bg-[#04DF76] border-[#9A9992]"
                  />
                  {checkedOption === option && (
                    <FaCheck
                      size={12}
                      color={"#111A00"}
                      className="absolute top-[5px] left-[5px]"
                      onClick={() => handleCheck(option)}
                    />
                  )}
                </div>
                {option}
              </li>
            ))}
            {checkedOption === "Others" && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Please specify..."
                  value={customInput}
                  onChange={handleCustomInputChange}
                  className="w-full px-4 py-2 border rounded-md bg-inherit placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#04DF76]"
                />
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
