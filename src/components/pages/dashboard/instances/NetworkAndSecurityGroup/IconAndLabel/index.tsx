import React from "react";

const IconAndLabel = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`flex items-center gap-[18px] bg-themeBlue-100 w-full px-[18px] py-4 rounded-xl cursor-pointer border-2 ${
        isActive ? "border-themeBlue-500" : "border-themeBlue-100"
      }`}
      onClick={onClick}
    >
      <div className="w-[72px] aspect-square rounded-full bg-themeBlack-10"></div>
      <div className="title-large">{label}</div>
    </div>
  );
};

export default IconAndLabel;
