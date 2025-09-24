"use client";

import React, { useState } from "react";
import OptionButton from "@/components/ui/OptionButton";
import OsTab from "./OsTab";
import SnapshotTab from "./SnapShotTab";
import VolumeTab from "./VolumeTab";
import CustomImageTab from "./CustomImageTab";
import { bootOptions } from "@/app/dashboard/instance/constants";
import { Modal } from "@/components/ui/Modal";
import MarketPlaceModal from "./MarketPlaceModal";

const BootSourceTabs = () => {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [viewMoreImagesModal, setViewMoreImagesModal] = useState(false);

  const handleSelect = (id: number) => {
    setSelectedOption(id);
  };

  const handleCloseModal = () => {
    setViewMoreImagesModal(false);
  };

  const handleOpenModal = () => {
    setViewMoreImagesModal(true);
  };
  return (
    <div>
      <div className="flex gap-3 cursor-pointer my-4">
        {bootOptions.map((option, index) => (
          <OptionButton
            key={index}
            {...option}
            isSelected={selectedOption === option.id}
            onClick={() => handleSelect(option.id)}
          />
        ))}
      </div>
      {selectedOption === 1 && <OsTab openImagesModal={handleOpenModal} />}
      {selectedOption === 2 && <SnapshotTab />}
      {selectedOption === 3 && <VolumeTab />}
      {selectedOption === 4 && <CustomImageTab />}
      {viewMoreImagesModal && (
        <Modal
          isOpen={viewMoreImagesModal}
          onClose={handleCloseModal}
          variant="fullscreen"
        >
          <div className="w-full h-full px-[70px]">
            <MarketPlaceModal closeModal={handleCloseModal} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BootSourceTabs;
