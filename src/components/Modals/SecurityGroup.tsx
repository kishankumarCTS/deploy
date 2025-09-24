"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import SecurityForm from "@/components/ui/SecurityRuleForm";
import {
  SecurityRuleData,
  SecurityRuleType,
} from "@/components/ui/SecurityRuleForm/types";
interface SecurityGroupRule {
  id: string;
  etherType: string;
  protocol: string;
  portRange: string;
  remoteIpPrefix: string;
}

export default function SecurityGroupModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}) {
  const [securityGroupName, setSecurityGroupName] = useState("");
  const [description, setDescription] = useState("");

  const [inboundRules, setInboundRules] = useState<SecurityRuleData[]>([]);
  const [outboundRules, setOutboundRules] = useState<SecurityRuleData[]>([]);

  const [defaultOutboundRules, setDefaultOutboundRules] = useState<
    SecurityGroupRule[]
  >([
    { id: "1", etherType: "", protocol: "", portRange: "", remoteIpPrefix: "" },
    { id: "2", etherType: "", protocol: "", portRange: "", remoteIpPrefix: "" },
  ]);

  const typeOptions: SecurityRuleType[] = [
    "Custom TCP",
    "Custom UDP",
    "Custom ICMP",
    "Any Protocol",
    "All ICMP",
    "All TCP",
    "All UDP",
    "DNS",
    "HTTP",
    "HTTPS",
    "IMAP",
    "IMAPS",
    "LDAP",
    "MS SQL",
    "MYSQL",
    "POP3",
    "POP3S",
    "RDP",
  ];

  const handleSubmit = () => {
    onSubmit?.({
      name: securityGroupName,
      description,
      inboundRules,
      outboundRules,
      defaultOutboundRules,
    });
  };

  const addInboundRule = () => {
    setInboundRules([
      ...inboundRules,
      { type: "Custom TCP", remoteType: "CIDR" } as SecurityRuleData,
    ]);
  };

  const addOutboundRule = () => {
    setOutboundRules([
      ...outboundRules,
      { type: "Custom TCP", remoteType: "CIDR" } as SecurityRuleData,
    ]);
  };

  const updateInboundRule = (index: number, data: SecurityRuleData) => {
    const updated = [...inboundRules];
    updated[index] = data;
    setInboundRules(updated);
  };

  const updateOutboundRule = (index: number, data: SecurityRuleData) => {
    const updated = [...outboundRules];
    updated[index] = data;
    setOutboundRules(updated);
  };

  const deleteInboundRule = (index: number) => {
    setInboundRules(inboundRules.filter((_, i) => i !== index));
  };

  const deleteOutboundRule = (index: number) => {
    setOutboundRules(outboundRules.filter((_, i) => i !== index));
  };

  const updateDefaultOutboundRule = (
    id: string,
    field: keyof SecurityGroupRule,
    value: string
  ) => {
    setDefaultOutboundRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule))
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Security Group"
      variant="fullscreen"
      footerButtons={[
        { variant: "secondary", children: "Close", onClick: onClose },
        { variant: "primary", children: "Save", onClick: handleSubmit },
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Security Group Name
            </label>
            <input
              type="text"
              value={securityGroupName}
              onChange={(e) => setSecurityGroupName(e.target.value)}
              placeholder="My Security Group"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description of security group"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-700">Inbound Rules</h3>
            <button
              type="button"
              onClick={addInboundRule}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-3xl hover:bg-blue-700"
            >
              +
            </button>
          </div>
          {inboundRules.length === 0 && (
            <p className="text-sm text-gray-500">No inbound rules added.</p>
          )}
          <div className="space-y-3">
            {inboundRules.map((rule, idx) => (
              <SecurityForm
                key={idx}
                typeOptions={typeOptions}
                initialType={rule.type}
                onChange={(data) => updateInboundRule(idx, data)}
                onDelete={() => deleteInboundRule(idx)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              Outbound Rules
            </h3>
            <button
              type="button"
              onClick={addOutboundRule}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-3xl hover:bg-blue-700"
            >
              +
            </button>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-4 gap-4">
              {defaultOutboundRules.map((rule, index) => (
                <div key={rule.id} className="contents">
                  <input
                    type="text"
                    value={rule.etherType}
                    onChange={(e) =>
                      updateDefaultOutboundRule(
                        rule.id,
                        "etherType",
                        e.target.value
                      )
                    }
                    placeholder={index === 0 ? "IPv4" : "IPv6"}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-800"
                  />
                  <input
                    type="text"
                    value={rule.protocol}
                    onChange={(e) =>
                      updateDefaultOutboundRule(
                        rule.id,
                        "protocol",
                        e.target.value
                      )
                    }
                    placeholder="Any"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-800"
                  />
                  <input
                    type="text"
                    value={rule.portRange}
                    onChange={(e) =>
                      updateDefaultOutboundRule(
                        rule.id,
                        "portRange",
                        e.target.value
                      )
                    }
                    placeholder="Any"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-800"
                  />
                  <input
                    type="text"
                    value={rule.remoteIpPrefix}
                    onChange={(e) =>
                      updateDefaultOutboundRule(
                        rule.id,
                        "remoteIpPrefix",
                        e.target.value
                      )
                    }
                    placeholder={index === 0 ? "0.0.0.0/0" : "::/0"}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-800"
                  />
                </div>
              ))}
            </div>
          </div>

          {outboundRules.length === 0 && (
            <p className="text-sm text-gray-500">
              No additional outbound rules added.
            </p>
          )}
          <div className="space-y-3">
            {outboundRules.map((rule, idx) => (
              <SecurityForm
                key={idx}
                typeOptions={typeOptions}
                initialType={rule.type}
                onChange={(data) => updateOutboundRule(idx, data)}
                onDelete={() => deleteOutboundRule(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
