"use client";

import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/CommonInput";
import React, { useEffect, useState } from "react";
import OTPInput from "./OtpInput";

const RecoverPassword = ({ onChange }: { onChange?: () => void }) => {
  const DEFAULT_TIMER = 120;
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState<string | undefined | "">("");
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleStep = () => {
    setStep(2);
  };

  const handleSetOtp = (value: string | undefined | "") => {
    setOtp(value);
  };

  const handleSubmit = () => {
    setStep(3);
  };

  const resendOtpHandler = () => {
    alert("Otp sent");
  };

  const handleResetPassword = () => {
    alert("reset password");
  };

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: any, type: "new" | "confirm") => {
    if (type == "new") {
      setPassword((prev) => ({ ...prev, newPassword: event.target.value }));
    }
    if (type == "confirm") {
      setPassword((prev) => ({ ...prev, confirmPassword: event.target.value }));
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  return (
    <div
      className="flex flex-col gap-7.5 py-5 px-[24px] rounded-[14px] border border-[#B9D1FF]
      bg-themeWhite-900 backdrop-blur-[66px]"
    >
      <div className="">
        <h1 className="headline-small leading-[50px] font-medium text-[#19191B] text-center">
          {step === 1 && "Reset Password"}
          {step === 2 && "2-Step Verification"}
          {step === 3 && "Set Password"}
        </h1>
        <p className="title-medium text-[#999BA1]">
          {step === 1 && "Enter your email to reset your password."}
        </p>
        <div className={`mt-6 mx-auto ${step == 2 && "max-w-[290px]"}`}>
          {step === 1 && (
            <InputField
              label={"Email"}
              placeholder={"Enter registered email"}
              value={email}
              onChange={handleEmail}
              labelClassName="font-bold"
              inputClassName="py-1.5 px-4 placeholder:title-small"
              className="mb-4"
              type="email"
              required={true}
            />
          )}

          {step == 3 && (
            <div>
              <InputField
                label={"New password"}
                placeholder={"Enter new password"}
                value={password.newPassword}
                onChange={(event) => {
                  handlePassword(event, "new");
                }}
                labelClassName="font-bold"
                inputClassName="py-1.5 px-4 placeholder:title-small"
                className="mb-4"
                type="password"
              />
              <InputField
                label={"Confirm password"}
                placeholder={"Re-enter password"}
                value={password.confirmPassword}
                onChange={(event) => {
                  handlePassword(event, "confirm");
                }}
                labelClassName="font-bold"
                inputClassName="py-1.5 px-4 placeholder:title-small"
                className="mb-4"
                type="password"
              />
            </div>
          )}
          {step === 2 && (
            <div className="mb-6">
              <OTPInput
                length={4}
                onComplete={() => {}}
                onResend={() => {}}
                isLoading={false}
                className="w-[350px]"
                handleSetOtp={handleSetOtp}
              />
            </div>
          )}
          {step === 1 && (
            <Button
              classNames="w-full"
              onClick={handleStep}
              isDisabled={!email}
            >
              Reset Password
            </Button>
          )}

          {step === 2 && (
            <Button
              classNames="w-full"
              onClick={handleSubmit}
              isDisabled={otp?.length !== 4}
            >
              Submit
            </Button>
          )}

          {step === 3 && (
            <Button
              classNames="w-full"
              onClick={handleResetPassword}
              isDisabled={
                password.newPassword === "" ||
                password.confirmPassword === "" ||
                password.confirmPassword !== password.newPassword
              }
            >
              Reset password
            </Button>
          )}
          {step === 2 && (
            <div className="mt-8">
              {timer > 0 && (
                <div className="text-center label-medium text-themeBlack-50">
                  Resend available in {timer}
                </div>
              )}
              <div className="flex gap-3 items-center justify-center">
                <div className="title-medium text-themeBlack-40">
                  {"Haven't received it?"}
                </div>
                <Button
                  variant="text"
                  classNames="label-medium text-themeBlue-600"
                  isDisabled={timer > 0}
                  onClick={resendOtpHandler}
                >
                  Resend a new code.
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
