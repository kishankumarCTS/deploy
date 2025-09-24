import { StorageOption } from "@/components/Modals/createVolume/Dropdown";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";

export type KeyPair = {
  id: number;
  name: string;
};

const SelectKeyPair = ({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (data: KeyPair) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<KeyPair | null>(null);

  const options: KeyPair[] = [
    {
      id: 1,
      name: "Key pair 1",
    },
    {
      id: 2,
      name: "Key pair 2",
    },
    {
      id: 3,
      name: "Key pair 3",
    },
    {
      id: 4,
      name: "Key pair 4",
    },
    {
      id: 5,
      name: "Key pair 5",
    },
    {
      id: 6,
      name: "Key pair 6",
    },
  ];

  const handleSelectChange = (data: any) => {
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
            <div className="">{item.name}</div>
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

export default SelectKeyPair;
