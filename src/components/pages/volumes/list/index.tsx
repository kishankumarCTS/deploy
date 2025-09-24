"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/ui/Table";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Settings from "@/components/ui/ListingSettings";
import { VolumeType, Column } from "../types";
import { volumeData } from "../constants";
import Pagination from "@/components/ui/pagination";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import CreateVolume from "@/components/Modals/createVolume";
import DataBadge from "@/components/ui/DataBadge";

const VolumeList = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isCreateVolumeModalOpen, setIsCreateVolumeModalOpen] = useState<boolean>(false);
  
  const filteredVolumes = volumeData.filter(
    (volume) =>
      volume.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      volume.volumeId.toLowerCase().includes(searchValue.toLowerCase()) ||
      volume.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      volume.instanceName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const rows = filteredVolumes.map((volume) => ({
    ...volume,
    select: (
      <Checkbox
        checked={selectedRows.includes(volume.id)}
        onChange={() => {
          handleSelectToggle(volume.id);
        }}
      />
    ),
    status: <DataBadge data={volume.status} />,
    bootable: <DataBadge data={volume.bootable ? "Yes" : "No"} />,
  }));

  const handleVolumeDetails = (volumeId: string) => {
    try {
      const volume = filteredVolumes.find((vol) => vol.id === volumeId);
      if (volume) {
        router.push(
          `${process.env.NEXT_PUBLIC_BASEURL}dashboard/volumes/details/${volume.volumeId}`
        );
      }
    } catch (error) {
      console.log("View button clicked with ID:", volumeId);
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

  // Define COLUMNS as a constant array like in AlertsListing
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
      className: "min-w-[180px]",
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
      header: "Size (GB)",
      accessor: "size",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Instance Name",
      accessor: "instanceName",
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
      header: "Bootable",
      accessor: "bootable",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Type",
      accessor: "type",
      className: "min-w-[180px]",
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
        <h1 className="text-2xl font-semibold text-themeGray-900">
          All Volumes
        </h1>
        <Button
          onClick={() => setIsCreateVolumeModalOpen(true)}
          classNames="flex items-center justify-center gap-2 bg-themeBlue-700 text-white rounded-[40px] px-6 h-10 w-[193px]"
        >
          Create New Volume
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <SearchBar
          placeholder="Search volumes"
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
            privateIpv4: "ipv4",
            publicIpv4: "ipv4",
            privateIpv6: "ipv6",
            publicIpv6: "ipv6",
          }}
          subActions={[
            { children: "Attach to Instance", onClick: () => {} },
            { children: "Detach Volume", onClick: () => {} },
            { children: "Create Snapshot", onClick: () => {} },
            { children: "Extend Volume", onClick: () => {} },
            { children: "Change Volume Type", onClick: () => {} },
            { children: "Edit Volume", onClick: () => {} },
            { children: "Delete Volume", onClick: () => {} },
          ]}
          mainAction={{
            children: "View Complete Volume Details",
            onClick: handleVolumeDetails,
          }}
          className="h-max-[350px] rounded-b-none"
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
      {isCreateVolumeModalOpen && (
        <CreateVolume
          isOpen={isCreateVolumeModalOpen}
          onClose={() => setIsCreateVolumeModalOpen(false)}
        />
      )}
    </div>
  );
};

export default VolumeList;