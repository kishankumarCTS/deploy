"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import SelectOptions from "@/components/ui/SelectOptions";
import {
  FORMAT_OPTIONS,
  DEFAULT_KEYPAIR_VALUES,
  KEYPAIR_MOCK_PRIVATE_KEY,
} from "@/components/pages/KeyPair/constants";
import { CreateKeyPairProps } from "@/components/pages/KeyPair/types";
import { downloadFile, copyToClipboard } from "@/lib/utils";

export default function KeyPair({
  isOpen,
  onClose,
  onSubmit,
}: CreateKeyPairProps) {
  const [keyPairName, setKeyPairName] = useState(DEFAULT_KEYPAIR_VALUES.name);
  const [type, setType] = useState(DEFAULT_KEYPAIR_VALUES.type);
  const [format, setFormat] = useState(DEFAULT_KEYPAIR_VALUES.format);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedKeyData, setGeneratedKeyData] = useState({
    name: "",
    privateKey: "",
  });

  const handleSubmit = () => {
    if (!keyPairName.trim()) return;

    const keyData = {
      name: keyPairName,
      privateKey: KEYPAIR_MOCK_PRIVATE_KEY,
    };

    setGeneratedKeyData(keyData);
    onSubmit?.({ name: keyPairName, type, format });
    onClose();
    setShowSuccessModal(true);
  };

  const handleDownload = () => {
    downloadFile(generatedKeyData.privateKey, `${generatedKeyData.name}.pem`);
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(generatedKeyData.privateKey);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setKeyPairName(DEFAULT_KEYPAIR_VALUES.name);
    setType(DEFAULT_KEYPAIR_VALUES.type);
    setFormat(DEFAULT_KEYPAIR_VALUES.format);
    setGeneratedKeyData({ name: "", privateKey: "" });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create Key Pair"
        customFooter={
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div>
            <p className="text-sm text-[#0E1726] leading-relaxed mb-3">
              Key pair allow you to connect to your instance securely.
            </p>
            <p className="text-sm text-[#0E1726] leading-relaxed">
              Enter the name of the key pair below. When prompted, store the
              private key pair in a secure and accessible location on your
              computer. You will need it later to connect your instance.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Pair Name
            </label>
            <input
              type="text"
              value={keyPairName}
              onChange={(e) => setKeyPairName(e.target.value)}
              placeholder="Instance name..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                         text-sm text-gray-900 placeholder-gray-400
                         focus:outline-none focus:border-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Key pair*
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="SSH"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                         text-sm text-gray-900 placeholder-gray-400
                         focus:outline-none focus:border-gray-800"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Format of Key pair*
            </label>
            <SelectOptions
              options={FORMAT_OPTIONS}
              defaultValue={DEFAULT_KEYPAIR_VALUES.format}
              //   onChange={(val) => setFormat(val)}
              className="w-full"
              value={format}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Key Pair Created Successfully"
        size="default"
        closeOnOverlayClick={false}
        customFooter={
          <>
            <Button variant="secondary" onClick={handleSuccessClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDownload}>
              Download
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Important
              </h4>
              <p className="text-sm text-blue-800">
                Kindly note once closed, the private key cannot be
                saved/downloaded again
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-700 leading-relaxed">
              To ensure a secure connection to your instance, kindly download
              the private key generated or save it. Avoid clicking outside of
              this modal to prevent any unintended actions.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Pair
            </label>
            <input
              type="text"
              value={generatedKeyData.name}
              readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                         text-sm text-gray-900 bg-gray-50
                         focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Format of Key pair*
              </label>
              <button
                onClick={handleCopyToClipboard}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
                title="Copy to clipboard"
              >
                <img
                  src="/images/keypair/file_copy.svg"
                  alt="Copy"
                  className="w-4 h-4"
                />
              </button>
            </div>
            <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4">
              <pre className="text-xs font-mono text-gray-700 text-center whitespace-pre-wrap break-words leading-relaxed">
                {generatedKeyData.privateKey}
              </pre>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
