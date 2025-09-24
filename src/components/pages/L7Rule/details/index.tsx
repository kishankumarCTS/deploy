"use client";
import Tabs from "@/components/ui/Tabs";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import CopyButton from "@/components/ui/CopyButton";

import DataBadge from "@/components/ui/DataBadge";

import { L7RuleDetailsProps } from "../types";
import { getL7RuleDetails } from "../constants";

const L7RuleDetails = ({ ruleId }: L7RuleDetailsProps) => {
  const ruleDetails = getL7RuleDetails(ruleId);

  const overviewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TabKeyPair
        label="ID"
        value={
          <div className="flex items-center gap-2">
            {ruleDetails.ruleId}
            <CopyButton text={ruleDetails.ruleId} />
          </div>
        }
      />
      <TabKeyPair label="Type" value={ruleDetails.type} />
      <TabKeyPair label="Compare Type" value={ruleDetails.compareType} />
      <TabKeyPair label="Value" value={ruleDetails.value} />
      <TabKeyPair
        label="Invert"
        value={<DataBadge data={ruleDetails.invert} />}
      />
      <TabKeyPair
        label="Provisioning Status"
        value={<DataBadge data={ruleDetails.provisioningStatus} />}
      />
      <TabKeyPair
        label="Admin State"
        value={<DataBadge data={ruleDetails.adminState} />}
      />
      <TabKeyPair
        label="Operating Status"
        value={<DataBadge data={ruleDetails.operatingStatus} />}
      />
      <TabKeyPair label="Created At" value={ruleDetails.createdAt} />
      <TabKeyPair label="Updated At" value={ruleDetails.updatedAt} />
    </div>
  );

  const tabs = [
    { id: "overview", heading: "Overview", content: overviewContent },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-themeGray-900">
          L7 Rule | {ruleId}
        </h1>
      </div>
      <Tabs tabs={tabs} defaultActiveId="overview" />
    </div>
  );
};

export default L7RuleDetails;
