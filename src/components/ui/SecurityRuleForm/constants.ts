import { SecurityRuleType } from "./types";

export const DEFAULT_SECURITY_RULE: {
  type: SecurityRuleType;
  portType: "Port Range";
  remoteType: "CIDR";
  cidr: string;
  fromPort: string;
  toPort: string;
  etherType: "IPv4";
  description: string;
  icmpType: string;
  icmpCode: string;
  securityGroup: string;
} = {
  type: "Custom TCP",
  portType: "Port Range",
  remoteType: "CIDR",
  cidr: "127.0.0.1/32",
  fromPort: "1",
  toPort: "65535",
  etherType: "IPv4",
  description: "",
  icmpType: "0",
  icmpCode: "-1",
  securityGroup: "default (Current)",
};

export const PREDEFINED_PORTS: Record<
  SecurityRuleType,
  { fromPort: string; toPort: string; portType: "Port" | "Port Range" } | null
> = {
  HTTP: { fromPort: "80", toPort: "80", portType: "Port" },
  HTTPS: { fromPort: "443", toPort: "443", portType: "Port" },
  RDP: { fromPort: "3389", toPort: "3389", portType: "Port" },
  DNS: { fromPort: "53", toPort: "53", portType: "Port" },
  "Custom TCP": null,
  "Custom UDP": null,
  "Custom ICMP": null,
  "Any Protocol": null,
  "All ICMP": null,
  "All TCP": null,
  "All UDP": null,
  IMAP: null,
  IMAPS: null,
  LDAP: null,
  "MS SQL": null,
  MYSQL: null,
  POP3: null,
  POP3S: null,
};
