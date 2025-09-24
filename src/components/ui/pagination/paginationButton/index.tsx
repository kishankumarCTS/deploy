"use client";
import React from "react";
import clsx from "clsx";
import ArrowLeft from "@/assets/svg/arrowLeft.svg";
import ArrowRight from "@/assets/svg/arrowRight.svg";
import Image from "next/image";

type PaginationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "previous" | "next";
  isLoading?: boolean;
  isDisabled?: boolean;
  classNames?: string;
};

function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      role="img"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="4"
      />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaginationButton({
  variant,
  children,
  isLoading = false,
  isDisabled = false,
  classNames,
  ...rest
}: PaginationButtonProps) {
  const computedDisabled = isLoading || isDisabled;

  const classes = clsx(
    "inline-flex items-center justify-center gap-1 py-2 px-3.5 font-medium rounded-lg border border-[#D5D7DA] bg-themeWhite-900 shadow-[0_1px_2px_0_rgba(10,13,18,0.05)] transition-colors duration-150 hover:opacity-80 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
    classNames
  );

  return (
    <button
      className={classes}
      disabled={computedDisabled}
      aria-disabled={computedDisabled || undefined}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading ? (
        <>
          <Spinner size={16} />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        <>
          {variant === "previous" && (
            <Image src={ArrowLeft} alt="left arrow" width={12} height={12} />
          )}
          <span>{children}</span>
          {variant === "next" && (
            <Image src={ArrowRight} alt="right arrow" width={12} height={12} />
          )}
        </>
      )}
    </button>
  );
}

export default PaginationButton;
