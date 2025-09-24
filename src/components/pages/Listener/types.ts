export type ListenerType = {
  id: string;
  name: string;
  listenerId: string;
  description: string;
  protocol: string;
  port: string;
};

export type ListenerDetailsType = {
  id: string;
  listenerId: string;
  name: string;
  description: string;
  protocol: string;
  port: string;
  connectionLimit: string;
  clientTimeout: string;
  memberTimeout: string;
  tcpInspectTimeout: string;
  provisioningStatus: string;
  adminState: string;
  operatingStatus: string;
  createdAt: string;
  updatedAt: string;
  xForwardedFor: string;
  xForwardedPort: string;
  xForwardedProto: string;
};


export type ListenerPolicyType = {
  id: string;
  policyId:string,
  name: string;
  position: number;
  action: string;          
  operatingStatus: string;
  provisioningStatus: string;
  adminState: string;
  createdAt: string;    
};


export type Column<T> = {
  header: string | React.ReactNode;
  accessor?: keyof T | "select";
  cell?: (row: T) => React.ReactNode;
  className: string;
  isVisible: boolean;
  toggleVisibility: boolean;
};

export interface ListenerDetailsProps {
  listenerId: string;
}
