"use client";

import Image from "next/image";

import SignUpForm from "@/components/pages/signUp/SignUpForm";
import Logo from "@/assets/icons/logo.svg";
import LoginBanner from "@/assets/svg/Login Banner.svg";

function SignUp() {
  return (
    <div className="w-[90%] h-dvh flex justify-center items-center gap-[90px] mx-auto p-8 xl:py-[111px] xl:px-[90px]">
      <div className="w-[476px] flex flex-col gap-4 2xl:gap-5">
        <Image src={Logo} alt="logo" />
        <SignUpForm />
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

export default SignUp;
