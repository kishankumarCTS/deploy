"use client";
import React from "react";
import clsx from "clsx";

export type RadioButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  className?: string;
};

function RadioButton({
  label,
  isSelected,
  isDisabled = false,
  className,
  checked,
  ...props
}: RadioButtonProps) {
  const classes = clsx("cursor-pointer accent-blue-600", className);

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        disabled={isDisabled}
        className={classes}
        checked={checked ?? isSelected} 
        {...props} 
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}

export default RadioButton;
