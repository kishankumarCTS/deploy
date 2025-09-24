export interface L7RuleType {
  id: string;
  type: string;
  ruleId:string,
  policyId:string,
  key: string;
  compareType: string;
  value: string;
  invert: boolean;
  operatingStatus: string;
  provisioningStatus: string;
  adminState: string;
  createdAt: string;
}

export interface L7PolicyType {
  policyId: string;
  name: string;
  position: string;
  description: string;
  provisioningStatus: string;
  adminState: string;
  operatingStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column<T> {
  header: string | React.ReactNode;
  accessor?: keyof T | "select";
  className?: string;
  isVisible: boolean;
  toggleVisibility?: boolean;
  cell?: (row: T) => React.ReactNode;
}

export interface L7PolicyDetailsProps {
  policyId: string;
}
