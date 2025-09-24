"use client";

import { useState } from "react";

import Image from "next/image";

import MagniFyingGlass from "@/assets/svg/magnifyingGlass.svg";

type SearchBarProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export default function SearchBar({
  placeholder = "Search",
  onChange,
  onSubmit,
}: SearchBarProps) {
  const [searchedValue, setSearchedValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className="flex items-center w-full max-w-[380px]">
      <div className={"relative w-full after-style"}>
        <input
          type="text"
          value={searchedValue}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit?.(searchedValue);
            }
          }}
          placeholder={placeholder}
          className="w-full py-2 px-4 pr-10 body-large placeholder:body-large text-[#616161] placeholder:text-[#616161] bg-white rounded-[10px] outline-none shadow-[0_1.281px_2.561px_0_rgba(0,0,0,0.14),0_0_3.842px_0_rgba(0,0,0,0.12)] truncate"
        />
        <div
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
          onClick={() => {
            onSubmit?.(searchedValue);
          }}
        >
          <Image
            src={MagniFyingGlass}
            alt="search icon"
            width={18}
            height={18}
          />
        </div>
      </div>
    </div>
  );
}
