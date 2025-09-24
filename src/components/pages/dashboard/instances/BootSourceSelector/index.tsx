"use client";

import { useState } from "react";
import OptionButton from "@/components/ui/OptionButton";
import { BootSourceSelectorProps } from "@/app/dashboard/instance/types";
import { bootOptions } from "@/app/dashboard/instance/constants";

const BootSourceSelector = ({ children }: BootSourceSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const handleSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="flex gap-3 mt-2 w-full cursor-pointer">
      {bootOptions.map((option, index) => (
        <OptionButton
          key={index}
          {...option}
          isSelected={selectedOption === option.id}
          onClick={() => handleSelect(option.id)}
        />
      ))}
      <div>{children}</div>
    </div>
  );
};

export default BootSourceSelector;
