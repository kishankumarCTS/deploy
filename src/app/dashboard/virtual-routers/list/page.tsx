"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Settings from "@/components/ui/ListingSettings";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/pagination";
import Checkbox from "@/components/ui/Checkbox";
import { ROWS } from "./constants";
import { useRouter } from "next/navigation";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import DataBadge from "@/components/ui/DataBadge";
import RouterModal from "@/components/Modals/router";
function VirtualRoutersListing() {
  // TODO: bg colour used as hex value
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    status: <DataBadge data={row?.status} />,
    adminState: <DataBadge data={row?.adminState} />,
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
      header: "NAME",
      accessor: "name",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "ROUTER ID",
      accessor: "routerId",
      className: "max-w-[200px]",
      isVisible: false,
      toggleVisibility: true,
    },
    {
      header: "STATUS",
      accessor: "status",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "EXTERNAL VPC",
      accessor: "externalVpc",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[100px]",
    },
    {
      header: "ADMIN STATE",
      accessor: "adminState",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[100px]",
    },

    {
      header: "CREATED AT",
      accessor: "createdAt",
      isVisible: false,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
  ];

  const [columns, setColumns] = useState<any>(COLUMNS);
  const { push } = useRouter();

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

  const handleDetailsNavigation = (id: string) => {
    push(`/dashboard/virtual-routers/details/${id}`);
  };

  const handleCreateRouter = (data: {
    name: string;
    adminStateUp: boolean;
  }) => {
    console.log("Router created:", data);
    setIsModalOpen(false);
    // 👉 here you can also trigger API call to create router
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
        <h1 className="text-[32px] leading-[21px] font-medium">Routers</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create New Router</Button>
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
              children: "Edit Router",
              onClick: () => {},
            },
            {
              children: "Delete Router",
              onClick: () => {},
            },
            {
              children: "Clear Gateway",
              onClick: () => {},
            },
          ]}
          mainAction={{
            children: "View Complete Virtual Router Details",
            onClick: handleDetailsNavigation,
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
      <RouterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateRouter}
        vpcData={null}
      />
    </div>
  );
}

export default VirtualRoutersListing;
