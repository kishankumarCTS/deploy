"use client";
import { useState } from "react";
import RouterModal from "@/components/Modals/router";
import { Button } from "@/components/ui/Button";

export default function RouterPage({
  setVpcData,
  vpcData,
}: {
  vpcData: any;
  setVpcData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = (data: { name: string; adminStateUp: boolean }) => {
    console.log("Create Router Data:", data);
    setVpcData((prev: any) => ({
      ...prev,
      step3: {
        ...prev?.step3,
        router: data,
      },
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="pl-3">
        <Button
          onClick={(event) => {
            event.preventDefault();
            setIsModalOpen(true);
          }}
        >
          Create Router
        </Button>
      </div>
      <RouterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        vpcData={vpcData}
      />
    </div>
  );
}
