"use client";
import { useState } from "react";

import Step1 from "@/components/Modals/createVPC/Step1";
import Step2 from "@/components/Modals/createVPC/Step2";
import Step3 from "@/components/Modals/createVPC/Step3";
import { Button } from "@/components/ui/Button";
import { FooterButton, Modal } from "@/components/ui/Modal";

function Stepper({ setVpcData, vpcData, setCreatedVPC, createdVpc }: any) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleNext = async () => {
    const isValid = true;
    if (!isValid) {
      return;
    }
    setCurrentStep((prev) => {
      if (prev < 3) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleBack = () => {
    setCurrentStep((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    setCreatedVPC({
      name: vpcData?.step1?.vpcName,
      value: `${vpcData?.step1?.gatewayIp}, ${vpcData?.step1?.subnet}, ${vpcData?.step1?.subnetName}`,
      vpcId: "-",
    });
    setIsOpen(false);
  };

  function renderStepsHeading() {
    return (
      <div className="mb-11">
        <div className="max-w-[623px] flex justify-between items-center gap-1.5 mx-auto px-5">
          <button
            type="button"
            className={`cursor-pointer ${
              currentStep === 1 ? "text-themeBlue-700" : ""
            }`}
            onClick={() => {
              handleStepsClick(1);
            }}
          >
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-4xl ${
                currentStep === 1
                  ? "border-[#4361EE] border-2"
                  : "drop-shadow-[0_2px_4px_rgba(4,20,124,0.15)]"
              } bg-themeWhite-900 overflow-hidden`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                className="w-5.5 h-5.5"
              >
                <path
                  d="M5.891 14.7402H12.391C13.0205 14.7402 13.5528 14.5185 13.988 14.075C14.4233 13.6313 14.641 13.0948 14.641 12.4655C14.641 11.836 14.4166 11.3036 13.9678 10.8683C13.5191 10.4331 12.9768 10.2155 12.341 10.2155H12.2063V10.1578C12.1243 9.32058 11.7663 8.62508 11.1323 8.07125C10.4983 7.51742 9.75117 7.2405 8.891 7.2405C8.259 7.2405 7.67884 7.411 7.1505 7.752C6.62234 8.093 6.22617 8.54942 5.962 9.12125L5.89475 9.25575L5.7505 9.2655C5.01467 9.29883 4.39575 9.57733 3.89375 10.101C3.39192 10.6247 3.141 11.2545 3.141 11.9905C3.141 12.7532 3.40859 13.4022 3.94375 13.9375C4.47909 14.4727 5.12817 14.7402 5.891 14.7402ZM5.891 13.2405C5.5435 13.2405 5.24825 13.119 5.00525 12.876C4.76242 12.633 4.641 12.3378 4.641 11.9905C4.641 11.643 4.76242 11.3478 5.00525 11.1048C5.24825 10.8618 5.5435 10.7402 5.891 10.7402H6.9005V10.5865C6.939 10.0647 7.14992 9.6265 7.53325 9.272C7.91659 8.9175 8.36917 8.74025 8.891 8.74025C9.44483 8.74025 9.91659 8.93517 10.3063 9.325C10.6961 9.71467 10.891 10.1865 10.891 10.7405V11.7402H12.391C12.5948 11.7402 12.7708 11.8143 12.9188 11.9625C13.0669 12.1105 13.141 12.2865 13.141 12.4905C13.141 12.6943 13.0669 12.8703 12.9188 13.0183C12.7708 13.1664 12.5948 13.2405 12.391 13.2405H5.891ZM6.19875 21.5V20H7.66025V17.596H2.141C1.63584 17.596 1.20825 17.4211 0.858252 17.0712C0.508252 16.7212 0.333252 16.2937 0.333252 15.7885V6.19225C0.333252 5.68725 0.508252 5.25975 0.858252 4.90975C1.20825 4.55975 1.63584 4.38475 2.141 4.38475H15.641C16.146 4.38475 16.5735 4.55975 16.9235 4.90975C17.2735 5.25975 17.4485 5.68725 17.4485 6.19225V15.7885C17.4485 16.2937 17.2735 16.7212 16.9235 17.0712C16.5735 17.4211 16.146 17.596 15.641 17.596H10.1218V20H11.5833V21.5H6.19875ZM19.8333 12.7213V2.30775C19.8333 2.21792 19.8044 2.14417 19.7468 2.0865C19.6891 2.02883 19.6153 2 19.5255 2H4.23725V0.5H19.5255C20.0307 0.5 20.4583 0.675 20.8083 1.025C21.1583 1.375 21.3333 1.80258 21.3333 2.30775V12.7213H19.8333ZM2.141 16.1058H15.641C15.7307 16.1058 15.8043 16.0769 15.862 16.0193C15.9198 15.9616 15.9488 15.8878 15.9488 15.798V6.18275C15.9488 6.09292 15.9198 6.01917 15.862 5.9615C15.8043 5.90383 15.7307 5.875 15.641 5.875H2.141C2.05117 5.875 1.97742 5.90383 1.91975 5.9615C1.86209 6.01917 1.83325 6.09292 1.83325 6.18275V15.798C1.83325 15.8878 1.86209 15.9616 1.91975 16.0193C1.97742 16.0769 2.05117 16.1058 2.141 16.1058Z"
                  fill={currentStep === 1 ? "#4361EE" : "#1C1B1F"}
                />
              </svg>
            </div>
          </button>
          <span className="h-0.5 flex-1 bg-[#A0A3B2]"></span>
          <button
            type="button"
            className={`cursor-pointer ${
              currentStep === 2 ? "text-themeBlue-700" : ""
            }`}
            onClick={() => {
              handleStepsClick(2);
            }}
          >
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-4xl ${
                currentStep === 2
                  ? "border-[#4361EE] border-2"
                  : "drop-shadow-[0_2px_4px_rgba(4,20,124,0.15)]"
              } bg-themeWhite-900 overflow-hidden`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="19"
                viewBox="0 0 17 19"
                fill="none"
                className="w-5.5 h-5.5"
              >
                <path
                  d="M4.00101 3.55859C3.65401 3.55859 3.35876 3.68001 3.11526 3.92284C2.87159 4.16568 2.74976 4.46051 2.74976 4.80734C2.74976 5.15434 2.87117 5.44959 3.11401 5.69309C3.35684 5.93676 3.65167 6.05859 3.99851 6.05859C4.34551 6.05859 4.64076 5.93718 4.88426 5.69434C5.12792 5.45151 5.24976 5.15659 5.24976 4.80959C5.24976 4.46276 5.12834 4.16751 4.88551 3.92384C4.64267 3.68034 4.34784 3.55859 4.00101 3.55859ZM4.00101 12.9431C3.65401 12.9431 3.35876 13.0645 3.11526 13.3073C2.87159 13.5502 2.74976 13.8451 2.74976 14.1921C2.74976 14.5389 2.87117 14.8342 3.11401 15.0778C3.35684 15.3213 3.65167 15.4431 3.99851 15.4431C4.34551 15.4431 4.64076 15.3217 4.88426 15.0788C5.12792 14.836 5.24976 14.5412 5.24976 14.1943C5.24976 13.8473 5.12834 13.5521 4.88551 13.3086C4.64267 13.0649 4.34784 12.9431 4.00101 12.9431ZM0.884506 0.808594H16.115C16.3657 0.808594 16.5758 0.893178 16.7455 1.06234C16.915 1.23134 16.9998 1.44084 16.9998 1.69084V7.86609C16.9998 8.13676 16.915 8.36151 16.7455 8.54034C16.5758 8.71918 16.3657 8.80859 16.115 8.80859H0.884506C0.633839 8.80859 0.423672 8.71918 0.254006 8.54034C0.0845058 8.36151 -0.000244141 8.13676 -0.000244141 7.86609V1.69084C-0.000244141 1.44084 0.0845058 1.23134 0.254006 1.06234C0.423672 0.893178 0.633839 0.808594 0.884506 0.808594ZM1.49976 2.30859V7.30859H15.4998V2.30859H1.49976ZM0.884506 10.1931H16.0958C16.3599 10.1931 16.5766 10.2816 16.7458 10.4586C16.9151 10.6354 16.9998 10.8547 16.9998 11.1163V17.2316C16.9998 17.5149 16.9151 17.746 16.7458 17.9248C16.5766 18.1037 16.3599 18.1931 16.0958 18.1931H0.903756C0.639589 18.1931 0.422923 18.1037 0.253756 17.9248C0.0844226 17.746 -0.000244141 17.5149 -0.000244141 17.2316V11.1163C-0.000244141 10.8547 0.0811726 10.6354 0.244006 10.4586C0.406839 10.2816 0.620339 10.1931 0.884506 10.1931ZM1.49976 11.6931V16.6931H15.4998V11.6931H1.49976Z"
                  fill={currentStep === 2 ? "#4361EE" : "#1C1B1F"}
                />
              </svg>
            </div>
          </button>
          <span className="h-0.5 flex-1 bg-[#A0A3B2]"></span>
          <button
            className={`cursor-pointer ${
              currentStep === 3 ? "text-themeBlue-700" : ""
            }`}
            onClick={() => {
              handleStepsClick(3);
            }}
          >
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-4xl ${
                currentStep === 3
                  ? "border-[#4361EE] border-2"
                  : "drop-shadow-[0_2px_4px_rgba(4,20,124,0.15)]"
              } bg-themeWhite-900 overflow-hidden`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                className="w-5.5 h-5.5"
              >
                <path
                  d="M0.416992 19.75V13.25H3.41699V9.25H8.41699V6.75H5.41699V0.25H12.917V6.75H9.91699V9.25H14.917V13.25H17.917V19.75H10.417V13.25H13.417V10.75H4.91699V13.25H7.91699V19.75H0.416992ZM6.91699 5.25H11.417V1.75H6.91699V5.25ZM1.91699 18.25H6.41699V14.75H1.91699V18.25ZM11.917 18.25H16.417V14.75H11.917V18.25Z"
                  fill={currentStep === 3 ? "#4361EE" : "#1C1B1F"}
                />
              </svg>
            </div>
          </button>
        </div>
        <div className="max-w-[623px] flex justify-between items-center gap-1.5 mt-3 mx-auto">
          <button
            type="button"
            className={`cursor-pointer ${
              currentStep === 1 ? "text-themeBlue-700" : "text-[#010814]"
            }`}
            onClick={() => {
              handleStepsClick(1);
            }}
          >
            <div className="flex flex-col title-medium font-medium">
              Create VPC
              <span className="title-small text-[#353637] font-normal">
                22 Nov, 2024 9:15
              </span>
            </div>
          </button>
          <button
            type="button"
            className={`cursor-pointer ${
              currentStep === 2 ? "text-themeBlue-700" : "text-[#010814]"
            }`}
            onClick={() => {
              handleStepsClick(2);
            }}
          >
            <div className="title-medium font-medium">
              Additional Subnet Details
            </div>
          </button>
          <button
            type="button"
            className={`cursor-pointer ${
              currentStep === 3 ? "text-themeBlue-700" : "text-[#010814]"
            }`}
            onClick={() => {
              handleStepsClick(3);
            }}
          >
            <div className="title-medium font-medium">Add Router</div>
          </button>
        </div>
      </div>
    );
  }

  const renderForms = () => {
    if (currentStep === 1)
      return <Step1 setVpcData={setVpcData} vpcData={vpcData} />;

    if (currentStep === 2) {
      return <Step2 setVpcData={setVpcData} vpcData={vpcData} />;
    }

    if (currentStep === 3)
      return <Step3 setVpcData={setVpcData} vpcData={vpcData} />;
  };

  const handleStepsClick = (number: number) => {
    if (currentStep < number) {
      handleNext();
    }

    if (currentStep > number) {
      handleBack();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentStep(1);
  };

  const getFooterButtons = (step: number): FooterButton[] => {
    if (step === 1) {
      return [
        {
          variant: "secondary",
          children: "Close",
          onClick: handleCloseModal,
        },
        {
          variant: "primary",
          children: "Next",
          onClick: () => {
            handleStepsClick(2);
          },
        },
      ];
    }

    return [
      {
        variant: "secondary",
        children: "Close",
        onClick: handleCloseModal,
      },
      {
        variant: "secondary",
        children: "Back",
        onClick: handleCloseModal,
      },
      {
        variant: "primary",
        children: currentStep === 3 ? "Submit" : "Next",
        onClick: () => {
          if (currentStep === 3) {
            handleSubmit();
          } else {
            handleStepsClick(currentStep + 1);
          }
        },
      },
    ];
  };

  return (
    <div className="">
      <div className="pl-3">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          disabled={createdVpc}
        >
          Create New VPC
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        variant="fullscreen"
        footerButtons={getFooterButtons(currentStep)}
      >
        {renderStepsHeading()}
        <form onSubmit={handleSubmit}>{renderForms()}</form>
      </Modal>
    </div>
  );
}

export default Stepper;
