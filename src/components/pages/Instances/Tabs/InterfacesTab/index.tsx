"use client";

import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/pagination";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import DataBadge from "@/components/ui/DataBadge";

import { ROWS } from "./constants";

function InterfacesTab() {
  // TODO: bg colour used as hex value
  const COLUMNS = [
    {
      header: "NAME",
      accessor: "name",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "VPC NAME",
      accessor: "vpcName",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "FIXED IP",
      accessor: "fixedIP",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "MAC ADDRESS",
      accessor: "macAddress",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "STATUS",
      accessor: "status",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[100px]",
    },
    {
      header: "ADMIN STATE",
      accessor: "adminState",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[100px]",
    },
  ];

  const rows = ROWS.map((row) => ({
    ...row,
    status: <DataBadge data={row?.status} />,
    adminState: <DataBadge data={row?.adminState} />,
  }));

  // const handleChangeVisibility = (header: string) => {
  //   const updatedColumns = columns.map((col) =>
  //     col.header === header ? { ...col, isVisible: !col.isVisible } : col
  //   );
  //   setColumns(updatedColumns);
  // };

  // const handleShowAll = () => {
  //   const updatedColumns = columns.map((col) =>
  //     col.toggleVisibility ? { ...col, isVisible: true } : col
  //   );
  //   setColumns(updatedColumns);
  // };

  // const handleHideAll = () => {
  //   const updatedColumns = columns.map((col) =>
  //     col.toggleVisibility ? { ...col, isVisible: false } : col
  //   );
  //   setColumns(updatedColumns);
  // };

  return (
    <div>
      <div>
        {/* content */}
        <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
          <div className="flex justify-between items-center gap-3 mb-6">
            <SearchBar placeholder="Search by keyword" />
            <div className="flex items-center gap-3">
              <DeleteRowButton onClick={() => {}} />
              <RefreshButton onClick={() => {}} />
            </div>
          </div>
          <Table
            columns={COLUMNS}
            rows={rows}
            headerSticky={false}
            subActions={[
              {
                children: "Edit Port",
                onClick: () => {},
              },
              {
                children: "Delete Port Security Groups",
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
      </div>
    </div>
  );
}

export default InterfacesTab;
