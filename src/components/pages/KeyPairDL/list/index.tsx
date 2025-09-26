"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/ui/Table";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Settings from "@/components/ui/ListingSettings";
import { KeyPairType, KeyPairColumn } from "../types";
import { keyPairData } from "../constants";
import Pagination from "@/components/ui/pagination";
import CopyButton from "@/components/ui/CopyButton";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import KeyPair from "@/components/Modals/Keypair";
import { FaRegCalendar } from "react-icons/fa";

const KeyPairList = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredKeyPairs = keyPairData.filter(
    (kp) =>
      kp.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      kp.type.toLowerCase().includes(searchValue.toLowerCase()) ||
      kp.fingerprint.toLowerCase().includes(searchValue.toLowerCase())
  );

  const rows = filteredKeyPairs.map((kp) => ({
    ...kp,
    select: (
      <Checkbox
        checked={selectedRows.includes(kp.id)}
        onChange={() => handleSelectToggle(kp.id)}
      />
    ),
    createdAt: (
      <span className="flex items-center gap-2">
        <FaRegCalendar size={16} className="text-gray-500" />
        {kp.createdAt}
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
      className: "min-w-[180px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "TYPE",
      accessor: "type",
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "FINGERPRINT",
      accessor: "fingerprint",
      className: "min-w-[280px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "CREATED AT",
      accessor: "createdAt",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
  ];

  const [columns, setColumns] = useState(COLUMNS);

  const handleSelectToggle = (toggledId: string) => {
    if (selectedRows.includes(toggledId)) {
      setSelectedRows((prev) => prev.filter((id) => id !== toggledId));
    } else {
      setSelectedRows((prev) => [...prev, toggledId]);
    }
  };

  const handleViewDetails = (id: string) =>
    router.push(`/dashboard/KeyPairDL/details/${id}`);

  const handleCreateKeyPair = (newKeyPair: {
    name: string;
    type: string;
    format: string;
  }) => {
    console.log("Created KeyPair:", newKeyPair);
    setIsModalOpen(false);
  };

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
        <h1 className="text-[32px] leading-[21px] font-medium">Key Pairs</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create Key Pair</Button>
      </div>

      <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
        <div className="flex justify-between items-center gap-3 mb-6">
          <SearchBar
            placeholder="Search key pairs"
            onChange={setSearchValue}
            onSubmit={setSearchValue}
          />
          <div className="flex items-center gap-3">
            <Settings
              columns={columns}
              onChange={handleChangeVisibility}
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
              children: "Copy Fingerprint",
              onClick: () => {},
            },
            {
              children: "Edit Key Pair",
              onClick: () => {},
            },
            {
              children: "Delete Key Pair",
              onClick: () => {},
            },
          ]}
          mainAction={{
            children: "View Key Pair Details",
            onClick: handleViewDetails,
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

      <KeyPair
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateKeyPair}
      />
    </div>
  );
};

export default KeyPairList;
