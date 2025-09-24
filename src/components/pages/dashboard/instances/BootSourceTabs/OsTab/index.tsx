"use client";

import React, { useState } from "react";
import OperatingSystemCard from "../../OperatingSystemCard";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { osCardsData } from "@/app/dashboard/instance/constants";

const OsTab = ({ openImagesModal }: { openImagesModal?: () => void }) => {
  const [selected, setSelected] = useState<number>(0);
  const handleSelect = (id: number) => {
    setSelected(id);
  };
  return (
    <div>
      <h3 className="headline-small">Select Operating System</h3>
      <div className="flex gap-[18px] mt-3">
        {osCardsData.map((osData) => (
          <OperatingSystemCard
            key={osData.id}
            data={osData}
            onClick={() => handleSelect(osData.id)}
            selected={selected === osData.id}
          />
        ))}
        <div
          className="w-full bg-themeBlue-50 rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer max-w-[380px]"
          onClick={openImagesModal}
        >
          <div className="text-xl">
            <FaMagnifyingGlass />
          </div>
          <p className="title-medium">View more images</p>
        </div>
      </div>
    </div>
  );
};

export default OsTab;
