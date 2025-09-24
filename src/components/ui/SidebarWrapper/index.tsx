"use client";

import { Dispatch, SetStateAction } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Image from "next/image";
import logo from "@/assets/icons/logo.svg";
import { Separator } from "../Separator";
import UserDetailsWrapper from "./UserDetailsWrapper";

type Props = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const SidebarWrapper = ({ collapsed, setCollapsed }: Props) => {
  return (
    <div className="fixed max-w-[310px] h-screen flex flex-col p-3 bg-themeBlue-50 rounded-tr-[16px] rounded-br-[16px] rounded-tl-[0] rounded-bl-[0] z-10">
      <div className="px-4 bg-themeBlue-50 flex items-center justify-between">
        {!collapsed && <Image src={logo} alt="logo" />}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-white bg-themeWhite-900 p-2 cursor-pointer flex w-8 h-8 rounded-[10px] shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
        >
          {!collapsed && <FaChevronLeft color="black" />}
          {!collapsed && <FaChevronLeft color="black" />}
          {collapsed && <FaChevronRight color="black" />}
          {collapsed && <FaChevronRight color="black" />}
        </button>
      </div>
      <div className="my-2 px-4 py-2 bg-themeBlue-50">
        <Separator />
      </div>
      <UserDetailsWrapper collapsed={collapsed} />
      <Sidebar collapsed={collapsed} />
    </div>
  );
};

export default SidebarWrapper;
