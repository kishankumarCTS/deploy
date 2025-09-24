export const getStepIndicators = (currentStep: number) => [
  {
    title: "Part 1 - Select Operating System, flavour, and Storage",
    isCompleted: currentStep > 1,
    isActive: currentStep === 1,
    isDisabled: false,
  },
  {
    title: "Part 2 - Configure Network and Security Groups",
    isCompleted: currentStep > 2,
    isActive: currentStep === 2,
    isDisabled: currentStep < 2,
  },
  {
    title: "Part 3 - Review and Create Instance",
    isCompleted: false,
    isActive: currentStep === 3,
    isDisabled: currentStep < 3,
  },
];
