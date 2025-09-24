"use client";

import { useRouter } from "next/navigation";
import Tabs from "@/components/ui/Tabs";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import { Button } from "@/components/ui/Button";
import { KeyPairDetailsProps } from "../types";
import { getKeyPairDetails } from "../constants";
import { FaRegCalendar } from "react-icons/fa";

const KeyPairDetails = ({ keyPairId }: KeyPairDetailsProps) => {
  const keyPair = getKeyPairDetails(keyPairId);

  const overviewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TabKeyPair label="Name" value={keyPair.name} />
      <TabKeyPair label="Type" value={keyPair.type} />
      <TabKeyPair label="Fingerprint" value={keyPair.fingerprint} />
      <TabKeyPair
  label="Created At"
  value={
    <span className="flex items-center gap-2">
      <FaRegCalendar size={18} className="text-gray-500" />
      {keyPair.createdAt}
    </span>
  }
/>
      <TabKeyPair
        label="Public Key"
        value={<pre className="break-all">{keyPair.publicKey}</pre>}
      />
    </div>
  );

  const tabs = [
    { id: "overview", heading: "Overview", content: overviewContent },
  ];

  return (
    <div className="space-y-6 border border-themeGray-400 rounded-[20px] p-6">
      <h1 className="text-2xl font-semibold text-themeGray-900">
        Key Pair | {keyPair.name}
      </h1>
      <Tabs tabs={tabs} defaultActiveId="overview" />
    </div>
  );
};

export default KeyPairDetails;
