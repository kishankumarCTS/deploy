"use client";

import React, { useEffect, useState } from "react";
import IconAndLabel from "../IconAndLabel";
import Stepper from "@/components/Modals/createVPC/Stepper";
import SelectVpc, { VpcOptions } from "./SelectVpc";
import VPCInfoCard from "./VpcInfoCard";

const Network = () => {
  const [vpcType, setVpcType] = useState("");
  const [selectedVPC, setSelectedVPC] = useState<VpcOptions | null>(null);
  const [createdVpc, setCreatedVPC] = useState<VpcOptions | null>(null);
  const [showVpcList, setShowVpcList] = useState(false);
  const [vpcData, setVpcData] = useState(null);

  const handleVpcType = (type: string) => {
    setVpcType(type);
    setShowVpcList(true);
  };

  const handleSelectedVpc = (data: VpcOptions) => {
    setSelectedVPC(data);
    setShowVpcList(false);
  };

  const handleCloseVpcList = () => {
    setShowVpcList(false);
  };

  const handleShowVpcList = () => {
    setShowVpcList(true);
  };

  return (
    <div className="bg-themeWhite-900 p-6 rounded-[20px]">
      <div className="headline-small">Network</div>
      <div className="p-3">
        <div className="p-4 title-large">
          How do you want to select your virtual private connection (VPC)?
        </div>
        <div className="flex gap-3 items-start w-full">
          <div className="w-full">
            <IconAndLabel
              label="Create New VPC"
              isActive={vpcType === "new"}
              onClick={() => handleVpcType("new")}
            />
            {createdVpc && vpcType === "new" && (
              <div>
                <VPCInfoCard {...createdVpc} />
              </div>
            )}
          </div>
          <div className="w-full">
            <IconAndLabel
              label="Select Existing VPC"
              isActive={vpcType === "existing"}
              onClick={() => handleVpcType("existing")}
            />
            {vpcType === "existing" && showVpcList && (
              <SelectVpc
                onCancel={handleCloseVpcList}
                onSave={(data) => handleSelectedVpc(data)}
              />
            )}
            {selectedVPC && vpcType === "existing" && (
              <div>
                <VPCInfoCard {...selectedVPC} />
              </div>
            )}
          </div>
        </div>
      </div>
      {vpcType === "new" && (
        <Stepper
          setVpcData={setVpcData}
          vpcData={vpcData}
          setCreatedVPC={setCreatedVPC}
          createdVpc={createdVpc}
        />
      )}
    </div>
  );
};

export default Network;
