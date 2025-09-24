import React from "react";
import os from "@/assets/images/os.png";
import Image from "next/image";
import CheckIconWithText from "./CheckIconWithText";
import { FaCheck } from "react-icons/fa6";
import { OSCardData } from "@/app/dashboard/instance/types";

interface OperatingSystemCardProps {
  data: OSCardData;
  onClick?: () => void;
  selected?: boolean;
}

const OperatingSystemCard: React.FC<OperatingSystemCardProps> = ({
  data,
  onClick,
  selected,
}) => {
  return (
    <div
      className={`px-5 py-3 rounded-xl bg-themeBlue-50 max-w-[380px] rounded-xl border-[2px] w-full cursor-pointer ${
        selected ? "border-themeBlue-500" : "border-themeBlue-50"
      } relative`}
      onClick={onClick}
    >
      <div
        className={`absolute w-6 aspect-square rounded-full bg-themeBlue-300 text-themeBlue-900 flex items-center justify-center right-6 top-6 ${
          !selected && "opacity-10"
        }`}
      >
        <FaCheck />
      </div>
      <div className="flex gap-[18px] items-center">
        <Image src={os} alt="os image" height={80} width={80} />
        <div>
          <h4 className="title-medium">{data.osName}</h4>
          <p className="label-medium text-themeSlate-600">{data.osVersion}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-1">
        {data.planBenifits.map((benefit) => (
          <CheckIconWithText key={benefit.id} title={benefit.label} />
        ))}
      </div>
      <div className="text-themeBlack-70 mt-3">
        <p>{data.architecture}</p>
        <p>{data.lastUpdate}</p>
      </div>
    </div>
  );
};

export default OperatingSystemCard;
