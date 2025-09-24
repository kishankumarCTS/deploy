"use client";
import { FaRegCalendar } from "react-icons/fa";
import CopyButton from "@/components/ui/CopyButton";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";

import { subnetData } from "../constants";
import { SubnetDetailsProps } from "../types";

const SubnetDetails = ({ subnetId }: SubnetDetailsProps) => {
  const subnet = subnetData;

  if (!subnet) {
    return <div className="p-6 text-red-500">Subnet not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <h1 className="text-2xl font-semibold text-themeGray-900">
          Subnets | {subnet.id}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-themeWhite-900 p-6 rounded-2xl shadow-sm">
        <TabKeyPair label="Name" value={subnet.name} />

        <TabKeyPair
          label="Subnet ID"
          value={
            <div className="flex items-center gap-2">
              {subnet.id}
              <CopyButton text={subnet.id} />
            </div>
          }
        />

        <TabKeyPair
          label="VPC ID"
          value={
            <div className="flex items-center gap-2">
              {subnet.vpcId}
              <CopyButton text={subnet.vpcId} />
            </div>
          }
        />

        <TabKeyPair
          label="Created At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              {subnet.createdAt}
            </span>
          }
        />

        <TabKeyPair label="IP Version" value={subnet.ipVersion} />
        <TabKeyPair label="Gateway IP" value={subnet.gatewayIp} />

        <TabKeyPair
          label="DNS Nameservers"
          value={subnet.dnsNameservers.join(", ")}
        />

        <TabKeyPair
          label="Allocation Pools"
          value={
            <div className="space-y-1">
              {subnet.allocationPools.map((pool, index) => (
                <div key={index} className="flex items-center gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase">
                      START
                    </span>
                    <span>{pool.start}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase">END</span>
                    <span>{pool.end}</span>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default SubnetDetails;
