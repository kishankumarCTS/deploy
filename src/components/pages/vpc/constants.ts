import { VPCType, VPCDetailsType, SubnetType, PortType } from "./types";

export const vpcData: VPCType[] = [
  {
    id: "vpc-001",
    name: "dummy-vpc",
    vpcId: "8db7efdf-cf41-407d-9deb-28d5ab283942",
    subnets: "subnet-1 : 192.168.5.0/24",
    status: "Active",
    adminState: "Up",
    description: "desc",
    createdAt: "2024-08-29T12:12:00Z",
  },
  {
    id: "vpc-002",
    name: "gdghd",
    vpcId: "c73e752c-cd69-4e87-9234-567890abcdef",
    subnets: "dssds : 105.108.192.0/23",
    status: "Active",
    adminState: "Up",
    description: "dsdsds",
    createdAt: "2024-09-03T15:54:00Z",
  },
  {
    id: "vpc-003",
    name: "test-vpc",
    vpcId: "f1a2b3c4-d5e6-7f89-0123-456789abcdef",
    subnets: "test-subnet : 10.0.0.0/16",
    status: "Creating",
    adminState: "Down",
    description: "Test VPC for development",
    createdAt: "2024-09-05T10:30:00Z",
  },
];

export const getVPCDetails = (vpcId: string): VPCDetailsType => ({
  id: vpcId,
  name: "dummy-vpc",
  vpcId: "8db7efdf-cf41-407d-9deb-28d5ab283942",
  description: "desc",
  status: "Active",
  subnets: "subnet-1 : 192.168.5.0/24",
  adminState: "Up",
  shared: false,
  externalNetwork: false,
  mtu: 1442,
  createdAt: "29-08-2025 12:12",
  updatedAt: "29-08-2025 12:12",
});

export const subnetsData: SubnetType[] = [
  {
    id: "subnet-001",
    name: "subnet-1",
    subnetId: "2d5f3f43-24f2-45e6-8a9b-1c2d3e4f5a6b",
    vpcId: "8db7efdf-cf41-407d-9deb-28d5ab283942",
    subnetAddress: "192.168.5.0/24",
    ipVersion: "IPv4",
    gatewayIp: "192.168.5.1",
    description: "Main subnet for VPC",
  },
  {
    id: "subnet-002",
    name: "subnet-2",
    subnetId: "3e6g4h54-35g3-56h7-9b0c-2d3e4f5g6h7i",
    vpcId: "8db7efdf-cf41-407d-9deb-28d5ab283942",
    subnetAddress: "192.168.6.0/24",
    ipVersion: "IPv4",
    gatewayIp: "192.168.6.1",
    description: "Secondary subnet for VPC",
  },
];

export const portsData: PortType[] = [
  {
    id: "port-001",
    name: "34c0f2f5-0ab8-42a3-9f8e-1d2e3f4a5b6c",
    portId: "34c0f2f5-0ab8-42a3-9f8e-1d2e3f4a5b6c",
    vpcId: "8db7efdf-cf41-407d-9deb-28d5ab283942",
    status: "Down",
    fixedIps: "192.168.5.50",
    adminState: "Up",
    macAddress: "fa:16:3e:xx:xx:xx",
  },
  {
    id: "port-002",
    name: "79acaf54-387b-4834-8f9a-2e3f4g5h6i7j",
    portId: "79acaf54-387b-4834-8f9a-2e3f4g5h6i7j",
    vpcId: "8db7efdf-cf41-407d-9deb-28d5ab283942",
    status: "Active",
    fixedIps: "192.168.5.1",
    adminState: "Up",
    macAddress: "fa:16:3e:yy:yy:yy",
  },
];
