// types.ts

export interface OptionType {
  id: number;
  label: string;
  value: string;
}

export interface PoolFormData {
  poolEnabled: boolean;
  poolName: string;
  poolDescription: string;
  protocol: string;
  sessionPersistence: string;
  cookieName: string;
  sourceIp: string;
  algorithm: string;
  tlsEnabled: "yes" | "no";
  tlsCiphers: string;

  healthMonitorEnabled: boolean;
  healthMonitorName: string;
  healthMonitorProtocol: string;
  maxRetries: string;
  maxRetriesDown: string;
  delaySeconds: string;
  timeoutSeconds: string;
  httpMethod: string;
  expectedCodes: string;
  urlPath: string;
}
