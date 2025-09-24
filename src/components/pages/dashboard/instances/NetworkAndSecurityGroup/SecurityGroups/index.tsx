"use client";

import React, { useState } from "react";
import IconAndLabel from "../IconAndLabel";
import { Button } from "@/components/ui/Button";
import SecurityGroupPage from "@/app/securitygroup/page";
import SelectSecurityGroups, { VpcOptions } from "./SelectSecurityGroups";
import VPCInfoCard from "../Network/VpcInfoCard";

const SecurityGroups = () => {
  const [securityType, setSecurityType] = useState("");
  const [securityGroup, setSecurityGroup] = useState<VpcOptions | null>(null);
  const [selectedSecurityGroup, setSelectedSecurityGroup] =
    useState<VpcOptions | null>(null);
  const [showSecurityGroupSelect, setShowSecurityGroupSelect] = useState(false);
  const [createdSecurityGroup, setCreatedSecurityGroup] =
    useState<VpcOptions | null>(null);

  const handleSecurityType = (type: string) => {
    setSecurityType(type);
    setShowSecurityGroupSelect(true);
  };

  const handleSelectSecurityGroup = (data: any) => {
    setShowSecurityGroupSelect(false);
    setSelectedSecurityGroup(data);
  };

  const handleCloseSecuritySelect = () => {
    setShowSecurityGroupSelect(false);
  };

  return (
    <div className="bg-themeWhite-900 p-6 rounded-[20px]">
      <div className="headline-small">Security Groups</div>
      <div className="p-3">
        <div className="p-4 title-large">
          How do you want to create security groups?
        </div>
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <IconAndLabel
              label="Create a new security group"
              isActive={securityType === "new"}
              onClick={() => handleSecurityType("new")}
            />
            {securityGroup && securityType === "new" && (
              <div>
                <VPCInfoCard {...securityGroup} />
              </div>
            )}
          </div>
          <div className="w-full">
            <IconAndLabel
              label="Select from"
              isActive={securityType === "selected-from"}
              onClick={() => handleSecurityType("selected-from")}
            />
            {showSecurityGroupSelect && securityType === "selected-from" && (
              <SelectSecurityGroups
                onCancel={handleCloseSecuritySelect}
                onSave={handleSelectSecurityGroup}
              />
            )}
            {selectedSecurityGroup && securityType === "selected-from" && (
              <div>
                <VPCInfoCard {...selectedSecurityGroup} />
              </div>
            )}
          </div>
        </div>
      </div>
      {securityType === "new" && (
        <SecurityGroupPage
          setSecurityGroup={setSecurityGroup}
          securityGroup={securityGroup}
          setCreatedSecurityGroup={setCreatedSecurityGroup}
        />
      )}
    </div>
  );
};

export default SecurityGroups;
