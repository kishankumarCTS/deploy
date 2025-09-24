"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import DeleteIcon from "@/assets/svg/delete.svg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isDisabled?: boolean;
  classNames?: string;
  ref?: React.Ref<HTMLButtonElement>;
};

export default function DeleteButton({
  isDisabled = false,
  classNames,
  ref,
  ...rest
}: ButtonProps) {
  const computedDisabled = isDisabled;

  const classes = clsx(
    "inline-flex justify-center self-end my-4 p-4 bg-black/10 rounded-2xl transition-colors duration-150 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer min-w-[56px]",
    classNames
  );

  return (
    <button
      ref={ref}
      className={classes}
      disabled={computedDisabled}
      aria-disabled={computedDisabled || undefined}
      {...rest}
    >
      <Image src={DeleteIcon} alt="delete icon" width={24} height={24} />
    </button>
  );
}
