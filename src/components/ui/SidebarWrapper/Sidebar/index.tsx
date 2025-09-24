import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../Accordion";
import SidebarItem from "../SidebarItem";
import observabilityIcon from "@/assets/icons/observability.svg";
interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const sidebarData = [
    {
      id: 1,
      option: "My Account",
      url: "",
      isDropdown: true,
      iconSrc: observabilityIcon,
      isActive: false,
      subOptions: [],
    },
    {
      id: 2,
      option: "Observability",
      url: "",
      isDropdown: true,
      iconSrc: observabilityIcon,
      isActive: true,
      subOptions: [
        { id: 1, title: "Monitoring", url: "" },
        { id: 2, title: "Alert Rules", url: "" },
        { id: 3, title: "Activity Logs", url: "" },
        { id: 4, title: "Event Notifications", url: "" },
        { id: 5, title: "Usage Reports", url: "" },
      ],
    },
    {
      id: 3,
      option: "Compute Engine",
      url: "",
      isDropdown: true,
      iconSrc: observabilityIcon,
      isActive: true,
      subOptions: [
        { id: 1, title: "Create A New Compute Instance", url: "" },
        { id: 2, title: "All Compute Instances", url: "" },
      ],
    },
    {
      id: 4,
      option: "Networking",
      url: "",
      isDropdown: true,
      iconSrc: observabilityIcon,
      isActive: true,
      subOptions: [
        { id: 1, title: "VPC Networks", url: "" },
        { id: 2, title: "Security Groups", url: "" },
        { id: 3, title: "Virtual Routers", url: "" },
        { id: 4, title: "Elastic IP", url: "" },
        { id: 5, title: "Load Balancer", url: "" },
      ],
    },
    {
      id: 5,
      option: "All Storage",
      url: "",
      isDropdown: true,
      iconSrc: observabilityIcon,
      isActive: true,
      subOptions: [
        { id: 1, title: "Volumes", url: "" },
        { id: 2, title: "S3 Storage", url: "" },
      ],
    },
    {
      id: 6,
      option: "Backup Center",
      url: "",
      isDropdown: true,
      iconSrc: observabilityIcon,
      isActive: true,
      subOptions: [
        { id: 1, title: "Dashboard", url: "" },
        { id: 2, title: "Settings", url: "" },
        { id: 3, title: "Policies", url: "" },
        { id: 4, title: "Configured Instances", url: "" },
        { id: 5, title: "Backup Vault", url: "" },
        { id: 6, title: "Jobs", url: "" },
        { id: 7, title: "Notifications", url: "" },
      ],
    },
    {
      id: 7,
      option: "Identity Access",
      url: "",
      isDropdown: true,
      iconSrc: observabilityIcon,
      isActive: true,
      subOptions: [
        { id: 1, title: "Users", url: "" },
        { id: 2, title: "Groups", url: "" },
        { id: 3, title: "Policies", url: "" },
        {
          id: 4,
          iconSrc: observabilityIcon,
          title: "Knowledge Centre",
          url: "",
        },
      ],
    },
  ];
  return (
    <div
      className={`bg-themeBlue-50 flex flex-col transition-all duration-300 flex-1 overflow-auto ${
        collapsed ? "w-16" : "w-[286px]"
      }`}
    >
      <nav className="flex-1 flex flex-col gap-1">
        {sidebarData.map((item) => (
          <Accordion type="single" key={item.id} collapsible>
            <AccordionItem value={item.option}>
              <AccordionTrigger>
                <SidebarItem
                  title={item.option}
                  url={item.url}
                  isDropdown={item.isDropdown}
                  iconSrc={item.iconSrc}
                  collapsed={collapsed}
                  isActive={item.isActive}
                />
              </AccordionTrigger>
              {item.subOptions.map((option) => (
                <AccordionContent key={option.id}>
                  <SidebarItem
                    iconSrc={option.iconSrc ?? undefined}
                    title={option.title}
                    url={option.url}
                  />
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
