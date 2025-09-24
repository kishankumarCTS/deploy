"use client";

import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

import InputField from "@/components/ui/FloatingInput";
import StepIndicator from "@/StepIndicator";

import { stepIndicators } from "./constants";
import BootSourceTabs from "@/components/pages/dashboard/instances/BootSourceTabs";
import StorageAndFlavour from "@/components/pages/dashboard/instances/StorageAndFlavour";
import NetworkAndSecurityGroup from "@/components/pages/dashboard/instances/NetworkAndSecurityGroup";
import ReviewAndCreate from "@/components/pages/dashboard/instances/ReviewAndCreate";
import { getStepIndicators } from "./utils";
import { Button } from "@/components/ui/Button";
import ButtonGroup from "@/components/pages/dashboard/instances/ButtonGroup";

const Instance = () => {
  const [step, setStep] = useState(1);
  const steps = getStepIndicators(step);

  const [instanceName, setInstanceName] = useState("");

  const handleStepClick = (index: number) => {
    const isDisabled = steps[index].isDisabled;
    if (!isDisabled) setStep(index + 1);
  };

  const handleInstanceName = (event: any) => {
    setInstanceName(event.target.value);
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <h2 className="headline-small font-[500]">Create Instance</h2>
      <div className="flex flex-col gap-[18px] mt-4">
        {steps.map((stepItem, index) => (
          <StepIndicator
            key={index}
            {...stepItem}
            onClick={() => handleStepClick(index)}
          />
        ))}
      </div>
      {step === 1 && (
        <>
          <div className="p-6 rounded-[30px] border-[3px] border-themeBlue-500 bg-themeWhite-900 mt-7 relative">
            <h3 className="headline-small">Give Instance a Name</h3>
            <InputField
              className="max-w-[544px] mt-4 placeholder:font-regular"
              placeholder="Instance name..."
              onChange={handleInstanceName}
              value={instanceName}
            />
            {instanceName && (
              <div className="text-themeBlue-900 flex items-center justify-center w-8 aspect-square rounded-full bg-success absolute top-6 right-6">
                <FaCheck />
              </div>
            )}
          </div>
          <div className="p-6 rounded-[30px] border-[3px] border-themeBlue-500 bg-themeWhite-900 mt-7">
            <h3 className="headline-small">Source</h3>
            <h3 className="headline-small">Boot Securely From</h3>
            <BootSourceTabs />
          </div>
          <StorageAndFlavour />
        </>
      )}
      {step === 2 && <NetworkAndSecurityGroup />}
      {step === 3 && <ReviewAndCreate />}
      <div className="mt-6">
        <ButtonGroup step={step} onClickNext={goNext} onClickPrev={goBack} />
      </div>
    </div>
  );
};

export default Instance;
