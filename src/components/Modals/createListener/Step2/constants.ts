import { OptionType } from "./types";

export const PROTOCOL_OPTIONS: OptionType[] = [
  { id: 1, label: "HTTP", value: "HTTP" },
  { id: 2, label: "HTTPS", value: "HTTPS" },
  { id: 3, label: "TCP", value: "TCP" },
];

export const SESSION_PERSISTENCE_OPTIONS: OptionType[] = [
  { id: 1, label: "Source IP", value: "sourceIp" },
  { id: 2, label: "HTTP Cookie", value: "httpCookie" },
  { id: 3, label: "App Cookie", value: "appCookie" },
];

export const ALGORITHM_OPTIONS: OptionType[] = [
  { id: 1, label: "Round Robin", value: "roundRobin" },
  { id: 2, label: "Least Connections", value: "leastConn" },
  { id: 3, label: "Source IP Hash", value: "sourceIpHash" },
];

export const HEALTH_MONITOR_PROTOCOL_OPTIONS: OptionType[] = [
  { id: 1, label: "HTTP", value: "HTTP" },
  { id: 2, label: "HTTPS", value: "HTTPS" },
  { id: 3, label: "TCP", value: "TCP" },
];

export const HTTP_METHOD_OPTIONS: OptionType[] = [
  { id: 1, label: "GET", value: "GET" },
  { id: 2, label: "POST", value: "POST" },
];
