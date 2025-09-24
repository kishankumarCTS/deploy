import { HealthMonitorType } from "./types";

export const healthMonitorData: HealthMonitorType[] = [
  {
    id: "ac2cac8f-b580-4680-afec-cc7252309e9b",
    name: "Test",
    provisioningStatus: "Active",
    adminState: "Up",
    operatingStatus: "Online",
    type: "HTTP",
    delay: 10,
    timeout: 5,
    maxRetries: 1,
    maxRetriesDown: 3,
    httpMethod: "GET",
    httpVersion: "-",
    expectedCodes: "200",
    createdAt: "09-09-2025 11:33",
    updatedAt: "09-09-2025 11:34",
  },
];
