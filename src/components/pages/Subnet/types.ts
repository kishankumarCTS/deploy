export interface AllocationPool {
  start: string;
  end: string;
}

export interface Subnet {
  id: string;
  name: string;
  vpcId: string;
  createdAt: string;
  ipVersion: string;
  gatewayIp: string;
  dnsNameservers: string[];
  allocationPools: AllocationPool[];
}

export interface SubnetDetailsProps {
  subnetId: string;
}
