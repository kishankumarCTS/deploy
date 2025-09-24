export type SecurityGroupType = {
  id: string;
  name: string;
  securityGroupId: string;
  description: string;
  inboundRules: string;
  outboundRules: string;
};

export type SecurityGroupRuleType = {
  id: string;
  etherType: "IPv4" | "IPv6";
  ruleId: string;
  ipProtocol: string;
  remoteIpPrefix: string;
  portRange: string;
  remoteSecurityGroup: string;
  description: string;
  direction: "inbound" | "outbound";
};

export type Column<T> = {
  header: string | React.ReactNode;
  accessor?: keyof T | "select";
  cell?: (row: T) => React.ReactNode;
  className: string;
  isVisible: boolean;
  toggleVisibility: boolean;
};

export type SecurityGroupDetailsType = {
  id: string;
  name: string;
  securityGroupId: string;
  description: string;
  instances: string;
};

export interface SecurityGroupDetailsProps {
  securityGroupId: string;
}
