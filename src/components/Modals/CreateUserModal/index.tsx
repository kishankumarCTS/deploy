"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import InputField from "@/components/ui/CommonInput";
import SelectOptions from "@/components/ui/SelectOptions";

interface CreateUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { username: string; permission: string }) => void;
}

const permissionOptions = [
  { id: 1, label: "Read", value: "read" },
  { id: 2, label: "Write", value: "write" },
  { id: 3, label: "Read/Write", value: "read_write" },
  { id: 4, label: "Full Control", value: "full_control" },
];

function CreateUser({ isOpen, onClose, onSubmit }: CreateUserProps) {
  const [username, setUsername] = useState("");
  const [permission, setPermission] = useState("read");

  const handleClose = () => {
    setUsername("");
    setPermission("read");
    onClose();
  };

  const handleSubmit = () => {
    const userData = {
      username,
      permission,
    };
    console.log("User Created:", userData);
    onSubmit?.(userData);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create User"
      className="w-[700px] max-w-[90vw]"
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
        <div>
          <InputField
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Permission
          </label>
          <SelectOptions
            options={permissionOptions}
            value={permission}
            onChange={(value) => setPermission(value)}
            defaultValue="Select Permission"
          />
        </div>
      </div>
    </Modal>
  );
}

export default CreateUser;
