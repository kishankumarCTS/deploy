import React, { useEffect, useRef, useState } from "react";

type OTPInputProps = {
  length?: number;
  onComplete: (otp: string) => void;
  onResend?: () => void;
  isLoading?: boolean;
  resendTimer?: number;
  className?: string;
  handleSetOtp?: (value: string) => void;
};

const DEFAULT_LENGTH = 4;

const OTPInput: React.FC<OTPInputProps> = ({
  length = DEFAULT_LENGTH,
  onComplete,
  handleSetOtp,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [error, setError] = useState("");

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      handleSetOtp?.(updatedOtp.join(""));

      if (value && index < length - 1) {
        focusInput(index + 1);
      }

      const isComplete = updatedOtp.every((digit) => digit !== "");
      if (isComplete) {
        setError("");
        onComplete(updatedOtp.join(""));
      } else {
        setError("Please enter all digits.");
      }
    }
  };

  const handlePaste = async (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    let pasteData = "";

    try {
      pasteData = e.clipboardData.getData("text");
      const numericData = pasteData.replace(/\D/g, "");
      const updatedOtp = [...otp];

      for (let i = 0; i < numericData.length && index + i < length; i++) {
        updatedOtp[index + i] = numericData[i];
      }

      setOtp(updatedOtp);
      handleSetOtp?.(updatedOtp.join(""));

      const nextFocusIndex = Math.min(index + numericData.length, length - 1);
      focusInput(nextFocusIndex);

      if (updatedOtp.every((digit) => digit !== "")) {
        setError("");
        onComplete(updatedOtp.join(""));
      }
    } catch (err) {
      console.error("Paste failed", err);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { key } = e;

    if (key === "Backspace") {
      e.preventDefault();
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
      handleSetOtp?.(updatedOtp.join(""));
      if (index > 0) focusInput(index - 1);
    } else if (/^[0-9]$/.test(key)) {
      handleChange(key, index);
      e.preventDefault();
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) focusInput(index - 1);
    } else if (key === "ArrowRight") {
      e.preventDefault();
      if (index < length - 1) focusInput(index + 1);
    } else if (key === "Enter") {
      if (otp.every((digit) => digit !== "")) {
        onComplete(otp.join(""));
      }
    } else if (!["Tab", "v", "V"].includes(key) && !e.ctrlKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <div className="flex gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            className="w-[64px] h-12 text-center border border-themeGray-400 rounded-md text-xl outline-none focus:ring-2 ring-blue-400"
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default OTPInput;
