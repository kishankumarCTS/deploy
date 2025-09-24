export type VPCType = {
  id: string;
  name: string;
  vpcId: string;
  subnets: string;
  status: "Active" | "Inactive" | "Creating" | "Error";
  adminState: "Up" | "Down";
  description: string;
  createdAt: string;
};

export type Column<T> = {
  header: string | React.ReactNode;
  accessor?: keyof T | "select";
  cell?: (row: T) => React.ReactNode;
  className: string;
  isVisible: boolean;
  toggleVisibility: boolean;
};

export type VPCDetailsType = {
  id: string;
  name: string;
  vpcId: string;
  description: string;
  status: "Active" | "Inactive" | "Creating" | "Error";
  subnets: string;
  adminState: "Up" | "Down";
  shared: boolean;
  externalNetwork: boolean;
  mtu: number;
  createdAt: string;
  updatedAt: string;
};

export type SubnetType = {
  id: string;
  name: string;
  subnetId: string;
  vpcId: string;
  subnetAddress: string;
  ipVersion: "IPv4" | "IPv6";
  gatewayIp: string;
  description: string;
};

export type PortType = {
  id: string;
  name: string;
  portId: string;
  vpcId: string;
  status: "Active" | "Down" | "Building" | "Error";
  fixedIps: string;
  adminState: "Up" | "Down";
  macAddress: string;
};

export interface VPCDetailsProps {
  vpcId: string;
}
