"use client";

import React, { useState } from "react";
import IconAndLabel from "../IconAndLabel";
import KeyPairCheck from "./KeyPairCheck";
import { Button } from "@/components/ui/Button";
import KeyPairPage from "@/app/keypair/page";
import SelectKeyPair, { KeyPair } from "./SelectKeyPair";

const KeyPairs = () => {
  const [keyPairType, setKeyPairType] = useState("");
  const [selectedKeyPair, setSelectedKeyPair] = useState<KeyPair | null>(null);
  const [showKeyPairSelect, setShowKeyPairSelect] = useState(false);
  const [createdKey, setCreatedKey] = useState<KeyPair | null>(null);

  const handleKeyPairType = (type: string) => {
    setKeyPairType(type);
    if (type === "existing") {
      setShowKeyPairSelect(true);
    }
  };

  const handleSelectKeyPairs = (keyPair: KeyPair) => {
    setShowKeyPairSelect(false);
    setSelectedKeyPair(keyPair);
  };

  const closeSelectKeyPair = () => {
    setShowKeyPairSelect(false);
  };

  return (
    <div className="bg-themeWhite-900 p-6 rounded-[20px]">
      <div className="headline-small">Key Pairs</div>
      <div className="p-3">
        <div className="p-4 title-large">
          How do you want to create key pair?
        </div>
        <div className="flex gap-3 items-start w-full">
          <div className="w-full">
            <IconAndLabel
              label="Create new key pair"
              isActive={keyPairType === "new"}
              onClick={() => handleKeyPairType("new")}
            />
            {keyPairType === "new" && createdKey && (
              <KeyPairCheck keyPair={createdKey} />
            )}
          </div>
          <div className="w-full">
            <IconAndLabel
              label="Select from existing"
              isActive={keyPairType === "existing"}
              onClick={() => handleKeyPairType("existing")}
            />
            {keyPairType === "existing" && selectedKeyPair && (
              <KeyPairCheck keyPair={selectedKeyPair} />
            )}
            {keyPairType === "existing" && showKeyPairSelect && (
              <SelectKeyPair
                onCancel={closeSelectKeyPair}
                onSave={handleSelectKeyPairs}
              />
            )}
          </div>
        </div>
      </div>
      {keyPairType === "new" && <KeyPairPage setCreatedKey={setCreatedKey} />}
    </div>
  );
};

export default KeyPairs;
