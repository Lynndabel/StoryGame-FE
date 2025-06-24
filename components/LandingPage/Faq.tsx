"use client";
import { Faq } from "@/utils/faq";
import { useState } from "react";

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number): void => {
      setActiveIndex(activeIndex === index ? null : index);
    };

  return (
    <div className="flex justify-center py-4 ">
    <div className="flex flex-col gap-y-4 justify-between items-center py-8 px-4 md:px-8 w-[90%] h-fit border border-[#FCFBF726] rounded-md bg-faq z-30 ">
      <h4>FAQ</h4>
      <p className="font-alata text-[#FCFBF7] text-center text-3xl md:w-[50%]">
        Got Questons? We&apos;ve Got Answers!
      </p>
      <div className="grid gap-y-4 w-[90%] md:w-[70%] lg:w-[50%]">
        {Faq.map((faq, index) => (
          <div
            key={faq.question}
            className="flex flex-col rounded-md bg-[#F2E8CF0A] border border-[#FFFFFF40]"
          >
            <button
              className="flex justify-between p-4  items-center w-full py-4 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium  px-2">{faq.question}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ${
                  activeIndex === index ? "grid" : "hidden"
                }`}
              >
                <p className=" text-base px-4 pb-4">{faq.answer}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
export default Faqs;
