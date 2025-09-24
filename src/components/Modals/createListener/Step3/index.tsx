"use client";

import { useState } from "react";
import InputField from "@/components/ui/FloatingInput";
import SelectOptions from "@/components/ui/SelectOptions";
import Table from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import DeleteRowButton from "@/components/ui/DeleteRowButton";
import { Switch } from "@/components/ui/switch";
import { FiAlertTriangle } from "react-icons/fi";

import { AVAILABLE_SERVERS_OPTIONS } from "./constants"; 
import { BackendServer, TableColumn } from "./types"; 

function ListenerStep3() {
  const [specificIp, setSpecificIp] = useState("");
  const [allocatedServers, setAllocatedServers] = useState<BackendServer[]>([]);
  const [detailsEnabled, setDetailsEnabled] = useState(true);

  const isDuplicateServer = (ipAddress: string): boolean =>
    allocatedServers.some((server) => server.ipAddress === ipAddress);

  const addServerFromDropdown = (value: string) => {
    const [name, ipAddress] = value.split(";");
    if (isDuplicateServer(ipAddress)) return;

    const newServer: BackendServer = {
      name,
      ipAddress,
      protocolPort: 1,
      monitorAddress: "0.0.0.0",
      monitorPort: 1,
      weight: 0,
    };
    setAllocatedServers([...allocatedServers, newServer]);
  };

  const addSpecificIpServer = () => {
    if (!specificIp.trim() || isDuplicateServer(specificIp)) {
      setSpecificIp("");
      return;
    }

    const newServer: BackendServer = {
      name: specificIp,
      ipAddress: specificIp,
      protocolPort: 1,
      monitorAddress: "0.0.0.0",
      monitorPort: 1,
      weight: 0,
    };
    setAllocatedServers([...allocatedServers, newServer]);
    setSpecificIp("");
  };

  const removeServer = (indexToRemove: number) => {
    setAllocatedServers((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleEdit = (
    rowIndex: number,
    key: keyof BackendServer,
    value: string | number
  ) => {
    setAllocatedServers((prev) =>
      prev.map((server, index) =>
        index === rowIndex ? { ...server, [key]: value } : server
      )
    );
  };

  const columns: TableColumn<BackendServer>[] = [
    { header: "NAME", accessor: "name", isVisible: true },
    { header: "IP ADDRESS", accessor: "ipAddress", isVisible: true },
    {
      header: "PROTOCOL PORT",
      accessor: "protocolPort",
      isVisible: true,
      cell: (row, rowIndex) => (
        <InputField
          value={String(row.protocolPort)}
          type="number"
          onChange={(e) =>
            handleEdit(rowIndex, "protocolPort", Number(e.target.value))
          }
        />
      ),
    },
    {
      header: "MONITOR ADDRESS",
      accessor: "monitorAddress",
      isVisible: true,
      cell: (row, rowIndex) => (
        <InputField
          value={row.monitorAddress}
          onChange={(e) => handleEdit(rowIndex, "monitorAddress", e.target.value)}
        />
      ),
    },
    {
      header: "MONITOR PORT",
      accessor: "monitorPort",
      isVisible: true,
      cell: (row, rowIndex) => (
        <InputField
          value={String(row.monitorPort)}
          type="number"
          onChange={(e) =>
            handleEdit(rowIndex, "monitorPort", Number(e.target.value))
          }
        />
      ),
    },
    {
      header: "WEIGHT",
      accessor: "weight",
      isVisible: true,
      cell: (row, rowIndex) => (
        <InputField
          value={String(row.weight)}
          type="number"
          onChange={(e) =>
            handleEdit(rowIndex, "weight", Number(e.target.value))
          }
        />
      ),
    },
    {
      header: "ACTIONS",
      isVisible: true,
      cell: (_, rowIndex) => (
        <Button
          onClick={() => removeServer(rowIndex)}
          variant="tertiary"
          className="text-red-500 hover:bg-red-50"
        >
          <DeleteRowButton />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold">Backend Server Details</h2>
        <Switch checked={detailsEnabled} onCheckedChange={setDetailsEnabled} />
      </div>

      {detailsEnabled && (
        <>
          <p className="text-gray-600">
            Backend Servers are the actual IP addresses that receive traffic
            from the load balancer. Each backend server must have a unique
            combination of IP address and port.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 flex items-center">
            <FiAlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
            <p className="text-sm text-yellow-700">
              The backend server must have an active service running on the
              monitor port. In case the port is inactive or the service responds
              with errors, the load balancer may redirect requests.
            </p>
          </div>

          <div className="flex items-end gap-4 mb-12">
            <div className="flex-1">
              <div className="flex flex-col">
                Add Backend Server
                <SelectOptions
                  value=""
                  options={AVAILABLE_SERVERS_OPTIONS}
                  onChange={addServerFromDropdown}
                />
              </div>
            </div>
            <span className="text-gray-500 font-semibold mb-2">OR</span>
            <div className="flex-1 flex items-end gap-2">
              <InputField
                label="Specific IP"
                value={specificIp}
                onChange={(e) => setSpecificIp(e.target.value)}
              />
              <Button onClick={addSpecificIpServer}>ADD</Button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[20px] font-semibold mb-4">
              Allocated Backend Servers
            </h3>
            <Table columns={columns} rows={allocatedServers} />
          </div>
        </>
      )}
    </div>
  );
}

export default ListenerStep3;
