"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import { FiAlertTriangle } from "react-icons/fi";
import CopyButton from "@/components/ui/CopyButton";

function OverviewTab() {
  const [isActive, setIsActive] = useState<boolean>(false);

  const OVERVIEW_DATA = [
    { label: "Name", value: "High Usage Alert" },
    {
      label: "Status",
      value: (
        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={() => {
              setIsActive((prev) => !prev);
            }}
            className="cursor-pointer"
          />
          {isActive ? "Active" : "Inactive"}
        </div>
      ),
    },
    { label: "Metric Type", value: "CPU Utilization" },
    { label: "Metric Field", value: "CPU Usage" },
    { label: "Notification Channel", value: "Email" },
    { label: "Email To", value: "eg@gmail.com" },
    {
      label: "Warning Threshold",
      value: (
        <div className="flex items-center gap-2">
          <FiAlertTriangle size={18} className="text-yellow-400" />
          60%
        </div>
      ),
    },
    {
      label: "Trigger Condition",
      value: (
        <span className="text-themeGray-500">
          Alert will be triggered when threshold is above specified units.
        </span>
      ),
    },
    {
      label: "Resource Id",
      value: (
        <div className="flex items-center gap-2">
          fghj-fghj-dfgh-dfghjk
          <CopyButton text="fghj-fghj-dfgh-dfghjk" />
        </div>
      ),
    },
    { label: "Created At", value: "13-09-2025 13:56" },
    {
      label: "Last Updated",
      value: "13-09-2025 13:56",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {OVERVIEW_DATA.map((item, index) => (
          <TabKeyPair
            key={index}
            label={item.label}
            value={item.value || "-"}
          />
        ))}
      </div>
    </div>
  );
}

export default OverviewTab;
