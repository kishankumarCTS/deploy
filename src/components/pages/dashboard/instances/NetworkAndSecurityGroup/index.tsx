import React from "react";
import Network from "./Network";
import SecurityGroups from "./SecurityGroups";
import Configuration from "./Configuration";
import { Button } from "@/components/ui/Button";
import KeyPairs from "./KeyPairs";

const NetworkAndSecurityGroup = () => {
  return (
    <div className="mt-7 flex gap-6 flex-col">
      <Network />
      <SecurityGroups />
      <KeyPairs />
      <Configuration />
    </div>
  );
};

export default NetworkAndSecurityGroup;
