import React from "react";
import { FaCheck } from "react-icons/fa6";

const CheckIconWithText = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-2 items-start">
      <div className="flex items-center justify-center bg-themeBlue-200 text-themeBlue-900 w-6 aspect-square rounded-full">
        <FaCheck />
      </div>
      <p className="text-themeBlack-70 flex-1">{title}</p>
    </div>
  );
};

export default CheckIconWithText;
