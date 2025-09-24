"use client";
import Image from "next/image";
import ArrowLeft from "@/assets/svg/arrowLeft.svg";
import Pagination from "@/components/ui/pagination";
import { FaRegCalendar } from "react-icons/fa";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import Table from "@/components/ui/Table";
import Checkbox from "@/components/ui/Checkbox";
import { VPCDetailsProps, SubnetType, PortType, Column } from "../types";
import { getVPCDetails, subnetsData, portsData } from "../constants";
import CopyButton from "@/components/ui/CopyButton";
import SearchBar from "@/components/ui/SearchBar";
import RefreshButton from "@/components/ui/RefreshButton";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import DataBadge from "@/components/ui/DataBadge";
import CreatePortModal from "@/components/Modals/CreatePort";
import CreateSubnetModal from "@/components/Modals/CreateSubnet";
const VPCDetails = ({ vpcId }: VPCDetailsProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const [selectedSubnets, setSelectedSubnets] = useState<string[]>([]);
  const [selectedPorts, setSelectedPorts] = useState<string[]>([]);

  const vpcDetails = getVPCDetails(vpcId);
  const [isCreatePortOpen, setIsCreatePortOpen] = useState(false);
  const [isCreateSubnetOpen, setIsCreateSubnetOpen] = useState(false);

  const handleSubnetDetails = (subnetId: string) => {
  router.push(
    `${process.env.NEXT_PUBLIC_BASEURL}dashboard/subnet/details/${subnetId}`
  );
};

const handlePortDetails = (portId: string) => {
  router.push(`${process.env.NEXT_PUBLIC_BASEURL}dashboard/ports/details/${portId}`);
};


  const handleCreatePort = (portData: {
    name: string;
    fixedIps: string;
    adminState: "Up" | "Down";
  }) => {
    console.log("New Port Created:", portData);
    portsData.push({
      id: Math.random().toString(),
      name: portData.name,
      portId: "PORT-" + Date.now(),
      vpcId,
      status: "Active",
      fixedIps: portData.fixedIps,
      adminState: portData.adminState,
      macAddress: "auto-gen",
    });
  };

  const handleCreateSubnet = () => {
  console.log("New Subnet Created:");
 
};

  const filteredSubnets = subnetsData.filter(
    (subnet) =>
      subnet.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      subnet.subnetId.toLowerCase().includes(searchValue.toLowerCase()) ||
      subnet.subnetAddress.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredPorts = portsData.filter(
    (port) =>
      port.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      port.portId.toLowerCase().includes(searchValue.toLowerCase()) ||
      port.fixedIps.toLowerCase().includes(searchValue.toLowerCase())
  );

  const formatBoolean = (
    value: boolean,
    positiveText = "Yes",
    negativeText = "No"
  ): string => (value ? positiveText : negativeText);

  const handleSelectAll = (
    type: "subnet" | "port",
    rows: { id: string }[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.length === rows.length) {
      setSelected([]);
    } else {
      setSelected(rows.map((row) => row.id));
    }
  };

  const handleToggle = (
    id: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((rowId) => rowId !== id));
    } else {
      setSelected((prev) => [...prev, id]);
    }
  };

  const subnetColumns: Column<SubnetType & { select: React.ReactNode }>[] = [
    {
      header: (
        <Checkbox
          checked={
            selectedSubnets.length === filteredSubnets.length &&
            filteredSubnets.length > 0
          }
          onChange={() =>
            handleSelectAll(
              "subnet",
              filteredSubnets,
              selectedSubnets,
              setSelectedSubnets
            )
          }
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
      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Subnet ID",
      accessor: "subnetId",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "VPC ID",
      accessor: "vpcId",
      className: "min-w-[180px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Subnet Address",
      accessor: "subnetAddress",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "IP Version",
      accessor: "ipVersion",
      className: "min-w-[100px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Gateway IP",
      accessor: "gatewayIp",
      className: "min-w-[130px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Description",
      accessor: "description",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
  ];

 const subnetRows = filteredSubnets.map((subnet) => ({
  ...subnet,
  id: subnet.subnetId, // 👈 important: ensures Table passes subnetId, not the local "id"
  select: (
    <Checkbox
      checked={selectedSubnets.includes(subnet.id)}
      onChange={() =>
        handleToggle(subnet.id, selectedSubnets, setSelectedSubnets)
      }
    />
  ),
}));


  const portColumns: Column<PortType & { select: React.ReactNode }>[] = [
    {
      header: (
        <Checkbox
          checked={
            selectedPorts.length === filteredPorts.length &&
            filteredPorts.length > 0
          }
          onChange={() =>
            handleSelectAll(
              "port",
              filteredPorts,
              selectedPorts,
              setSelectedPorts
            )
          }
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
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Port ID",
      accessor: "portId",
      className: "min-w-[200px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "VPC ID",
      accessor: "vpcId",
      className: "min-w-[180px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Status",
      cell: (row: PortType) => <DataBadge data={row.status} />,

      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Fixed IPs",
      accessor: "fixedIps",
      className: "min-w-[130px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "Admin State",
      cell: (row: PortType) => <DataBadge data={row.adminState} />,

      className: "min-w-[120px]",
      isVisible: true,
      toggleVisibility: true,
    },
    {
      header: "MAC Address",
      accessor: "macAddress",
      className: "min-w-[150px]",
      isVisible: true,
      toggleVisibility: true,
    },
  ];

  const portRows = filteredPorts.map((port) => ({
    ...port,
    id: port.portId,
    select: (
      <Checkbox
        checked={selectedPorts.includes(port.id)}
        onChange={() => handleToggle(port.id, selectedPorts, setSelectedPorts)}
      />
    ),
  }));

  const overviewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TabKeyPair label="Name" value={vpcDetails.name} />
      <TabKeyPair
        label="VPC ID"
        value={
          <div className="flex items-center gap-2">
            {vpcDetails.vpcId}
            <CopyButton text={vpcDetails.vpcId} />
          </div>
        }
      />
      <TabKeyPair label="Description" value={vpcDetails.description} />
      <TabKeyPair
        label="Status"
        value={<DataBadge data={vpcDetails.status} />}
      />
      <TabKeyPair label="Subnets" value={vpcDetails.subnets} />
      <TabKeyPair
        label="Admin State"
        value={<DataBadge data={vpcDetails.adminState} />}
      />

      <TabKeyPair
        label="Shared"
        value={<DataBadge data={formatBoolean(vpcDetails.shared)} />}
      />

      <TabKeyPair
        label="External Network"
        value={<DataBadge data={formatBoolean(vpcDetails.externalNetwork)} />}
      />

      <TabKeyPair label="MTU" value={vpcDetails.mtu.toString()} />
      <TabKeyPair
        label="Created At"
        value={
          <span className="flex items-center gap-2">
            <FaRegCalendar size={18} className="text-gray-500" />
            {vpcDetails.createdAt}
          </span>
        }
      />

      <TabKeyPair
        label="Updated At"
        value={
          <span className="flex items-center gap-2">
            <FaRegCalendar size={18} className="text-gray-500" />
            {vpcDetails.updatedAt}
          </span>
        }
      />
    </div>
  );

  const subnetsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchBar
          placeholder="Search by keyword"
          onChange={setSearchValue}
          onSubmit={setSearchValue}
        />
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCreateSubnetOpen(true)}
            classNames="bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            CREATE New Subnet
          </Button>
          <DeleteRowButton onClick={() => {}} />
          <RefreshButton onClick={() => {}} />
        </div>
      </div>

      <div className="bg-themeWhite-900 rounded-[20px] shadow-sm">
        <Table
          columns={subnetColumns}
          rows={subnetRows}
          rowKey={(row) => row.subnetId}
          headerSticky={true}
          subActions={[
            { children: "Edit Subnet", onClick: () => {} },
            { children: "Delete Subnet", onClick: () => {} },
          ]}
          mainAction={{
    children: "View Subnet Details",
    onClick: (subnetId: string) => handleSubnetDetails(subnetId), // ✅ this id comes from row.id in Table
  }}

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
      <CreateSubnetModal
  isOpen={isCreateSubnetOpen}
  onClose={() => setIsCreateSubnetOpen(false)}
  onCreate={handleCreateSubnet}
/>

    </div>
  );

  const portsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchBar
          placeholder="Search by keyword"
          onChange={setSearchValue}
          onSubmit={setSearchValue}
        />
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCreatePortOpen(true)}
            classNames="bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            Create New Port
          </Button>
          <DeleteRowButton onClick={() => {}} />
          <RefreshButton onClick={() => {}} />
        </div>
      </div>

      <div className="bg-themeWhite-900 rounded-[20px] shadow-sm">
        <Table
          columns={portColumns}
          rows={portRows}
          rowKey={(row) => row.id}
          headerSticky={true}
          subActions={[
            { children: "Edit Port", onClick: () => {} },
            { children: "Delete Port", onClick: () => {} },
          ]}
          mainAction={{
    children: "View Port Details",
    onClick: (portId: string) => handlePortDetails(portId),
  }}
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
      <CreatePortModal
        isOpen={isCreatePortOpen}
        onClose={() => setIsCreatePortOpen(false)}
        onCreate={handleCreatePort}
      />
    </div>
  );

  const tabs = [
    { id: "overview", heading: "Overview", content: overviewContent },
    { id: "subnets", heading: "Subnets", content: subnetsContent },
    { id: "ports", heading: "Ports", content: portsContent },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 cursor-pointer">
        <h1 className="text-2xl font-semibold text-themeGray-900">
          VPC | {vpcId}
        </h1>{" "}
      </div>

      <Tabs tabs={tabs} defaultActiveId="overview" />
    </div>
  );
};

export default VPCDetails;
