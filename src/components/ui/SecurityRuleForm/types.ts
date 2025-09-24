export type SecurityRuleType =
  | "Custom TCP"
  | "Custom UDP"
  | "Custom ICMP"
  | "Any Protocol"
  | "All ICMP"
  | "All TCP"
  | "All UDP"
  | "DNS"
  | "HTTP"
  | "HTTPS"
  | "IMAP"
  | "IMAPS"
  | "LDAP"
  | "MS SQL"
  | "MYSQL"
  | "POP3"
  | "POP3S"
  | "RDP";

export interface SecurityRuleData {
  type: SecurityRuleType;
  portType?: "Port" | "All Ports" | "Port Range";
  fromPort?: string;
  toPort?: string;
  icmpType?: string;
  icmpCode?: string;
  remoteType: "CIDR" | "Security Group";
  cidr?: string;
  securityGroup?: string;
  etherType?: "IPv4" | "IPv6";
  description?: string;
}

export interface SecurityRuleFormProps {
  typeOptions: SecurityRuleType[];
  initialType?: SecurityRuleType;
  onChange?: (data: SecurityRuleData) => void;
  onDelete?: () => void;
}
