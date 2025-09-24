"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import PlusIcon from "@/assets/svg/plus.svg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isDisabled?: boolean;
  classNames?: string;
  ref?: React.Ref<HTMLButtonElement>;
};

export default function AddButton({
  isDisabled = false,
  classNames,
  ref,
  ...rest
}: ButtonProps) {
  const computedDisabled = isDisabled;

  const classes = clsx(
    "inline-flex justify-center self-end my-4 p-4 bg-themeBlue-700 rounded-2xl transition-colors duration-150 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
    classNames
  );

  <div className="bg-themeBlue-700 rounded-2xl self-baseline"></div>;

  return (
    <button
      ref={ref}
      className={classes}
      disabled={computedDisabled}
      aria-disabled={computedDisabled || undefined}
      {...rest}
    >
      <Image src={PlusIcon} alt="plus icon" width={24} height={24} />
    </button>
  );
}
