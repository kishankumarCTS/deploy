"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import InputField from "@/components/ui/CommonInput";

interface CreateInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { subnetId: string; ipAddress?: string }) => void;
  subnets?: { id: string; name: string }[]; 
}

function CreateInterface({
  isOpen,
  onClose,
  onSubmit,
  subnets = [],
}: CreateInterfaceProps) {
  const [subnetId, setSubnetId] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  const handleClose = () => {
    setSubnetId("");
    setIpAddress("");
    onClose();
  };

  const handleSubmit = () => {
    if (!subnetId) return; 
    const data = { subnetId, ipAddress };
    console.log("Interface Created:", data);
    onSubmit?.(data);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Interface"
      className="w-[600px] max-w-[90vw]"
      footerButtons={[
        {
          variant: "secondary",
          children: "Cancel",
          onClick: handleClose,
        },
        {
          variant: "primary",
          children: "Create",
          onClick: handleSubmit,
          // disabled: !subnetId, // disable until subnet is selected
        },
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Subnet <span className="text-red-500">*</span>
          </label>
          <select
            value={subnetId}
            onChange={(e) => setSubnetId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm 
                       text-gray-900 focus:outline-none focus:border-gray-800"
          >
            <option value="">-- Select Subnet --</option>
            {subnets.length === 0 ? (
              <option disabled>No subnet available</option>
            ) : (
              subnets.map((subnet) => (
                <option key={subnet.id} value={subnet.id}>
                  {subnet.name}
                </option>
              ))
            )}
          </select>
        </div>

        <InputField
          label="IP Address"
          placeholder="Enter IP address (optional)"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          type="text"
        />
      </div>
    </Modal>
  );
}

export default CreateInterface;
