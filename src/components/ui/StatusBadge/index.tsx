import clsx from "clsx";

import CheckCircle from "@/assets/svg/checkCircle.svg";
import Clock from "@/assets/svg/clock.svg";
import PowerButton from "@/assets/svg/powerButton.svg";
import Delete from "@/assets/svg/deleteGray.svg";
import Error from "@/assets/svg/error.svg";
import Image from "next/image";

// TODO: add color values in place of hex
// TODO: add correct font family

type StatusBadgeProps = {
  variant: "running" | "pending" | "shutOff" | "deleted" | "error";
};

export default function StatusBadge({ variant }: StatusBadgeProps) {
  const variantData = {
    running: {
      icon: CheckCircle,
      text: "Running",
      classNames: "text-[#2F6E07] bg-status-running",
    },
    pending: {
      icon: Clock,
      text: "Pending",
      classNames:
        "text-[#0F4EE0] bg-status-pending border border-status-[#0F4EE0]",
    },
    shutOff: {
      icon: PowerButton,
      text: "ShutOff",
      classNames:
        "text-[#ef8b44] bg-status-shutdown border border-status-[#ef8b44]",
    },
    deleted: {
      icon: Delete,
      text: "Deleted",
      classNames: "text-[#4e5247] bg-status-deleted",
    },
    error: {
      icon: Error,
      text: "Error",
      classNames: "text-error bg-status-error",
    },
  };

  return (
    <div
      className={clsx(
        "w-fit flex items-center gap-1.5 py-2 px-3 label-medium font-bold rounded-[34px]",
        variantData[variant]?.classNames
      )}
    >
      <Image
        src={variantData[variant]?.icon ?? ""}
        alt={`${variantData[variant]?.text} - icon`}
        width={14}
        height={14}
      />
      <span>{variantData[variant]?.text}</span>
    </div>
  );
}
