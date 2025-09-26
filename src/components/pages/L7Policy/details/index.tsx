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
import CreateL7RuleModal from "@/components/Modals/CreateL7Rule";
import { L7RuleType, Column, L7PolicyDetailsProps } from "../types";
import { getL7PolicyDetails, getL7RulesForPolicy } from "../constants";
import { useRouter } from "next/navigation";

const L7PolicyDetails = ({ policyId }: L7PolicyDetailsProps) => {
  const router = useRouter();

  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [ruleColumns, setRuleColumns] = useState<
    Column<L7RuleType & { select: React.ReactNode }>[]
  >([]);

  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false); // modal state

  const policyDetails = getL7PolicyDetails(policyId);
  const l7RulesData = getL7RulesForPolicy(policyId);
  const handleViewRuleDetails = (ruleId: string) => {
    router.push(`/dashboard/l7rule/details/${ruleId}`);
  };
  if (!policyDetails) {
    return <div className="p-6">Policy not found</div>;
  }

  if (ruleColumns.length === 0) {
    setRuleColumns([
      {
        header: (
          <Checkbox
            checked={selectedRules.length === l7RulesData.length}
            onChange={() => {
              if (selectedRules.length === l7RulesData.length) {
                setSelectedRules([]);
              } else {
                setSelectedRules(l7RulesData.map((r) => r.id));
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
        header: "TYPE",
        accessor: "type",
        className: "min-w-[120px]",
        isVisible: true,
        toggleVisibility: true,
      },
      {
        header: "KEY",
        accessor: "key",
        className: "min-w-[100px]",
        isVisible: true,
        toggleVisibility: true,
      },
      {
        header: "COMPARE TYPE",
        accessor: "compareType",
        className: "min-w-[120px]",
        isVisible: true,
        toggleVisibility: true,
      },
      {
        header: "VALUE",
        accessor: "value",
        className: "min-w-[100px]",
        isVisible: true,
        toggleVisibility: true,
      },
      {
        header: "INVERT",
        accessor: "invert",
        className: "min-w-[80px]",
        isVisible: true,
        toggleVisibility: true,
        cell: (row) => <DataBadge data={row.invert ? "Yes" : "No"} />,
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
      {
        header: "CREATED AT",
        accessor: "createdAt",
        className: "min-w-[180px]",
        isVisible: true,
        toggleVisibility: true,
      },
      {
        header: "L7 RULE ID",
        accessor: "id",
        className: "min-w-[200px]",
        isVisible: true,
        toggleVisibility: true,
      },
    ]);
  }

  const ruleRows = l7RulesData.map((rule) => ({
    ...rule,
    id: rule.ruleId,
    select: (
      <Checkbox
        checked={selectedRules.includes(rule.id)}
        onChange={() =>
          setSelectedRules((prev) =>
            prev.includes(rule.id)
              ? prev.filter((rid) => rid !== rule.id)
              : [...prev, rule.id]
          )
        }
      />
    ),
  }));

  const handleChangeVisibility = (header: string) => {
    setRuleColumns((prev) =>
      prev.map((col) =>
        col.header === header ? { ...col, isVisible: !col.isVisible } : col
      )
    );
  };

  const handleShowAll = () =>
    setRuleColumns((prev) =>
      prev.map((col) =>
        col.toggleVisibility ? { ...col, isVisible: true } : col
      )
    );

  const handleHideAll = () =>
    setRuleColumns((prev) =>
      prev.map((col) =>
        col.toggleVisibility ? { ...col, isVisible: false } : col
      )
    );

  const handleCreateRule = () => {
    console.log("rule created");
  };

  const overviewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TabKeyPair
        label="L7 Policy ID"
        value={
          <div className="flex items-center gap-2">
            {policyDetails.policyId}
            <CopyButton text={policyDetails.policyId} />
          </div>
        }
      />
      <TabKeyPair label="Name" value={policyDetails.name} />
      <TabKeyPair label="Position" value={policyDetails.position} />
      <TabKeyPair label="Description" value={policyDetails.description} />
      <TabKeyPair
        label="Provisioning Status"
        value={<DataBadge data={policyDetails.provisioningStatus} />}
      />
      <TabKeyPair
        label="Admin State"
        value={<DataBadge data={policyDetails.adminState} />}
      />
      <TabKeyPair
        label="Operating Status"
        value={<DataBadge data={policyDetails.operatingStatus} />}
      />
      <TabKeyPair label="Created At" value={policyDetails.createdAt} />
      <TabKeyPair label="Updated At" value={policyDetails.updatedAt} />
    </div>
  );

  const l7RulesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <SearchBar placeholder="Search by keyword" />
        <div className="flex items-center gap-3">
          <Button
            classNames="flex items-center justify-center gap-2 bg-red-600 text-white rounded-[40px] px-6 h-9"
            onClick={() => setIsRuleModalOpen(true)}
          >
            CREATE L7 RULE
          </Button>
          <div className="relative">
            <Settings
              columns={ruleColumns}
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
          columns={ruleColumns}
          rows={ruleRows}
          rowKey={(row) => row.id}
          headerSticky={true}
          subActions={[
            { children: "Edit Rule", onClick: () => {} },
            { children: "Delete Rule", onClick: () => {} },
          ]}
          mainAction={{
            children: "View Rule Details",
            onClick: (ruleId: string) => handleViewRuleDetails(ruleId), // use ruleId here
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
    { id: "l7-rules", heading: "L7 Rules", content: l7RulesContent },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-themeGray-900">
          L7 Policy | {policyId}
        </h1>
      </div>
      <Tabs tabs={tabs} defaultActiveId="overview" />
      <CreateL7RuleModal
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
        policyId={policyId}
        onSubmit={handleCreateRule}
      />
    </div>
  );
};

export default L7PolicyDetails;
