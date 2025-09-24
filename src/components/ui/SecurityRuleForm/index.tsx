"use client";

import React, { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import DeleteRowButton from "../DeleteRowButton";
import {
  SecurityRuleFormProps,
  SecurityRuleData,
  SecurityRuleType,
} from "./types";
import { DEFAULT_SECURITY_RULE, PREDEFINED_PORTS } from "./constants";

const SecurityForm: React.FC<SecurityRuleFormProps> = ({
  typeOptions,
  initialType = "Custom TCP",
  onChange,
  onDelete,
}) => {
  const [formData, setFormData] = useState<SecurityRuleData>({
    ...DEFAULT_SECURITY_RULE,
    type: initialType,
  });

  const handleChange = (field: keyof SecurityRuleData, value: string) => {
    const updated = { ...formData, [field]: value };

    if (field === "type") {
      if (value === "Custom ICMP" || value === "All ICMP") {
        updated.portType = undefined;
        updated.fromPort = undefined;
        updated.toPort = undefined;
        updated.icmpType = updated.icmpType || "0";
        updated.icmpCode = updated.icmpCode || "-1";
      } else {
        updated.portType = updated.portType || "Port Range";
        updated.fromPort = updated.fromPort || "1";
        updated.toPort = updated.toPort || "65535";
        updated.icmpType = undefined;
        updated.icmpCode = undefined;
      }

      const portConfig = PREDEFINED_PORTS[value as SecurityRuleType];
      if (portConfig) {
        updated.fromPort = portConfig.fromPort;
        updated.toPort = portConfig.toPort;
        updated.portType = portConfig.portType;
      }
    }

    if (field === "portType") {
      if (value === "All Ports") {
        updated.fromPort = "";
        updated.toPort = "";
      } else if (value === "Port Range") {
        updated.fromPort = updated.fromPort || "1";
        updated.toPort = updated.toPort || "65535";
      } else if (value === "Port") {
        const port = updated.fromPort || "80";
        updated.fromPort = port;
        updated.toPort = port;
      }
    }

    if (field === "remoteType") {
      if (value === "CIDR") {
        updated.cidr = updated.cidr || "127.0.0.1/32";
      } else {
        updated.securityGroup = updated.securityGroup || "default (Current)";
      }
    }

    setFormData(updated);
    onChange?.(updated);
  };

  const handleUseMyIP = () => {
    handleChange("cidr", "0.0.0.0/0");
  };

  const isICMPType =
    formData.type === "Custom ICMP" || formData.type === "All ICMP";
  const showPortFields = formData.portType !== "All Ports" && !isICMPType;
  const isPortRange = formData.portType === "Port Range";
  const isCIDRSelected = formData.remoteType === "CIDR";

  useEffect(() => {
    onChange?.(formData);
  }, []);

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col gap-2 min-w-[130px]">
        <div className="flex items-center gap-1">
          <label className="text-sm font-medium text-gray-700">Type</label>
          <span className="text-red-500">*</span>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        <select
          value={formData.type}
          onChange={(e) =>
            handleChange("type", e.target.value as SecurityRuleType)
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {!isICMPType && (
        <div className="flex flex-col gap-2 min-w-[100px]">
          <div className="flex items-center gap-1">
            <label className="text-sm font-medium text-gray-700">Port</label>
            <span className="text-red-500">*</span>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="portType"
                checked={formData.portType === "Port"}
                onChange={() => handleChange("portType", "Port")}
                className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300"
              />
              <span
                className={`${
                  formData.portType === "Port"
                    ? "text-red-500 font-medium"
                    : "text-gray-600"
                }`}
              >
                Port
              </span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="portType"
                checked={formData.portType === "All Ports"}
                onChange={() => handleChange("portType", "All Ports")}
                className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300"
              />
              <span
                className={`${
                  formData.portType === "All Ports"
                    ? "text-red-500 font-medium"
                    : "text-gray-600"
                }`}
              >
                All Ports
              </span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="portType"
                checked={formData.portType === "Port Range"}
                onChange={() => handleChange("portType", "Port Range")}
                className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300"
              />
              <span
                className={`${
                  formData.portType === "Port Range"
                    ? "text-red-500 font-medium"
                    : "text-gray-600"
                }`}
              >
                Port Range
              </span>
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 min-w-[100px]">
        <div className="flex items-center gap-1">
          <label className="text-sm font-medium text-gray-700">
            {isICMPType ? "Type" : isPortRange ? "From Port" : "Port"}
          </label>
          {(showPortFields || isICMPType) && (
            <span className="text-red-500">*</span>
          )}
          {!isICMPType && <HelpCircle className="w-4 h-4 text-gray-400" />}
        </div>

        {isICMPType ? (
          <input
            type="text"
            value={formData.icmpType || ""}
            onChange={(e) => handleChange("icmpType", e.target.value)}
            placeholder="0"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        ) : showPortFields ? (
          <input
            type="text"
            value={formData.fromPort || ""}
            onChange={(e) => handleChange("fromPort", e.target.value)}
            placeholder={isPortRange ? "1" : "80"}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        ) : (
          <div className="w-full h-10 flex items-center text-sm text-gray-500">
            -
          </div>
        )}
      </div>

      {(isICMPType || (isPortRange && showPortFields)) && (
        <div className="flex flex-col gap-2 min-w-[100px]">
          <div className="flex items-center gap-1">
            <label className="text-sm font-medium text-gray-700">
              {isICMPType ? "Code" : "To Port"}
            </label>
            {isPortRange && <span className="text-red-500">*</span>}
            {!isICMPType && <HelpCircle className="w-4 h-4 text-gray-400" />}
          </div>
          <input
            type="text"
            value={isICMPType ? formData.icmpCode || "" : formData.toPort || ""}
            onChange={(e) =>
              handleChange(isICMPType ? "icmpCode" : "toPort", e.target.value)
            }
            placeholder={isICMPType ? "-1" : "65535"}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 min-w-[120px]">
        <div className="flex items-center gap-1">
          <label className="text-sm font-medium text-gray-700">Remote</label>
          <span className="text-red-500">*</span>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="remoteType"
              checked={formData.remoteType === "CIDR"}
              onChange={() => handleChange("remoteType", "CIDR")}
              className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300"
            />
            <span
              className={`${
                formData.remoteType === "CIDR"
                  ? "text-red-500 font-medium"
                  : "text-gray-600"
              }`}
            >
              CIDR
            </span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="remoteType"
              checked={formData.remoteType === "Security Group"}
              onChange={() => handleChange("remoteType", "Security Group")}
              className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300"
            />
            <span
              className={`${
                formData.remoteType === "Security Group"
                  ? "text-red-500 font-medium"
                  : "text-gray-600"
              }`}
            >
              Security Group
            </span>
          </label>
        </div>
      </div>

      {isCIDRSelected && (
        <div className="flex flex-col gap-2 min-w-[140px]">
          <div className="flex items-center gap-1">
            <label className="text-sm font-medium text-gray-700">CIDR</label>
            <span className="text-red-500">*</span>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>

          <input
            type="text"
            value={formData.cidr || ""}
            onChange={(e) => handleChange("cidr", e.target.value)}
            placeholder="127.0.0.1/32"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            className="text-sm text-red-500 hover:text-red-600 underline text-left"
            onClick={handleUseMyIP}
          >
            Use my IP
          </button>
        </div>
      )}

      {!isCIDRSelected && (
        <div className="flex flex-col gap-2 min-w-[140px]">
          <div className="flex items-center gap-1">
            <label className="text-sm font-medium text-gray-700">
              Remote Security Group
            </label>
            <span className="text-red-500">*</span>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>

          <select
            value={formData.securityGroup || ""}
            onChange={(e) => handleChange("securityGroup", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="default (Current)">default (Current)</option>
            <option value="Testing 1">Testing 1</option>
            <option value="Web Servers">Web Servers</option>
            <option value="Database">Database</option>
            <option value="Load Balancers">Load Balancers</option>
          </select>

          <div className="flex items-center gap-1 mt-2">
            <label className="text-sm font-medium text-gray-700">
              Ether Type
            </label>
            <span className="text-red-500">*</span>
          </div>
          <select
            value={formData.etherType || "IPv4"}
            onChange={(e) => handleChange("etherType", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="IPv4">IPv4</option>
            <option value="IPv6">IPv6</option>
          </select>
        </div>
      )}

      <div className="flex flex-col gap-2 flex-1 min-w-[180px]">
        <div className="flex items-center gap-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <span className="text-red-500">*</span>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter description"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <DeleteRowButton />
    </div>
  );
};

export default SecurityForm;
