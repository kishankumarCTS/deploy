import { ListenerFormData } from "./types";

export const STATIC_FORM_DATA: ListenerFormData = {
  listenerName: "sdfdf",
  listenerProtocol: "HTTP",
  listenerPort: 80,
  connectionLimit: "-1",
  clientDataTimeout: "50000",
  memberDataTimeout: "50000",
  listenerDescription: "dfs",
  allowedCidrs: "192.168.0.0/16",
  tcpInspectTimeout: "0",
  tlsCiphers: "TLSCIPHER120",
  headers: {
    xForwardedFor: true,
    xForwardedPort: false,
    xForwardedProto: true,
  },

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
