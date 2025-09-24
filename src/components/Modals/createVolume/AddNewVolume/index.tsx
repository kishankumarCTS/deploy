"use client";

import { useState } from "react";

import {
  MultiSelectDropdown,
  StorageOption,
} from "@/components/Modals/createVolume/Dropdown";
import AddButton from "../../createVPC/Add";
import DeleteButton from "../DeleteButton";
import StorageInfoCard, {
  StorageInfoCardProps,
} from "@/components/ui/StorageInfoCard";
import { StorageInput } from "@/components/ui/StorageInput";
import { FiPlus } from "react-icons/fi";

type Props = {
  addDelete?: boolean;
  showAddBtn?: boolean;
  storageInfo: StorageInfoCardProps;
  storageOptions: StorageOption[] | [];
  className?: string;
  addHandler?: () => void;
  removeHandler?: () => void;
  viewOnly?: boolean;
  storage?: number;
};
function AddStorage({
  className,
  addDelete = true,
  storageInfo,
  storageOptions,
  addHandler,
  removeHandler,
  showAddBtn,
  viewOnly,
  storage,
}: Props) {
  const [selected, setSelected] = useState<string>("");
  const [value, setValue] = useState("");
  return (
    <div className={className}>
      <div className="flex justify-between items-center gap-3 py-8 px-6 rounded-[20px] bg-themeWhite-900 border border-[#B4B4B4] w-full ">
        <div className="flex justify-between items-center gap-2.5 w-full">
          <span>1</span>
          <span>X</span>
          <StorageInput
            value={value || storage}
            onChange={(e) => setValue(e.target.value)}
            disabled={viewOnly}
          />
          <span>GB</span>
          {!viewOnly ? (
            <MultiSelectDropdown
              options={storageOptions}
              selected={selected}
              onChange={(selected) => setSelected(selected)}
              placeholder="select volume"
              title="Search Storage Type"
            >
              <StorageInfoCard
                title={storageInfo.title}
                iops={storageInfo.iops}
                size={storageInfo.size}
                throughput={storageInfo.throughput}
              />
            </MultiSelectDropdown>
          ) : (
            <StorageInfoCard
              title={storageInfo.title}
              iops={storageInfo.iops}
              size={storageInfo.size}
              throughput={storageInfo.throughput}
            />
          )}
        </div>
        {!viewOnly && (
          <div className="flex items-center gap-3">
            {addDelete && <DeleteButton onClick={removeHandler} />}
          </div>
        )}
      </div>
      {!viewOnly && showAddBtn ? (
        <div
          className="flex items-center justify-center min-w-[56px] aspect-square text-themeWhite-900 bg-themeBlue-700 rounded-2xl text-2xl cursor-pointer"
          onClick={addHandler}
        >
          <FiPlus />
        </div>
      ) : (
        <div
          className={`min-w-[56px] aspect-square ${viewOnly && "hidden"}`}
        ></div>
      )}
    </div>
  );
}

export default AddStorage;
