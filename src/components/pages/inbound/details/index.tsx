"use client";

import { FaRegCalendar } from "react-icons/fa";
import CopyButton from "@/components/ui/CopyButton";
import DataBadge from "@/components/ui/DataBadge";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";

interface InboundDetailsProps {
  ruleId: string;
}

const InboundDetails = ({ ruleId }: InboundDetailsProps) => {
  const inboundRule = {
    ruleId: "c550179d-cb4b-4160-9619-61bcf696a8b5",
    direction: "Inbound",
    protocol: "Any Protocol",
    etherType: "IPv4",
    port: "Any",
    cidr: "-",
    remoteSecurityGroup: "0dc56905-c4e3-4ae5-a7a0-bd4e2904d19c",
    createdAt: "19-09-2025 10:30", 
  };

  if (ruleId !== inboundRule.ruleId) {
    return <div className="p-6 text-red-500">Inbound Rule not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-themeGray-900">
        Inbound Rule | {inboundRule.ruleId}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-themeWhite-900 p-6 rounded-2xl shadow-sm">
        <TabKeyPair
          label="Rule ID"
          value={
            <div className="flex items-center gap-2">
              {inboundRule.ruleId}
              <CopyButton text={inboundRule.ruleId} />
            </div>
          }
        />
        <TabKeyPair
          label="Direction"
          value={<DataBadge data={inboundRule.direction} />}
        />
        <TabKeyPair label="Protocol" value={inboundRule.protocol} />
        <TabKeyPair label="Ether Type" value={inboundRule.etherType} />
        <TabKeyPair label="Port" value={inboundRule.port} />
        <TabKeyPair label="CIDR" value={inboundRule.cidr} />
        <TabKeyPair
          label="Remote Security Group"
          value={
            <div className="flex items-center gap-2">
              {inboundRule.remoteSecurityGroup}
              <CopyButton text={inboundRule.remoteSecurityGroup} />
            </div>
          }
        />
        <TabKeyPair
          label="Created At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              {inboundRule.createdAt}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default InboundDetails;
