"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import Settings from "@/components/ui/ListingSettings";
import SearchBar from "@/components/ui/SearchBar";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/pagination";
import Checkbox from "@/components/ui/Checkbox";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import RefreshButton from "@/components/ui/RefreshButton";
import DataBadge from "@/components/ui/DataBadge";
import LoadBalancer from "@/components/Modals/LoadBalancer";
import { ROWS } from "./constants";

function LoadBalancerListing() {
  // TODO: bg colour used as hex value
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [isLoadbalancerModalOpen, setLoadbalancerModal] = useState(false);
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
    operatingStatus: <DataBadge data={row.operatingStatus} />,
    provisioningStatus: <DataBadge data={row.provisioningStatus} />,
    adminState: <DataBadge data={row.adminState} />,
    autoScalingMember: <DataBadge data={row.autoScalingMember} />,
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
      header: "Name",
      accessor: "name",
      className: "max-w-[100px]",
      isVisible: true,
      toggleVisibility: false,
    },
    {
      header: "IP Address",
      accessor: "ipAddress",
      className: "max-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Subnet",
      accessor: "subnet",
      className: "max-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Port",
      accessor: "port",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[100px]",
    },
    {
      header: "Elastic IP",
      accessor: "elasticIp",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[100px]",
    },
    {
      header: "Operating Status",
      accessor: "operatingStatus",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "Provisioning Status",
      accessor: "provisioningStatus",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "Admin State",
      accessor: "adminState",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "Autoscaling Member",
      accessor: "autoScalingMember",
      isVisible: true,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "Created At",
      accessor: "createdAt",
      isVisible: false,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "Load Balancer ID",
      accessor: "loadbalancerId",
      isVisible: false,
      toggleVisibility: true,
      className: "max-w-[200px]",
    },
    {
      header: "Description",
      accessor: "description",
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
    push(`/dashboard/loadbalancer/details/${id}`);
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
          Load Balancers
        </h1>
        <Button onClick={() => setLoadbalancerModal(true)}>
          Create Load Balancer
        </Button>
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
              children: "Edit Load Balancer",
              onClick: () => {},
            },
            {
              children: "Associate Elastic IP",
              onClick: () => {},
            },
            {
              children: "Delete Load Balancer",
              onClick: () => {},
            },
          ]}
          mainAction={{
            children: "View Complete Loadbalancer Details",
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
      {isLoadbalancerModalOpen && (
        <LoadBalancer
          isOpen={isLoadbalancerModalOpen}
          onClose={() => setLoadbalancerModal(false)}
        />
      )}
    </div>
  );
}

export default LoadBalancerListing;
