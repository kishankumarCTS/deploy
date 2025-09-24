"use client";
import React from "react";
import clsx from "clsx";
import { IoMdRefresh } from "react-icons/io";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isDisabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

function RefreshButton({ isDisabled = false, ref, ...rest }: ButtonProps) {
  const computedDisabled = isDisabled;

  const classes = clsx(
    "w-fit py-1.5 px-1 bg-themeWhite-900 rounded-sm cursor-pointer hover:opacity-80"
  );

  return (
    <button
      ref={ref}
      className={classes}
      disabled={computedDisabled}
      aria-disabled={computedDisabled || undefined}
      {...rest}
    >
      <IoMdRefresh size={20} />
    </button>
  );
}

export default RefreshButton;
