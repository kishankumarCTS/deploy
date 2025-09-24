"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/Button";
import S3Frame from "@/assets/svg/s3frame.svg";
import FeatureCardIcon from "@/assets/svg/FeatureCards.svg";

export default function GetStarted() {
  return (
    <div className="flex items-center justify-between bg-themeWhite-900 rounded-[30px] shadow p-10">
      <div className="max-w-lg">
        <h1 className="headline-small font-[600] text-themeBlue-700 mb-4 max-w-md">
          Coud Flex S3 Storage - your secure, scalable, and seamless data
          management solution
        </h1>

        <ul className="space-y-3 body-medium text-themeSlate-600 mb-6">
          <li className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-themeBlue-100 text-themeBlue-700">
              <FaCheck size={12} />
            </span>
            Long Term Support (5 years)
          </li>
          <li className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-themeBlue-100 text-themeBlue-700">
              <FaCheck size={12} />
            </span>
            Free & open-source
          </li>
          <li className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-themeBlue-100 text-themeBlue-700">
              <FaCheck size={12} />
            </span>
            Popular for web servers, apps, and container workloads
          </li>
        </ul>

        <Button classNames="bg-red-600 text-white px-28 py-2 rounded-full">
          Get Started
        </Button>
      </div>

      <div className="relative w-[380px] h-[440px]">
        <Image src={S3Frame} alt="S3 Frame" layout="fill" objectFit="contain" />

        <div className="absolute top-14 -left-10 w-[600px]">
          <Image
            src={FeatureCardIcon}
            alt="Feature 1"
            width={360}
            height={380}
          />
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 -right-10 w-[340px]">
          <Image
            src={FeatureCardIcon}
            alt="Feature 2"
            width={360}
            height={380}
          />
        </div>

        <div className="absolute bottom-14 -left-10 w-[600px]">
          <Image
            src={FeatureCardIcon}
            alt="Feature 3"
            width={360}
            height={380}
          />
        </div>
      </div>
    </div>
  );
}
