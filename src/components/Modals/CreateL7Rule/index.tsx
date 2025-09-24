"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import InputField from "@/components/ui/CommonInput";
import SelectOptions from "@/components/ui/SelectOptions";
import { RULE_TYPES, COMPARE_TYPES } from "./constants";
import { CreateL7RuleProps, L7RuleData } from "./types";
import RadioButton from "@/components/ui/RadioButton";

function CreateL7RuleModal({
  isOpen,
  onClose,
  policyId,
  onSubmit,
}: CreateL7RuleProps) {
  const [invert, setInvert] = useState(false);
  const [ruleType, setRuleType] = useState("");
  const [compareType, setCompareType] = useState("REGEX");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleClose = () => {
    setInvert(false);
    setRuleType("");
    setCompareType("REGEX");
    setKey("");
    setValue("");
    onClose();
  };

  const handleSubmit = () => {
    const ruleData: L7RuleData = {
      invert,
      ruleType,
      compareType,
      key,
      value,
      policyId,
    };
    console.log("L7 Rule Created:", ruleData);
    onSubmit?.(ruleData);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create L7 Rule"
      className="w-[800px] max-w-[95vw]"
      footerButtons={[
        { variant: "secondary", children: "Cancel", onClick: handleClose },
        { variant: "primary", children: "Submit", onClick: handleSubmit },
      ]}
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          An L7 Rule is a simple logical test that returns either true or false.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Invert <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <RadioButton
                    isSelected={invert}
                    onChange={() => setInvert(true)}
                    name="invert"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioButton
                    isSelected={!invert}
                    onChange={() => setInvert(false)}
                    name="invert"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                L7 Rule Type <span className="text-red-500">*</span>
              </label>
              <SelectOptions
                value={ruleType}
                onChange={(value) => setRuleType(value)}
                options={RULE_TYPES}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Compare Type <span className="text-red-500">*</span>
              </label>
              <SelectOptions
                value={compareType}
                onChange={(value) => setCompareType(value)}
                options={COMPARE_TYPES}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <InputField
              label="Key"
              placeholder="Enter key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />

            <InputField
              label="Value"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateL7RuleModal;
