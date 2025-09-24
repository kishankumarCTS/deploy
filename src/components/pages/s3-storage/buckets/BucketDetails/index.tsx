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
import { FaRegCalendar, FaUpload, FaFolder } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import FileUploadModal from "@/components/Modals/FileUploadModal";
import CreateFolderModal from "@/components/Modals/CreateFolderModal";
import { objectsData } from "../../constants";

interface BucketDetailsProps {
  bucketId: string;
}

const BucketDetails = ({ bucketId }: BucketDetailsProps) => {
  const router = useRouter();
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [objects, setObjects] = useState(objectsData || []);

  const handleCreateFolder = () => {
    setIsCreateFolderOpen(true);
  };

  const handleObjectClick = (id: string) => {
    const obj = objects.find((o) => o.id === id);
    if (!obj) return;

    if (obj.type === "folder") {
      router.push(
        `${process.env.NEXT_PUBLIC_BASEURL}dashboard/s3-storage/buckets/${bucketId}/folders/${obj.id}`
      );
    } else {
      console.log("File clicked:", obj.name);
    }
  };

  const handleAddFolder = (folderName: string) => {
    const newFolder = {
      id: folderName + "-" + Date.now(),
      name: folderName,
      type: "folder",
      storageClass: "-",
      size: "-",
      lastModified: new Date().toLocaleString(),
    };
    setObjects((prev) => [...prev, newFolder]);
  };

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredObjects = objects.filter((obj) =>
    obj.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const rows = filteredObjects.map((obj) => ({
    ...obj,
    select: (
      <Checkbox
        checked={selectedRows.includes(obj.id)}
        onChange={() => handleSelectToggle(obj.id)}
      />
    ),
    name: (
      <div className="flex items-center gap-2">
        {obj.type === "folder" ? (
          <FaFolder className="text-blue-500" size={16} />
        ) : (
          <div></div>
        )}
        <span
          className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
          onClick={() => handleObjectClick(obj.id)}
        >
          {obj.name}
        </span>
      </div>
    ),
    type: obj.type,

    storageClass: obj.storageClass,
    size: obj.size,
    lastModified: (
      <span className="flex items-center gap-2">
        <FaRegCalendar size={16} className="text-gray-500" />
        {obj.lastModified}
      </span>
    ),
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
      header: "TYPE",
      accessor: "type",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "STORAGE CLASS",
      accessor: "storageClass",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "SIZE",
      accessor: "size",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "LAST MODIFIED",
      accessor: "lastModified",
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-themeGray-900 mb-6">
          S3 | Buckets | {bucketId || "Wp350mcO"}
        </h2>

        <div className="flex gap-3">
          <Button onClick={handleCreateFolder}>
            {/* <FaFolder className="mr-2" size={16} /> */}
            CREATE FOLDER
          </Button>
          <Button onClick={() => setIsUploadModalOpen(true)}>
            {/* <FaUpload className="mr-2" size={16} /> */}
            UPLOAD FILE
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 mb-6">
        <h1 className="text-[24px] font-medium">Objects</h1>
        <div className="flex items-center gap-3"></div>
      </div>

      <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
        <div className="flex justify-between items-center gap-3 mb-6">
          <SearchBar
            placeholder="Search objects by name"
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
              children: "Download",
              onClick: () => {},
            },
            {
              children: "Edit Storage Class",
              onClick: () => {},
            },
            {
              children: "Delete",
              onClick: () => {},
            },
          ]}
          // mainAction={{
          //   children: "Download",
          //   onClick: handleObjectClick,
          // }}
          className="max-h-[852px] rounded-b-none"
          tableClasses="rounded-b-none"
          fallbackText="You do not have any Objects yet."
        />

        <div className="bg-themeWhite-900 py-3 px-6 rounded-b-[20px]">
          <Pagination
            page={currentPage}
            totalPages={5}
            handleGoToFirstPage={() => setCurrentPage(1)}
            handleGoToLastPage={() => setCurrentPage(5)}
            handlePreviousPage={() =>
              setCurrentPage(Math.max(1, currentPage - 1))
            }
            handleNextPage={() => setCurrentPage(Math.min(5, currentPage + 1))}
            handlePageChange={(page) => setCurrentPage(page)}
            handlePaginationNumbers={() => {
              return [1, 2, 3];
            }}
          />
        </div>
      </div>

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onSubmit={handleAddFolder}
      />
    </div>
  );
};

export default BucketDetails;
