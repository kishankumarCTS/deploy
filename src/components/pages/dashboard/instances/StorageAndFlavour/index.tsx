import React from "react";
import StorageAndFlavourCta from "./StorageAndFlavourCta";
import FlavourFamilyCard from "../FlavourFamilyCard";

const StorageAndFlavour = () => {
  return (
    <div className="px-6 py-7 bg-themeWhite-900 rounded-[30px] mt-7">
      <h3 className="headline-small">Storage and Flavour</h3>
      <h3 className="headline-small mt-3">
        How do you want to select source of storage for this instance?
      </h3>
      <StorageAndFlavourCta />
    </div>
  );
};

export default StorageAndFlavour;
