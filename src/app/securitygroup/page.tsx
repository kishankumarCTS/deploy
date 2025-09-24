"use client";

import { useState } from "react";
import SecurityGroupModal from "@/components/Modals/SecurityGroup";
import { SecurityGroupFormData } from "@/components/pages/SecurityGroup/types";
import { Button } from "@/components/ui/Button";

export default function SecurityGroupPage({
  setSecurityGroup,
  securityGroup,
}: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: SecurityGroupFormData) => {
    console.log("Security Group Form Data:", data);
    setSecurityGroup(data);
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="pl-3">
        <Button onClick={() => setIsModalOpen(true)}>
          Create Security Group
        </Button>
      </div>
      <SecurityGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
