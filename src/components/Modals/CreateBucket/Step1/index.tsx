"use client";
import { ChangeEvent } from "react";
import InputField from "@/components/ui/CommonInput";
import SelectOptions from "@/components/ui/SelectOptions";
import { Button } from "@/components/ui/Button";

type Option = {
  id: number;
  label: string;
  value?: string;
  disabled?: boolean;
};

function CreateBucketStep1({
  setBucketData,
  bucketData,
  regions,
  existingBuckets,
  onClose,
  handleSubmit,
}: {
  setBucketData: React.Dispatch<React.SetStateAction<any>>;
  bucketData: any;
  regions: Option[];
  existingBuckets: Option[];
  onClose: () => void;
  handleSubmit: () => void;
}) {
  const handleInputChange = (key: string, value: string) => {
    setBucketData((prevData: any) => ({
      ...prevData,
      step1: {
        ...prevData?.step1,
        [key]: value,
      },
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-[24px] leading-[25px] mb-6">Create Bucket</h2>
      <div className="w-full flex flex-wrap gap-6">
        <InputField
          label="Name"
          required
          placeholder="s3-bucket-new-front"
          className="w-[calc(50%-12px)]"
          labelInputGap={4}
          inputClassName="mb-4"
          value={bucketData?.step1?.bucketName || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("bucketName", e.target.value)
          }
        />

       <div className="flex flex-col w-[calc(50%-12px)] mb-4">
          <span className="mb-2 font-medium text-gray-700">Bucket Region</span>
          <SelectOptions
            options={regions}
            value={bucketData?.step1?.region || ""}
            onChange={(val) => handleInputChange("region", val)}
            defaultValue={regions?.[0]?.label || ""}
          />
        </div>

        <div className="flex flex-col w-[calc(50%-12px)] mb-4">
          <span className="mb-2 font-medium text-gray-700">Copy From Existing Bucket</span>
          <SelectOptions
            options={existingBuckets}
            value={bucketData?.step1?.copyFrom || ""}
            onChange={(val) => handleInputChange("copyFrom", val)}
            defaultValue="Select Bucket"
          />
        </div>
      </div>

     
    </div>
  );
}

export default CreateBucketStep1;
