import React from "react";
import { IconAndTextProps } from "./types";
import Image from "next/image";

const IconAndText = ({
  onClick,
  svgIconSrc,
  title,
  isActive,
}: IconAndTextProps) => {
  return (
    <div
      className={`flex gap-[18px] items-center px-[18px] py-4 rounded-2xl bg-themeBlue-50 w-full cursor-pointer border-2 ${
        isActive ? "border-themeBlue-500" : "border-themeBlue-50"
      }`}
      onClick={onClick}
    >
      <Image src={svgIconSrc} alt="switch icon" />
      <p className="title-large">{title}</p>
    </div>
  );
};

export default IconAndText;
