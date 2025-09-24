import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/CustomSelect";
import React, { Dispatch, SetStateAction } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { getTooltipData } from "./utils";
import { OptionsTypes } from "./types";
import { LoadBalancerTypes } from "../../../types";

const SelectAlgorithmProtocol = ({
  setLoadBalancerData,
  tooltipMessage,
  options,
  title,
  placeholder,
  value,
  type,
}: {
  setLoadBalancerData: Dispatch<SetStateAction<LoadBalancerTypes>>;
  tooltipMessage?: string;
  options: OptionsTypes[];
  title: string;
  placeholder: string;
  value: any;
  type?: string;
}) => {
  const handleValueChange = (value: string) => {
    setLoadBalancerData((prev: LoadBalancerTypes) => {
      if (
        type === "lb_algorithm" ||
        type === "protocol" ||
        type === "session_persistence"
      ) {
        return {
          ...prev,
          default_pool: {
            ...prev.default_pool,
            [type]: value,
          },
        };
      }

      if (type === "method" || type === "healthProtocol") {
        return {
          ...prev,
          healthMonitorDetails: {
            ...prev.healthMonitorDetails,
            [type === "healthProtocol" ? "protocol" : type]: value,
          },
        };
      }

      return {
        ...prev,
      };
    });
  };
  return (
    <div>
      <div className="mb-2">
        <label className="label-large">{title}</label>
        <div className="group relative inline-block text-red-500 ml-1">
          <IoMdInformationCircleOutline className="cursor-pointer" />
          <div className="absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[200px] -translate-x-1/2 scale-0 transform rounded bg-gray-800 p-2 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            {tooltipMessage}
          </div>
        </div>
      </div>
      <Select onValueChange={handleValueChange} value={value}>
        <SelectTrigger className="w-[100%] !h-[54px] p-3 title-medium leading-normal font-semibold text-themeBlack-50 text-opacity-80 bg-white rounded-[10px] border border-[#DDD] truncate">
          <SelectValue placeholder={placeholder} className="text-gray-400" />
        </SelectTrigger>
        <SelectContent className="w-full title-small text-[#0E1726] text-opacity-80 bg-themeWhite-900 border-none shadow-md truncate">
          {options.map((item: OptionsTypes) => (
            <SelectItem key={item.id} value={item.label} className="text-wrap">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectAlgorithmProtocol;
