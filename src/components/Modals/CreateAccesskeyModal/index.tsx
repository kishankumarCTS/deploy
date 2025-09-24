"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import SelectOptions from "@/components/ui/SelectOptions";
import { downloadFile } from "@/lib/utils";
import CopyButton from "@/components/ui/CopyButton";
import InputField from "@/components/ui/CommonInput";

type CreateAccessKeyProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    user: string;
    accessKey: string;
    secretKey: string;
  }) => void;
};

const USER_OPTIONS = [
  { label: "test", value: "test" },
  { label: "admin", value: "admin" },
  { label: "dev", value: "dev" },
];

function generateAccessKey() {
  return {
    accessKey: "1WVTG6W6B2H65NDCP2A0",
    secretKey: "abc123xyzSecretKeyExamplezcSd",
  };
}

export default function CreateAccessKey({
  isOpen,
  onClose,
  onSubmit,
}: CreateAccessKeyProps) {
  const [selectedUser, setSelectedUser] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedKeys, setGeneratedKeys] = useState({
    user: "",
    accessKey: "",
    secretKey: "",
  });

  const handleSubmit = () => {
    if (!selectedUser.trim()) return;
    const keys = generateAccessKey();
    const data = {
      user: selectedUser,
      ...keys,
    };
    setGeneratedKeys(data);
    onSubmit?.(data);
    onClose();
    setShowSuccessModal(true);
  };

  const handleDownload = () => {
    const content = `Access Key: ${generatedKeys.accessKey}\nSecret Key: ${generatedKeys.secretKey}`;
    downloadFile(content, `${generatedKeys.user}-credentials.txt`);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setGeneratedKeys({ user: "", accessKey: "", secretKey: "" });
    setSelectedUser("");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create Access Key"
        className="w-[500px] max-w-[95vw] h-[250px]"
        customFooter={
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Create
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select User
          </label>
          <SelectOptions
            options={USER_OPTIONS}
            defaultValue={selectedUser}
            onChange={(val) => setSelectedUser(val)}
            className="w-full"
            value={selectedUser}
          />
        </div>
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Access Credentials"
        size="default"
        closeOnOverlayClick={false}
        customFooter={
          <>
            <Button variant="secondary" onClick={handleSuccessClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDownload}>
              Download Keys
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <p className="text-sm text-gray-600">
            Download or copy your access credentials now, as they won’t be
            available again.
          </p>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Access Key
              </label>
              <CopyButton text={generatedKeys.accessKey} />
            </div>
            <InputField
              label=""
              type="text"
              value={generatedKeys.accessKey}
              //   readOnly
              disabled
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Secret Key
              </label>
              <CopyButton text={generatedKeys.secretKey} />
            </div>
            <InputField
              label=""
              type="password"
              value={generatedKeys.secretKey}
              //   readOnly
              disabled
              className="w-full"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
