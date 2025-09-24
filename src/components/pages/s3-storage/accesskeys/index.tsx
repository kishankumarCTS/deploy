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
import CreateAccessKey from "@/components/Modals/CreateAccesskeyModal";
import DataBadge from "@/components/ui/DataBadge";
import { initialAccessKeys } from "../constants";

const AccessKeysList = () => {
  const router = useRouter();
  const [accessKeys, setAccessKeys] = useState(initialAccessKeys);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredKeys = accessKeys.filter((key) =>
    key.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const maskAccessKey = (key: string) => {
    if (key.length <= 8) return key;
    return (
      key.substring(0, 2) + "*************" + key.substring(key.length - 2)
    );
  };

  const rows = filteredKeys.map((key) => ({
    ...key,
    select: (
      <Checkbox
        checked={selectedRows.includes(key.id)}
        onChange={() => handleSelectToggle(key.id)}
      />
    ),
    name: key.name,
    accessKey: (
      <span className="font-mono text-sm text-gray-600">
        {maskAccessKey(key.id)}
      </span>
    ),
    creationDate: (
      <span className="flex items-center gap-2">
        <FaRegCalendar size={16} className="text-gray-500" />
        {key.creationDate}
      </span>
    ),
    status: <DataBadge data={key.status} />,
  }));

  const handleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      const updatedSelectedRows = rows.map((row) => row.id);
      setSelectedRows(updatedSelectedRows);
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
      header: "ACCESS KEY",
      accessor: "accessKey",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "CREATION DATE",
      accessor: "creationDate",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "STATUS",
      accessor: "status",
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
    setColumns(columns.map((col) => ({ ...col, isVisible: true })));
  };
  const handleHideAll = () => {
    setColumns(
      columns.map((col) =>
        col.toggleVisibility ? { ...col, isVisible: false } : col
      )
    );
  };

  const handleSelectToggle = (toggledId: string) => {
    if (selectedRows.includes(toggledId)) {
      setSelectedRows((prev) => prev.filter((id) => id !== toggledId));
    } else {
      setSelectedRows((prev) => [...prev, toggledId]);
    }
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
  }, [selectedRows, rows.length]);

  const handleCreateAccessKey = (data: {
    user: string;
    accessKey: string;
    secretKey: string;
  }) => {
    const newKey = {
      id: data.accessKey,
      name: `${data.user}-key`,
      creationDate: new Date().toLocaleString(),
      status: "Active",
    };
    setAccessKeys((prev) => [newKey, ...prev]);
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-3 mb-10">
        <h1 className="text-[32px] leading-[21px] font-medium">
          S3 | Access Keys
        </h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Access Key
        </Button>
      </div>

      <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
        <div className="flex justify-between items-center gap-3 mb-6">
          <SearchBar
            placeholder="Search access keys by name"
            onChange={setSearchValue}
            onSubmit={setSearchValue}
          />
          <div className="flex items-center gap-3">
            <Settings
              columns={columns}
              onChange={(header) => handleChangeVisibility(header)}
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
            { children: "Deactivate Key", onClick: () => {} },
            { children: "Delete Key", onClick: () => {} },
          ]}
          //   mainAction={{
          //     children: "View Details",
          //     onClick: handleViewDetails,
          //   }}
          className="max-h-[852px] rounded-b-none"
          tableClasses="rounded-b-none"
          fallbackText="You do not have any Access Keys yet."
        />

        <div className="bg-themeWhite-900 py-3 px-6 rounded-b-[20px]">
          <Pagination
            page={1}
            totalPages={3}
            handleGoToFirstPage={() => {}}
            handleGoToLastPage={() => {}}
            handlePreviousPage={() => {}}
            handleNextPage={() => {}}
            handlePageChange={() => {}}
            handlePaginationNumbers={() => [1, 2, 3]}
          />
        </div>
      </div>

      <CreateAccessKey
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAccessKey}
      />
    </div>
  );
};

export default AccessKeysList;
