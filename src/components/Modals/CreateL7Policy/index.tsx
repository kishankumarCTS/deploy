"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import InputField from "@/components/ui/CommonInput";
import SelectOptions from "@/components/ui/SelectOptions";
import { ACTION_OPTIONS, AVAILABLE_POOLS } from "./constants";
import { CreateL7PolicyProps, L7PolicyData } from "./types";

function CreateL7Policy({
  isOpen,
  onClose,
  listenerId,
  onSubmit,
}: CreateL7PolicyProps) {
  const [policyName, setPolicyName] = useState("");
  const [description, setDescription] = useState("");
  const [action, setAction] = useState("REJECT");
  const [position, setPosition] = useState(1);
  const [redirectUrl, setRedirectUrl] = useState("https://www.example.com");
  const [redirectPool, setRedirectPool] = useState("");

  const handleClose = () => {
    setPolicyName("");
    setDescription("");
    setAction("REJECT");
    setPosition(1);
    setRedirectUrl("https://www.example.com");
    setRedirectPool("");
    onClose();
  };

  const handleSubmit = () => {
    const policyData: L7PolicyData = {
      name: policyName,
      description,
      action,
      position,
      redirectUrl: action === "REDIRECT_TO_URL" ? redirectUrl : undefined,
      redirectPool: action === "REDIRECT_TO_POOL" ? redirectPool : undefined,
      listenerId,
    };

    console.log("L7 Policy Created:", policyData);
    onSubmit?.(policyData);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create L7 Policy"
      className="w-[900px] max-w-[95vw]"
      footerButtons={[
        {
          variant: "secondary",
          children: "Cancel",
          onClick: handleClose,
        },
        {
          variant: "primary",
          children: "Submit",
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          An L7 policy is a collection of L7 rules associated with a listener,
          and it may also be associated with a back-end pool.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <InputField
              label="L7 Policy Name"
              placeholder="Enter name"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Action <span className="text-red-500">*</span>
              </label>
              <SelectOptions
                value={action}
                onChange={(value) => setAction(value)}
                options={ACTION_OPTIONS}
                className="w-full"
              />
            </div>

            {(action === "REDIRECT_TO_URL" ||
              action === "REDIRECT_TO_POOL") && (
              <InputField
                label="Position"
                type="number"
                placeholder="1"
                value={position.toString()}
                onChange={(e) => setPosition(parseInt(e.target.value) || 1)}
                required
              />
            )}
          </div>

          <div className="space-y-4">
            <InputField
              label="Description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {action === "REJECT" && (
              <InputField
                label="Position"
                type="number"
                placeholder="1"
                value={position.toString()}
                onChange={(e) => setPosition(parseInt(e.target.value) || 1)}
                required
              />
            )}

            {action === "REDIRECT_TO_URL" && (
              <InputField
                label="Redirect URL"
                type="url"
                placeholder="https://www.example.com"
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
                required
              />
            )}

            {action === "REDIRECT_TO_POOL" && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Redirect Pool <span className="text-red-500">*</span>
                </label>
                <SelectOptions
                  value={redirectPool}
                  onChange={(value) => setRedirectPool(value)}
                  options={[
                    { id: 0, label: "Select a pool", value: "" },
                    ...AVAILABLE_POOLS,
                  ]}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateL7Policy;
