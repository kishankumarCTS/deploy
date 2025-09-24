"use client";
import Image from "next/image";
import ArrowLeft from "@/assets/svg/arrowLeft.svg";
import Pagination from "@/components/ui/pagination";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import Table from "@/components/ui/Table";
import Checkbox from "@/components/ui/Checkbox";
import CopyButton from "@/components/ui/CopyButton";
import SearchBar from "@/components/ui/SearchBar";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import {
  SecurityGroupDetailsProps,
  SecurityGroupRuleType,
  Column,
} from "../types";
import { getSecurityGroupDetails, securityGroupRulesData } from "../constants";
import CreateNewRuleModal from "@/components/Modals/CreateNewRuleModal";

const SecurityGroupDetails = ({
  securityGroupId,
}: SecurityGroupDetailsProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const [selectedInboundRules, setSelectedInboundRules] = useState<string[]>(
    []
  );
  const [selectedOutboundRules, setSelectedOutboundRules] = useState<string[]>(
    []
  );
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const handleCreateRule = (data: any) => {
    console.log("New rule created:", data);
  };
  const securityGroupDetails = getSecurityGroupDetails(securityGroupId);

  const filteredInboundRules = securityGroupRulesData.filter(
    (rule) =>
      rule.direction === "inbound" &&
      (rule.etherType.toLowerCase().includes(searchValue.toLowerCase()) ||
        rule.ruleId.toLowerCase().includes(searchValue.toLowerCase()) ||
        rule.ipProtocol.toLowerCase().includes(searchValue.toLowerCase()) ||
        rule.remoteIpPrefix.toLowerCase().includes(searchValue.toLowerCase()) ||
        rule.portRange.toLowerCase().includes(searchValue.toLowerCase()))
  );

// Unified handler for rule details based on direction
const handleRuleDetails = (rule: SecurityGroupRuleType) => {
  const route =
    rule.direction === "inbound"
      ? `${process.env.NEXT_PUBLIC_BASEURL}dashboard/inbound/details/${rule.ruleId}`
      : `${process.env.NEXT_PUBLIC_BASEURL}dashboard/outbound/details/${rule.ruleId}`;

  router.push(route);
};

  const filteredOutboundRules = securityGroupRulesData.filter(
    (rule) =>
      rule.direction === "outbound" &&
      (rule.etherType.toLowerCase().includes(searchValue.toLowerCase()) ||
        rule.ruleId.toLowerCase().includes(searchValue.toLowerCase()) ||
        rule.ipProtocol.toLowerCase().includes(searchValue.toLowerCase()) ||
        rule.remoteIpPrefix.toLowerCase().includes(searchValue.toLowerCase()) ||
        rule.portRange.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleSelectAll = (
    type: "inbound" | "outbound",
    rows: { id: string }[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.length === rows.length) {
      setSelected([]);
    } else {
      setSelected(rows.map((row) => row.id));
    }
  };

  const handleToggle = (
    id: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((rowId) => rowId !== id));
    } else {
      setSelected((prev) => [...prev, id]);
    }
  };

  const ruleColumns: Column<
    SecurityGroupRuleType & { select: React.ReactNode }
  >[] = [
    {
      header: "",
      accessor: "select",
      className: "max-w-[20px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "ETHER TYPE",
      cell: (row: SecurityGroupRuleType) => <span>{row.etherType}</span>,
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "ID",
      accessor: "ruleId",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "IP PROTOCOL",
      accessor: "ipProtocol",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "REMOTE IP PREFIX",
      accessor: "remoteIpPrefix",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "PORT RANGE",
      accessor: "portRange",
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "REMOTE SECURITY GROUP",
      accessor: "remoteSecurityGroup",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "DESCRIPTION",
      accessor: "description",
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
  ];

  const getInboundRuleColumns = () => [
    {
      ...ruleColumns[0],
      header: (
        <Checkbox
          checked={
            selectedInboundRules.length === filteredInboundRules.length &&
            filteredInboundRules.length > 0
          }
          onChange={() =>
            handleSelectAll(
              "inbound",
              filteredInboundRules,
              selectedInboundRules,
              setSelectedInboundRules
            )
          }
        />
      ),
    },
    ...ruleColumns.slice(1),
  ];

  const getOutboundRuleColumns = () => [
    {
      ...ruleColumns[0],
      header: (
        <Checkbox
          checked={
            selectedOutboundRules.length === filteredOutboundRules.length &&
            filteredOutboundRules.length > 0
          }
          onChange={() =>
            handleSelectAll(
              "outbound",
              filteredOutboundRules,
              selectedOutboundRules,
              setSelectedOutboundRules
            )
          }
        />
      ),
    },
    ...ruleColumns.slice(1),
  ];

  const inboundRuleRows = filteredInboundRules.map((rule) => ({
    ...rule,
    id:rule.ruleId,
    select: (
      <Checkbox
        checked={selectedInboundRules.includes(rule.id)}
        onChange={() =>
          handleToggle(rule.id, selectedInboundRules, setSelectedInboundRules)
        }
      />
    ),
  }));

  const outboundRuleRows = filteredOutboundRules.map((rule) => ({
    ...rule,
    id: rule.ruleId,
    select: (
      <Checkbox
        checked={selectedOutboundRules.includes(rule.id)}
        onChange={() =>
          handleToggle(rule.id, selectedOutboundRules, setSelectedOutboundRules)
        }
      />
    ),
  }));

  const overviewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TabKeyPair
        label="Security group ID"
        value={
          <div className="flex items-center gap-2">
            {securityGroupDetails.securityGroupId}
            <CopyButton text={securityGroupDetails.securityGroupId} />
          </div>
        }
      />
      <TabKeyPair label="Name" value={securityGroupDetails.name} />
      <TabKeyPair
        label="Description"
        value={securityGroupDetails.description}
      />
      <TabKeyPair label="Instances" value={securityGroupDetails.instances} />
    </div>
  );

  const inboundRulesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchBar
          placeholder="Search by keyword"
          onChange={setSearchValue}
          onSubmit={setSearchValue}
        />

        <div className="flex items-center gap-2">
          <DeleteRowButton onClick={() => {}} />
          <RefreshButton onClick={() => {}} />
        </div>
      </div>

      <div className="bg-themeWhite-900 rounded-[20px] shadow-sm">
        <Table
          columns={getInboundRuleColumns()}
          rows={inboundRuleRows}
          rowKey={(row) => row.id}
          headerSticky={true}
          subActions={[
            { children: "Edit Rule", onClick: () => {} },
            { children: "Delete Rule", onClick: () => {} },
          ]}
          mainAction={{
            children: "View Inbound Details",
             onClick: (rowId: string) => {
      const rule = inboundRuleRows.find((r) => r.id === rowId);
      if (rule) handleRuleDetails(rule);
    },
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
            handlePaginationNumbers={() => {
              return [3, 4, 5];
            }}
          />
        </div>
      </div>
    </div>
  );

  const outboundRulesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchBar
          placeholder="Search by keyword"
          onChange={setSearchValue}
          onSubmit={setSearchValue}
        />

        <div className="flex items-center gap-2">
          <DeleteRowButton onClick={() => {}} />
          <RefreshButton onClick={() => {}} />
        </div>
      </div>

      <div className="bg-themeWhite-900 rounded-[20px] shadow-sm">
        <Table
          columns={getOutboundRuleColumns()}
          rows={outboundRuleRows}
          rowKey={(row) => row.id}
          headerSticky={true}
          subActions={[
            { children: "Edit Rule", onClick: () => {} },
            { children: "Delete Rule", onClick: () => {} },
          ]}
          mainAction={{
            children: "View Outbound Details",
             onClick: (rowId: string) => {
      const rule = outboundRuleRows.find((r) => r.id === rowId);
      if (rule) handleRuleDetails(rule);
    },
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
            handlePaginationNumbers={() => {
              return [3, 4, 5];
            }}
          />
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", heading: "Overview", content: overviewContent },
    {
      id: "inbound-rules",
      heading: "Inbound Rules",
      content: inboundRulesContent,
    },
    {
      id: "outbound-rules",
      heading: "Outbound Rules",
      content: outboundRulesContent,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <h1 className="text-2xl font-semibold text-themeGray-900">
            Security Groups | {securityGroupId}
          </h1>
        </div>
        <Button
          onClick={() => setIsCreateRuleOpen(true)}
          classNames="flex items-center justify-center gap-2 bg-red-600 text-white rounded-[40px] px-6 h-10"
        >
          CREATE NEW RULE
        </Button>
      </div>

      <Tabs tabs={tabs} defaultActiveId="overview" />

      <CreateNewRuleModal
        isOpen={isCreateRuleOpen}
        onClose={() => setIsCreateRuleOpen(false)}
        onSubmit={handleCreateRule}
      />
    </div>
  );
};

export default SecurityGroupDetails;
