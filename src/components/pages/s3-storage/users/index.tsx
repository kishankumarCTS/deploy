"use client";
import { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Settings from "@/components/ui/ListingSettings";
import Pagination from "@/components/ui/pagination";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import CreateUser from "@/components/Modals/CreateUserModal";
import DataBadge from "@/components/ui/DataBadge";
import { userData } from "../constants";

const UserList = () => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [users, setUsers] = useState(userData);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  const rows = filteredUsers.map((user) => ({
    ...user,
    select: (
      <Checkbox
        checked={selectedRows.includes(user.id)}
        onChange={() => handleSelectToggle(user.id)}
      />
    ),
    username: <span className="flex items-center gap-2">{user.username}</span>,
    permission: (
      <span className="flex items-center gap-2">
        <DataBadge data={user.permission} />
      </span>
    ),
    status: <DataBadge data={user.status} />,

    createdDate: <span className="text-gray-600">{user.createdDate}</span>,
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
      header: "USERNAME",
      accessor: "username",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "PERMISSION",
      accessor: "permission",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "STATUS",
      accessor: "status",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "CREATED DATE",
      accessor: "createdDate",
      className: "min-w-[180px]",
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

  const handleCreateUser = (userData: {
    username: string;
    permission: string;
  }) => {
    const newUser = {
      id: `user-${String(users.length + 1).padStart(3, "0")}`,
      username: userData.username,
      permission:
        userData.permission === "read"
          ? "Read"
          : userData.permission === "write"
          ? "Write"
          : userData.permission === "read_write"
          ? "Read/Write"
          : "Full Control",
      createdDate:
        new Date().toLocaleDateString("en-GB") +
        " " +
        new Date().toLocaleTimeString("en-GB"),
      status: "Active",
    };
    setUsers([...users, newUser]);
  };

  const handleDeleteUsers = () => {
    const remainingUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(remainingUsers);
    setSelectedRows([]);
  };

  const handleRefresh = () => {
    console.log("Refreshing user list...");
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
        <h1 className="text-[32px] leading-[21px] font-medium">S3 | Users</h1>
        <Button onClick={() => setIsCreateUserOpen(true)}>CREATE USER</Button>
      </div>

      <div className="py-6 px-3 bg-[#EEF5FE] rounded-[20px]">
        <div className="flex justify-between items-center gap-3 mb-6">
          <SearchBar
            placeholder="Search users by username"
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
            <DeleteRowButton onClick={handleDeleteUsers} />
            <RefreshButton onClick={handleRefresh} />
          </div>
        </div>

        <Table
          columns={columns}
          rows={rows}
          headerSticky={false}
          subActions={[
            {
              children: "Edit User",
              onClick: () => {},
            },
            {
              children: "Change Permission",
              onClick: () => {},
            },
            {
              children: "Deactivate User",
              onClick: () => {},
            },
            {
              children: "Delete User",
              onClick: () => {},
            },
          ]}
          //   mainAction={{
          //     children: "View Details",
          //     onClick: handleViewDetails,
          //   }}
          className="max-h-[852px] rounded-b-none"
          tableClasses="rounded-b-none"
          fallbackText="You do not have any Users yet."
        />

        <div className="bg-themeWhite-900 py-3 px-6 rounded-b-[20px]">
          <Pagination
            page={1}
            totalPages={1}
            handleGoToFirstPage={() => {}}
            handleGoToLastPage={() => {}}
            handlePreviousPage={() => {}}
            handleNextPage={() => {}}
            handlePageChange={() => {}}
            handlePaginationNumbers={() => {
              return [1];
            }}
          />
        </div>
      </div>

      <CreateUser
        isOpen={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default UserList;
