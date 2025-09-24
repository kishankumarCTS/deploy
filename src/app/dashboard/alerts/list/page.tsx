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
import CreateAlertModal from "@/components/Modals/alert";
function AlertsListing() {
  // TODO: bg colour used as hex value
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);

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
      header: "ALERT NAME",
      accessor: "alertName",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "STATUS",
      accessor: "status",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "METRIC TYPE",
      accessor: "metricType",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[100px]",
    },
    {
      header: "METRIC FIELD",
      accessor: "metricField",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[100px]",
    },
    {
      header: "CRITICAL THRESHOLD",
      accessor: "criticalThreshold",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "WARNING THRESHOLD",
      accessor: "warningThreshold",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "RESOURCE NAME",
      accessor: "resourceName",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[200px]",
    },
    {
      header: "NOTIFICATION CHANNEL",
      accessor: "notificationChannel",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "RESOURCE ID",
      accessor: "resourceId",
      isVisible: false,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "DESCRIPTION",
      accessor: "description",
      isVisible: false,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "LAST RUN STATUS",
      accessor: "lastRunStatus",
      isVisible: false,
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
    {
      header: "UPDATED AT",
      accessor: "updatedAt",
      isVisible: true,
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
    push(`${process.env.NEXT_PUBLIC_BASEURL}dashboard/alerts/details/${id}`);
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
        <h1 className="text-[32px] leading-[21px] font-medium">Alerts </h1>
        <Button onClick={() => setIsOpen(true)}>Create New Alert</Button>
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
              children: "Toggle Status",
              onClick: () => {},
            },
            {
              children: "Edit Alert",
              onClick: () => {},
            },
            {
              children: "Delete Alert",
              onClick: () => {},
            },
          ]}
          mainAction={{
            children: "View Complete Alert Details",
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

      <CreateAlertModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default AlertsListing;
