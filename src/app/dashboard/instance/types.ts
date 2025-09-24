import { ReactNode } from "react";

export interface PlanBenefit {
  id: number;
  label: string;
}

export interface OSCardData {
  id: number;
  osName: string;
  osVersion: string;
  planBenifits: PlanBenefit[];
  architecture: string;
  lastUpdate: string;
  onClick?: () => void;
}

export interface BootSourceSelectorProps {
  children?: ReactNode;
}
