"use client";

import React, { useState } from "react";
import IconAndText from "../../IconAndText";
import switchSvg from "@/assets/svg/switch.svg";
import switchStackSvg from "@/assets/svg/switchStack.svg";
import AddStorage from "@/components/Modals/createVolume/AddNewVolume";
import FlavourFamily from "./FlavourFamily";
import SelectExistingVolume, {
  VolumeInfoOptions,
} from "./SelectExistingVolume";

const StorageAndFlavourCta = () => {
  const storageOptions = [
    {
      id: "1",
      title: "NVMe based High IOPS Storage",
      subtitle: "Olivia Rhye",
      iops: "1000-16000",
      size: "1.00GB-16.0",
      throughput: "400.00MB/s",
    },
    {
      id: "2",
      title: "NVMe based High IOPS Storage",
      iops: "1000-16000",
      size: "1.00GB-16.0",
      throughput: "400.00MB/s",
    },
    {
      id: "3",
      title: "NVMe based High IOPS Storage",
      iops: "1000-16000",
      size: "1.00GB-16.0",
      throughput: "400.00MB/s",
    },
  ];

  const [showVolumeList, setShowVolumeList] = useState(false);
  const [volumeList, setVolumeList] = useState([
    {
      id: 1,
      storage: 256,
      storageInfo: {
        id: "2",
        title: "NVMe based High IOPS Storage",
        iops: "1000-16000",
        size: "1.00GB-16.0",
        throughput: "400.00MB/s",
      },
      addDelete: false,
    },
  ]);
  const [volumeType, setVolumeType] = useState("");
  const [showExistingVolumeOptions, setExistingVolumeOptions] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState<VolumeInfoOptions>();

  const handleAddNewVolume = () => {
    setVolumeType("new");
    if (showVolumeList) {
      setVolumeList([
        {
          id: 0,
          storage: 256,
          storageInfo: {
            id: "2",
            title: "NVMe based High IOPS Storage",
            iops: "1000-16000",
            size: "1.00GB-16.0",
            throughput: "400.00MB/s",
          },
          addDelete: false,
        },
      ]);
    }
    setShowVolumeList(!showVolumeList);
  };
  const handleExistingVolume = () => {
    setExistingVolumeOptions(true);
    setVolumeType("existing");
  };
  const closeExistingVolumeOptions = () => {
    setExistingVolumeOptions(false);
  };
  const addHandler = (index: number) => {
    const objectToInsert = {
      id: index + 1,
      storage: 256,
      storageInfo: {
        id: "2",
        title: "NVMe based High IOPS Storage",
        iops: "1000-16000",
        size: "1.00GB-16.0",
        throughput: "400.00MB/s",
      },
      addDelete: true,
    };
    setVolumeList((prev) => [...prev, objectToInsert]);
  };
  const handleSelectedExistingVolume = (data: any) => {
    setSelectedVolume(data);
    setExistingVolumeOptions(false);
  };

  const deleteHandler = (index: number) => {
    setVolumeList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-start gap-3 mt-4">
        <div className="flex flex-col w-full">
          <IconAndText
            title="Add a new volume"
            onClick={() => handleAddNewVolume()}
            svgIconSrc={switchSvg}
            isActive={volumeType === "new"}
          />
          {volumeType === "new" && (
            <div>
              <div className="title-large mb-4 mt-4">Cloud Storage</div>
              <div className="flex flex-col gap-2">
                {volumeList.map((item, index) => (
                  <AddStorage
                    storageOptions={storageOptions}
                    storageInfo={item.storageInfo}
                    key={item.id}
                    addDelete={item.addDelete}
                    showAddBtn={volumeList.length - 1 === index}
                    addHandler={() => addHandler(index)}
                    className="flex items-center gap-3"
                    removeHandler={() => deleteHandler(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-full">
          <IconAndText
            title="Select from existing volume"
            onClick={() => handleExistingVolume()}
            svgIconSrc={switchStackSvg}
            isActive={volumeType === "existing"}
          />
          {volumeType === "existing" && (
            <div className="flex flex-col gap-2 mt-4">
              {showExistingVolumeOptions && (
                <SelectExistingVolume
                  onCancel={closeExistingVolumeOptions}
                  onSave={(data: VolumeInfoOptions) =>
                    handleSelectedExistingVolume(data)
                  }
                />
              )}
              {selectedVolume && (
                <AddStorage
                  storageOptions={[]}
                  storageInfo={selectedVolume.storageInfo}
                  addDelete={false}
                  showAddBtn={false}
                  addHandler={() => {}}
                  className="flex items-center gap-3"
                  removeHandler={() => {}}
                  viewOnly={true}
                  storage={selectedVolume.storage}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <FlavourFamily />
    </div>
  );
};

export default StorageAndFlavourCta;
