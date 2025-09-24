"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Settings from "@/components/ui/ListingSettings";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/pagination";
import Checkbox from "@/components/ui/Checkbox";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import DataBadge from "@/components/ui/DataBadge";
import ElasticIpModal from "@/components/Modals/ElasticIp";
import { ROWS } from "./constants";
import { ElasticIpFormData } from "@/components/pages/ElasticIp/types";

function ElasticIpListing() {
  // TODO: bg colour used as hex value
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const poolOptions = ["Pool A", "Pool B", "Pool C"];

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
    status: <DataBadge data={row.status} />,
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
      header: "IP ADDRESS",
      accessor: "ipAddress",
      className: "max-w-[150px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "ID",
      accessor: "id",
      className: "max-w-[200px]",
      isVisible: false,
      toggleVisibility: true,
    },
    {
      header: "MAPPED IP ADDRESS",
      accessor: "mappedIpAddress",
      className: "max-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "ATTACHED TO",
      accessor: "attachedTo",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[100px]",
    },
    {
      header: "STATUS",
      accessor: "status",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[100px]",
    },
    {
      header: "POOL",
      accessor: "pool",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "CREATED",
      accessor: "createdAt",
      isVisible: false,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "Description",
      accessor: "description",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
  ];

  const [columns, setColumns] = useState<any>(COLUMNS);

  const handleChangeVisibility = (header: string) => {
    const updatedColumns = columns.map((col: any) =>
      col.header === header ? { ...col, isVisible: !col.isVisible } : col
    );
    setColumns(updatedColumns);
  };

  const handleShowAll = () => {
    const updatedColumns = columns.map((col: any) =>
      col.toggleVisibility ? { ...col, isVisible: true } : col
    );
    setColumns(updatedColumns);
  };

  const handleHideAll = () => {
    const updatedColumns = columns.map((col: any) =>
      col.toggleVisibility ? { ...col, isVisible: false } : col
    );
    setColumns(updatedColumns);
  };

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

  const handleSubmit = (data: ElasticIpFormData) => {
    console.log("Elastic IP Reserve Data:", data);
    setIsModalOpen(false);
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

  return (
    <div>
      <div className="flex justify-between items-center gap-3 mb-10">
        <h1 className="text-[32px] leading-[21px] font-medium">Elastic IP</h1>
        <Button onClick={() => setIsModalOpen(true)}>Reserve Elastic IP</Button>
      </div>
      {/* content */}
      <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
        <div className="flex justify-between items-center gap-3 mb-6">
          <SearchBar placeholder="Search by keyword" />
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
              children: "Attach IP",
              onClick: () => {},
            },
            {
              children: "Delete IP",
              onClick: () => {},
            },
          ]}
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
      <ElasticIpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        poolOptions={poolOptions}
      />
    </div>
  );
}

export default ElasticIpListing;
