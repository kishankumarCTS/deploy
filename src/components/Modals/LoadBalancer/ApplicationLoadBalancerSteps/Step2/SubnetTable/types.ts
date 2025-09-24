import { ReactNode } from "react";

export type NetworkRow = {
  vpcName: string;
  vpcId: string;
  subnetName: string;
  subnetId: string;
  cidr: string;
  select?: any;
};
