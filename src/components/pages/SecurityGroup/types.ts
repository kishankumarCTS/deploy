export interface SecurityGroupRule {
  id: string;
  etherType: string;
  protocol: string;
  portRange: string;
  remoteIpPrefix: string;
}

export interface SecurityGroupFormData {
  name: string;
  description: string;
  inboundRules: SecurityGroupRule[];
  outboundRules: SecurityGroupRule[];
}

export interface CreateSecurityGroupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: SecurityGroupFormData) => void;
}

export interface ArrowIconProps {
  className?: string;
}