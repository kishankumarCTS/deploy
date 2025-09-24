import { Button } from "@/components/ui/Button";
import React from "react";
import ProductGroup from "./ProductGroup";
import { marketImagesData } from "./constants";
import FilterSidebar from "./FilterSidebar";

const MarketPlaceModal = ({ closeModal }: { closeModal?: () => void }) => {
  return (
    <div className="relative">
      <div className="flex gap-11">
        <div className="w-[336px] border-r-[1px] border-r-themeBlack-60 p-4 fixed left-9 top-[74px] bottom-[106px]">
          <FilterSidebar data={null} />
        </div>
        <div className="flex-1 flex flex-col gap-8 pb-[126px] pt-[74px] ml-[336px]">
          {marketImagesData.map((item) => (
            <ProductGroup data={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center gap-3 fixed bottom-0 left-0 right-0 px-[94px] py-8 shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-themeWhite-900">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button>Select</Button>
      </div>
    </div>
  );
};

export default MarketPlaceModal;
