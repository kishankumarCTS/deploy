"use client";
import React from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "text" | "tertiary" | "square";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  isLoading?: boolean;
  isDisabled?: boolean;
  classNames?: string;
  ref?: React.Ref<HTMLButtonElement>;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "py-2.5 px-6 bg-themeBlue-600 title-small font-medium text-themeWhite-900 rounded-[40px] hover:bg-blue-700",
  secondary:
    "py-2.5 px-6 bg-themeBlue-600 title-small font-medium text-themeBlue-600 rounded-[40px] bg-transparent border border-themeBlue-600 hover:opacity-80",
  text: "title-medium font-bold text-themeBlue-600 hover:opacity-80",
  tertiary:
    "py-2.5 px-6 title-small font-medium text-themeBlue-900 bg-themeWhite-900 rounded-[40px] hover:opacity-80",
  square:
    "inline-flex items-center justify-center gap-1 py-2 px-3.5 font-medium text-themeGray-500 bg-themeGray-400 opacity-80 rounded-lg transition-colors duration-150 hover:opacity-100 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
};

export function Spinner({ size = 16 }: { size?: number }) {
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

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  isDisabled = false,
  classNames,
  ref,
  ...rest
}: ButtonProps) {
  const computedDisabled = isLoading || isDisabled;

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
    VARIANT_CLASSES[variant],
    classNames
  );

  return (
    <button
      ref={ref}
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
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
