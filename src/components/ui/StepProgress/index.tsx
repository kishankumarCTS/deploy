import clsx from "clsx";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";

export interface Step {
  title: string;
  dateTime?: string;
  icon: any;
  status: "completed" | "current" | "upcoming";
  id: number;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

export default function StepProgress({
  steps,
  currentStep,
}: StepProgressProps) {
  return (
    <div className="flex items-center justify-between m-w-full mx-auto px-10">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={step.id}
            className={`flex relative items-center cursor-pointer ${
              steps.length - 1 > index ? "flex-1" : ""
            }`}
          >
            <div
              className={`z-10 w-12 aspect-square flex items-center justify-center rounded-full border-2 relative ${
                step.status === "completed"
                  ? "border-blue-500 bg-themeBlue-500 text-themeWhite-900"
                  : step.id === currentStep
                  ? "bg-white border-themeBlue-500 text-blue-500"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              <Icon />
              <div
                className={clsx(
                  "absolute left-[50%] top-full w-max -translate-x-1/2 mt-3 text-center",
                  step.status === "completed" && "text-themeBlue-500",
                  step.id === currentStep && "text-themeBlue-500"
                )}
              >
                Step {index + 1} <br /> {step.title}
              </div>
            </div>
            {steps.length - 1 > index && (
              <div
                className={clsx(
                  "w-full h-0 border-t-2 mx-2",
                  step.status === "completed" && "border-t-themeBlue-500",
                  (step.id === currentStep || step.status === "upcoming") &&
                    "border-t-themeBlack-40 border-dashed"
                )}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
