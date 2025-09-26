"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/ui/Table";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Settings from "@/components/ui/ListingSettings";
import { VPCType, Column } from "../types";
import { vpcData } from "../constants";
import Pagination from "@/components/ui/pagination";
import CopyButton from "@/components/ui/CopyButton";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import Stepper from "@/components/Modals/createVPC/Stepper";
import DataBadge from "@/components/ui/DataBadge";
const VPCList = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [createdVpc, setCreatedVpc] = useState<any | null>(null);
  const [vpcList, setVpcList] = useState(vpcData);

  const filteredVPCs = vpcList.filter(
    (vpc) =>
      vpc.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      vpc.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      vpc.vpcId.toLowerCase().includes(searchValue.toLowerCase()) ||
      vpc.subnets.toLowerCase().includes(searchValue.toLowerCase())
  );

  const rows = filteredVPCs.map((vpc) => ({
    ...vpc,
    select: (
      <Checkbox
        checked={selectedRows.includes(vpc.id)}
        onChange={() => {
          handleSelectToggle(vpc.id);
        }}
      />
    ),
  }));

  const handleVPCDetails = (vpcId: string) => {
    try {
      const vpc = filteredVPCs.find((v) => v.id === vpcId);
      if (vpc) {
        router.push(`/dashboard/vpc/details/${vpc.vpcId}`);
      }
    } catch (error) {
      console.log("View button clicked with ID:", vpcId, error);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      const updatedSelectedRows = rows.map((row) => row.id);
      setSelectedRows(updatedSelectedRows);
    }
  };

  const handleSelectToggle = (toggledId: string) => {
    if (selectedRows.includes(toggledId)) {
      setSelectedRows((prev) => prev.filter((id) => id !== toggledId));
    } else {
      setSelectedRows((prev) => [...prev, toggledId]);
    }
  };

  const COLUMNS: Column<VPCType>[] = [
    {
      header: (
        <Checkbox
          checked={selectedRows.length === rows.length && rows.length > 0}
          onChange={handleSelectAll}
        />
      ),
      accessor: "select",
      className: "max-w-[20px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "Name",
      accessor: "name",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "VPC ID",
      accessor: "vpcId",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Subnets",
      accessor: "subnets",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Status",
      cell: (row: VPCType) => <DataBadge data={row.status} />,
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Created At",
      cell: (row: VPCType) => {
        const date = new Date(row.createdAt);
        return (
          <span className="flex items-center gap-2">
            {date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        );
      },
      className: "min-w-[180px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Admin State",
      cell: (row: VPCType) => <DataBadge data={row.adminState} />,
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Description",
      accessor: "description",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
  ];

  const [columns, setColumns] = useState<Column<VPCType>[]>(COLUMNS);

  const handleChangeVisibility = (header: string) => {
    const updatedColumns = columns.map((col) =>
      col.header === header ? { ...col, isVisible: !col.isVisible } : col
    );
    setColumns(updatedColumns);
  };

  const handleShowAll = () => {
    const updatedColumns = columns.map((col) =>
      col.toggleVisibility ? { ...col, isVisible: true } : col
    );
    setColumns(updatedColumns);
  };

  const handleHideAll = () => {
    const updatedColumns = columns.map((col) =>
      col.toggleVisibility ? { ...col, isVisible: false } : col
    );
    setColumns(updatedColumns);
  };

  useEffect(() => {
    setColumns((prevColumns) =>
      prevColumns.map((col, ind) =>
        ind === 0
          ? {
              ...col,
              header: (
                <Checkbox
                  checked={
                    selectedRows.length === rows.length && rows.length > 0
                  }
                  onChange={handleSelectAll}
                />
              ),
            }
          : col
      )
    );
  }, [selectedRows, rows.length]);

  return (
    <div className="space-y-6 border border-themeGray-400 rounded-[20px] p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-themeGray-900">
          Virtual Private Cloud
        </h1>
        <Stepper
          setVpcData={() => {}}
          vpcData={{}}
          setCreatedVPC={(newVpc: any) => {
            setCreatedVpc(newVpc);
            setVpcList((prev) => [
              ...prev,
              {
                id: String(prev.length + 1),
                name: newVpc.name,
                vpcId: newVpc.vpcId || `vpc-${prev.length + 100}`,
                subnets: newVpc.value,
                description: "Created via Stepper",
                status: "Active",
                createdAt: new Date().toISOString(),
                adminState: "Up",
              },
            ]);
          }}
          createdVpc={createdVpc}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <SearchBar
          placeholder="Search by keyword"
          onChange={setSearchValue}
          onSubmit={setSearchValue}
        />
        <div className="flex items-center gap-3">
          <Settings
            columns={columns
              .filter((col) => typeof col.header === "string")
              .map((col) => ({
                header: col.header as string,
                toggleVisibility: col.toggleVisibility,
                isVisible: col.isVisible,
              }))}
            onChange={handleChangeVisibility}
            handleHideAll={handleHideAll}
            handleShowAll={handleShowAll}
          />
          <DeleteRowButton onClick={() => {}} />
          <RefreshButton onClick={() => {}} />
        </div>
      </div>

      <div className="bg-themeWhite-900 rounded-[20px] shadow-sm">
        <Table
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          headerSticky={true}
          metaData={{
            id: "value",
            createdAt: "value",
            privateIpv4: "",
            publicIpv4: "",
            privateIpv6: "",
            publicIpv6: "",
          }}
          subActions={[
            { children: "Add Subnet", onClick: () => {} },
            { children: "Edit VPC", onClick: () => {} },
            { children: "Delete VPC", onClick: () => {} },
          ]}
          mainAction={{
            children: "View Complete VPC Details",
            onClick: handleVPCDetails,
          }}
          className="max-h-[1000px] rounded-b-none"
          tableClasses="rounded-b-none"
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
};

export default VPCList;
