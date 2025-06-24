"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FilterProps } from "@/utils/filters";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

const Filter = ({ filters }: { filters: FilterProps[] }) => {
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});

  const initialCheckedState: { [key: string]: boolean } = {};
  filters.forEach(({ options }) => {
    options.forEach((option) => {
      initialCheckedState[option] = false;
    });
  });

  const [checked, setChecked] = useState<{ [key: string]: boolean }>(
    initialCheckedState
  );

  const toggleFilter = (filterName: string) => {
    setOpenFilters((prevState) => ({
      ...prevState,
      [filterName]: !prevState[filterName],
    }));
  };

  const handleCheck = (option: string) => {
    setChecked((prevState) => {
      return { ...prevState, [option]: !prevState[option] };
    });
  };

  return (
    <div className="max-sm:py-4">
      <div
        className="bg-[#F2E8CF0A]  grid rounded-md border h-full shadow-md border-[#FCFBF726] px-2 w-[92%] md:w-full"
      >
        <div className="flex justify-between px-2 py-4">
          <span className="font-merriweather text-[#F9F1E2] font-bold">
            Filter
          </span>
          <div className="gap-x-2 flex items-start ">
            <span className="font-merriweather text-[#FAEED4] font-bold">
              RESET
            </span>
            <div className="relative h-[20px] w-[20px] ">
              <Image
                src="/reset.png"
                alt="reset"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
                className="absolute right-0"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-4 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FCFBF726] ">
          {filters.map(({ filter, options }) => (
            <div className="py-2" key={filter}>
              <button
                className="flex  w-full justify-between"
                onClick={() => toggleFilter(filter)}
              >
                <span className="font-merriweather font-bold text-[#F9F1E2]">
                  {filter}
                </span>
                {openFilters[filter] ? (
                  <RiArrowDropUpLine size={32} />
                ) : (
                  <RiArrowDropDownLine size={32} />
                )}
              </button>
              {openFilters[filter] && (
                <div className="px-2 mt-2">
                  <div className="flex justify-between bg-[#F2E8CF0A] text-[#B5B4AD] py-2 px-4 rounded-md border rounded-b-none border-b-0 border-[#FCFBF726]">
                    Select category
                    <RiArrowDropDownLine size={24} color={"#B5B4AD"} />
                  </div>
                  <ul className="w-full p-4 border rounded-md shadow-md bg-[#26220826] border-t-0 rounded-t-none border-[#FCFBF726] space-y-2">
                    {options.map((option) => (
                      <li key={option} className="flex gap-4 capitalize">
                        <div className="relative h-[20px] w-[20px]">
                          <input
                            type="checkbox"
                            onChange={() => handleCheck(option)}
                            checked={checked[option]}
                            className=" appearance-none h-[20px] w-[20px] border-2 rounded-sm p-2 checked:border-0 checked:bg-[#04DF76] border-[#9A9992]"
                          />
                          {checked[option] && (
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
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
