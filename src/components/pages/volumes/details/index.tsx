"use client";
import Image from "next/image";
import ArrowLeft from "@/assets/svg/arrowLeft.svg";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import Table from "@/components/ui/Table";
import { VolumeDetailsProps, SnapshotType } from "../types";
import { getVolumeDetails, snapshotsData } from "../constants";
import Pagination from "@/components/ui/pagination";
import CopyButton from "@/components/ui/CopyButton";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import CreateSnapshot from "@/components/Modals/CreateSnapshot";
import DataBadge from "@/components/ui/DataBadge";
import { FaRegCalendar } from "react-icons/fa";

const VolumeDetails = ({ volumeId }: VolumeDetailsProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isCreateSnapshotModalOpen, setIsCreateSnapshotModalOpen] =
    useState<boolean>(false);

  const volumeDetails = getVolumeDetails(volumeId);

  const filteredSnapshots = snapshotsData.filter(
    (snapshot) =>
      snapshot.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      snapshot.snapshotId.toLowerCase().includes(searchValue.toLowerCase())
  );

  const formatStatus = (status: string) => {
    const statusConfig = {
      "In Use": "bg-success text-themeGray-900 border-green-200",
      Available: "bg-themeBlue-100 text-themeBlue-700 border-themeBlue-200",
      Creating: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Error: "bg-error text-themeGray-900 border-red-200",
    };
    return (
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.Available
    );
  };

  const formatBoolean = (
    value: boolean,
    positiveText = "Yes",
    negativeText = "No"
  ) => {
    return <span>{value ? positiveText : negativeText}</span>;
  };

  const snapshotColumns = [
    {
      header: "Name",
      accessor: "name" as keyof SnapshotType,
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Snapshot ID",
      accessor: "snapshotId" as keyof SnapshotType,
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Size (GB)",
      accessor: "size" as keyof SnapshotType,
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Status",
      cell: (row: SnapshotType) => <DataBadge data={row.status} />,

      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
   
  ];

  const overviewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TabKeyPair label="Name" value={volumeDetails.name} />
      <TabKeyPair
        label="ID"
        value={
          <div className="flex items-center gap-2">
            {volumeDetails.volumeId}
            <CopyButton text={volumeDetails.volumeId} />
          </div>
        }
      />
      <TabKeyPair
        label="Status"
        value={<DataBadge data={volumeDetails.status} />}
      />
      <TabKeyPair label="Description" value={volumeDetails.description} />
      <TabKeyPair label="Size" value={`${volumeDetails.size} GB`} />
      <TabKeyPair label="Type" value={volumeDetails.type} />
      <TabKeyPair
        label="Bootable"
        value={<DataBadge data={volumeDetails.bootable ? "Yes" : "No"} />}
      />
      <TabKeyPair
        label="Encrypted"
        value={<DataBadge data={volumeDetails.encrypted ? "Yes" : "No"} />}
      />

      <TabKeyPair
        label="Created At"
        value={
          <span className="flex items-center gap-2">
            <FaRegCalendar size={16} />
            {volumeDetails.createdAt}
          </span>
        }
      />

      <TabKeyPair
        label="Updated At"
        value={
          <span className="flex items-center gap-2">
            <FaRegCalendar size={16} />
            {volumeDetails.updatedAt}
          </span>
        }
      />
      <TabKeyPair label="Instance Name" value={volumeDetails.instanceName} />
    </div>
  );

  const snapshotsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by keyword"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="px-4 py-2 border border-themeGray-300 rounded-lg w-64"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCreateSnapshotModalOpen(true)}
            classNames="bg-red-600 text-white px-4 py-2 rounded-full "
          >
            CREATE SNAPSHOT
          </Button>
          <DeleteRowButton onClick={() => {}} />
          <RefreshButton onClick={() => {}} />
        </div>
      </div>

      <div className="bg-themeWhite-900 rounded-[20px] shadow-sm">
        <Table
          columns={snapshotColumns}
          rows={filteredSnapshots}
          rowKey={(row) => row.id}
          headerSticky={true}
          metaData={{
            id: filteredSnapshots[0]?.id || "",
            createdAt: filteredSnapshots[0]?.createdAt || "",
            privateIpv4: "",
            publicIpv4: "",
            privateIpv6: "",
            publicIpv6: "",
          }}
          subActions={[
            {
              children: "Edit Snapshot",
              onClick: () => console.log("Edit snapshot"),
            },
            {
              children: "Delete Snapshot",
              onClick: () => console.log("Delete snapshot"),
            },
            {
              children: "Create Volume",
              onClick: () => console.log("Create volume"),
            },
            {
              children: "Create Backup",
              onClick: () => console.log("Create Backup"),
            },
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
            handlePaginationNumbers={() => {
              return [3, 4, 5];
            }}
          />
        </div>
      </div>
    </div>
  );

  const tabs = [
    {
      id: "overview",
      heading: "Overview",
      content: overviewContent,
    },
    {
      id: "snapshots",
      heading: "Snapshots",
      content: snapshotsContent,
    },
  ];

  return (
    <div className="space-y-6 border border-themeGray-400 rounded-[20px] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-themeGray-900">
              Volume | {volumeDetails.volumeId}
            </h1>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} defaultActiveId="overview" />
      {isCreateSnapshotModalOpen && (
        <CreateSnapshot
          isOpen={isCreateSnapshotModalOpen}
          onClose={() => setIsCreateSnapshotModalOpen(false)}
          volumeId={volumeId} // Pass the current volume ID
        />
      )}
    </div>
  );
};

export default VolumeDetails;
