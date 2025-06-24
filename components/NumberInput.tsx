"use client";
import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import Input from "./Input";

interface NumberInputProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleIncrease = () => {
    const newValue = Math.min(currentValue + step, max);
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleDecrease = () => {
    const newValue = Math.max(currentValue - step, min);
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) newValue = min;
    newValue = Math.max(Math.min(newValue, max), min);
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md w-32 overflow-hidden">
      <Input
        type="number"
        value={currentValue}
        onChange={handleChange}
        placeholder={"0"}
      />
      <div className="flex flex-col border-l border-gray-300">
        <button
          onClick={handleIncrease}
          className="flex-1 px-2 hover:bg-gray-200 active:bg-gray-300"
        >
          <FiChevronUp />
        </button>
        <button
          onClick={handleDecrease}
          className="flex-1 px-2 hover:bg-gray-200 active:bg-gray-300"
        >
          <FiChevronDown />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
