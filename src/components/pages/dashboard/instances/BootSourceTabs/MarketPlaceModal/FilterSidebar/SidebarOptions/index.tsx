import React from "react";
import { SidebarOptionsTypes } from "./types";
import { TiArrowSortedDown } from "react-icons/ti";

const SidebarOptions = ({
  title,
  isArrow,
  isActive,
  total_results,
}: SidebarOptionsTypes) => {
  return (
    <div
      className={`${
        isArrow ? "py-3.5" : "py-2"
      } w-full flex items-center justify-between cursor-pointer`}
    >
      <div className="text-[18px]">{title}</div>
      {isArrow && (
        <div className={"pr-3"}>
          <TiArrowSortedDown
            style={{
              transform: isActive ? "rotate(180deg)" : "rotate(0)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SidebarOptions;
