export type SnapshotType = {
  id: string;
  name: string;
  description: string;
  snapshotId: string;
  size: string;
  volumeName: string;
  status: "Available" | "Creating" | "Deleting" | "Error";
  created: string;
};

export type SnapshotDetailsType = {
  id: string;
  name: string;
  description: string;
  snapshotId: string;
  status: "Available" | "Creating" | "Deleting" | "Error";
  size: string;
  volume: string;
  createdAt: string;
  updatedAt: string;
  encryption: string;
  volumeSize: string;
  progress: string;
};

export type Column<T> = {
  header: string | React.ReactNode;
  accessor?: keyof T | "select";
  cell?: (row: T) => React.ReactNode;
  className: string;
  isVisible: boolean;
  toggleVisibility: boolean;
};

export interface SnapshotDetailsProps {
  snapshotId: string;
}