"use client";
import { useState, useEffect } from "react";
import { Modal, FooterButton } from "@/components/ui/Modal";
import { FaRegCheckCircle } from "react-icons/fa";
import ListenerStep1 from "../Step1";
import ListenerStep2 from "../Step2";
import ListenerStep3 from "../Step3";
import ListenerStep4 from "../Step4";

const STEPS = [
  { id: 1, title: "Add Listener" },
  { id: 2, title: "Add Pool & Health Monitor" },
  { id: 3, title: "Add Backend Server" },
  { id: 4, title: "Review & Create" },
];

interface ListenerStepperProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

function ListenerStepper({ isOpen, onClose, onSuccess }: ListenerStepperProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleSubmit = async () => {
    try {
      console.log("Final submit with data...");
     
      onSuccess?.();
      
      onClose();
      setCurrentStep(1);
    } catch (error) {
      console.error("Error creating listener:", error);
    }
  };

  const handleClose = () => {
    onClose();
    setCurrentStep(1); 
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  const getFooterButtons = (step: number): FooterButton[] => {
    if (step === 1) {
      return [
        { variant: "secondary", children: "Close", onClick: handleClose },
        { variant: "primary", children: "Next", onClick: handleNext },
      ];
    }
    return [
      { variant: "secondary", children: "Close", onClick: handleClose },
      { variant: "secondary", children: "Back", onClick: handleBack },
      {
        variant: "primary",
        children: currentStep === 4 ? "Submit" : "Next",
        onClick: currentStep === 4 ? handleSubmit : handleNext,
      },
    ];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <ListenerStep1 />;
      case 2: return <ListenerStep2 />;
      case 3: return <ListenerStep3 />;
      case 4: return <ListenerStep4 />;
      default: return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      variant="fullscreen"
      footerButtons={getFooterButtons(currentStep)}
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
        {STEPS.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isClickable = step.id <= currentStep;
          
          return (
            <div
              key={step.id}
              className="flex-1 flex flex-col items-center relative"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${isActive ? "border-blue-600 bg-blue-50 text-blue-600" : ""}
                  ${isCompleted ? "border-green-600 bg-green-50 text-green-600" : ""}
                  ${!isActive && !isCompleted ? "border-gray-300 text-gray-400" : ""}
                  ${isClickable ? "cursor-pointer hover:border-blue-400" : "cursor-default"}`}
                onClick={() => handleStepClick(step.id)}
              >
                {isCompleted ? (
                  <FaRegCheckCircle className="text-green-600" size={20} />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm text-center transition-colors
                  ${isActive ? "text-blue-600 font-medium" : "text-gray-500"}`}
              >
                {step.title}
              </span>
              {idx < STEPS.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-[2px] 
                    ${isCompleted ? "bg-green-600" : "bg-gray-300"}`}
                />
              )}
            </div>
          );
        })}
      </div>
      {renderStep()}
    </Modal>
  );
}

export default ListenerStepper;