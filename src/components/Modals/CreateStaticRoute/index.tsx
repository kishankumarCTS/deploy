"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import InputField from "@/components/ui/CommonInput";

interface CreateStaticRouteProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { destination: string; nextHop: string }) => void;
}

function CreateStaticRoute({ isOpen, onClose, onSubmit }: CreateStaticRouteProps) {
  const [destination, setDestination] = useState("");
  const [nextHop, setNextHop] = useState("");

  const handleClose = () => {
    setDestination("");
    setNextHop("");
    onClose();
  };

  const handleSubmit = () => {
    const newRoute = { destination, nextHop };
    onSubmit?.(newRoute);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Static Route"
      className="w-[600px] max-w-[90vw]"
      footerButtons={[
        { variant: "secondary", children: "Cancel", onClick: handleClose },
        {
          variant: "primary",
          children: "Submit",
          onClick: handleSubmit,
          // disabled: !destination || !nextHop,
        },
      ]}
    >
      <div className="space-y-6">
        <InputField
          label="Destination"
          placeholder="Enter destination address"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <InputField
          label="Next Hop"
          placeholder="Enter next hop address"
          value={nextHop}
          onChange={(e) => setNextHop(e.target.value)}
          required
        />
      </div>
    </Modal>
  );
}

export default CreateStaticRoute;
