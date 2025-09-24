"use client";

import { ChangeEvent } from "react";
import RouterPage from "@/app/router/page";
import SelectOptions from "@/components/ui/SelectOptions";

interface Option {
  id: number;
  label: string;
  disabled?: boolean;
}

interface VPCStep3Props {
  vpcData: any;
  setVpcData: React.Dispatch<React.SetStateAction<any>>;
}

function VPCStep3({ setVpcData, vpcData }: VPCStep3Props) {
  const options: Option[] = [
    {
      id: 1,
      label: "Choose a Router",
      disabled: true,
    },
    {
      id: 2,
      label: "my-router",
    },
  ];

  const handleSelectChange = (value: string) => {
    setVpcData((prev: any) => ({
      ...prev,
      step3: {
        ...prev?.step3,
        selectedRouter: value,
      },
    }));
  };

  return (
    <div className="max-w-[623px] flex justify-between items-end gap-6 mx-auto">
      <div className="w-1/2">
        Select Router*
        <SelectOptions
          options={options}
          className="mt-4"
          value={vpcData?.step3?.selectedRouter || ""}
          onChange={handleSelectChange}
        />
      </div>
      <RouterPage setVpcData={setVpcData} vpcData={vpcData} />
    </div>
  );
}

export default VPCStep3;
