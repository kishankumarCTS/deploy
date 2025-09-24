"use client";

import { FaRegCalendar } from "react-icons/fa";
import CopyButton from "@/components/ui/CopyButton";
import DataBadge from "@/components/ui/DataBadge";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import { portsData } from "../../vpc/constants";
import { PortType } from "../../vpc/types";

interface PortDetailsProps {
  portId: string;
}

const PortDetails = ({ portId }: PortDetailsProps) => {
  const port: PortType | undefined = portsData.find((p) => p.portId === portId);

  if (!port) {
    return <div className="p-6 text-red-500">Port not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-themeGray-900">
        Port | {port.portId}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-themeWhite-900 p-6 rounded-2xl shadow-sm">
        <TabKeyPair label="Name" value={port.name} />
        <TabKeyPair
          label="Port ID"
          value={
            <div className="flex items-center gap-2">
              {port.portId}
              <CopyButton text={port.portId} />
            </div>
          }
        />
        <TabKeyPair
          label="VPC ID"
          value={
            <div className="flex items-center gap-2">
              {port.vpcId}
              <CopyButton text={port.vpcId} />
            </div>
          }
        />
        <TabKeyPair
          label="Created At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              29-08-2025 12:12
            </span>
          }
        />
        <TabKeyPair label="Status" value={<DataBadge data={port.status} />} />
        <TabKeyPair
          label="Admin State"
          value={<DataBadge data={port.adminState} />}
        />
        <TabKeyPair label="MAC Address" value={port.macAddress} />
        <TabKeyPair label="Fixed IPs" value={port.fixedIps} />
        <TabKeyPair
          label="Port Security"
          value={<DataBadge data="Disabled" />}
        />
        <TabKeyPair label="VNIC Type" value="normal" />
        <TabKeyPair label="Device Owner" value="network:distributed" />
        <TabKeyPair label="Attached Device" value="ovnmeta-8db7efdf..." />
      </div>
    </div>
  );
};

export default PortDetails;
