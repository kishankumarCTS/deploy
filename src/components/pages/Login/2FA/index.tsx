import { Button } from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";

type Props = {
  onSubmit?: () => void;
  handleResend: () => void;
  isLoading?: boolean;
  className?: string;
};

const OTP_LENGTH = 4;

function TwoFactorAuthentication({
  onSubmit = () => {
    console.log("submit");
  },
  handleResend,
  isLoading,
  className,
}: Props) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120); // 2 minutes
  //   const [isVerified, setIsVerified] = useState(false);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (updatedOtp?.filter(Boolean)?.length < OTP_LENGTH) {
        setError("Please enter all 4 digits.");
      } else {
        setError("");
      }
    }
  };

  //   const handleSubmit = async () => {
  //     setError("");

  //     const enteredOtp = otp.join("");

  //     if (enteredOtp.length < OTP_LENGTH) {
  //       setError("Please enter all 4 digits.");
  //       return;
  //     }
  //     const formData = {
  //       otp: enteredOtp,
  //     };

  //     try {
  //       setIsLoading(true);
  //     } catch (error: any) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   const handleResend = async () => {
  //     setOtp(Array(OTP_LENGTH).fill(""));
  //     setTimer(120);
  //     setError("");

  //     const formData = {
  //       email: "",
  //     };

  //     try {
  //     } catch (error: any) {}
  //   };

  const handlePaste = async (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    let pasteData = "";

    try {
      // Method 1: React SyntheticEvent clipboardData (most common)
      if (e.clipboardData && e.clipboardData.getData) {
        pasteData = e.clipboardData.getData("text");
      }
      // Method 2: Native event clipboardData (direct access)
      else if (
        e.nativeEvent &&
        e.nativeEvent.clipboardData &&
        e.nativeEvent.clipboardData.getData
      ) {
        pasteData = e.nativeEvent.clipboardData.getData("text");
      }

      // Method 3: Modern Async Clipboard API (fallback)
      else if (navigator.clipboard && navigator.clipboard.readText) {
        pasteData = await navigator.clipboard.readText();
      }

      // Filter only numeric characters
      const numericData = pasteData.replace(/\D/g, "");

      if (numericData) {
        const newOtp = [...otp];
        const availableSlots = OTP_LENGTH - index;
        const dataToPaste = numericData.slice(0, availableSlots);

        // Fill the inputs starting from current index
        for (let i = 0; i < dataToPaste.length; i++) {
          if (index + i < OTP_LENGTH) {
            newOtp[index + i] = dataToPaste[i];
          }
        }
        setOtp(newOtp);

        // Clear error if all digits are now filled
        if (newOtp?.filter(Boolean)?.length >= OTP_LENGTH) {
          setError("");
        }

        const nextIndex = Math.min(index + dataToPaste.length, OTP_LENGTH - 1);
        inputRefs.current[nextIndex].focus();
      }
    } catch {
      // Silently handle paste operation failure
      setTimeout(() => {
        const currentInput = inputRefs.current[index];
        if (currentInput) {
          const inputValue = currentInput.value;
          const numericData = inputValue.replace(/\D/g, ""); // Only take the first digit and update state
          if (numericData) {
            const newOtp = [...otp];
            newOtp[index] = numericData[0]; // Only first digit
            setOtp(newOtp);

            // Clear error if all digits are now filled
            if (newOtp?.filter(Boolean)?.length >= OTP_LENGTH) {
              setError("");
            }

            // Move to next field if available
            if (index < OTP_LENGTH - 1) {
              inputRefs.current[index + 1].focus();
            }
          }
        }
      }, 0);
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  return (
    <div className={className}>
      <div
        className="flex flex-col gap-8 p-5 rounded-[14px] border border-[#B9D1FF]
      bg-themeWhite-900 backdrop-blur-[66px]"
      >
        <div className="flex flex-col items-center gap-6">
          <h1 className="headline-small leading-[50px] font-medium text-[#19191B]">
            2-Step Verification
          </h1>
          <div className="flex items-center gap-2.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  if (/^[0-9]?$/.test(e.target.value)) {
                    handleChange(e.target.value, index);
                    if (e.target.value && index < OTP_LENGTH - 1) {
                      inputRefs.current[index + 1]?.focus();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && index >= 0) {
                    e.preventDefault();
                    handleChange("", index);
                    inputRefs.current[index - 1]?.focus();
                    return;
                  }

                  if (otp[index] && /^[0-9]?$/.test(e.key)) {
                    //handling input in already filled field
                    handleChange(e.key, index);
                    if (e.key && index < OTP_LENGTH - 1) {
                      inputRefs.current[index + 1]?.focus();
                    }
                    e.preventDefault();
                    return;
                  }

                  if (e.key === "Enter" && index === OTP_LENGTH - 1) {
                    e.preventDefault();
                    onSubmit();
                    return;
                  }

                  if (e.key === "v" || e.key?.toLowerCase() === "control") {
                    return;
                  }

                  if (!/^[0-9]?$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => handlePaste(e, index)}
                onWheel={(e) => {
                  e.currentTarget.blur();
                }}
                className="w-16 p-4 body-large text-center rounded-lg border border-themeGray-400
 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            ))}
          </div>
          {!!error && <p className="body-large text-error">{error}</p>}

          <Button
            classNames="w-[286px]"
            onClick={onSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2 body-large">
          <span className="py-1 text-[#8392AB]">Haven&apos;t received it?</span>
          {timer > 0 ? (
            <span>Resend in {timer}s</span>
          ) : (
            <Button
              variant="text"
              classNames="py-1.5 px-2 label-medium"
              onClick={handleResend}
            >
              Resend a new code.
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TwoFactorAuthentication;
