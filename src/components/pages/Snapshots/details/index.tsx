"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import CopyButton from "@/components/ui/CopyButton";
import { SnapshotDetailsProps, SnapshotDetailsType } from "../types";
import { getSnapshotDetails } from "../constants";
import { FaRegCalendar } from "react-icons/fa";
const SnapshotDetails = ({ snapshotId }: SnapshotDetailsProps) => {
  const router = useRouter();
  const snapshotData = getSnapshotDetails(snapshotId);

  const getStatusBadge = (status: SnapshotDetailsType["status"]) => {
    const statusColors = {
      Available: "bg-green-100 text-green-800",
      Creating: "bg-blue-100 text-blue-800",
      Deleting: "bg-orange-100 text-orange-800",
      Error: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {status}
      </span>
    );
  };

  // ✅ Only the fields shown in your screenshot
  const overviewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TabKeyPair
        label="Snapshot ID"
        value={
          <div className="flex items-center gap-2">
            {snapshotData.snapshotId}
            <CopyButton text={snapshotData.snapshotId} />
          </div>
        }
      />
      <TabKeyPair label="Name" value={snapshotData.name} />
      <TabKeyPair label="Description" value={snapshotData.description} />
      <TabKeyPair label="Status" value={getStatusBadge(snapshotData.status)} />
      <TabKeyPair label="Size" value={snapshotData.size} />
      <TabKeyPair label="Volume" value={snapshotData.volume} />
      <TabKeyPair
        label="Created At"
        value={
          <div className="flex items-center gap-2">
            <FaRegCalendar size={16} className="text-themeGray-600" />
            {snapshotData.createdAt}
          </div>
        }
      />

      <TabKeyPair
        label="Updated At"
        value={
          <div className="flex items-center gap-2">
            <FaRegCalendar size={16} className="text-themeGray-600" />
            {snapshotData.updatedAt}
          </div>
        }
      />
    </div>
  );

  const tabs = [
    { id: "overview", heading: "Overview", content: overviewContent },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-themeGray-900">
            Snapshots | {snapshotId}
          </h1>
        </div>
        
      </div>

      <Tabs tabs={tabs} defaultActiveId="overview" />
    </div>
  );
};

export default SnapshotDetails;
