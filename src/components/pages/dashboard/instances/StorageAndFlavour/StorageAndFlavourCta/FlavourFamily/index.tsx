import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/CustomSelect";
import React from "react";
import FlavourFamilyCard from "../../../FlavourFamilyCard";

const FlavourFamily = () => {
  const options = [
    { id: 1, label: "General Compute" },
    { id: 2, label: "Normal Compute" },
  ];
  const storageInfoForCard = {
    title: "aabc",
    iops: "abc",
    size: "256",
    throughput: "string",
  };
  return (
    <div className="mt-6">
      <div className="title-large mb-4">Select Flavor Family</div>
      <Select defaultValue="General Compute">
        <SelectTrigger className="w-[100%] !h-[50px] p-3 title-medium leading-normal font-semibold text-[#0E1726] text-opacity-80 bg-white rounded-[10px] border border-[#DDD] shadow-[0_1px_0_0_#DDD,0_2px_2px_0_rgba(0,0,0,0.05)] truncate max-w-[340px]">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent className="w-full title-small text-[#0E1726] text-opacity-80 bg-themeWhite-900 border-none shadow-md truncate">
          {options.map((item) => (
            <SelectItem key={item.id} value={item.label} className="text-wrap">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-4 flex flex-col gap-3">
        <FlavourFamilyCard />
        <FlavourFamilyCard
          isStorageCard={true}
          storageInfoCard={storageInfoForCard}
        />
        <FlavourFamilyCard
          isStorageCard={true}
          storageInfoCard={storageInfoForCard}
        />
      </div>
    </div>
  );
};

export default FlavourFamily;
