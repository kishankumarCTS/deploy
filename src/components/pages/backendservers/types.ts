export interface BackendServerType {
  id: string;
  name: string;
  address: string;
  weight: number;
  monitorAddress: string;
  monitorPort: number;
  provisioningStatus: string;
  adminState: string;
  operatingStatus: string;
  backup: string;
  createdAt: string;
  updatedAt: string;
}
