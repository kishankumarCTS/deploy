"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import SelectOptions from "@/components/ui/SelectOptions";
import { ElasticIpModalProps } from "@/components/pages/ElasticIp/types";

export default function ElasticIpModal({
  isOpen,
  onClose,
  onSubmit,
  poolOptions,
}: ElasticIpModalProps) {
  const [elasticIpPool, setElasticIpPool] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setElasticIpPool("");
      setDescription("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onSubmit({ elasticIpPool, description });
  };

  const options = poolOptions.map((pool, index) => ({
    id: index,
    label: pool,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reserve Elastic IP"
      variant="centered"
      size="default"
      footerButtons={[
        { variant: "secondary", children: "Cancel", onClick: onClose },
        {
          variant: "primary",
          children: "Submit",
          onClick: handleSubmit,
          //   disabled: !elasticIpPool,
        },
      ]}
    >
      <div className="space-y-6 min-w-[440px] max-w-[480px]">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Elastic IP Pool <span className="text-themeRed-600">*</span>
          </label>
          <SelectOptions
            options={options}
            defaultValue={elasticIpPool || options[0]?.label}
            className="w-full"
            // onChange={(value: string) => setElasticIpPool(value)}
            value={elasticIpPool}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Elastic IP Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-themeWhite-900 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-themeBlue-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  );
}
