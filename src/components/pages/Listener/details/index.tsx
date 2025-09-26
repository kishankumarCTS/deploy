"use client";
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
import CreateL7Policy from "@/components/Modals/CreateL7Policy";

import { ListenerDetailsProps, ListenerPolicyType, Column } from "../types";

import { getListenerDetails, listenerPoliciesData } from "../constants";
import { useRouter } from "next/navigation";

const ListenerDetails = ({ listenerId }: ListenerDetailsProps) => {
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [isCreatePolicyModalOpen, setIsCreatePolicyModalOpen] = useState(false);
  const router = useRouter();

  const handleViewPolicyDetails = (policyId: string) => {
    router.push(`/dashboard/l7policy/details/${policyId}`);
  };

  const handlePolicySubmit = (data: {
    name: string;
    description: string;
    action: string;
    position: number;
    redirectUrl?: string;
    redirectPool?: string;
    listenerId?: string | null;
  }) => {
    console.log("New L7 Policy Created:", data);
  };

  const listenerDetails = getListenerDetails(listenerId);

  const handleToggle = (id: string) => {
    if (selectedPolicies.includes(id)) {
      setSelectedPolicies((prev) => prev.filter((pid) => pid !== id));
    } else {
      setSelectedPolicies((prev) => [...prev, id]);
    }
  };

  const POLICY_COLUMNS: Column<
    ListenerPolicyType & { select: React.ReactNode }
  >[] = [
    {
      header: (
        <Checkbox
          checked={selectedPolicies.length === listenerPoliciesData.length}
          onChange={() => {
            if (selectedPolicies.length === listenerPoliciesData.length) {
              setSelectedPolicies([]);
            } else {
              setSelectedPolicies(listenerPoliciesData.map((p) => p.id));
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
      header: "POSITION",
      accessor: "position",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "ACTION",
      accessor: "action",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "L7 POLICY ID",
      accessor: "id",
      className: "min-w-[220px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "CREATED AT",
      accessor: "createdAt",
      className: "min-w-[180px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "OPERATING STATUS",
      accessor: "operatingStatus",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.operatingStatus} />,
    },
    {
      header: "PROVISIONING STATUS",
      accessor: "provisioningStatus",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.provisioningStatus} />,
    },
    {
      header: "ADMIN STATE",
      accessor: "adminState",
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
      cell: (row) => <DataBadge data={row.adminState} />,
    },
  ];

  const [policyColumns, setPolicyColumns] = useState(POLICY_COLUMNS);

  const policyRows = listenerPoliciesData.map((policy) => ({
    ...policy,
    id: policy.policyId,
    select: (
      <Checkbox
        checked={selectedPolicies.includes(policy.id)}
        onChange={() => handleToggle(policy.id)}
      />
    ),
  }));

  const handleChangeVisibility = (header: string) => {
    const updatedColumns = policyColumns.map((col) =>
      col.header === header ? { ...col, isVisible: !col.isVisible } : col
    );
    setPolicyColumns(updatedColumns);
  };

  const handleShowAll = () => {
    const updatedColumns = policyColumns.map((col) =>
      col.toggleVisibility ? { ...col, isVisible: true } : col
    );
    setPolicyColumns(updatedColumns);
  };

  const handleHideAll = () => {
    const updatedColumns = policyColumns.map((col) =>
      col.toggleVisibility ? { ...col, isVisible: false } : col
    );
    setPolicyColumns(updatedColumns);
  };

  const overviewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TabKeyPair
        label="Listener ID"
        value={
          <div className="flex items-center gap-2">
            {listenerDetails.listenerId}
            <CopyButton text={listenerDetails.listenerId} />
          </div>
        }
      />
      <TabKeyPair label="Name" value={listenerDetails.name} />
      <TabKeyPair label="Description" value={listenerDetails.description} />
      <TabKeyPair label="Protocol" value={listenerDetails.protocol} />
      <TabKeyPair label="Port" value={listenerDetails.port} />
      <TabKeyPair
        label="Connection Limit"
        value={listenerDetails.connectionLimit}
      />
      <TabKeyPair
        label="X-Forwarded-For"
        value={<DataBadge data={listenerDetails.xForwardedFor} />}
      />
      <TabKeyPair
        label="X-Forwarded-Port"
        value={<DataBadge data={listenerDetails.xForwardedPort} />}
      />
      <TabKeyPair
        label="X-Forwarded-Proto"
        value={<DataBadge data={listenerDetails.xForwardedProto} />}
      />
      <TabKeyPair
        label="Client Timeout"
        value={listenerDetails.clientTimeout}
      />
      <TabKeyPair
        label="Member Timeout"
        value={listenerDetails.memberTimeout}
      />
      <TabKeyPair
        label="TCP Inspect Timeout"
        value={listenerDetails.tcpInspectTimeout}
      />
      <TabKeyPair
        label="Provisioning Status"
        value={<DataBadge data={listenerDetails.provisioningStatus} />}
      />
      <TabKeyPair
        label="Admin State"
        value={<DataBadge data={listenerDetails.adminState} />}
      />
      <TabKeyPair
        label="Operating Status"
        value={<DataBadge data={listenerDetails.operatingStatus} />}
      />
      <TabKeyPair label="Created At" value={listenerDetails.createdAt} />
      <TabKeyPair label="Updated At" value={listenerDetails.updatedAt} />
    </div>
  );

  const l7PoliciesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Search by keyword" />
        <div className="flex items-center gap-3">
          <Button
            classNames="flex items-center justify-center gap-2 bg-red-600 text-white rounded-[40px] px-6 h-9"
            onClick={() => setIsCreatePolicyModalOpen(true)}
          >
            CREATE L7 POLICY
          </Button>
          <div className="relative">
            <Settings
              columns={policyColumns}
              onChange={handleChangeVisibility}
              handleHideAll={handleHideAll}
              handleShowAll={handleShowAll}
            />
          </div>
          <DeleteRowButton className="w-9 h-9 flex items-center justify-center rounded-full border border-themeGray-200" />
          <RefreshButton className="w-9 h-9 flex items-center justify-center rounded-full border border-themeGray-200" />
        </div>
      </div>

      <div className="bg-themeWhite-900 rounded-[20px] shadow-sm">
        <Table
          columns={policyColumns}
          rows={policyRows}
          rowKey={(row) => row.id}
          headerSticky={true}
          subActions={[
            { children: "Edit Policy", onClick: () => {} },
            { children: "Delete Policy", onClick: () => {} },
          ]}
          mainAction={{
            children: "View Policy Details",
            onClick: (policyId: string) => handleViewPolicyDetails(policyId),
          }}
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
    { id: "l7-policies", heading: "L7 Policies", content: l7PoliciesContent },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-themeGray-900">
          Listener | {listenerId}
        </h1>
      </div>
      <Tabs tabs={tabs} defaultActiveId="overview" />
      <CreateL7Policy
        isOpen={isCreatePolicyModalOpen}
        onClose={() => setIsCreatePolicyModalOpen(false)}
        listenerId={listenerId}
        onSubmit={handlePolicySubmit}
      />
    </div>
  );
};

export default ListenerDetails;
