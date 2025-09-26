"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import Settings from "@/components/ui/ListingSettings";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/pagination";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import Checkbox from "@/components/ui/Checkbox";
import RefreshButton from "@/components/ui/RefreshButton";
import DataBadge from "@/components/ui/DataBadge";

import { ROWS } from "./constants";

function InstanceListing() {
  // TODO: bg colour used as hex value
  const [selectedRows, setSelectedRows] = useState<any>([]);
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
      header: "NAME",
      accessor: "name",
      className: "max-w-[100px]",
      isVisible: true,
      toggleVisibility: false,
    },
    // {
    //   header: "ID",
    //   accessor: "id",
    //   className: "max-w-[100px]",
    //   isVisible: true,
    //   toggleVisibility: true,
    // },
    {
      header: "OS IMAGE",
      accessor: "osImage",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[100px]",
    },
    {
      header: "FLAVOR",
      accessor: "flavor",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[100px]",
    },
    {
      header: "STATUS",
      accessor: "status",
      className: "max-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    // {
    //   header: "LAUNCH TIME",
    //   accessor: "launchTime",
    //   className: "max-w-[100px]",
    //   isVisible: true,
    //   toggleVisibility: true,
    // },
    {
      header: "KEY NAME",
      accessor: "keyName",
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
    push(`/dashboard/instances/details/${id}`);
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
        <h1 className="text-[32px] leading-[21px] font-medium">
          All Running Compute Instances
        </h1>
        <Button onClick={() => push(`/dashboard/instance`)}>
          Create New Instance
        </Button>
      </div>
      {/* content */}
      <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
        <div className="flex justify-between items-center gap-3 mb-6">
          <SearchBar placeholder="Search Instances" />
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
          metaData={{
            id: "asdf-dfg-sdfghj-vbn-fghjk",
            createdAt: "03-09-2025 15:58",
            privateIpv4: "ipv4",
            publicIpv4: "ipv4",
            privateIpv6: "ipv6",
            publicIpv6: "ipv6",
          }}
          subActions={[
            {
              children: "Edit Instance",
              onClick: () => {},
            },
            {
              children: "Hard Reboot",
              onClick: () => {},
            },
            {
              children: "Lock Instance",
              onClick: () => {},
            },
            { children: "Create Snapshot", onClick: () => {} },
            { children: "Detach Interface", onClick: () => {} },
            { children: "Edit Port Security Groups", onClick: () => {} },
            { children: "Attach Elastic IP", onClick: () => {} },
            { children: "Resize Instance", onClick: () => {} },
            { children: "Rebuild Instance", onClick: () => {} },
            { children: "Start Instance", onClick: () => {} },
          ]}
          mainAction={{
            children: "View Complete Instance Details",
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
    </div>
  );
}

export default InstanceListing;
