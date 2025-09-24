"use client";

import { useState } from "react";
import KeyPair from "@/components/Modals/Keypair";
import { KeyPairFormData } from "@/components/pages/KeyPair/types";
import { Button } from "@/components/ui/Button";

export default function KeyPairPage({ setCreatedKey }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: KeyPairFormData) => {
    console.log("Key Pair Form Data:", data);
    setCreatedKey(data);
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="pl-3">
        <Button onClick={() => setIsModalOpen(true)}>Create Key Pair</Button>
      </div>
      <KeyPair
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
