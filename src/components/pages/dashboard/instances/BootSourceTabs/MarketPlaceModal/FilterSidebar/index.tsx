import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Separator } from "@/components/ui/Separator";
import React from "react";
import { BsFilterLeft } from "react-icons/bs";
import SidebarOptions from "./SidebarOptions";
import { sidebarData } from "./SidebarOptions/constants";

const FilterSidebar = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="text-[18px] mb-6">Your products</div>
      <div className="text-[18px] mb-6">Your orders</div>
      <Separator />
      <div className="flex mt-6 items-center gap-4 px-3 py-4 bg-themeBlack-10 border border-themeBlack-20 mb-6">
        <div className="flex items-center gap-1 text-[18px]">
          <div className="text-2xl">
            <BsFilterLeft />
          </div>
          <div>Filter</div>
        </div>
        <div className="text-[18px]">Type to filter</div>
      </div>
      <div className="flex-1 overflow-auto">
        {sidebarData.map((item) => {
          return (
            <Accordion
              type="single"
              collapsible
              key={item.id}
              className="font-regular"
            >
              <AccordionItem value={item.value}>
                <AccordionTrigger className="cursor-pointer">
                  <SidebarOptions
                    isArrow={item.isArrow}
                    isActive={item.isActive}
                    title={item.title}
                    total_results={item.total_results}
                  />
                </AccordionTrigger>
                {item.options.map((option: any) => (
                  <AccordionContent key={option.id}>
                    <SidebarOptions title={option.title} />
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSidebar;
