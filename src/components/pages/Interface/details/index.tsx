"use client";

import { FaRegCalendar } from "react-icons/fa";
import CopyButton from "@/components/ui/CopyButton";
import DataBadge from "@/components/ui/DataBadge";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import { interfacesData } from "../constants";
import { InterfaceType } from "../types";

interface InterfaceDetailsProps {
  interfaceId: string;
}

const InterfaceDetails = ({ interfaceId }: InterfaceDetailsProps) => {
  const networkInterface: InterfaceType | undefined = interfacesData.find(
    (intf) => intf.id === interfaceId
  );

  if (!networkInterface) {
    return <div className="p-6 text-red-500">Interface not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-themeGray-900">
        Interface | {networkInterface.id}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-themeWhite-900 p-6 rounded-2xl shadow-sm">
        <TabKeyPair
          label="Interface ID"
          value={
            <div className="flex items-center gap-2">
              {networkInterface.id}
              <CopyButton text={networkInterface.id} />
            </div>
          }
        />

        <TabKeyPair
          label="VPC ID"
          value={
            <div className="flex items-center gap-2">
              {networkInterface.vpcId}
              <CopyButton text={networkInterface.vpcId} />
            </div>
          }
        />

        <TabKeyPair label="VPC Name" value={networkInterface.vpcName} />

        <TabKeyPair
          label="Project ID"
          value={
            <div className="flex items-center gap-2">
              {networkInterface.projectId}
              <CopyButton text={networkInterface.projectId} />
            </div>
          }
        />

        <TabKeyPair label="MAC Address" value={networkInterface.macAddress} />

        <TabKeyPair
          label="Status"
          value={<DataBadge data={networkInterface.status} />}
        />

        <TabKeyPair
          label="Admin State"
          value={<DataBadge data={networkInterface.adminState} />}
        />

        <TabKeyPair label="IP Address" value={networkInterface.ipAddress} />

        <TabKeyPair
          label="Subnet ID"
          value={
            <div className="flex items-center gap-2">
              {networkInterface.subnetId}
              <CopyButton text={networkInterface.subnetId} />
            </div>
          }
        />

        <TabKeyPair label="Device Owner" value={networkInterface.deviceOwner} />

        <TabKeyPair
          label="Device ID"
          value={
            <div className="flex items-center gap-2">
              {networkInterface.deviceId}
              <CopyButton text={networkInterface.deviceId} />
            </div>
          }
        />

        <TabKeyPair label="VNIC Type" value={networkInterface.vnicType} />

        <TabKeyPair
          label="Created At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              {networkInterface.createdAt}
            </span>
          }
        />

        <TabKeyPair
          label="Updated At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              {networkInterface.updatedAt}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default InterfaceDetails;
