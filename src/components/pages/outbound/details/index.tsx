"use client";

import { FaRegCalendar } from "react-icons/fa";
import CopyButton from "@/components/ui/CopyButton";
import DataBadge from "@/components/ui/DataBadge";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";

interface OutboundDetailsProps {
  ruleId: string;
}

const OutboundDetails = ({ ruleId }: OutboundDetailsProps) => {
  const outboundRule = {
    ruleId: "09baf298-f632-434d-8f0a-e76bf5a189eb",
    direction: "Outbound",
    protocol: "Any Protocol",
    etherType: "IPv4",
    port: "Any",
    cidr: "-",
    remoteSecurityGroup: "-",
    createdAt: "19-09-2025 11:00",
  };

  if (ruleId !== outboundRule.ruleId) {
    return <div className="p-6 text-red-500">Outbound Rule not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-themeGray-900">
        Outbound Rule | {outboundRule.ruleId}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-themeWhite-900 p-6 rounded-2xl shadow-sm">
        <TabKeyPair
          label="Rule ID"
          value={
            <div className="flex items-center gap-2">
              {outboundRule.ruleId}
              <CopyButton text={outboundRule.ruleId} />
            </div>
          }
        />
        <TabKeyPair
          label="Direction"
          value={<DataBadge data={outboundRule.direction} />}
        />
        <TabKeyPair label="Protocol" value={outboundRule.protocol} />
        <TabKeyPair label="Ether Type" value={outboundRule.etherType} />
        <TabKeyPair label="Port" value={outboundRule.port} />
        <TabKeyPair label="CIDR" value={outboundRule.cidr} />
        <TabKeyPair
          label="Remote Security Group"
          value={outboundRule.remoteSecurityGroup}
        />
        <TabKeyPair
          label="Created At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              {outboundRule.createdAt}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default OutboundDetails;
