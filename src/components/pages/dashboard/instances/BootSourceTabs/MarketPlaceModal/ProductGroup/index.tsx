import React from "react";
import { MarketImagesData } from "./types";
import OperatingSystemCard from "../../../OperatingSystemCard";

const ProductGroup = ({ data }: { data: MarketImagesData }) => {
  return (
    <div>
      <div className="flex items-center justify-between text-[18px]">
        <div>Operating Systems</div>
        <div className="cursor-pointer">{`View all (${data.total_results})`}</div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-[18px]">
        {data.products.slice(0, 4).map((item) => (
          <OperatingSystemCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductGroup;
