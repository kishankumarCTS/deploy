"use client";

import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import { Button } from "@/components/ui/Button";

function CreateBucketStep3() {
  const bucketData = {
    bucketName: "s3-bucket-new-front",
    region: "ap-south-mum-1",
    config: {
      versioning: false,
      objectLock: false,
      blockPublicAccess: true,
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-[24px] leading-[25px] mb-8">Review & Create</h2>

      <div className="border rounded-md p-6 max-w-3xl mx-auto bg-white">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <TabKeyPair label="Bucket Name" value={bucketData.bucketName} />
          <TabKeyPair label="Bucket Region" value={bucketData.region} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <TabKeyPair
            label="Versioning"
            value={bucketData.config.versioning ? "Enabled" : "Disabled"}
          />
          <TabKeyPair
            label="Object Locking"
            value={bucketData.config.objectLock ? "Enabled" : "Disabled"}
          />
          <TabKeyPair
            label="Public Access"
            value={bucketData.config.blockPublicAccess ? "Disabled" : "Enabled"}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateBucketStep3;
