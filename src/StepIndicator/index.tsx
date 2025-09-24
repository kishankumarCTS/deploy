import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

type StepIndicatorProps = {
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  isDisabled: boolean;
  onClick?: () => void;
};

const StepIndicator = ({
  title,
  isCompleted,
  isActive,
  isDisabled,
  onClick,
}: StepIndicatorProps) => {
  return (
    <div className="px-6 py-[18px] bg-themeWhite-900 rounded-[20px] justify-between gap-3 flex items-center justify-between cursor-pointer">
      <div className="flex items-center gap-2">
        <div
          className={`w-12 aspect-square text-2xl flex items-center justify-center rounded-full ${
            (isActive || isCompleted) && "text-themeWhite-900 bg-themeBlue-500"
          } ${
            isDisabled && !isActive && "text-themeBlack-50 bg-themeGray-100"
          }`}
        >
          <FaCheck />
        </div>
        <div className="text-themeBlack-100 title-large">{title}</div>
      </div>
      <div className="text-3xl">
        {isActive ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
      </div>
    </div>
  );
};

export default StepIndicator;
