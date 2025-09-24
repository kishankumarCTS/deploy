"use client";

import { FC, useId } from "react";

type InputFieldProps = {
  label?: string;
  labelBgColor?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const InputField: FC<InputFieldProps> = ({
  label,
  labelBgColor = "#ffffff",
  placeholder,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  disabled,
  className,
}) => {
  const id = useId();
  return (
    // TODO: change hardcoded color in label and input
    <div className="w-full">
      <div className={`relative ${className}`}>
        <label
          className={`absolute -top-[8px] left-4 label-medium font-medium leading-4 tracking-normal  px-1 text-[#0F172A] ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          htmlFor={id}
          style={{ backgroundColor: labelBgColor }}
        >
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-md p-4 body-medium leading- tracking-normal text-[#0F172A] placeholder-[#94A3B8] outline-none disabled:cursor-not-allowed ${
            !!error && "border-red-500"
          }`}
          id={id}
          value={value}
          name={name}
          onChange={(e) => {
            onChange?.(e);
          }}
          disabled={disabled}
        />
        {!!error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
