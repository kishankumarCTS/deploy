export type VolumeType = {
  id: string;
  name: string;
  volumeId: string;
  description: string;
  size: number;
  instanceName: string;
  status: "In Use" | "Available" | "Creating" | "Error";
  bootable: boolean;
  type: string;
  createdAt: string;
  privateIpv4: string;
  publicIpv4: string;
  privateIpv6: string;
  publicIpv6: string;
};

export type Column = {
  header: string | React.ReactNode;
  accessor?: keyof VolumeType | "select";
  cell?: (row: VolumeType) => React.ReactNode;
  className: string;
  isVisible: boolean;
  toggleVisibility: boolean;
};

export type VolumeDetailsType = {
  id: string;
  name: string;
  volumeId: string;
  description: string;
  size: number;
  instanceName: string;
  status: "In Use" | "Available" | "Creating" | "Error";
  bootable: boolean;
  encrypted: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
  privateIpv4: string;
  publicIpv4: string;
  privateIpv6: string;
  publicIpv6: string;
};

export type SnapshotType = {
  id: string;
  name: string;
  snapshotId: string;
  size: number;
  status: "Available" | "Creating" | "Error";
  createdAt: string;
};

export interface VolumeDetailsProps {
  volumeId: string;
}
