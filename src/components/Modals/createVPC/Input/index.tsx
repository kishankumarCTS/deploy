"use client";

import { FC, useId } from "react";

type InputFieldProps = {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  labelInputGap?: number;
  labelClassName?: string;
  inputClassName?: string;
  className?: string;
};

const InputField: FC<InputFieldProps> = ({
  label,
  placeholder,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  disabled,
  labelInputGap = 2,
  labelClassName,
  inputClassName,
  className,
}) => {
  const id = useId();
  return (
    // TODO: change hardcoded color in label and input
    <div className={className}>
      <div className={`w-full flex flex-col gap-${labelInputGap}`}>
        <label
          className={`relative w-fit h-[20px] label-large  px-1 text-sm text-black ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } ${labelClassName}`}
          htmlFor={id}
        >
          {label}
          {required && (
            <span className="absolute -top-[2px] -right-[1px]">*</span>
          )}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full p-4 title-small text-black placeholder-[#94A3B8] rounded-[8px] bg-themeWhite-900 border border-gray-300 outline-none disabled:cursor-not-allowed ${
            !!error && "border-error"
          } ${inputClassName}`}
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
