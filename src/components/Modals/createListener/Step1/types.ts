
export type Protocol = "HTTP" | "HTTPS" | "TCP" | "TERMINATED_HTTPS";

export interface ProtocolOption {
  id: number;
  label: string;
  value: Protocol;
}

export interface ListenerHeaders {
  xForwardedFor: boolean;
  xForwardedPort: boolean;
  xForwardedProto: boolean;
}

export interface ListenerFormData {
  name: string;
  description: string;
  port: string;
  allowedCidrs: string;
  clientTimeout: string;
  memberTimeout: string;
  tcpTimeout: string;
  connectionLimit: string;
  memberConnectTimeout: string;
  tlsCiphers: string;
  protocol: Protocol;
  headers: ListenerHeaders;
}
