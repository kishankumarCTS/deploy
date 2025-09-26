"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/pagination";
import Checkbox from "@/components/ui/Checkbox";

import RefreshButton from "@/components/ui/RefreshButton";
import DataBadge from "@/components/ui/DataBadge";
import CreateInterface from "@/components/Modals/CreateInterface";
import { ROWS } from "./constants";

function InterfacesTab() {
  // TODO: bg colour used as hex value
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [rowsData, setRowsData] = useState<any[]>(ROWS);
  const router = useRouter();

  const rows = ROWS.map((row) => ({
    ...row,
    id: row.interfaceId,
    select: (
      <Checkbox
        checked={selectedRows.includes(row.id)}
        onChange={() => {
          handleSelectToggle(row.id);
        }}
      />
    ),
    status: <DataBadge data={row.status} />,
    adminState: <DataBadge data={row.adminState} />,
  }));
  const COLUMNS = [
    {
      header: (
        <Checkbox
          checked={selectedRows.length === rows.length}
          onChange={() => {
            handleSelectAll();
          }}
        />
      ),
      accessor: "select",
      className: "max-w-[20px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "INTERFACE ID",
      accessor: "interfaceId",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "STATUS",
      accessor: "status",
      className: "max-w-[100px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "ADMIN STATE",
      accessor: "adminState",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[200px]",
    },
    {
      header: "CREATED AT",
      accessor: "createdAt",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[200px]",
    },
    {
      header: "VPC",
      accessor: "vpc",
      className: "max-w-[100px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "FIXED IPS",
      accessor: "fixedIps",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[200px]",
    },
  ];

  const [columns, setColumns] = useState<any>(COLUMNS);

  const handleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
      setColumns(COLUMNS);
    } else {
      const updatedSelectedRows = rows.map((row) => row.id);
      setSelectedRows(updatedSelectedRows);
      setColumns(COLUMNS);
    }
  };

  const handleSelectToggle = (toggledId: any) => {
    if (selectedRows.includes(toggledId)) {
      setSelectedRows((prev: any) =>
        prev.filter((id: any) => id !== toggledId)
      );
    } else {
      setSelectedRows((prev: any) => [...prev, toggledId]);
    }
  };

  useEffect(() => {
    setColumns(
      columns.map((col: any, ind: any) =>
        ind === 0
          ? {
              ...col,
              header: (
                <Checkbox
                  checked={selectedRows.length === rows.length}
                  onChange={() => {
                    handleSelectAll();
                  }}
                />
              ),
            }
          : col
      )
    );
  }, [selectedRows]);
  const handleCreateInterface = (newInterface: {
    subnetId: string;
    ipAddress?: string;
  }) => {
    const newRow = {
      id: `intf-${rowsData.length + 1}`,
      interfaceId: newInterface.subnetId,
      status: "ACTIVE",
      adminState: "ENABLED",
      createdAt: new Date().toISOString(),
      vpc: "vpc-123",
      fixedIps: newInterface.ipAddress || "-",
    };
    setRowsData((prev) => [...prev, newRow]);
  };

  const handleInterfaceDetails = (interfaceId: string) => {
    router.push(`/dashboard/interface/details/${interfaceId}`);
  };
  return (
    <div>
      <div>
        {/* content */}
        <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
          <div className="flex justify-between items-center gap-3 mb-6">
            <SearchBar placeholder="Search by keyword" />
            <div className="flex items-center gap-3">
              <Button onClick={() => setIsCreateModalOpen(true)}>
                Create Interface
              </Button>
              {/* <DeleteRowButton onClick={() => {}} /> */}
              <RefreshButton onClick={() => {}} />
            </div>
          </div>
          <Table
            columns={columns}
            rows={rows}
            headerSticky={false}
            subActions={[{ children: "Delete", onClick: () => {} }]}
            mainAction={{
              children: "View Interface Details",
              onClick: (interfaceId: string) =>
                handleInterfaceDetails(interfaceId),
            }}
            className="max-h-[852px] rounded-b-none"
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
      <CreateInterface
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateInterface}
        subnets={[
          { id: "subnet-1", name: "Subnet A" },
          { id: "subnet-2", name: "Subnet B" },
        ]}
      />
    </div>
  );
}

export default InterfacesTab;
