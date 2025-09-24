import { Subnet } from "./types";

export const subnetData: Subnet = {
  id: "2d5f3f43-24f2-45e6-8a9b-1c2d3e4f5a6b",
  name: "qqq",
  vpcId: "8db7efdf-cf41-407d-9deb-28d5ab283942",
  createdAt: "19-09-2025 08:56",
  ipVersion: "IPv4",
  gatewayIp: "192.168.1.0",
  dnsNameservers: ["192.168.0.0"],
  allocationPools: [{ start: "192.168.0.1", end: "192.168.0.2" }],
};
