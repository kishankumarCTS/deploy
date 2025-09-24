export interface PoolDetailsProps {
  poolId: string;
}

export interface StatusType {
  status: string;
  variant: string;
}

export interface HealthMonitorType {
  id: string;
  name: string;
  type: string;
  operatingStatus: StatusType;
  provisioningStatus: StatusType;
  adminState: StatusType;
  autoScalingMember: StatusType;
  createdAt: string;
}

export interface BackendServerType {
  id: string;
  name: string;
  ipAddress: string;
  operatingStatus: StatusType;
  provisioningStatus: StatusType;
  protocolPort: number;
  weight: number;
  adminState: StatusType;
  autoScalingMember: StatusType;
  backup: StatusType;
  createdAt: string;
}

export interface Column<T> {
  header: string | React.ReactNode;
  accessor: keyof T;
  className?: string;
  isVisible: boolean;
  toggleVisibility: boolean;
  cell?: (row: T) => React.ReactNode;
}
