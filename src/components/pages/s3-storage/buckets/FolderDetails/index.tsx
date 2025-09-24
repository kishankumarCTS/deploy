"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FaUpload } from "react-icons/fa";
import FileUploadModal from "@/components/Modals/FileUploadModal";

const FolderDetails = () => {
  const router = useRouter();
  const params = useParams();

  const bucketName = params?.bucketId as string;
  const folderId = params?.folderId as string;

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-themeGray-900">
          {bucketName} | Folder | {folderId || "New Folder"}
        </h1>

        <div className="flex gap-3">
          <Button onClick={() => setIsUploadModalOpen(true)}>
            {/* <FaUpload className="mr-2" size={16} /> */}
            UPLOAD FILE
          </Button>
          <Button variant="secondary" onClick={handleGoBack}>
            Go Back
          </Button>
        </div>
      </div>

      <div className="py-20 px-6 bg-[#EEF5FE] rounded-[20px] flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-6">
          This folder is empty. Upload files to get started.
        </p>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          {/* <FaUpload className="mr-2" size={16} /> */}
          Upload Files
        </Button>
      </div>

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={(files, storageClass) => {
          console.log(
            "Files uploaded to folder:",
            folderId,
            files,
            storageClass
          );
        }}
      />
    </div>
  );
};

export default FolderDetails;
