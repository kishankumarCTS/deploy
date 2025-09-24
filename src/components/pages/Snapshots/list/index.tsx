"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/ui/Table";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Settings from "@/components/ui/ListingSettings";
import { SnapshotType, Column } from "../types";
import { snapshotData } from "../constants";
import Pagination from "@/components/ui/pagination";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import { FaRegCalendar } from "react-icons/fa6";

const SnapshotList = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredSnapshots = snapshotData.filter(
    (snap) =>
      snap.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      snap.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      snap.snapshotId.toLowerCase().includes(searchValue.toLowerCase()) ||
      snap.volumeName.toLowerCase().includes(searchValue.toLowerCase()) ||
      snap.status.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getStatusBadge = (status: SnapshotType["status"]) => {
    const statusColors = {
      Available: "bg-green-100 text-green-800",
      Creating: "bg-blue-100 text-blue-800",
      Deleting: "bg-orange-100 text-orange-800",
      Error: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {status}
      </span>
    );
  };

  const rows = filteredSnapshots.map((snap) => ({
    ...snap,
    select: (
      <Checkbox
        checked={selectedRows.includes(snap.id)}
        onChange={() => {
          handleSelectToggle(snap.id);
        }}
      />
    ),
    status: getStatusBadge(snap.status),
    created: (
      <div className="flex items-center gap-2">
        <FaRegCalendar size={18} /> {snap.created}
      </div>
    ),
  }));

  const handleSnapshotDetails = (snapshotId: string) => {
    try {
      const snapshot = filteredSnapshots.find((snap) => snap.id === snapshotId);
      if (snapshot) {
        router.push(
          `${process.env.NEXT_PUBLIC_BASEURL}dashboard/snapshots/details/${snapshot.snapshotId}`
        );
      }
    } catch (error) {
      console.log("View button clicked with ID:", snapshotId);
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

  // Define COLUMNS as a constant array
  const COLUMNS = [
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
      header: "Description",
      accessor: "description",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Snapshot ID",
      accessor: "snapshotId",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Size (GB)",
      accessor: "size",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Volume Name",
      accessor: "volumeName",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Status",
      accessor: "status",
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Created",
      accessor: "created",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
  ];

  const [columns, setColumns] = useState(COLUMNS);

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
        <h1 className="text-2xl font-semibold text-themeGray-900">Snapshots</h1>
        
      </div>

      <div className="flex items-center justify-between gap-4">
        <SearchBar
          placeholder="Search by keyword"
          onChange={setSearchValue}
          onSubmit={setSearchValue}
        />
        <div className="flex items-center gap-3">
          <Settings
            columns={columns}
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
            { children: "Create Volume ", onClick: () => {} },
            { children: "Delete Snapshot", onClick: () => {} },
            { children: "Edit Snapshot", onClick: () => {} },
            { children: "Create Backup", onClick: () => {} },
          ]}
          mainAction={{
            children: "View Complete Snapshot Details",
            onClick: handleSnapshotDetails,
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

export default SnapshotList;
