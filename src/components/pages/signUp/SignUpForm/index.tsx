"use client";

import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/CommonInput";
import { useState } from "react";
import Link from "next/link";

// TODO: make the input in components as auth input after discussion
// TODO: make common component of checkbox
// TODO: font family is Noto Sans do we have to use

type Props = {
  className?: string;
};

function SignUpForm({ className }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = () => {};
  return (
    <div className={className}>
      <div
        className="flex flex-col gap-7.5 py-5 px-[66px] rounded-[14px] border border-[#B9D1FF]
      bg-themeWhite-900 backdrop-blur-[66px]"
      >
        <div>
          <h1 className="headline-small leading-[50px] font-medium text-[#19191B]">
            Sign up
          </h1>
          <p className="title-medium text-[#999BA1]">
            Enter your email and password to register
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            error={error}
            labelInputGap={1}
            labelClassName="font-semibold"
            inputClassName="py-1.5 px-4 placeholder:title-small"
          />
          <InputField
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={error}
            labelInputGap={1}
            labelClassName="font-semibold"
            inputClassName="py-1.5 px-4 placeholder:title-small"
          />
          <InputField
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={error}
            labelInputGap={1}
            labelClassName="font-semibold"
            inputClassName="py-1.5 px-4 placeholder:title-small"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={termsAndConditions}
              onChange={(e) => {
                setTermsAndConditions(e.target.checked);
              }}
              className="w-4 h-4 border border-themeGray-300 hover:border-themeGray-300 cursor-pointer"
            />
            <span className="label-large">
              I agree the
              <span className="font-semibold"> Terms and Conditions.</span>
            </span>
          </div>
        </div>
        <Button classNames="w-full" onClick={onSubmit} isLoading={isLoading}>
          Next
        </Button>
        <div className="flex justify-center items-center gap-1 body-small font-medium">
          <span className="text-[#1E293B]">Already have an account?</span>

          <Link
            href="/sign-in"
            className="py-1.5 px-2 label-medium font-semibold"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
