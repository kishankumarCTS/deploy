"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/ui/Table";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Settings from "@/components/ui/ListingSettings";
import Pagination from "@/components/ui/pagination";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import { FaRegCalendar } from "react-icons/fa";
4;
import BucketStepper from "@/components/Modals/CreateBucket/Stepper";
import { bucketData, regions, existingBuckets } from "../../constants";

const BucketList = () => {
  const router = useRouter();
  const [isStepperOpen, setIsStepperOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBuckets = bucketData.filter((bucket) =>
    bucket.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const rows = filteredBuckets.map((bucket) => ({
    ...bucket,
    select: (
      <Checkbox
        checked={selectedRows.includes(bucket.id)}
        onChange={() => handleSelectToggle(bucket.id)}
      />
    ),
    name: (
      <span
        className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
        onClick={() => handleViewDetails(bucket.id)}
      >
        {bucket.name}
      </span>
    ),
    creationDate: (
      <span className="flex items-center gap-2">
        <FaRegCalendar size={16} className="text-gray-500" />
        {bucket.creationDate}
      </span>
    ),
  }));

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
      header: "NAME",
      accessor: "name",
      className: "min-w-[250px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "CREATION DATE",
      accessor: "creationDate",
      className: "min-w-[200px]",
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
  const handleSelectToggle = (toggledId: string) => {
    if (selectedRows.includes(toggledId)) {
      setSelectedRows((prev) => prev.filter((id) => id !== toggledId));
    } else {
      setSelectedRows((prev) => [...prev, toggledId]);
    }
  };

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/s3-storage/buckets/${id}`);
  };

  useEffect(() => {
    setColumns(
      columns.map((col, ind) =>
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
  }, [selectedRows]);

  return (
    <div>
      <div className="flex justify-between items-center gap-3 mb-10">
        <h1 className="text-[32px] leading-[21px] font-medium">S3 | Buckets</h1>
        <Button onClick={() => setIsStepperOpen(true)}>Create Bucket</Button>
      </div>

      <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
        <div className="flex justify-between items-center gap-3 mb-6">
          <SearchBar
            placeholder="Search buckets by name"
            onChange={setSearchValue}
            onSubmit={setSearchValue}
          />
          <div className="flex items-center gap-3">
            <Settings
              columns={columns}
              onChange={(header) => {
                handleChangeVisibility(header);
              }}
              handleHideAll={handleHideAll}
              handleShowAll={handleShowAll}
              className="mr-5"
            />
            <DeleteRowButton onClick={() => {}} />
            <RefreshButton onClick={() => {}} />
          </div>
        </div>

        <Table
          columns={columns}
          rows={rows}
          headerSticky={false}
          subActions={[
            {
              children: "View Properties",
              onClick: () => {},
            },
            {
              children: "Delete Bucket",
              onClick: () => {},
            },
          ]}
          mainAction={{
            children: "Open Bucket",
            onClick: handleViewDetails,
          }}
          className="max-h-[852px] rounded-b-none"
          tableClasses="rounded-b-none"
          fallbackText="You do not have any Buckets yet."
        />

        <div className="bg-themeWhite-900 py-3 px-6 rounded-b-[20px]">
          <Pagination
            page={1}
            totalPages={5}
            handleGoToFirstPage={() => {}}
            handleGoToLastPage={() => {}}
            handlePreviousPage={() => {}}
            handleNextPage={() => {}}
            handlePageChange={() => {}}
            handlePaginationNumbers={() => {
              return [1, 2, 3];
            }}
          />
        </div>
      </div>
      <BucketStepper
        isOpen={isStepperOpen}
        onClose={() => setIsStepperOpen(false)}
        regions={regions}
        existingBuckets={existingBuckets}
      />
    </div>
  );
};

export default BucketList;
