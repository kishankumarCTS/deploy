"use client";

import { useState } from "react";
import { Modal, FooterButton } from "@/components/ui/Modal";
import CreateBucketStep1 from "../Step1";
import CreateBucketStep2 from "../Step2";
import CreateBucketStep3 from "../Step3";

function BucketStepper({
  isOpen,
  onClose,
  regions,
  existingBuckets,
}: {
  isOpen: boolean;
  onClose: () => void;
  regions: any[];
  existingBuckets: any[];
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bucketData, setBucketData] = useState<any>({});

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCloseModal = () => {
    onClose();
    setCurrentStep(1);
    setBucketData({});
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const renderStepsHeader = () => {
    const steps = [
      { id: 1, label: "Create Bucket" },
      { id: 2, label: "Configure Options" },
      { id: 3, label: "Summary" },
    ];

    return (
      <div className="mb-8 px-5">
        <div className="flex justify-between items-center max-w-[600px] mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 flex items-center">
              <button
                type="button"
                onClick={() => handleStepClick(step.id)}
                className="flex flex-col items-center cursor-pointer"
              >
                <div
                  className={`w-10 h-10 flex justify-center items-center rounded-full text-white font-bold ${
                    currentStep === step.id
                      ? "bg-blue-600"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep === step.id ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {step.label}
                </span>
              </button>

              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mt-5 ${
                    currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderForms = () => {
    if (currentStep === 1)
      return (
        <CreateBucketStep1
          bucketData={bucketData}
          setBucketData={setBucketData}
          regions={regions}
          existingBuckets={existingBuckets}
          onClose={handleCloseModal}
          handleSubmit={handleNext}
          // onNext={handleNext}
        />
      );
    if (currentStep === 2)
      return (
        <CreateBucketStep2
          bucketData={bucketData}
          setBucketData={setBucketData}
          onNext={handleNext}
          onBack={handleBack}
          onClose={handleCloseModal}
        />
      );
    if (currentStep === 3)
      return (
        <CreateBucketStep3
        // bucketData={bucketData}
        // onBack={handleBack}
        // onClose={handleCloseModal}
        // onSubmit={() => {
        //   console.log("Submitted bucketData:", bucketData);
        //   handleCloseModal();
        // }}
        />
      );
  };

  const getFooterButtons = (): FooterButton[] => {
    if (currentStep === 1)
      return [
        { variant: "secondary", children: "Close", onClick: handleCloseModal },
        { variant: "primary", children: "Next", onClick: handleNext },
      ];
    if (currentStep === 2)
      return [
        { variant: "secondary", children: "Close", onClick: handleCloseModal },
        { variant: "secondary", children: "Back", onClick: handleBack },
        { variant: "primary", children: "Next", onClick: handleNext },
      ];
    return [
      { variant: "secondary", children: "Close", onClick: handleCloseModal },
      { variant: "secondary", children: "Back", onClick: handleBack },
      {
        variant: "primary",
        children: "Submit",
        onClick: () => {
          console.log("Submitted bucketData:", bucketData);
          handleCloseModal();
        },
      },
    ];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      // variant="fullscreen"
      className="min-w-[900px] min-h-[600px] flex flex-col"
      footerButtons={getFooterButtons()}
    >
      {renderStepsHeader()}
      {renderForms()}
    </Modal>
  );
}

export default BucketStepper;
