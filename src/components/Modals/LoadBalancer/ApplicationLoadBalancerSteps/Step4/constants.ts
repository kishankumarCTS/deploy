import { OptionsTypes } from "./SelectAlgorithm/types";

export const algorithmOptions: OptionsTypes[] = [
  { label: "Round Robin", value: "Round Robin", id: 1 },
  { label: "Least Connections", value: "Least Connections", id: 2 },
  { label: "Source IP", value: "Source IP", id: 3 },
];

export const protocolOptions: OptionsTypes[] = [
  { label: "HTTP", value: "HTTP", id: 1 },
  { label: "PROXY", value: "PROXY", id: 2 },
  { label: "PROXYV2", value: "PROXYV2", id: 3 },
];

export const sessionPersistanceOptions: OptionsTypes[] = [
  { label: "Source IP", value: "Source IP", id: 1 },
  { label: "HTTP Cookie", value: "HTTP Cookie", id: 2 },
  { label: "APP Cokkie", value: "APP Cookie", id: 3 },
];

export const httpMethods: OptionsTypes[] = [
  { label: "GET", value: "GET", id: 1 },
  { label: "HEAD", value: "HEAD", id: 2 },
  { label: "PUT", value: "PUT", id: 3 },
  { label: "POST", value: "POST", id: 4 },
  { label: "DELETE", value: "DELETE", id: 5 },
  { label: "TRACE", value: "TRACE", id: 6 },
  { label: "OPTION", value: "OPTION", id: 7 },
];

export const healthMonitorProtocol: OptionsTypes[] = [
  { label: "HTTP", value: "HTTP", id: 1 },
  { label: "HTTPS", value: "HTTPS", id: 2 },
  { label: "PING", value: "PING", id: 3 },
  { label: "TCP", value: "TCP", id: 4 },
  { label: "TLS-HELLO", value: "TLS-HELLO", id: 5 },
  { label: "UDP-CONNECT", value: "UDP-CONNECT", id: 6 },
  { label: "SCTP", value: "SCTP", id: 7 },
];

export const tooltipMessage: {
  [key: string]: string;
} = {
  algorithm:
    "The load balancer algorithm that distributes traffic to the pool members. LEAST_CONNECTIONS: Allocates requests to the instance with the least number of active connections. ROUND_ROBIN: Rotates requests evenly between multiple instances. SOURCE_IP: Requests from a unique source IP address are consistently directed to the same instance.",
  protocol:
    "The protocol for which this pool and its members listen.A valid value is HTTP, HTTPS, PROXY, PROXYV2, TCP, UDP or SCTP.",
  sessionPersistence:
    "The type of session persistence for distributing traffic to the pool members. SOURCE_IP: Session persistence based on source IP. HTTP_COOKIE: Session persistence based on HTTP cookie. APP_COOKIE: Session persistence based on application cookie.",
};
