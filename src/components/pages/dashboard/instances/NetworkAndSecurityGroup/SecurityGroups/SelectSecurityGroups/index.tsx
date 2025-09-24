import { Button } from "@/components/ui/Button";
import React, { useState } from "react";

export type VpcOptions = {
  id: number;
  name: string;
  value: string;
  vpcId: string;
};

const SelectSecurityGroups = ({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (data: VpcOptions) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<VpcOptions | null>();

  const options: VpcOptions[] = [
    {
      id: 1,
      vpcId: "EXT-NOI",
      value: "45.194.2.0/23, 45.194.46.0/23, 154.201.128.0/23",
      name: "Security group1",
    },
    {
      id: 2,
      vpcId: "EXT-NOI",
      value: "45.194.2.0/23, 45.194.46.0/23, 154.201.128.0/23",
      name: "Security group2",
    },
    {
      id: 3,
      vpcId: "EXT-NOI",
      value: "45.194.2.0/23, 45.194.46.0/23, 154.201.128.0/23",
      name: "Security group3",
    },
    {
      id: 4,
      vpcId: "EXT-NOI",
      value: "45.194.2.0/23, 45.194.46.0/23, 154.201.128.0/23",
      name: "Security group4",
    },
    {
      id: 5,
      vpcId: "EXT-NOI",
      value: "45.194.2.0/23, 45.194.46.0/23, 154.201.128.0/23",
      name: "Security group5",
    },
    {
      id: 6,
      vpcId: "EXT-NOI",
      value: "45.194.2.0/23, 45.194.46.0/23, 154.201.128.0/23",
      name: "Security group1",
    },
  ];

  const handleSelectChange = (data: VpcOptions) => {
    setSelectedOption(data);
  };

  const handleSave = () => {
    if (selectedOption) onSave(selectedOption);
  };

  return (
    <div className="flex flex-col gap-3 p-6 shadow-lg">
      <div className="pb-5 px-6 label-large font-medium border-b border-b-themeGray-200">
        {"Search VPC"}
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
              <div className="font-semibold text-[18px]]">
                vpc - {item.name}
              </div>
              <div className="title-small text-themeBlack-60">{item.value}</div>
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

export default SelectSecurityGroups;
