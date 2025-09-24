"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import InputField from "@/components/ui/CommonInput";
interface CreateSnapshotProps {
  isOpen: boolean;
  onClose: () => void;
  volumeId?: string | null;
  onSubmit?: (data: {
    name: string;
    description: string;
    volumeId?: string | null;
  }) => void;
}

function CreateSnapshot({
  isOpen,
  onClose,
  volumeId,
  onSubmit,
}: CreateSnapshotProps) {
  const [snapshotName, setSnapshotName] = useState("");
  const [snapshotDescription, setSnapshotDescription] = useState("");

  const handleClose = () => {
    setSnapshotName("");
    setSnapshotDescription("");
    onClose();
  };

  const handleSubmit = () => {
    const snapshotData = {
      name: snapshotName,
      description: snapshotDescription,
      volumeId,
    };

    console.log("Snapshot Created:", snapshotData);
    onSubmit?.(snapshotData);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Snapshot"
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
          // disabled: !snapshotName,
        },
      ]}
    >
      <div className="space-y-6">
        <div>
          <InputField
            label="Snapshot Name"
            placeholder="Enter name"
            value={snapshotName}
            onChange={(e) => setSnapshotName(e.target.value)}
            required
          />
        </div>

        <div>
          <InputField
            label="Snapshot Description"
            placeholder="Enter description"
            value={snapshotDescription}
            onChange={(e) => setSnapshotDescription(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}

export default CreateSnapshot;
