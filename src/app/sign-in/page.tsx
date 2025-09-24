"use client";

import { useState } from "react";

import Image from "next/image";

import Logo from "@/assets/icons/logo.svg";
import LoginForm from "@/components/pages/Login/Login Form";
import LoginBanner from "@/assets/svg/Login Banner.svg";
import TwoFactorAuthentication from "@/components/pages/Login/2FA";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckEmail = () => {
    //on success
    setIsLoading(true);
    setStep(2);
    setIsLoading(false);
  };
  const handleCheckPassword = () => {
    //on success
    setIsLoading(true);
    setStep(3);
    setIsLoading(false);
  };
  return (
    <div className="w-[90%] h-dvh flex justify-center items-center gap-[90px] mx-auto p-8 xl:py-[111px] xl:px-[90px]">
      <div className="w-[476px] flex flex-col gap-4 2xl:gap-[92px]">
        <Image src={Logo} alt="logo" />
        {step === 1 && (
          <LoginForm
            label="Your Email"
            value={email}
            placeholder="johndoe@email.com"
            onChange={(e) => setEmail(e.target.value)}
            onSubmit={handleCheckEmail}
            isLoading={isLoading}
          />
        )}
        {step === 2 && (
          <LoginForm
            label="Your Password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            onSubmit={handleCheckPassword}
            isLoading={isLoading}
          />
        )}
        {step === 3 && (
          <TwoFactorAuthentication
            handleResend={() => {}}
            isLoading={isLoading}
          />
        )}
      </div>
      <div className="relative max-w-[1107px] h-full flex-1 flex items-end">
        <Image
          src={LoginBanner}
          alt="logo"
          fill
          objectFit="contain"
          className="!w-fit ml-auto"
        />
      </div>
    </div>
  );
}

export default Login;
