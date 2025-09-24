"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/Button";

function CreateBucketStep2({
  bucketData,
  setBucketData,
  onClose,
  onBack,
  onNext,
}: {
  bucketData: any;
  setBucketData: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const handleToggleChange = (key: string, value: boolean) => {
    setBucketData((prev: any) => ({
      ...prev,
      step2: {
        ...prev?.step2,
        [key]: value,
      },
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-[24px] leading-[25px] mb-6">Bucket Settings</h2>

      <div className="flex flex-col gap-10">
        <div className="flex items-start gap-4">
          <Switch
            checked={bucketData?.step2?.versioning || false}
            onCheckedChange={(val) => handleToggleChange("versioning", val)}
          />
          <div>
            <p className="text-base font-medium">Bucket Versioning</p>
            <p className="text-sm text-gray-600">
              When versioning is enabled, you can then retrieve and restore any
              previous version of an object in the bucket.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Note: Versions of objects are added to your total data storage
              costs.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 opacity-80">
          <Switch
            checked={bucketData?.step2?.objectLock || false}
            onCheckedChange={(val) => handleToggleChange("objectLock", val)}
            disabled={!bucketData?.step2?.versioning}
          />
          <div>
            <p className="text-base font-medium">Object Locking</p>
            <p className="text-sm text-gray-600">
              Enabling Object lock will allow you to prevent objects from being
              overwritten or deleted for a fixed amount of time.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Note: To enable this, bucket Versioning must be enabled.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Switch
            checked={bucketData?.step2?.blockPublicAccess ?? true}
            onCheckedChange={(val) =>
              handleToggleChange("blockPublicAccess", val)
            }
          />
          <div>
            <p className="text-base font-medium ">
              Block all public access
            </p>
            <p className="text-sm text-gray-600">
              Public access is granted to buckets and objects through access
              control lists (ACLs). To ensure that public access is blocked, turn
              on Block all public access. These settings apply only to this
              bucket.
            </p>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default CreateBucketStep2;
