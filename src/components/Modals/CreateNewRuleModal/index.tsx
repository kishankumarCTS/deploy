"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import SecurityForm from "@/components/ui/SecurityRuleForm";
import { Button } from "@/components/ui/Button";
import { SecurityRuleData, SecurityRuleType } from "@/components/ui/SecurityRuleForm/types";

export default function CreateNewRuleModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { inbound: SecurityRuleData[]; outbound: SecurityRuleData[] }) => void;
}) {
  const [inboundRules, setInboundRules] = useState<SecurityRuleData[]>([]);
  const [outboundRules, setOutboundRules] = useState<SecurityRuleData[]>([]);

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

  const addInboundRule = () =>
    setInboundRules([...inboundRules, { type: "Custom TCP", remoteType: "CIDR" }]);

  const addOutboundRule = () =>
    setOutboundRules([...outboundRules, { type: "Custom TCP", remoteType: "CIDR" }]);

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

  const deleteInboundRule = (index: number) =>
    setInboundRules(inboundRules.filter((_, i) => i !== index));

  const deleteOutboundRule = (index: number) =>
    setOutboundRules(outboundRules.filter((_, i) => i !== index));

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ inbound: inboundRules, outbound: outboundRules });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Security Group Rules"
      variant="fullscreen"
      footerButtons={[
        { variant: "secondary", children: "Cancel", onClick: onClose },
        { variant: "primary", children: "Submit", onClick: handleSubmit },
      ]}
    >
      <div className="space-y-10">
        {/* Inbound Rules */}
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="font-semibold text-gray-800 text-lg">Inbound Rules</h3>
            <Button
              onClick={addInboundRule}
              classNames="bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 shadow-sm"
            >
              +
            </Button>
          </div>
          <div className="space-y-4">
            {inboundRules.map((rule, idx) => (
              <div
                key={`inbound-${idx}`}
                className="p-3 rounded-xl  bg-gray-50"
              >
                <SecurityForm
                  typeOptions={typeOptions}
                  initialType={rule.type}
                  onChange={(data) => updateInboundRule(idx, data)}
                  onDelete={() => deleteInboundRule(idx)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5 mt-8">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="font-semibold text-gray-800 text-lg">Outbound Rules</h3>
            <Button
              onClick={addOutboundRule}
              classNames="bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 shadow-sm"
            >
              +
            </Button>
          </div>
          <div className="space-y-4">
            {outboundRules.map((rule, idx) => (
              <div
                key={`outbound-${idx}`}
                className="p-3 rounded-xl bg-gray-50"
              >
                <SecurityForm
                  typeOptions={typeOptions}
                  initialType={rule.type}
                  onChange={(data) => updateOutboundRule(idx, data)}
                  onDelete={() => deleteOutboundRule(idx)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
