"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";

export type StorageOption = {
  id: string;
  title: string;
  subtitle?: string;
  iops: string;
  size: string;
  throughput: string;
};

interface MultiSelectDropdownProps {
  title?: string;
  children: React.ReactNode;
  options: StorageOption[];
  selected: string;
  onChange: (selected: string) => void;
  placeholder?: string;
}

export function MultiSelectDropdown({
  title,
  children,
  options,
  selected,
  onChange,
  placeholder,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="w-full justify-between">
          <span>{children ?? placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-[500px] my-0 py-5 px-0 bg-themeWhite-900 rounded-[20px] border-none">
        <div className="flex flex-col gap-3">
          {title && (
            <div className="pb-5 px-6 label-large font-medium border-b border-b-themeGray-200">
              {title}
            </div>
          )}
          <div className="flex flex-col max-h-[352px] px-6 overflow-y-auto">
            {options.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-[18px] py-4 cursor-pointer"
              >
                <input
                  type="radio"
                  checked={opt.id === selected}
                  onChange={() => onChange(opt.id)}
                  className="w-4 h-4 cursor-pointer"
                />
                <div className="flex-1 flex flex-col gap-1 title-medium">
                  <span className="font-semibold">{opt.title}</span>
                  {opt.subtitle && (
                    <span className="title-small font-bold">
                      {opt.subtitle}
                    </span>
                  )}
                  <span className="flex justify-between items-center gap-[18px] text-black/70">
                    <span>IOPS: {opt.iops}</span>
                    <span>Size: {opt.size}</span>
                    <span> Throughput: {opt.throughput}</span>
                  </span>
                </div>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-5 px-6 border-t border-t-themeGray-200">
            <Button
              variant="secondary"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
