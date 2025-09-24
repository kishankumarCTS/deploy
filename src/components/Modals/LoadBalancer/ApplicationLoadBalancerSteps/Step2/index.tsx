// Step2.tsx
import InputField from "@/components/ui/CommonInput";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LoadBalancerTypes, step2DataProps } from "../../types";
import { step2InitialData } from "../constants";
import SubnetTable from "./SubnetTable";

const Step2 = ({
  setLoadBalancerData,
  loadBalancerData,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setLoadBalancerData: Dispatch<SetStateAction<LoadBalancerTypes>>;
  loadBalancerData: LoadBalancerTypes;
}) => {
  // const [step2Data, setStep2Data] = useState<step2DataProps>(step2InitialData);

  const handleInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | boolean;
  }) => {
    setLoadBalancerData((prev: LoadBalancerTypes) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <h2 className="headline-large">Load Balancer details</h2>
      <p className="title-medium text-themeBlack-50">
        The load balancer service distributes traffic across multiple backend
        servers to ensure high availability, scalability, and optimized resource
        usage, with automatic failover and health monitoring.
      </p>

      {/* Name and Description */}
      <div className="flex gap-6 mt-6">
        <InputField
          label="Load Balancer Name"
          type="text"
          name="name"
          placeholder="Enter name"
          className="flex-1"
          required={true}
          value={loadBalancerData.name}
          onChange={(e: any) =>
            handleInputChange({
              name: "name",
              value: e.target.value,
            })
          }
        />
        <InputField
          label="Load Balancer Description"
          type="text"
          name="description"
          placeholder="Enter description"
          className="flex-1"
          required={true}
          value={loadBalancerData.description}
          onChange={(e: any) =>
            handleInputChange({
              name: "description",
              value: e.target.value,
            })
          }
        />
      </div>

      {/* IP Address Type */}
      <div className="mt-6">
        <div className="flex gap-1 title-small">
          IP Address Type <span className="text-red-500">*</span>
          <div className="text-red-500">
            <IoMdInformationCircleOutline />
          </div>
        </div>
        <div className="flex gap-6 mt-2">
          <InputField
            label="IPv4"
            type="radio"
            name="ipAddressType"
            value="IPv4"
            checked={loadBalancerData.ipAddressType === "IPv4"}
            onChange={(event) =>
              handleInputChange({
                name: "ipAddressType",
                value: "IPv4",
              })
            }
            labelInputClass="flex-row-reverse w-max"
            inputClassName="!w-fit"
            labelClassName="title-small"
            labelInputGap={12}
          />
          <InputField
            label="Dualstack (Includes IPv4 and IPv6 addresses)"
            type="radio"
            name="ipAddressType"
            value="Dualstack"
            checked={loadBalancerData.ipAddressType === "Dualstack"}
            onChange={() =>
              handleInputChange({ name: "ipAddressType", value: "Dualstack" })
            }
            labelInputClass="flex-row-reverse w-max"
            inputClassName="!w-fit"
            labelClassName="title-small"
            labelInputGap={12}
          />
        </div>
      </div>

      {/* Subnet */}
      <div className="flex gap-1 mt-6 title-small">
        Subnet <span className="text-red-500">*</span>
        <div className="text-red-500">
          <IoMdInformationCircleOutline />
        </div>
      </div>
      <SubnetTable
        setLoadBalancerData={setLoadBalancerData}
        loadBalancerData={loadBalancerData}
      />
    </div>
  );
};

export default Step2;
