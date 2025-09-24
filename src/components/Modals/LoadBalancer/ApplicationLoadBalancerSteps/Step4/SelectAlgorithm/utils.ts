import { LoadBalancerTypes } from "../../../types";

export const getTooltipData = (
  type:
    | "algorithm"
    | "protocol"
    | "sessionPersistence"
    | "httpMethod"
    | "healthMonitorProtocol"
    | "backendServer"
) => {
  if (type === "algorithm") {
    return "The load balancer algorithm that distributes traffic to the pool members. LEAST_CONNECTIONS: Allocates requests to the instance with the least number of active connections. ROUND_ROBIN: Rotates requests evenly between multiple instances. SOURCE_IP: Requests from a unique source IP address are consistently directed to the same instance.";
  }
  if (type === "protocol") {
    return "The protocol for which this pool and its members listen.A valid value is HTTP, HTTPS, PROXY, PROXYV2, TCP, UDP or SCTP.";
  }
  if (type === "sessionPersistence") {
    return "The type of session persistence for distributing traffic to the pool members. SOURCE_IP: Session persistence based on source IP. HTTP_COOKIE: Session persistence based on HTTP cookie. APP_COOKIE: Session persistence based on application cookie.";
  }
};
