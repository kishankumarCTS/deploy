"use client";

import { useState } from "react";

import InputField from "@/components/ui/CommonInput";
import Table from "@/components/ui/Table";
import SelectOptions from "@/components/ui/SelectOptions";
import RadioButton from "../../ui/RadioButton";
import Checkbox from "@/components/ui/Checkbox";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type VolumeSource = {
  id: number;
  label: string;
};
interface CreateVolumeProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateVolume({ isOpen, onClose }: CreateVolumeProps) {
  const [volumeName, setVolumeName] = useState<string>("");
  const [descriptionName, setDescriptionName] = useState<string>("");
  const [volumeSize, setVolumeSize] = useState<number>(250);
  const [volumeType, setVolumeType] = useState<string>("1");
  const [volumeSource, setVolumeSource] = useState<string>("");
  const [volumeSourceChild, setVolumeSourceChild] = useState<string>("");
  const [selectVolumeSourceOptions, setSelectVolumeSourceOptions] = useState<
    VolumeSource[] | any
  >([]);
  const [isBootable, setIsBootable] = useState<boolean>(false);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleVolumeNameChange = (value: string) => {
    setVolumeName(value);
  };

  const handleVolumeDescriptionChange = (value: string) => {
    setDescriptionName(value);
  };

  const handleVolumeSize = (value: string) => {
    setVolumeSize(Number(value));
  };

  const volumeSourceOptions = [
    { id: 1, label: "a" },
    { id: 2, label: "b" },
    { id: 3, label: "c" },
    { id: 4, label: "d" },
  ];

  const selectVolumeSourceAvailableOptions: any = {
    a: [
      { id: 1, label: "a" },
      { id: 2, label: "a" },
      { id: 3, label: "a" },
      { id: 4, label: "a" },
    ],
    b: [
      { id: 1, label: "b" },
      { id: 2, label: "b" },
      { id: 3, label: "b" },
      { id: 4, label: "b" },
    ],
    c: [
      { id: 1, label: "c" },
      { id: 2, label: "c" },
      { id: 3, label: "c" },
      { id: 4, label: "c" },
    ],
    d: [
      { id: 1, label: "d" },
      { id: 2, label: "d" },
      { id: 3, label: "d" },
      { id: 4, label: "d" },
    ],
  };

  const handleChangeVolumeSource = (value: string) => {
    setVolumeSource(value);
    setVolumeSourceChild("");
    setSelectVolumeSourceOptions(
      selectVolumeSourceAvailableOptions?.[value] ?? []
    );
  };

  const handleChangeVolumeSourceChild = (value: string) => {
    setVolumeSourceChild(value);
  };

  const handleChangeVolumeType = (value: string) => {
    setVolumeType(value);
  };

  const handleCloseModal = () => {
    // Reset form values when closing
    setVolumeName("");
    setDescriptionName("");
    setVolumeSize(250);
    setVolumeType("1");
    setVolumeSource("");
    setVolumeSourceChild("");
    setSelectVolumeSourceOptions([]);
    setIsBootable(false);
    onClose();
  };

  const handleSubmit = () => {
    // Add your volume creation logic here
    console.log("Creating volume with data:", {
      volumeName,
      descriptionName,
      volumeSize,
      volumeType,
      volumeSource,
      volumeSourceChild,
      isBootable,
    });

    // Close modal after submission
    handleCloseModal();
  };

  return (
    <div className="p-6 bg-themeWhite-900 rounded-[20px]">
      {/* <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Create Volume
      </Button> */}
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        variant="fullscreen"
        footerButtons={[
          {
            variant: "secondary",
            children: "Cancel",
            onClick: handleCloseModal,
          },
          {
            variant: "primary",
            children: "Submit",
            onClick: handleSubmit,
          },
        ]}
      >
        <h5 className="title-large">Create Volume</h5>
        <p className="mb-6 title-small font-medium text-themeGray-500">
          Create an Ace volume to attach to any instance in the same
          availability zone.
        </p>
        <div className="flex justify-between gap-3 mb-8 ">
          <InputField
            label="Volume Name"
            required
            placeholder="Enter name"
            value={volumeName}
            onChange={(e) => {
              handleVolumeNameChange(e.target.value);
            }}
            labelClassName="font-bold"
            inputClassName="py-1.5 px-3 placeholder:title-small"
            className="w-[40%]"
          />
          <InputField
            label="Volume Description"
            placeholder="Enter Description"
            value={descriptionName}
            onChange={(e) => {
              handleVolumeDescriptionChange(e.target.value);
            }}
            labelClassName="font-bold"
            inputClassName="py-1.5 px-4 placeholder:title-small"
            className="w-[40%]"
          />
        </div>
        <div>
          <div className="py-1.5 px-3 bg-themeGray-300">Volume Settings</div>
          <div className="py-4 px-1.5">
            <span className="relative">
              Select Volume Type
              <span className="absolute -top-1 -right-1.5">*</span>
            </span>
          </div>
          <Table
            columns={[
              { header: "SELECT", accessor: "select", isVisible: true },
              {
                header: "VOLUME TYPES",
                accessor: "volumeTypes",
                isVisible: true,
              },
              { header: "MIN IOPS", accessor: "minIops", isVisible: true },
              { header: "MAX IOPS", accessor: "maxIops", isVisible: true },
              {
                header: "MAX THROUGHPUT",
                accessor: "maxThroughput",
                isVisible: true,
              },
              { header: "MAX SIZE", accessor: "maxSize", isVisible: true },
            ]}
            rows={[
              {
                select: (
                  <RadioButton
                    isSelected={volumeType === "1"}
                    onChange={() => {
                      handleChangeVolumeType("1");
                    }}
                  />
                ),
                volumeTypes: "NVMe based High IOPS Storage",
                minIops: "1000",
                maxIops: "16000",
                maxThroughput: "400.00 MB/s",
                maxSize: "16TB",
              },
              {
                select: (
                  <RadioButton
                    isSelected={volumeType === "2"}
                    onChange={() => {
                      handleChangeVolumeType("2");
                    }}
                  />
                ),
                volumeTypes: "NVMe based High IOPS Storage",
                minIops: "1000",
                maxIops: "16000",
                maxThroughput: "400.00 MB/s",
                maxSize: "16TB",
              },
            ]}
            // className="h-auto !min-h-0"
          />
          <div className="py-6 px-1.5">
            <InputField
              type="number"
              label="Volume Size (GB)"
              required
              placeholder="Enter volume size"
              value={String(volumeSize)}
              onChange={(e) => {
                handleVolumeSize(e.target.value);
              }}
              labelClassName="font-bold"
              inputClassName="py-1.5 px-3 placeholder:title-small"
              className="w-[40%] mb-6"
            />
            <div className="flex justify-between gap-3">
              <div className="w-[40%]">
                <span className="relative">
                  Volume Source
                  <span className="absolute -top-1 -right-1.5">*</span>
                </span>
                <SelectOptions
                  selectedValue={volumeSource}
                  onChange={handleChangeVolumeSource}
                  defaultValue="Select Volume"
                  options={volumeSourceOptions}
                  value={volumeSource}
                />
              </div>
              <div className="w-[40%]">
                <span className="relative">
                  Select Volume Source
                  <span className="absolute -top-1 -right-1.5">*</span>
                </span>
                <SelectOptions
                  selectedValue={volumeSourceChild}
                  onChange={handleChangeVolumeSourceChild}
                  defaultValue="Select a source"
                  options={selectVolumeSourceOptions}
                  disableSelect={!selectVolumeSourceOptions?.length}
                  value={volumeSource}
                />
              </div>
            </div>
          </div>
          <Checkbox
            checked={isBootable}
            label="Bootable"
            onChange={() => {
              setIsBootable((prev) => !prev);
            }}
            labelGap={2}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CreateVolume;
