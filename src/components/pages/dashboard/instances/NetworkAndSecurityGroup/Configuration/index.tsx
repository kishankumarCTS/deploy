"use client";

import React, { useRef, useState } from "react";
import IconAndLabel from "../IconAndLabel";
import ScriptTextArea from "./ScriptTextArea";
import { Button } from "@/components/ui/Button";

const Configuration = () => {
  const [addScriptType, setAddScriptType] = useState("file");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddScriptType = (type: string) => {
    setAddScriptType(type);
  };

  const handleScriptUpload = () => {
    if (fileRef.current) {
      fileRef.current?.click();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log(file.name);
  };
  return (
    <div className="bg-themeWhite-900 p-6 rounded-[20px]">
      <div className="headline-small">Configuration</div>
      <div className="p-3">
        <div className="p-4 title-large">How do you want to load a script?</div>
        <div className="flex gap-3 items-start w-full">
          <div className="w-full">
            <IconAndLabel
              label="Load script from a file"
              isActive={addScriptType === "file"}
              onClick={() => handleAddScriptType("file")}
            />
            {addScriptType === "file" && (
              <div className="mt-4 relative">
                <Button onClick={handleScriptUpload}>Upload</Button>
                <input
                  type="file"
                  name="script"
                  id="script"
                  className="hidden"
                  ref={fileRef}
                  onChange={handleFileInput}
                />
                <div className="text-[18px] text-themeBlack-70 mt-3">
                  Kindly upload .txt and .sh format files only
                </div>
              </div>
            )}
          </div>
          <IconAndLabel
            label="Enter a custom script"
            isActive={addScriptType === "script"}
            onClick={() => handleAddScriptType("script")}
          />
        </div>
      </div>
      {addScriptType === "script" && <ScriptTextArea />}
    </div>
  );
};

export default Configuration;
