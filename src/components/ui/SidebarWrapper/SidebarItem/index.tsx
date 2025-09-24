"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

type Props = {
  iconSrc?: string;
  iconNode?: ReactNode;
  title: string;
  isDropdown?: boolean;
  url: string | "";
  isActive?: boolean;
  collapsed?: boolean;
};

function SidebarItem({
  iconSrc = "",
  iconNode,
  title,
  isDropdown = false,
  url,
  isActive = false,
  collapsed = false,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const component = (
    <div
      className={`flex items-center gap-3 ${
        collapsed ? "p-0" : "p-4 pr-6"
      } leading-5 tracking-normal rounded-[100px] hover:${
        collapsed ? "" : "bg-themeBlue-300"
      } w-full cursor-pointer ${
        isActive && "bg-themeBlue-100"
      } hover:text-blue-400`}
      onClick={() => setIsDropdownOpen((prev) => !prev)}
    >
      {!!iconSrc ? (
        <Image src={iconSrc} alt={`${title} - icon`} width={24} height={24} />
      ) : !!iconNode ? (
        iconNode
      ) : (
        <span className="w-6 h-6"></span>
      )}
      {collapsed ? "" : title}
      {!!isDropdown ? (
        <MdArrowDropDown
          size={24}
          className={`${isDropdownOpen ? "rotate-180 ml-auto" : "ml-auto"}`}
          color="#1C1B1F"
        />
      ) : (
        <span className="w-6 h-6 ml-auto"></span>
      )}
    </div>
  );
  if (!url) {
    return component;
  }
  return (
    <Link href={url} className="w-full cursor-pointer">
      {component}
    </Link>
  );
}

export default SidebarItem;
