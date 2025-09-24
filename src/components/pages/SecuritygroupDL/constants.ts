import {
  SecurityGroupType,
  SecurityGroupDetailsType,
  SecurityGroupRuleType,
} from "./types";

export const securityGroupData: SecurityGroupType[] = [
  {
    id: "sg-001",
    name: "default",
    securityGroupId: "0dc56905-c4e3-4ae5-a7ab-123456789abc",
    description: "Default security group",
    inboundRules: "2 Permission entries",
    outboundRules: "2 Permission entries",
  },
  {
    id: "sg-002",
    name: "Testing 1",
    securityGroupId: "dabtfae9-1819-4376-81b1-456789abcdef",
    description: "Testing the create route",
    inboundRules: "0 Permission entry",
    outboundRules: "2 Permission entries",
  },
  {
    id: "sg-003",
    name: "web-servers",
    securityGroupId: "f2b3c4d5-e6f7-8901-2345-6789abcdef01",
    description: "Security group for web servers",
    inboundRules: "3 Permission entries",
    outboundRules: "1 Permission entry",
  },
  {
    id: "sg-004",
    name: "database-sg",
    securityGroupId: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    description: "Security group for database servers",
    inboundRules: "1 Permission entry",
    outboundRules: "1 Permission entry",
  },
];

const securityGroupDetailsData: SecurityGroupDetailsType[] = [
  {
    id: "sg-001",
    name: "default",
    securityGroupId: "0dc56905-c4e3-4ae5-a7ab-123456789abc",
    description: "Default security group",
    instances: "web-server-01, api-server-02",
  },
  {
    id: "sg-002",
    name: "Testing 1",
    securityGroupId: "dabtfae9-1819-4376-81b1-456789abcdef",
    description: "Testing the create route",
    instances: "test-instance-01",
  },
  {
    id: "sg-003",
    name: "web-servers",
    securityGroupId: "f2b3c4d5-e6f7-8901-2345-6789abcdef01",
    description: "Security group for web servers",
    instances: "nginx-01, apache-02, load-balancer-01",
  },
  {
    id: "sg-004",
    name: "database-sg",
    securityGroupId: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    description: "Security group for database servers",
    instances: "mysql-primary, mysql-replica, redis-cache",
  },
];

export const securityGroupRulesData: SecurityGroupRuleType[] = [
  {
    id: "rule-001",
    etherType: "IPv4",
    ruleId: "c550179d-cb4b-4160-9619-61bcf696a8b5",
    ipProtocol: "Any Protocol",
    remoteIpPrefix: "---",
    portRange: "Any",
    remoteSecurityGroup: "0dc56905-c4e3-4ae5-a7ab-123456789abc",
    description: "---",
    direction: "inbound",
  },
  {
    id: "rule-002",
    etherType: "IPv6",
    ruleId: "d4ea1781-696c-4b89-1234-567890abcdef",
    ipProtocol: "Any Protocol",
    remoteIpPrefix: "---",
    portRange: "Any",
    remoteSecurityGroup: "0dc56905-c4e3-4ae5-a7ab-123456789abc",
    description: "---",
    direction: "inbound",
  },
  {
    id: "rule-003",
    etherType: "IPv4",
    ruleId: "09baf298-f632-434d-8f0a-e76bf5a189eb",
    ipProtocol: "Any Protocol",
    remoteIpPrefix: "---",
    portRange: "Any",
    remoteSecurityGroup: "---",
    description: "---",
    direction: "outbound",
  },
  {
    id: "rule-004",
    etherType: "IPv6",
    ruleId: "c5ddf624-0d8c-4c78-9012-345678901234",
    ipProtocol: "Any Protocol",
    remoteIpPrefix: "---",
    portRange: "Any",
    remoteSecurityGroup: "---",
    description: "---",
    direction: "outbound",
  },
];

export const getSecurityGroupDetails = (
  securityGroupId: string
): SecurityGroupDetailsType => {
  const securityGroup = securityGroupDetailsData.find(
    (sg) => sg.securityGroupId === securityGroupId
  );

  if (securityGroup) {
    return securityGroup;
  }

  return {
    id: "unknown",
    name: "Unknown Security Group",
    securityGroupId: securityGroupId,
    description: "Security group not found",
    instances: "No instances",
  };
};
