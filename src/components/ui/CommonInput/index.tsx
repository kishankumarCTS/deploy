"use client";

import { cn } from "@/lib/utils";
import { FC, useId } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

type InputFieldProps = {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  labelInputGap?: number;
  labelClassName?: string;
  inputClassName?: string;
  className?: string;
  labelInputClass?: string;
  checked?: boolean;
  info?: string;
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
  labelInputClass,
  checked,
  info,
}) => {
  const id = useId();

  return (
    // TODO: change hardcoded color in label and input
    <div className={className}>
      <div
        className={cn(
          `w-full flex flex-col gap-${labelInputGap}`,
          labelInputClass
        )}
      >
        <label
          className={cn(
            `relative h-[20px] label-large  px-1 text-sm text-black w-max ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`,
            labelClassName
          )}
          htmlFor={id}
        >
          {label}
          {required && <span className="-top-[2px] -right-[1px] ml-1">*</span>}
          {info && (
            <div className="group relative inline-block text-red-500 ml-1">
              <IoMdInformationCircleOutline className="cursor-pointer" />
              <div className="absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[200px] -translate-x-1/2 scale-0 transform rounded bg-gray-800 p-2 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                {info}
              </div>
            </div>
          )}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            `w-full p-4 title-small text-black placeholder-[#94A3B8] rounded-[8px] bg-themeWhite-900 border border-gray-300 outline-none disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield] ${
              !!error && "border-error"
            }`,
            inputClassName
          )}
          id={id}
          value={value}
          inputMode={type === "number" ? "numeric" : undefined}
          name={name}
          onChange={(e) => {
            onChange?.(e);
          }}
          disabled={disabled}
          checked={checked}
        />
        {!!error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
