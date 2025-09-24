"use client";

import { FaRegCalendar } from "react-icons/fa6";

import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/pagination";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";

import { ROWS } from "./constants";

function ActionLogsTab() {
  // TODO: bg colour used as hex value
  const COLUMNS = [
    {
      header: "REQUEST ID",
      accessor: "requestId",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "EVENT",
      accessor: "event",
      className: "max-w-[100px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "START TIME",
      accessor: "startTime",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "USER ID",
      accessor: "userId",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[200px]",
    },
    {
      header: "MESSAGE",
      accessor: "message",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[200px]",
    },
  ];

  const rows = ROWS.map((row) => ({
    ...row,
    startTime: (
      <div className="flex items-center gap-2">
        <FaRegCalendar size={18} /> {row.startTime}
      </div>
    ),
  }));

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

export default ActionLogsTab;
