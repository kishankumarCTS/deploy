export type BackendServer = {
  name: string;
  ipAddress: string;
  protocolPort: number;
  monitorAddress: string;
  monitorPort: number;
  weight: number;
};

export type ListenerFormData = {
  listenerName: string;
  listenerProtocol: string;
  listenerPort: number;
  connectionLimit: string;
  clientDataTimeout: string;
  memberDataTimeout: string;
  listenerDescription: string;
  allowedCidrs: string;
  tcpInspectTimeout: string;
  tlsCiphers: string;
  headers: {
    xForwardedFor: boolean;
    xForwardedPort: boolean;
    xForwardedProto: boolean;
  };

  poolEnabled: boolean;
  poolName: string;
  poolDescription: string;
  poolProtocol: string;
  sessionPersistence: string;
  algorithm: string;
  tlsEnabled: "Yes" | "No";
  poolTlsCiphers: string;

  healthMonitorEnabled: boolean;
  healthMonitorName: string;
  healthMonitorProtocol: string;
  delaySeconds: string;
  maxRetries: string;
  maxRetriesDown: string;
  timeoutSeconds: string;

  detailsEnabled: boolean;
  allocatedServers: BackendServer[];
};
