"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import InputField from "@/components/ui/FloatingInput";
import SelectOptions from "@/components/ui/SelectOptions";
import Checkbox from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { FaRegCheckCircle } from "react-icons/fa";

const FIXED_IPS_OPTIONS = [
  { id: 0, label: "Unspecified", value: "unspecified" },
  { id: 1, label: "Subnet", value: "subnet" },
  { id: 2, label: "IP Address", value: "ip-address" },
];

const SUBNET_OPTIONS = [
  { id: 0, label: "Select Subnet", value: "_placeholder_", disabled: true },
  { id: 1, label: "Subnet A (192.168.1.0/24)", value: "subnet-1" },
  { id: 2, label: "Subnet B (10.0.0.0/8)", value: "subnet-2" },
];

const VNIC_OPTIONS = [
  { id: 0, label: "Normal", value: "normal" },
  { id: 1, label: "Direct", value: "direct" },
  { id: 2, label: "Direct Physical", value: "direct-physical" },
  { id: 3, label: "MacVTap", value: "macvtap" },
  { id: 4, label: "Bare Metal", value: "bare-metal" },
  { id: 5, label: "Virtio Forwarder", value: "virtio-forwarder" },
];

type CreatePortModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
};

export default function CreatePortModal({
  isOpen,
  onClose,
  onCreate,
}: CreatePortModalProps) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<{
    name: string;
    fixedIpsType: string;
    subnet: string;
    ipAddress: string;
    adminState: boolean;
    macAddress: string;
    vnicType: string;
    portSecurity: boolean;
    securityGroups: string[];
  }>({
    name: "",
    fixedIpsType: "unspecified",
    subnet: "",
    ipAddress: "",
    adminState: true,
    macAddress: "",
    vnicType: "normal",
    portSecurity: true,
    securityGroups: [],
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onCreate(form);
    onClose();
  };

  const ALL_SECURITY_GROUPS = ["Testing 1", "Testing 2"];

  const availableSGs = ALL_SECURITY_GROUPS.filter(
    (sg) => !form.securityGroups.includes(sg)
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Port"
      className="w-[800px] max-w-[95vw] max-h-[85vh] overflow-y-auto"
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
              children: "Create Port",
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
              Create Port
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
              Add Security Groups
            </span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <InputField
            label="Port Name"
            placeholder="Enter port name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Checkbox
            label="Enable Admin State"
            checked={form.adminState}
            onChange={() => handleChange("adminState", !form.adminState)}
          />

          <div>
            <label className="block mb-1 font-medium">Fixed IPs</label>
            <SelectOptions
              options={FIXED_IPS_OPTIONS}
              value={form.fixedIpsType}
              onChange={(val) => handleChange("fixedIpsType", val)}
            />

            {form.fixedIpsType === "subnet" && (
              <div className="mt-3">
                <label className="block mb-1 font-medium">Subnet</label>
                <SelectOptions
                  options={SUBNET_OPTIONS}
                  value={form.subnet}
                  onChange={(val) => handleChange("subnet", val)}
                />
              </div>
            )}

            {form.fixedIpsType === "ip-address" && (
              <div className="mt-3">
                <InputField
                  label="IP Address"
                  placeholder="Enter IP Address"
                  value={form.ipAddress}
                  onChange={(e) => handleChange("ipAddress", e.target.value)}
                />
              </div>
            )}
          </div>

          <InputField
            label="MAC Address"
            placeholder="Enter MAC Address"
            value={form.macAddress}
            onChange={(e) => handleChange("macAddress", e.target.value)}
          />

          <div>
            <label className="block mb-1 font-medium">VNIC Type</label>
            <SelectOptions
              options={VNIC_OPTIONS}
              value={form.vnicType}
              onChange={(val) => handleChange("vnicType", val)}
            />
          </div>

          <Checkbox
            label="Port Security"
            checked={form.portSecurity}
            onChange={() => handleChange("portSecurity", !form.portSecurity)}
          />
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              All Security Groups
            </h3>
            <div className="space-y-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
              {availableSGs.map((sg) => (
                <div
                  key={sg}
                  className="flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <span className="text-gray-800">{sg}</span>
                  <Button
                    variant="primary"
                    classNames="w-8 h-8 p-0 rounded-full"
                    onClick={() =>
                      handleChange("securityGroups", [
                        ...form.securityGroups,
                        sg,
                      ])
                    }
                  >
                    +
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              Port Security Groups
            </h3>
            <div className="space-y-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
              {form.securityGroups.length === 0 ? (
                <p className="text-gray-500 italic">
                  No security groups enabled
                </p>
              ) : (
                form.securityGroups.map((sg) => (
                  <div
                    key={sg}
                    className="flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <span className="text-gray-800">{sg}</span>
                    <Button
                      variant="secondary"
                      classNames="w-8 h-8 p-0 rounded-full"
                      onClick={() =>
                        handleChange(
                          "securityGroups",
                          form.securityGroups.filter((x) => x !== sg)
                        )
                      }
                    >
                      −
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
