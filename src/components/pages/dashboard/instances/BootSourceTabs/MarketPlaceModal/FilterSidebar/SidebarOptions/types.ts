export type SidebarOptionsTypes = {
  title: string;
  total_results?: number;
  isActive?: boolean;
  isArrow?: boolean;
};

export type SidebarOption = {
  id: number;
  title: string;
};

export type SidebarItem = {
  id: number;
  value: string;
  title: string;
  isArrow: boolean;
  isActive: boolean;
  total_results?: number; // Only present when isArrow is false
  options: SidebarOption[];
};

export type SidebarData = SidebarItem;
