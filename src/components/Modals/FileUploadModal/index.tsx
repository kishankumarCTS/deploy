"use client";
import React, { useState, useRef, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FaUpload, FaTimes, FaFile, FaCheck } from "react-icons/fa";
import SelectOptions from "@/components/ui/SelectOptions";

interface FileUploadItem {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (files: FileUploadItem[], storageClass: string) => void;
}

const STORAGE_CLASS_OPTIONS = [
  { id: 1, label: "Standard", value: "Standard" },
  { id: 2, label: "Standard Infrequent Access", value: "Standard-IA" },
  { id: 3, label: "Glacier", value: "Glacier" },
  { id: 4, label: "Glacier Deep Archive", value: "Glacier-Deep-Archive" },
];

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedStorageClass, setSelectedStorageClass] =
    useState<string>("Standard");

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  const addFiles = (newFiles: File[]) => {
    const fileItems: FileUploadItem[] = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
      status: "uploading" as const,
    }));

    setFiles((prev) => [...prev, ...fileItems]);

    fileItems.forEach((fileItem) => {
      simulateUpload(fileItem.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;

      setFiles((prev) =>
        prev.map((file) =>
          file.id === fileId
            ? { ...file, progress: Math.min(progress, 100) }
            : file
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((file) =>
            file.id === fileId
              ? { ...file, progress: 100, status: "completed" as const }
              : file
          )
        );

        setFiles((prev) => {
          const allCompleted = prev.every((f) => f.status === "completed");
          if (allCompleted) {
            setIsUploading(false);
          }
          return prev;
        });
      }
    }, 200);
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleClose = () => {
    setFiles([]);
    setIsUploading(false);
    setSelectedStorageClass("Standard");
    onClose();
  };

  const handleSubmit = () => {
    const completedFiles = files.filter((f) => f.status === "completed");
    if (completedFiles.length > 0) {
      onSubmit?.(completedFiles, selectedStorageClass);
      handleClose();
    }
  };

  const canSubmit =
    files.length > 0 &&
    files.every((f) => f.status === "completed") &&
    !isUploading;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload File"
      size="stretch"
      className="w-[600px] max-w-full min-h-[500px]"
      footerButtons={[
        {
          variant: "secondary",
          children: "Cancel",
          onClick: handleClose,
        },
        {
          variant: "primary",
          children: "Upload Files",
          onClick: handleSubmit,
          // disabled: !canSubmit
        },
      ]}
    >
      <div className="space-y-6">
        <div className="text-sm text-gray-600">
          For uploads exceeding 10 objects, we highly recommend using options
          like S3 browser, AWS CLI, Cyberduck or other third-party tools.
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Uploading Files</h4>
            <div className="space-y-4">
              {files.map((fileItem) => (
                <div
                  key={fileItem.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    {fileItem.status === "completed" ? (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheck className="text-green-600 text-sm" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaFile className="text-gray-600 text-sm" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fileItem.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(fileItem.file.size)}
                        </p>
                      </div>
                      <div className="text-right">
                        {fileItem.status === "uploading" && (
                          <p className="text-xs text-gray-600">
                            {Math.round(fileItem.progress)}%
                          </p>
                        )}
                        {fileItem.status === "completed" && (
                          <p className="text-xs text-green-600">Completed</p>
                        )}
                      </div>
                    </div>

                    {fileItem.status === "uploading" && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${fileItem.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => removeFile(fileItem.id)}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                    disabled={fileItem.status === "uploading"}
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && files.some((f) => f.status === "completed") && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Storage Class
                <span className="text-red-500">*</span>
              </label>
              <div className="w-84">
                <SelectOptions
                  options={STORAGE_CLASS_OPTIONS}
                  value={selectedStorageClass}
                  onChange={(value) => setSelectedStorageClass(value)}
                  defaultValue="Standard"
                  className=""
                  disableSelect={isUploading}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              This storage class will be applied to all uploaded files.
            </p>
          </div>
        )}

        {files.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800">
              {files.filter((f) => f.status === "completed").length} of{" "}
              {files.length} files uploaded
            </div>
            {isUploading && (
              <div className="text-sm text-blue-600">Uploading...</div>
            )}
            {!isUploading &&
              files.length > 0 &&
              files.every((f) => f.status === "completed") && (
                <div className="text-sm text-green-600 font-medium">
                  Ready to submit
                </div>
              )}
          </div>
        )}
        <div
          className={`
            group cursor-pointer border-2 border-dashed rounded-2xl p-12 text-center transition-all
            ${
              isDragging
                ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.01]"
                : "border-blue-300 hover:border-blue-400 hover:bg-blue-50"
            }
          `}
          onClick={handleBrowseFiles}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center 
                              bg-gradient-to-tr from-blue-100 to-blue-200
                              group-hover:from-blue-200 group-hover:to-blue-300
                              transition"
              >
                <FaUpload className="text-blue-600 text-3xl" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Upload Files
              </h3>
              <p className="text-gray-600">Drag & drop files</p>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </Modal>
  );
};

export default FileUploadModal;
