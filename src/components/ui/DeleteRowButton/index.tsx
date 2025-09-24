"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import DeleteIcon from "@/assets/svg/delete.svg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isDisabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

function DeleteRowButton({ isDisabled = false, ref, ...rest }: ButtonProps) {
  const computedDisabled = isDisabled;

  const classes = clsx(
    "w-fit py-1.5 px-1.5 bg-themeWhite-900 rounded-sm cursor-pointer hover:opacity-80"
  );

  return (
    <button
      ref={ref}
      className={classes}
      disabled={computedDisabled}
      aria-disabled={computedDisabled || undefined}
      {...rest}
    >
      <Image src={DeleteIcon} alt="delete icon" width={16} height={16} />
    </button>
  );
}

export default DeleteRowButton;
