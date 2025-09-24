"use client";

import { ChangeEvent } from "react";
import AddButton from "../Add";
import Checkbox from "@/components/ui/Checkbox";
import InputField from "@/components/ui/CommonInput";

interface VPCStep2Props {
  vpcData: any;
  setVpcData: React.Dispatch<React.SetStateAction<any>>;
}

function VPCStep2({ setVpcData, vpcData }: VPCStep2Props) {
  const handleInputChange = (key: string, value: string) => {
    setVpcData((prev: any) => ({
      ...prev,
      step2: {
        ...prev?.step2,
        [key]: value,
      },
    }));
  };

  const handleCheckboxChange = (key: string, value: boolean) => {
    setVpcData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-[24px] leading-[25px] mb-6">
        Additional Subnet Details
      </h2>
      <div className="w-full flex flex-wrap gap-6">
        <InputField
          label="DHCP Allocation Pools"
          placeholder="105.109.192.1"
          className="w-[calc(50%-52px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step2?.dhcpPoolStart || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("dhcpPoolStart", e.target.value)
          }
        />
        <InputField
          label=""
          placeholder="105.289.329.1"
          className="w-[calc(50%-52px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step2?.dhcpPoolEnd || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("dhcpPoolEnd", e.target.value)
          }
        />
        <AddButton />

        <InputField
          label="Domain name Servers"
          placeholder="105.109.192.1"
          className="w-[calc(100%-80px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step2?.dnsServer || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("dnsServer", e.target.value)
          }
        />
        <AddButton />

        <InputField
          label="Host Routers"
          placeholder="0.0.0.0/0"
          className="w-[calc(50%-52px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step2?.hostRoute || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("hostRoute", e.target.value)
          }
        />
        <InputField
          label=""
          placeholder="Next hop"
          className="w-[calc(50%-52px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step2?.nextHop || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("nextHop", e.target.value)
          }
        />
        <AddButton />

        <div className="w-[calc(50%-12px)]">
          <Checkbox
            label="Enable DHCP"
            checked={vpcData?.step2?.enableDhcp || false}
            onChange={(e) =>
              handleCheckboxChange("enableDhcp", e.target.checked)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default VPCStep2;
