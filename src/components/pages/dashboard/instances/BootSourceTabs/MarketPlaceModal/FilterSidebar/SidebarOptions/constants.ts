import { SidebarItem } from "./types";

export const sidebarData: SidebarItem[] = [
  {
    id: 1,
    value: "operating-systems",
    title: "Operating Systems",
    isArrow: true,
    isActive: false,
    options: [
      { id: 101, title: "Ubuntu 22.04 LTS" },
      { id: 102, title: "Debian 12" },
      { id: 103, title: "AlmaLinux 9" },
    ],
  },
  {
    id: 2,
    value: "databases",
    title: "Databases",
    isArrow: true,
    isActive: false,
    options: [
      { id: 201, title: "PostgreSQL 15" },
      { id: 202, title: "MySQL 8" },
    ],
  },
  {
    id: 3,
    value: "top-products",
    title: "Top Products",
    isArrow: true,
    isActive: false,
    total_results: 134,
    options: [
      { id: 101, title: "Ubuntu 22.04 LTS" },
      { id: 102, title: "Debian 12" },
      { id: 103, title: "AlmaLinux 9" },
    ],
  },
  {
    id: 4,
    value: "new-arrivals",
    title: "New Arrivals",
    isArrow: true,
    isActive: false,
    total_results: 56,
    options: [
      { id: 101, title: "Ubuntu 22.04 LTS" },
      { id: 102, title: "Debian 12" },
      { id: 103, title: "AlmaLinux 9" },
    ],
  },
];
