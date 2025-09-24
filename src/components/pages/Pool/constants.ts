import { BackendServerType, HealthMonitorType } from "./types";

export const getPoolDetails = (poolId: string) => ({
  poolId: "adf34webcj237-asfyu32",
  name: "Test",
  description: "Test",
  algorithm: "Round Robin",
  protocol: "HTTP",
  provisioningStatus: { status: "Active", variant: "success" },
  adminState: { status: "Up", variant: "success" },
  operatingStatus: { status: "Error", variant: "error" },
  tlsEnabled: { status: "No", variant: "error" },
  type: "SOURCE_IP",
  createdAt: "09-09-2025 11:33",
  updatedAt: "17-09-2025 14:53",
});

export const mockHealthMonitors: HealthMonitorType[] = [
  {
    id: "hm-123456",
    name: "HTTP Health Check",
    type: "HTTP",
    operatingStatus: { status: "Online", variant: "success" },
    provisioningStatus: { status: "Active", variant: "success" },
    adminState: { status: "Up", variant: "success" },
    autoScalingMember: { status: "No", variant: "default" },
    createdAt: "09-09-2025 11:33",
  },
];

export const mockBackendServers: BackendServerType[] = [
  {
    id: "server-123456",
    name: "ddd",
    ipAddress: "45.194.2.146",
    operatingStatus: { status: "Error", variant: "error" },
    provisioningStatus: { status: "Active", variant: "success" },
    protocolPort: 1,
    weight: 0,
    adminState: { status: "Up", variant: "success" },
    autoScalingMember: { status: "No", variant: "default" },
    backup: { status: "No", variant: "default" },
    createdAt: "09-09-2025 11:33",
  },
];
