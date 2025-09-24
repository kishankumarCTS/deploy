import React from "react";
import InstanceCounter from "./InsranceCounter";

const ReviewAndCreate = () => {
  return (
    <div>
      <div className="p-3 pb-10 bg-themeWhite-900 rounded-[30px] mt-7">
        <div className="title-large p-5">Summary</div>
        <div className="px-8 pt-8 pb-6 border-2 border-themeBlue-200 rounded-xl">
          <div className="title-large mb-6">General Details</div>
          <div className="grid grid-cols-2">
            <div>
              <div className="text-[18px] font-500 ">Current Region</div>
              <div className="title-large">
                Asia Pacific (Noida) ap-south-noi-1
              </div>
            </div>
            <div>
              <div className="text-[18px] font-500 ">Project ID</div>
              <div className="title-large">27328171928mdasl</div>
            </div>
          </div>
        </div>

        <div className="px-8 pt-8 pb-6 border-2 border-themeBlue-200 rounded-xl mt-6">
          <div className="title-large mb-6">Summary of Part 1</div>
          <div className="mb-6">
            <div className="text-[18px] font-500">Instance Name</div>
            <div className="title-large">Test</div>
          </div>
          <div className="mb-6">
            <div className="text-[18px] font-500 ">Source Type</div>
            <div className="title-large">Image</div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <div className="text-[18px] font-500 ">
                Selected Operating System
              </div>
              <div className="title-large">Ubantu-22-04-LTS</div>
            </div>
            <div>
              <div className="text-[18px] font-500 ">Volume Size</div>
              <div className="title-large">20GB</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <div className="text-[18px] font-500 ">Flavor Name</div>
              <div className="title-large">S.2</div>
            </div>
            <div>
              <div className="text-[18px] font-500 ">Flavor Family</div>
              <div className="title-large">Non-GPU</div>
            </div>
          </div>
        </div>

        <div className="px-8 pt-8 pb-6 border-2 border-themeBlue-200 rounded-xl mt-6">
          <div className="title-large mb-6">Summary of Part 2</div>
          <div className="grid grid-cols-2 mb-6">
            <div>
              <div className="text-[18px] font-500 ">VPC</div>
              <div className="title-large">EXT-NOI</div>
            </div>
            <div>
              <div className="text-[18px] font-500 ">Security Group</div>
              <div className="title-large">Default</div>
            </div>
          </div>
          <div className="">
            <div className="text-[18px] font-500 ">Security Group</div>
            <div className="title-large">Default</div>
          </div>
        </div>

        <div className="mt-10 flex justify-between items-center">
          <InstanceCounter />
          <div className="flex items-center w-max flex-1 justify-end gap-3">
            <div className="text-[18px] font-[500]">
              Compute Instance Description
            </div>
            <textarea
              placeholder="This description will be common for all instances."
              className="p-4 w-full max-w-[544px] active:border-none resize-none border border-themeSlate-300 rounded-lg placeholder:text-themeSlate-400 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndCreate;
