"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import InputField from "@/components/ui/CommonInput";

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (folderName: string) => void;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [folderName, setFolderName] = useState("");

  const handleCreate = () => {
    if (folderName.trim()) {
      onSubmit(folderName.trim());
      setFolderName("");
      onClose();
    }
  };

  const handleClose = () => {
    setFolderName("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Folder"
      className="w-[400px] max-w-full"
      footerButtons={[
        {
          variant: "secondary",
          children: "Cancel",
          onClick: handleClose,
        },
        {
          variant: "primary",
          children: "Create",
          onClick: handleCreate,
        },
      ]}
    >
      <div className="space-y-4">
        <InputField
          label="Folder Name"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CreateFolderModal;
