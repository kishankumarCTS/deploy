"use client";

import { useState } from "react";
import ElasticIpModal from "@/components/Modals/ElasticIp";
import { ElasticIpFormData } from "@/components/pages/ElasticIp/types";

export default function ElasticIpPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const poolOptions = ["Pool A", "Pool B", "Pool C"];

  const handleSubmit = (data: ElasticIpFormData) => {
    console.log("Elastic IP Reserve Data:", data);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-themeBlue-600 text-white rounded-lg hover:bg-themeBlue-700 transition-colors font-medium"
      >
        Reserve Elastic IP
      </button>

      <ElasticIpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        poolOptions={poolOptions}
      />
    </div>
  );
}
