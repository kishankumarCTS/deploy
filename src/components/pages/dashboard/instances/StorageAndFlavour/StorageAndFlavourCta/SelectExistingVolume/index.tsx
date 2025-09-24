import { StorageOption } from "@/components/Modals/createVolume/Dropdown";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";

export type VolumeInfoOptions = {
  id: number;
  name: string;
  createdOn: string;
  storageInfo: StorageOption;
  storage: number;
};

const SelectExistingVolume = ({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (data: VolumeInfoOptions) => void;
}) => {
  const [selectedOption, setSelectedOption] =
    useState<VolumeInfoOptions | null>();

  const options: VolumeInfoOptions[] = [
    {
      id: 1,
      createdOn: new Date().toDateString(),
      name: "Volume 1",
      storage: 256,
      storageInfo: {
        id: "1",
        title: "NVMe based High IOPS Storage1",
        subtitle: "Olivia Rhye",
        iops: "1000-16000",
        size: "1.00GB-16.0",
        throughput: "400.00MB/s",
      },
    },
    {
      id: 2,
      name: "Volume 2",
      createdOn: new Date().toDateString(),
      storage: 256,
      storageInfo: {
        id: "2",
        title: "NVMe based High IOPS Storage2",
        subtitle: "Olivia Rhye",
        iops: "1000-16000",
        size: "1.00GB-16.0",
        throughput: "400.00MB/s",
      },
    },
  ];

  const handleSelectChange = (data: VolumeInfoOptions) => {
    setSelectedOption(data);
  };

  const handleSave = () => {
    if (selectedOption) onSave(selectedOption);
  };

  return (
    <div className="flex flex-col gap-3 p-6 shadow-lg">
      <div className="pb-5 px-6 label-large font-medium border-b border-b-themeGray-200">
        {"Search Volume"}
      </div>
      <div className="flex flex-col max-h-[352px] px-6 overflow-y-auto">
        {options.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-[18px] py-4 cursor-pointer border-b-1 border-b-themeGray-200"
          >
            <input
              type="radio"
              checked={selectedOption?.id === item.id}
              onChange={() => handleSelectChange(item)}
              className="w-4 h-4 cursor-pointer"
            />
            <div className="flex-1 flex flex-col gap-1">
              <div className="font-semibold text-[18px]]">{item.name}</div>
              <div className="title-small text-themeBlack-60">
                Created on {item.createdOn}
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-end gap-2 pt-5 px-6">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default SelectExistingVolume;
