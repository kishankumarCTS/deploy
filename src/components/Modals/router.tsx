"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { CreateRouterModalProps } from "@/components/pages/Router/types";

export default function RouterModal({
  isOpen,
  onClose,
  onSubmit,
  vpcData,
}: CreateRouterModalProps) {
  const [routerName, setRouterName] = useState("");
  const [adminStateUp, setAdminStateUp] = useState(false);

  const handleSubmit = () => {
    onSubmit({ name: routerName, adminStateUp });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Router"
      variant="centered"
      size="default"
      footerButtons={[
        { variant: "secondary", children: "Cancel", onClick: onClose },
        { variant: "primary", children: "Submit", onClick: handleSubmit },
      ]}
    >
      <div className="space-y-6 min-w-[440px] max-w-[480px]">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Router name
          </label>
          <input
            type="text"
            value={routerName || vpcData?.step3?.router?.name}
            onChange={(e) => setRouterName(e.target.value)}
            placeholder="Enter name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-themeWhite-900 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-themeBlue-500"
          />
        </div>
        <div className="flex items-center gap-3 mt-1">
          <input
            id="adminStateUp"
            type="checkbox"
            checked={!!adminStateUp || vpcData?.step3?.router?.adminStateUp}
            onChange={() => setAdminStateUp((val) => !val)}
            className="accent-themeBlue-600 w-5 h-5 border-2 border-themeBlue-500 rounded-md focus:ring-themeBlue-300 transition-all"
          />
          <label
            htmlFor="adminStateUp"
            className="text-base text-gray-700 cursor-pointer select-none"
          >
            Admin State Up
          </label>
        </div>
      </div>
    </Modal>
  );
}
