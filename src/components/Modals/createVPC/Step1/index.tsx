import Checkbox from "@/components/ui/Checkbox";
import InputField from "@/components/ui/CommonInput";
import { ChangeEvent } from "react";

function VPCStep1({
  setVpcData,
  vpcData,
}: {
  setVpcData: React.Dispatch<React.SetStateAction<any>>;
  vpcData: any;
}) {
  const handleInputChange = (key: string, value: string | boolean) => {
    setVpcData((prevData: any) => ({
      ...prevData,
      step1: {
        ...prevData?.step1,
        [key]: value,
      },
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-[24px] leading-[25px] mb-6">Create Security Group</h2>
      <div className="w-full flex flex-wrap gap-6">
        <InputField
          label="VPC Name"
          required
          placeholder="My VPC"
          className="w-[calc(50%-12px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step1?.vpcName || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("vpcName", e.target.value)
          }
        />
        <InputField
          label="Subnet Name"
          required
          placeholder="105.289.329.1"
          className="w-[calc(50%-12px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step1?.subnetName || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("subnetName", e.target.value)
          }
        />
        <InputField
          label="IP Version"
          placeholder="Ipv4"
          className="w-[calc(50%-12px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step1?.ipVersion || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("ipVersion", e.target.value)
          }
        />
        <InputField
          label="Subnet"
          required
          placeholder="105.289.329.1"
          className="w-[calc(50%-12px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step1?.subnet || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("subnet", e.target.value)
          }
        />
        <div className="w-[calc(50%-12px)]">
          <Checkbox
            label="Enable Admin State"
            checked={false}
            onChange={(e) => handleInputChange("adminState", e.target.checked)}
          />
        </div>
        <div className="w-[calc(50%-12px)]">
          <Checkbox
            label="Enable Gateway"
            checked={vpcData?.step1?.gatewayEnabled}
            onChange={(e) =>
              handleInputChange("gatewayEnabled", e.target.checked)
            }
          />
        </div>
        <InputField
          label="Description"
          placeholder="Enter"
          className="w-[calc(50%-12px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step1?.description || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("description", e.target.value)
          }
        />
        <InputField
          label="Gateway IP"
          placeholder="105.289.329.1"
          className="w-[calc(50%-12px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={vpcData?.step1?.gatewayIp || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("gatewayIp", e.target.value)
          }
        />
      </div>
    </div>
  );
}

export default VPCStep1;
