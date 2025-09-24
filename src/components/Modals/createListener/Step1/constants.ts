import { ProtocolOption } from "./types";

export const PROTOCOL_OPTIONS: ProtocolOption[] = [
  { id: 1, label: "HTTP", value: "HTTP" },
  { id: 2, label: "HTTPS", value: "HTTPS" },
  { id: 3, label: "TCP", value: "TCP" },
  { id: 4, label: "Terminated HTTPS", value: "TERMINATED_HTTPS" },
];
