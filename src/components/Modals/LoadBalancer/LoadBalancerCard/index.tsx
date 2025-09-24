"use client"; // For Next.js App Router (if you're using it)

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import CheckIconWithText from "../../../pages/dashboard/instances/OperatingSystemCard/CheckIconWithText";
import loadbalancerIcon from "@/assets/svg/loadbalancer.svg";
import cardBg from "@/assets/svg/loadbalancerbg.svg";
import { LoadBalancerCardTypes } from "./types";
import { LoadBalancerTypes } from "../types";

export default function LoadBalancerCard({
  title,
  benefits,
  onClickNext,
  onClickCancel,
  setLoadBalancerData,
  type,
  id,
  setCurrentStep,
}: LoadBalancerCardTypes) {
  const hanleNextClick = (loadBalancerType: "ALB" | "NLB") => {
    setLoadBalancerData((prev) => {
      return {
        ...prev,
        tags: [loadBalancerType],
      };
    });

    setCurrentStep(2);
  };

  return (
    <div className="bg-themeWhite-900 p-3 text-center relative rounded-2xl max-w-[352px] max-h-fit shadow-md">
      <div className="w-full">
        <Image src={cardBg} alt="Load Balancer bg" className="w-full" />
      </div>
      <div className="mt-[42px]">
        <Image
          src={loadbalancerIcon}
          alt="Load Balancer Icon"
          width={88}
          height={88}
          className="mx-auto"
        />
      </div>

      <h2 className="headline-small mt-7 mb-6">{title}</h2>

      <div className="flex flex-col gap-1 text-left">
        {benefits.map((item) => (
          <CheckIconWithText {...item} key={item.id} />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col justify-center gap-2 pt-4">
        <Button onClick={() => hanleNextClick(type)}>Next</Button>
        <Button onClick={onClickCancel} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
