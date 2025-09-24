"use client";

import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/pagination";
import { ROWS } from "./constants";
import RefreshButton from "@/components/ui/RefreshButton";

function NotificationsTab() {
  // TODO: bg colour used as hex value
  //   const [selectedRows, setSelectedRows] = useState<any>([]);
  const rows = ROWS.map((row) => ({
    ...row,
    // select: (
    //   <Checkbox
    //     checked={selectedRows.includes(row.id)}
    //     onChange={() => {
    //       handleSelectToggle(row.id);
    //     }}
    //   />
    // ),
  }));
  const COLUMNS = [
    // {
    //   header: (
    //     <Checkbox
    //       checked={selectedRows.length === rows.length}
    //       onChange={() => {
    //         handleSelectAll();
    //       }}
    //     />
    //   ),
    //   accessor: "select",
    //   className: "max-w-[20px]",
    //   isVisible: true,
    //   toggleVisibility: false,
    // },
    {
      header: "EXPAND NOTIFICATION CHANNEL",
      accessor: "expandNotificationChannel",
      className: "max-w-[300px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "THRESHOLD LEVEL",
      accessor: "thresholdLevel",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "ALERT",
      accessor: "alert",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[100px]",
    },
    {
      header: "RESOURCE NAME",
      accessor: "resourceName",
      isVisible: true,
      toggleVisibility: false,
      className: "max-w-[200px]",
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
      header: "THRESHOLD CRITICAL",
      accessor: "thresholdCritical",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "THRESHOLD WARNING",
      accessor: "thresholdWarning",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "METRIC VALUE",
      accessor: "metricValue",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "SENT",
      accessor: "sent",
      isVisible: false,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "TRIGGERED AT",
      accessor: "trigerredAt",
      isVisible: false,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
  ];

  //   const [columns, setColumns] = useState<any>(COLUMNS);

  //   const handleChangeVisibility = (header: string) => {
  //     const updatedColumns = columns.map((col) =>
  //       col.header === header ? { ...col, isVisible: !col.isVisible } : col
  //     );
  //     setColumns(updatedColumns);
  //   };

  //   const handleShowAll = () => {
  //     const updatedColumns = columns.map((col) =>
  //       col.toggleVisibility ? { ...col, isVisible: true } : col
  //     );
  //     setColumns(updatedColumns);
  //   };

  //   const handleHideAll = () => {
  //     const updatedColumns = columns.map((col) =>
  //       col.toggleVisibility ? { ...col, isVisible: false } : col
  //     );
  //     setColumns(updatedColumns);
  //   };

  //   const handleSelectAll = () => {
  //     if (selectedRows.length === rows.length) {
  //       setSelectedRows([]);
  //       setColumns(COLUMNS);
  //     } else {
  //       const updatedSelectedRows = rows.map((row) => row.id);
  //       setSelectedRows(updatedSelectedRows);
  //       setColumns(COLUMNS);
  //     }
  //   };

  //   const handleSelectToggle = (toggledId) => {
  //     if (selectedRows.includes(toggledId)) {
  //       setSelectedRows((prev) => prev.filter((id) => id !== toggledId));
  //     } else {
  //       setSelectedRows((prev) => [...prev, toggledId]);
  //     }
  //   };

  //   useEffect(() => {
  //     setColumns(
  //       columns.map((col, ind) =>
  //         ind === 0
  //           ? {
  //               ...col,
  //               header: (
  //                 <Checkbox
  //                   checked={selectedRows.length === rows.length}
  //                   onChange={() => {
  //                     handleSelectAll();
  //                   }}
  //                 />
  //               ),
  //             }
  //           : col
  //       )
  //     );
  //   }, [selectedRows]);

  return (
    <div>
      {/* content */}
      <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
        <div className="flex justify-between items-center gap-3 mb-6">
          <SearchBar placeholder="Search by keyword" />
          <div className="flex items-center gap-3">
            {/* <DeleteRowButton onClick={() => {}} /> */}
            <RefreshButton onClick={() => {}} />
          </div>
        </div>
        <Table
          //   columns={columns} use if using checkbox
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
  );
}

export default NotificationsTab;
