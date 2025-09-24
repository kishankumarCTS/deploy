import { PoolFormData } from "./types";
export const STATIC_FORM_DATA: PoolFormData  = {
  poolEnabled: true,
  poolName: "jhgfd",
  poolDescription: "",
  poolProtocol: "HTTP",
  sessionPersistence: "Source IP",
  algorithm: "Round Robin",
  tlsEnabled: "No",
  poolTlsCiphers: "",

  healthMonitorEnabled: true,
  healthMonitorName: "jhgfd",
  healthMonitorProtocol: "TLS-HELLO",
  delaySeconds: "10",
  maxRetries: "1",
  maxRetriesDown: "3",
  timeoutSeconds: "5",

  detailsEnabled: true,
  allocatedServers: [
    {
      name: "Testing2",
      ipAddress: "45.194.46.181",
      protocolPort: 1,
      monitorAddress: "0.0.0.0",
      monitorPort: 1,
      weight: 0,
    },
  ],
};
