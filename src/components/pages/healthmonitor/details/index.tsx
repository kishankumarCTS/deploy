"use client";

import { FaRegCalendar } from "react-icons/fa";
import CopyButton from "@/components/ui/CopyButton";
import DataBadge from "@/components/ui/DataBadge";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import { healthMonitorData } from "../constants";
import { HealthMonitorType } from "../types";

interface HealthMonitorDetailsProps {
  healthMonitorId: string;
}

const HealthMonitorDetails = ({ healthMonitorId }: HealthMonitorDetailsProps) => {
  const healthMonitor: HealthMonitorType | undefined = healthMonitorData.find(
    (hm) => hm.id === healthMonitorId
  );

  if (!healthMonitor) {
    return <div className="p-6 text-red-500">Health Monitor not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-themeGray-900">
        Health Monitor | {healthMonitor.id}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-themeWhite-900 p-6 rounded-2xl shadow-sm">
        <TabKeyPair label="Name" value={healthMonitor.name} />

        <TabKeyPair
          label="ID"
          value={
            <div className="flex items-center gap-2">
              {healthMonitor.id}
              <CopyButton text={healthMonitor.id} />
            </div>
          }
        />

        <TabKeyPair
          label="Provisioning Status"
          value={<DataBadge data={healthMonitor.provisioningStatus} />}
        />

        <TabKeyPair
          label="Admin State"
          value={<DataBadge data={healthMonitor.adminState} />}
        />

        <TabKeyPair
          label="Operating Status"
          value={<DataBadge data={healthMonitor.operatingStatus} />}
        />

        <TabKeyPair label="Type" value={healthMonitor.type} />
        <TabKeyPair label="Delay (s)" value={healthMonitor.delay.toString()} />
        <TabKeyPair label="Timeout (s)" value={healthMonitor.timeout.toString()} />
        <TabKeyPair label="Max Retries" value={healthMonitor.maxRetries.toString()} />
        <TabKeyPair label="Max Retries Down" value={healthMonitor.maxRetriesDown.toString()} />
        <TabKeyPair label="HTTP Method" value={healthMonitor.httpMethod} />
        <TabKeyPair label="HTTP Version" value={healthMonitor.httpVersion} />
        <TabKeyPair label="Expected Codes" value={healthMonitor.expectedCodes} />

        <TabKeyPair
          label="Created At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              {healthMonitor.createdAt}
            </span>
          }
        />

        <TabKeyPair
          label="Updated At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              {healthMonitor.updatedAt}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default HealthMonitorDetails;
