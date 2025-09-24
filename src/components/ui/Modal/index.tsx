"use client";

import React, { useEffect, useState, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { Button } from "../Button";
import { cn } from "@/lib/utils";

type ModalVariant = "centered" | "fullscreen";

export type FooterButton = {
  variant: "primary" | "secondary" | "text";
  children: ReactNode;
  onClick: () => void;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: ModalVariant;
  size?: "default" | "stretch";
  withOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  lockScroll?: boolean;
  footerButtons?: FooterButton[];
  customFooter?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = "centered",
  size = "default",
  withOverlay = true,
  closeOnOverlayClick = true,
  lockScroll = true,
  footerButtons = [],
  customFooter,
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || (variant !== "fullscreen" && !lockScroll)) return;
    if (variant === "fullscreen") {
      document.body.style.overflow = "hidden";
    } else {
      const target = document.body;
      target.style.overflow = "hidden";
    }

    return () => {
      if (variant === "fullscreen") {
        document.body.style.overflow = "auto";
      } else {
        const target = document.body;
        target.style.overflow = "auto";
      }
    };
  }, [isOpen, lockScroll, variant]);

  const handleOverlayClick: React.MouseEventHandler = (e) => {
    if (!closeOnOverlayClick) return;
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!mounted || !isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center",
        !withOverlay && "pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {withOverlay && (
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-overlay-background/40"
          onMouseDown={handleOverlayClick}
        />
      )}

      <div
        className={cn(
          "relative bg-themeWhite-900 flex flex-col",
          variant === "fullscreen"
            ? "w-full h-full"
            : `${
                size === "default" ? "max-w-3xl" : "max-w-7xl"
              } max-h-[70vh] mx-auto my-3 p-6 rounded-[20px]`,
          className
        )}
      >
        {title && (
          <div
            className={`${
              variant === "fullscreen" ? "py-3 px-6" : "mb-3"
            } flex justify-between items-center`}
          >
            <h2 id="modal-title" className="headline-small">
              {title}
            </h2>
          </div>
        )}

        <div
          className={`flex-1 ${
            variant === "fullscreen" ? "py-3 px-6" : "mb-3"
          } overflow-y-auto`}
        >
          {children}
        </div>

        {customFooter ? (
          <div
            className={`flex justify-end gap-3 ${
              variant === "fullscreen" &&
              "py-3 px-6 shadow-[0_0_10px_0_rgba(0,0,0,0.15)]"
            }`}
          >
            {customFooter}
          </div>
        ) : footerButtons?.length > 0 ? (
          <div
            className={`flex justify-end gap-3 ${
              variant === "fullscreen" &&
              "py-3 px-6 shadow-[0_0_10px_0_rgba(0,0,0,0.15)]"
            }`}
          >
            {footerButtons?.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                onClick={button.onClick}
              >
                {button.children}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
};
