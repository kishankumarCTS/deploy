"use client";

import React, { useEffect, useState } from "react";
import LoadBalancerCard from "./LoadBalancerCard";
import {
  initialLoadBalancerData,
  loadBalancerCardsData,
  steps,
} from "./constants";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import StepProgress from "@/components/ui/StepProgress";
import ApplicationLoadBalancerSteps from "./ApplicationLoadBalancerSteps";
import { LoadBalancerTypes } from "./types";
import { getLoadBalancerPayload } from "./utils";

interface LoadBalancerProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadBalancer: React.FC<LoadBalancerProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loadBalancerData, setLoadBalancerData] = useState<LoadBalancerTypes>(
    initialLoadBalancerData
  );
  const [stepsData, setStepsData] = useState(steps);

  const handleNextStep = () => {
    if (currentStep === 6) {
      const payload = getLoadBalancerPayload(loadBalancerData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const onClickCancel = () => {
    setLoadBalancerData(initialLoadBalancerData);
    onClose();
  };

  return (
    <div>
      <Modal
        variant="fullscreen"
        onClose={onClose}
        isOpen={isOpen}
        // TODO: can be changed later with theme color
        className="bg-[#E2E8EF] py-10 px-[80]"
      >
        <StepProgress steps={stepsData} currentStep={currentStep} />
        {currentStep === 1 && (
          <div className="flex justify-center w-full mt-[100px]">
            <div className="flex gap-4">
              {loadBalancerCardsData.map((item) => (
                <LoadBalancerCard
                  {...item}
                  key={item.id}
                  setLoadBalancerData={setLoadBalancerData}
                  type={item.type}
                  setCurrentStep={setCurrentStep}
                  onClickCancel={onClickCancel}
                />
              ))}
            </div>
          </div>
        )}
        {currentStep > 1 && (
          <div className="mt-[100px] bg-themeWhite-900 p-6 rounded-xl">
            {currentStep > 1 && (
              <ApplicationLoadBalancerSteps
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                setLoadBalancerData={setLoadBalancerData}
                loadBalancerData={loadBalancerData}
              />
            )}
            {/* {currentStep > 1 &&
              loadBalancerData?.loadBalancerType === "networkLoadBalancer" && (
                <NetworkLoadBalancerSteps />
              )} */}
            {currentStep !== 1 && (
              <div className="flex items-center justify-end gap-3 mt-10">
                <Button
                  variant="secondary"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  isDisabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button onClick={handleNextStep}>
                  {currentStep === 6 ? "Submit" : "Next"}
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LoadBalancer;
