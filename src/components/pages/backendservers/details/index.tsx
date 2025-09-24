"use client";

import { FaRegCalendar } from "react-icons/fa";
import CopyButton from "@/components/ui/CopyButton";
import DataBadge from "@/components/ui/DataBadge";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import { backendServerData } from "../constants";
import { BackendServerType } from "../types";

interface BackendServerDetailsProps {
  backendServerId: string;
}

const BackendServerDetails = ({ backendServerId }: BackendServerDetailsProps) => {
  const backendServer: BackendServerType | undefined = backendServerData.find(
    (bs) => bs.id === backendServerId
  );

  if (!backendServer) {
    return <div className="p-6 text-red-500">Backend Server not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-themeGray-900">
        Backend Server | {backendServer.id}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-themeWhite-900 p-6 rounded-2xl shadow-sm">
        <TabKeyPair label="Name" value={backendServer.name} />

        <TabKeyPair
          label="ID"
          value={
            <div className="flex items-center gap-2">
              {backendServer.id}
              <CopyButton text={backendServer.id} />
            </div>
          }
        />

        <TabKeyPair label="Address" value={backendServer.address} />
        <TabKeyPair label="Weight" value={backendServer.weight.toString()} />
        <TabKeyPair label="Monitor Address" value={backendServer.monitorAddress} />
        <TabKeyPair label="Monitor Port" value={backendServer.monitorPort.toString()} />

        <TabKeyPair
          label="Provisioning Status"
          value={<DataBadge data={backendServer.provisioningStatus} />}
        />

        <TabKeyPair
          label="Admin State"
          value={<DataBadge data={backendServer.adminState} />}
        />

        <TabKeyPair
          label="Operating Status"
          value={<DataBadge data={backendServer.operatingStatus} />}
        />

        <TabKeyPair
          label="Backup"
          value={<DataBadge data={backendServer.backup} />}
        />

        <TabKeyPair
          label="Created At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              {backendServer.createdAt}
            </span>
          }
        />

        <TabKeyPair
          label="Updated At"
          value={
            <span className="flex items-center gap-2">
              <FaRegCalendar size={18} className="text-gray-500" />
              {backendServer.updatedAt}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default BackendServerDetails;
