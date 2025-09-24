
export interface HealthMonitorType {
  id: string;
  name: string;
  provisioningStatus: string;
  adminState: string;
  operatingStatus: string;
  type: string;
  delay: number;
  timeout: number;
  maxRetries: number;
  maxRetriesDown: number;
  httpMethod: string;
  httpVersion: string;
  expectedCodes: string;
  createdAt: string;
  updatedAt: string;
}
