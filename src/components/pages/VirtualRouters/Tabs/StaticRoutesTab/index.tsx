"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/pagination";
import Checkbox from "@/components/ui/Checkbox";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import DataBadge from "@/components/ui/DataBadge";
import CreateStaticRoute from "@/components/Modals/CreateStaticRoute";
import { ROWS } from "./constants";

function StaticRoutesTab() {
  // TODO: bg colour used as hex value
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [rowsData, setRowsData] = useState<any[]>(ROWS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const rows = ROWS.map((row) => ({
    ...row,
    select: (
      <Checkbox
        checked={selectedRows.includes(row.id)}
        onChange={() => {
          handleSelectToggle(row.id);
        }}
      />
    ),
    status: <DataBadge data="Active" />,
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
      header: "DESTINATION ADDRESS",
      accessor: "destinationAddress",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "NEXT HOP ADDRESS",
      accessor: "nextHopAddress",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
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
  const handleCreateRoute = (newRoute: {
    destination: string;
    nextHop: string;
  }) => {
    const newRow = {
      id: `route-${rowsData.length + 1}`,
      destinationAddress: newRoute.destination,
      nextHopAddress: newRoute.nextHop,
    };
    setRowsData((prev) => [...prev, newRow]);
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
                Create Static Route
              </Button>
              <DeleteRowButton onClick={() => {}} />
              <RefreshButton onClick={() => {}} />
            </div>
          </div>
          <Table
            columns={columns}
            rows={rows}
            headerSticky={false}
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
      <CreateStaticRoute
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRoute}
      />
    </div>
  );
}

export default StaticRoutesTab;
