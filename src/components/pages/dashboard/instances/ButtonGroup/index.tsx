"use client";

import { Button } from "@/components/ui/Button";
import React from "react";

const ButtonGroup = ({
  step,
  onClickNext,
  onClickPrev,
}: {
  step: number;
  onClickNext: () => void;
  onClickPrev: () => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={onClickPrev} disabled={step === 1}>
          Previous
        </Button>
        <Button variant="primary" onClick={onClickNext}>
          {step !== 3
            ? `Go to Part ${step + 1}`
            : `Confirm and Create Instance`}
        </Button>
      </div>
      {step === 3 && <Button variant="secondary">Cancel</Button>}
    </div>
  );
};

export default ButtonGroup;
