"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import InputField from "@/components/ui/CommonInput";
import SelectOptions from "@/components/ui/SelectOptions";
import Checkbox from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { FaRegCheckCircle, FaPlus, FaTrash } from "react-icons/fa";

type CreateSubnetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
};

export default function CreateSubnetModal({
  isOpen,
  onClose,
  onCreate,
}: CreateSubnetModalProps) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<{
    name: string;
    cidr: string;
    ipVersion: string;
    description: string;
    gatewayEnabled: boolean;
    gatewayIp: string;
    allocationPools: { from: string; to: string }[];
    dnsServers: string[];
    hostRoutes: { destination: string; nextHop: string }[];
    dhcpEnabled: boolean;
  }>({
    name: "",
    cidr: "",
    ipVersion: "IPv4",
    description: "",
    gatewayEnabled: true,
    gatewayIp: "",
    allocationPools: [{ from: "", to: "" }],
    dnsServers: [""],
    hostRoutes: [{ destination: "", nextHop: "" }],
    dhcpEnabled: true,
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addAllocationPool = () => {
    setForm((prev) => ({
      ...prev,
      allocationPools: [...prev.allocationPools, { from: "", to: "" }],
    }));
  };

  const removeAllocationPool = (index: number) => {
    setForm((prev) => ({
      ...prev,
      allocationPools: prev.allocationPools.filter((_, i) => i !== index),
    }));
  };

  const updateAllocationPool = (
    index: number,
    field: "from" | "to",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      allocationPools: prev.allocationPools.map((pool, i) =>
        i === index ? { ...pool, [field]: value } : pool
      ),
    }));
  };

  const addDnsServer = () => {
    setForm((prev) => ({
      ...prev,
      dnsServers: [...prev.dnsServers, ""],
    }));
  };

  const removeDnsServer = (index: number) => {
    setForm((prev) => ({
      ...prev,
      dnsServers: prev.dnsServers.filter((_, i) => i !== index),
    }));
  };

  const updateDnsServer = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      dnsServers: prev.dnsServers.map((dns, i) => (i === index ? value : dns)),
    }));
  };

  const addHostRoute = () => {
    setForm((prev) => ({
      ...prev,
      hostRoutes: [...prev.hostRoutes, { destination: "", nextHop: "" }],
    }));
  };

  const removeHostRoute = (index: number) => {
    setForm((prev) => ({
      ...prev,
      hostRoutes: prev.hostRoutes.filter((_, i) => i !== index),
    }));
  };

  const updateHostRoute = (
    index: number,
    field: "destination" | "nextHop",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      hostRoutes: prev.hostRoutes.map((route, i) =>
        i === index ? { ...route, [field]: value } : route
      ),
    }));
  };

  const handleSubmit = () => {
    onCreate(form);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Subnet"
      variant="fullscreen"
      footerButtons={[
        step === 1
          ? {
              variant: "secondary",
              children: "Cancel",
              onClick: onClose,
            }
          : {
              variant: "secondary",
              children: "Back",
              onClick: () => setStep(1),
            },
        step === 1
          ? {
              variant: "primary",
              children: "Next",
              onClick: () => setStep(2),
            }
          : {
              variant: "primary",
              children: "Create Subnet",
              onClick: handleSubmit,
            },
      ]}
    >
      <div className="flex justify-center items-center mb-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <FaRegCheckCircle
              size={18}
              className={step === 1 ? "text-blue-600" : "text-gray-400"}
            />
            <span
              className={`${
                step === 1 ? "text-blue-600 font-semibold" : "text-gray-400"
              }`}
            >
              Create Subnet
            </span>
          </div>

          <div className="h-[2px] w-16 bg-gray-300" />

          <div className="flex items-center space-x-2">
            <FaRegCheckCircle
              size={18}
              className={step === 2 ? "text-blue-600" : "text-gray-400"}
            />
            <span
              className={`${
                step === 2 ? "text-blue-600 font-semibold" : "text-gray-400"
              }`}
            >
              Additional Subnet Details
            </span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <InputField
              label="Subnet Name"
              placeholder="Enter subnet name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <InputField
              label="Subnet (CIDR)"
              placeholder="192.168.0.0/16"
              value={form.cidr}
              onChange={(e) => handleChange("cidr", e.target.value)}
            />
            <Checkbox
              label="Enable Gateway"
              checked={form.gatewayEnabled}
              onChange={() =>
                handleChange("gatewayEnabled", !form.gatewayEnabled)
              }
            />
          </div>

          <div className="space-y-4">
            <InputField
              label="Description"
              placeholder="Enter description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <div className="flex flex-col">
              IP Version{" "}
              <SelectOptions
                options={[
                  { id: 1, label: "IPv4", value: "IPv4" },
                  { id: 2, label: "IPv6", value: "IPv6" },
                ]}
                value={form.ipVersion}
                onChange={(val) => handleChange("ipVersion", val)}
              />
            </div>

            {form.gatewayEnabled && (
              <InputField
                label="Gateway IP"
                placeholder="Enter gateway IP"
                value={form.gatewayIp}
                onChange={(e) => handleChange("gatewayIp", e.target.value)}
              />
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className=" gap-8">
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-4">
                Allocation Pools
              </label>
              <div className="space-y-3">
                {form.allocationPools.map((pool, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <InputField
                        placeholder="Range from (e.g., 192.168.0.10)"
                        value={pool.from}
                        onChange={(e) =>
                          updateAllocationPool(index, "from", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <InputField
                        placeholder="Range to (e.g., 192.168.0.100)"
                        value={pool.to}
                        onChange={(e) =>
                          updateAllocationPool(index, "to", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={addAllocationPool}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaPlus size={14} />
                      </button>
                      {form.allocationPools.length > 1 && (
                        <button
                          onClick={() => removeAllocationPool(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-4">
                Domain Name Servers
              </label>
              <div className="space-y-3">
                {form.dnsServers.map((dns, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <InputField
                        placeholder="DNS Address (e.g., 8.8.8.8)"
                        value={dns}
                        onChange={(e) => updateDnsServer(index, e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={addDnsServer}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaPlus size={14} />
                      </button>
                      {form.dnsServers.length > 1 && (
                        <button
                          onClick={() => removeDnsServer(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-4">
                Host Routes
              </label>
              <div className="space-y-3">
                {form.hostRoutes.map((route, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <InputField
                        placeholder="Destination (e.g., 10.0.0.0/24)"
                        value={route.destination}
                        onChange={(e) =>
                          updateHostRoute(index, "destination", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <InputField
                        placeholder="Next hop (e.g., 192.168.1.1)"
                        value={route.nextHop}
                        onChange={(e) =>
                          updateHostRoute(index, "nextHop", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={addHostRoute}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaPlus size={14} />
                      </button>
                      {form.hostRoutes.length > 1 && (
                        <button
                          onClick={() => removeHostRoute(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Checkbox
                label="Enable DHCP"
                checked={form.dhcpEnabled}
                onChange={() => handleChange("dhcpEnabled", !form.dhcpEnabled)}
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
