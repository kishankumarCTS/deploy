import React, { Dispatch, SetStateAction } from "react";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { LoadBalancerTypes } from "../types";

const ApplicationLoadBalancerSteps = ({
  currentStep,
  setCurrentStep,
  setLoadBalancerData,
  loadBalancerData,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setLoadBalancerData: Dispatch<SetStateAction<LoadBalancerTypes>>;
  loadBalancerData: LoadBalancerTypes;
}) => {
  return (
    <div>
      {currentStep === 2 && (
        <Step2
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          setLoadBalancerData={setLoadBalancerData}
          loadBalancerData={loadBalancerData}
        />
      )}
      {currentStep === 3 && (
        <Step3
          setLoadBalancerData={setLoadBalancerData}
          loadBalancerData={loadBalancerData}
        />
      )}
      {currentStep === 4 && (
        <Step4
          setLoadBalancerData={setLoadBalancerData}
          loadBalancerData={loadBalancerData}
        />
      )}
      {currentStep === 5 && (
        <Step5
          setLoadBalancerData={setLoadBalancerData}
          loadBalancerData={loadBalancerData}
        />
      )}
      {currentStep === 6 && <Step6 loadBalancerData={loadBalancerData} />}
    </div>
  );
};

export default ApplicationLoadBalancerSteps;
