"use client";

import { MultiSelectDropdown } from "@/components/Modals/createVolume/Dropdown";
import StorageInfoCard from "@/components/ui/StorageInfoCard";
import { StorageInput } from "@/components/ui/StorageInput";
import React from "react";
import { MdOutlineDns } from "react-icons/md";

export type StorageInfoCardProps = {
  title?: string;
  iops?: string;
  size?: string;
  throughput?: string;
};

const FlavourFamilyCard = ({
  isStorageCard,
  storageInfoCard,
}: {
  isStorageCard?: boolean;
  storageInfoCard?: StorageInfoCardProps;
}) => {
  return (
    <div className="flex items-center justify-between bg-blue-50 p-4 rounded-md shadow-sm text-sm">
      <div className="flex items-center gap-6 justify-between w-full">
        <input type="checkbox" className="form-checkbox h-4 w-4" />
        <div className="flex items-center gap-5 flex-[1]">
          <div className="text-[50px]">
            <MdOutlineDns />
          </div>
          <div className="grid grid-cols-7 flex-[1] gap-4">
            <div>
              <div className="text-[18px] font-[500] mb-2">Name</div>
              <div className="title-large font-regular">S.2</div>
            </div>
            <div>
              <div className="text-[18px] font-[500] mb-2">vCPUs</div>
              <div className="title-large">1</div>
            </div>
            <div>
              <div className="text-[18px] font-[500] mb-2">RAM</div>
              <div className="title-large">S.2</div>
            </div>
            <div className="col-span-2">
              <div className="text-[18px] font-[500] mb-2">
                Root Volume Storage
              </div>
              <div className="flex items-center gap-1 text-[18px]">
                <span className="mr-2">1 X</span>
                <StorageInput type="number" value={256} />
                <span className="ml-2">GB</span>
              </div>
            </div>
            <div className="col-span-2">
              {isStorageCard ? (
                <MultiSelectDropdown
                  options={[
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
                  ]}
                  selected={"1"}
                  onChange={(selected) => {}}
                  placeholder="select volume"
                  title="Search Storage Type"
                >
                  <StorageInfoCard {...storageInfoCard} />
                </MultiSelectDropdown>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavourFamilyCard;
