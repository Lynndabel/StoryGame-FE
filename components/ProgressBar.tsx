"use client";

import React from "react";

type ProgressBarProps = {
  totalSteps: number; 
  currentStep: number;
};

const ProgressBar = ({ totalSteps, currentStep }: ProgressBarProps) => {
  return (
    <div className="flex items-center justify-start w-full my-4 gap-x-2">
      {/* Progress Bar Steps */}
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber <= currentStep;

        return (
          <div key={index} className="flex items-center">
            {/* Circle */}
          
            {index < totalSteps - 1 && (
              <div
                className={`h-[4px] w-10 ${
                  isCompleted ? "bg-[#AEFF00]" : "bg-[#9A9992]"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
