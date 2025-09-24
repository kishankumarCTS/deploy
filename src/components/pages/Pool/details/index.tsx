"use client";
import { useEffect } from "react";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import Table from "@/components/ui/Table";
import CopyButton from "@/components/ui/CopyButton";
import RefreshButton from "@/components/ui/RefreshButton";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import Pagination from "@/components/ui/pagination";
import DataBadge from "@/components/ui/DataBadge";
import Checkbox from "@/components/ui/Checkbox";
import SearchBar from "@/components/ui/SearchBar";
import Settings from "@/components/ui/ListingSettings";
import {
  PoolDetailsProps,
  Column,
  HealthMonitorType,
  BackendServerType,
} from "../types";

import {
  getPoolDetails,
  mockHealthMonitors,
  mockBackendServers,
} from "../constants";
import BackendServerModal from "@/components/Modals/CreateBackendServer";
const PoolDetails = ({ poolId }: PoolDetailsProps) => {
  const [isBackendServerModalOpen, setIsBackendServerModalOpen] = useState(false);

   const handleCreateBackendServer = () => {
    console.log("New Backend Servers:");
    // TODO: push to your table state or API call
  };
  const [selectedHealthMonitors, setSelectedHealthMonitors] = useState<
    string[]
  >([]);
  const [selectedBackendServers, setSelectedBackendServers] = useState<
    string[]
  >([]);

  const poolDetails = getPoolDetails(poolId);

  const handleHealthMonitorToggle = (id: string) => {
    if (selectedHealthMonitors.includes(id)) {
      setSelectedHealthMonitors((prev) => prev.filter((hmId) => hmId !== id));
    } else {
      setSelectedHealthMonitors((prev) => [...prev, id]);
    }
  };

  const handleBackendServerToggle = (id: string) => {
    if (selectedBackendServers.includes(id)) {
      setSelectedBackendServers((prev) =>
        prev.filter((serverId) => serverId !== id)
      );
    } else {
      setSelectedBackendServers((prev) => [...prev, id]);
    }
  };

  const handleHealthMonitorSelectAll = () => {
    if (selectedHealthMonitors.length === mockHealthMonitors.length) {
      setSelectedHealthMonitors([]);
    } else {
      setSelectedHealthMonitors(mockHealthMonitors.map((hm) => hm.id));
    }
  };

  useEffect(() => {
    setHealthMonitorColumns((prev) =>
      prev.map((col, ind) =>
        ind === 0
          ? {
              ...col,
              header: (
                <Checkbox
                  checked={
                    selectedHealthMonitors.length ===
                      mockHealthMonitors.length && mockHealthMonitors.length > 0
                  }
                  onChange={handleHealthMonitorSelectAll}
                />
              ),
            }
          : col
      )
    );
  }, [selectedHealthMonitors, mockHealthMonitors.length]);

  useEffect(() => {
    setBackendServerColumns((prev) =>
      prev.map((col, ind) =>
        ind === 0
          ? {
              ...col,
              header: (
                <Checkbox
                  checked={
                    selectedBackendServers.length ===
                      mockBackendServers.length && mockBackendServers.length > 0
                  }
                  onChange={handleBackendServerSelectAll}
                />
              ),
            }
          : col
      )
    );
  }, [selectedBackendServers, mockBackendServers.length]);
  const handleBackendServerSelectAll = () => {
    if (selectedBackendServers.length === mockBackendServers.length) {
      setSelectedBackendServers([]);
    } else {
      setSelectedBackendServers(mockBackendServers.map((server) => server.id));
    }
  };

  const HEALTH_MONITOR_COLUMNS: Column<
    HealthMonitorType & { select: React.ReactNode }
  >[] = [
    {
      header: (
        <Checkbox
          checked={selectedHealthMonitors.length === mockHealthMonitors.length}
          onChange={() => {
            if (selectedHealthMonitors.length === mockHealthMonitors.length) {
              setSelectedHealthMonitors([]);
            } else {
              setSelectedHealthMonitors(mockHealthMonitors.map((hm) => hm.id));
            }
          }}
        />
      ),
      accessor: "select",
      className: "w-[40px] text-center",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "NAME",
      accessor: "name",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "TYPE",
      accessor: "type",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "OPERATING STATUS",
      accessor: "operatingStatus",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.operatingStatus.status} />,
    },
    {
      header: "PROVISIONING STATUS",
      accessor: "provisioningStatus",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.provisioningStatus.status} />,
    },
    {
      header: "ADMIN STATE",
      accessor: "adminState",
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.adminState.status} />,
    },
    {
      header: "AUTO SCALING MEMBER",
      accessor: "autoScalingMember",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.autoScalingMember.status} />,
    },
    {
      header: "CREATED AT",
      accessor: "createdAt",
      className: "min-w-[180px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "HEALTH MONITOR ID",
      accessor: "id",
      className: "min-w-[220px]",
      isVisible: true,
      toggleVisibility: true,
    },
  ];

  const BACKEND_SERVER_COLUMNS: Column<
    BackendServerType & { select: React.ReactNode }
  >[] = [
    {
      header: (
        <Checkbox
          checked={selectedBackendServers.length === mockBackendServers.length}
          onChange={() => {
            if (selectedBackendServers.length === mockBackendServers.length) {
              setSelectedBackendServers([]);
            } else {
              setSelectedBackendServers(
                mockBackendServers.map((server) => server.id)
              );
            }
          }}
        />
      ),
      accessor: "select",
      className: "w-[40px] text-center",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "NAME",
      accessor: "name",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "IP ADDRESS",
      accessor: "ipAddress",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "OPERATING STATUS",
      accessor: "operatingStatus",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.operatingStatus.status} />,
    },
    {
      header: "PROVISIONING STATUS",
      accessor: "provisioningStatus",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.provisioningStatus.status} />,
    },
    {
      header: "PROTOCOL PORT",
      accessor: "protocolPort",
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "WEIGHT",
      accessor: "weight",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "ADMIN STATE",
      accessor: "adminState",
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.adminState.status} />,
    },
    {
      header: "AUTO SCALING MEMBER",
      accessor: "autoScalingMember",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.autoScalingMember.status} />,
    },
    {
      header: "BACKUP",
      accessor: "backup",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.backup.status} />,
    },
    {
      header: "CREATED AT",
      accessor: "createdAt",
      className: "min-w-[180px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "BACKEND SERVER ID",
      accessor: "id",
      className: "min-w-[220px]",
      isVisible: true,
      toggleVisibility: true,
    },
  ];

  const [healthMonitorColumns, setHealthMonitorColumns] = useState(
    HEALTH_MONITOR_COLUMNS
  );
  const [backendServerColumns, setBackendServerColumns] = useState(
    BACKEND_SERVER_COLUMNS
  );

  const healthMonitorRows = mockHealthMonitors.map((monitor) => ({
    ...monitor,
    select: (
      <Checkbox
        checked={selectedHealthMonitors.includes(monitor.id)}
        onChange={() => handleHealthMonitorToggle(monitor.id)}
      />
    ),
  }));

  const backendServerRows = mockBackendServers.map((server) => ({
    ...server,
    select: (
      <Checkbox
        checked={selectedBackendServers.includes(server.id)}
        onChange={() => handleBackendServerToggle(server.id)}
      />
    ),
  }));

  const handleHealthMonitorVisibility = (header: string) => {
    const updatedColumns = healthMonitorColumns.map((col) =>
      col.header === header ? { ...col, isVisible: !col.isVisible } : col
    );
    setHealthMonitorColumns(updatedColumns);
  };

  const handleBackendServerVisibility = (header: string) => {
    const updatedColumns = backendServerColumns.map((col) =>
      col.header === header ? { ...col, isVisible: !col.isVisible } : col
    );
    setBackendServerColumns(updatedColumns);
  };

  const handleHealthMonitorShowAll = () => {
    const updatedColumns = healthMonitorColumns.map((col) =>
      col.toggleVisibility ? { ...col, isVisible: true } : col
    );
    setHealthMonitorColumns(updatedColumns);
  };

  const handleHealthMonitorHideAll = () => {
    const updatedColumns = healthMonitorColumns.map((col) =>
      col.toggleVisibility ? { ...col, isVisible: false } : col
    );
    setHealthMonitorColumns(updatedColumns);
  };

  const handleBackendServerShowAll = () => {
    const updatedColumns = backendServerColumns.map((col) =>
      col.toggleVisibility ? { ...col, isVisible: true } : col
    );
    setBackendServerColumns(updatedColumns);
  };

  const handleBackendServerHideAll = () => {
    const updatedColumns = backendServerColumns.map((col) =>
      col.toggleVisibility ? { ...col, isVisible: false } : col
    );
    setBackendServerColumns(updatedColumns);
  };

  const overviewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TabKeyPair
        label="ID"
        value={
          <div className="flex items-center gap-2">
            {poolDetails.poolId}
            <CopyButton text={poolDetails.poolId} />
          </div>
        }
      />
      <TabKeyPair label="Name" value={poolDetails.name} />
      <TabKeyPair label="Description" value={poolDetails.description} />
      <TabKeyPair label="Algorithm" value={poolDetails.algorithm} />
      <TabKeyPair label="Protocol" value={poolDetails.protocol} />
      <TabKeyPair
        label="Provisioning Status"
        value={<DataBadge data={poolDetails.provisioningStatus.status} />}
      />
      <TabKeyPair
        label="Admin State"
        value={<DataBadge data={poolDetails.adminState.status} />}
      />
      <TabKeyPair
        label="Operating Status"
        value={<DataBadge data={poolDetails.operatingStatus.status} />}
      />
      <TabKeyPair
        label="TLS Enabled"
        value={<DataBadge data={poolDetails.tlsEnabled.status} />}
      />
      <TabKeyPair label="Type" value={poolDetails.type} />
      <TabKeyPair label="Created At" value={poolDetails.createdAt} />
      <TabKeyPair label="Updated At" value={poolDetails.updatedAt} />
    </div>
  );

  const healthMonitorsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Search by keyword" />
        <div className="flex items-center gap-3">
          <div className="relative">
            <Settings
              columns={healthMonitorColumns}
              onChange={handleHealthMonitorVisibility}
              handleHideAll={handleHealthMonitorHideAll}
              handleShowAll={handleHealthMonitorShowAll}
            />
          </div>
          <DeleteRowButton className="w-9 h-9 flex items-center justify-center rounded-full border border-themeGray-200" />
          <RefreshButton className="w-9 h-9 flex items-center justify-center rounded-full border border-themeGray-200" />
        </div>
      </div>

      <div className="bg-themeWhite-900 rounded-[20px] shadow-sm">
        <Table
          columns={healthMonitorColumns}
          rows={healthMonitorRows}
          rowKey={(row) => row.id}
          headerSticky={true}
          subActions={[
            { children: "Edit Health Monitor", onClick: () => {} },
            { children: "Delete Health Monitor", onClick: () => {} },
          ]}
        />
        <div className="bg-themeWhite-900 py-3 px-6 rounded-b-[20px]">
          <Pagination
            page={1}
            totalPages={10}
            handleGoToFirstPage={() => {}}
            handleGoToLastPage={() => {}}
            handlePreviousPage={() => {}}
            handleNextPage={() => {}}
            handlePageChange={() => {}}
            handlePaginationNumbers={() => [3, 4, 5]}
          />
        </div>
      </div>
    </div>
  );

  const backendServersContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Search by keyword" />
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsBackendServerModalOpen(true)}>CREATE BACKEND SERVER</Button>
          <div className="relative">
            <Settings
              columns={backendServerColumns}
              onChange={handleBackendServerVisibility}
              handleHideAll={handleBackendServerHideAll}
              handleShowAll={handleBackendServerShowAll}
            />
          </div>
          <DeleteRowButton className="w-9 h-9 flex items-center justify-center rounded-full border border-themeGray-200" />
          <RefreshButton className="w-9 h-9 flex items-center justify-center rounded-full border border-themeGray-200" />
        </div>
      </div>

      <div className="bg-themeWhite-900 rounded-[20px] shadow-sm">
        <Table
          columns={backendServerColumns}
          rows={backendServerRows}
          rowKey={(row) => row.id}
          headerSticky={true}
          subActions={[
            { children: "Edit Backend Server", onClick: () => {} },
            { children: "Delete Backend Server", onClick: () => {} },
          ]}
        />
        <div className="bg-themeWhite-900 py-3 px-6 rounded-b-[20px]">
          <Pagination
            page={1}
            totalPages={10}
            handleGoToFirstPage={() => {}}
            handleGoToLastPage={() => {}}
            handlePreviousPage={() => {}}
            handleNextPage={() => {}}
            handlePageChange={() => {}}
            handlePaginationNumbers={() => [3, 4, 5]}
          />
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", heading: "Overview", content: overviewContent },
    {
      id: "health-monitors",
      heading: "Health Monitors",
      content: healthMonitorsContent,
    },
    {
      id: "backend-servers",
      heading: "Backend Servers",
      content: backendServersContent,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-themeGray-900">
          Pool | {poolId}
        </h1>
      </div>
      <Tabs tabs={tabs} defaultActiveId="overview" />
       {isBackendServerModalOpen && (
        <BackendServerModal
          isOpen={isBackendServerModalOpen}
          onClose={() => setIsBackendServerModalOpen(false)}
          onSubmit={handleCreateBackendServer}
        />
      )}
    </div>
  );
};

export default PoolDetails;
