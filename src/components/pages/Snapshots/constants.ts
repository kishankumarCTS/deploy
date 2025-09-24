import { SnapshotType, SnapshotDetailsType } from "./types";

export const snapshotData: SnapshotType[] = [
  {
    id: "snap-001",
    name: "test",
    description: "test",
    snapshotId: "9ec7dbf3-7f07-4e44-b1fb-a2bb017cc765",
    size: "8 GB",
    volumeName: "To use in instance",
    status: "Available",
    created: "16-09-2025 09:17",
  },
  {
    id: "snap-002",
    name: "snapshot for postman",
    description: "Boot Volume for Instance",
    snapshotId: "5244dce9-6da7-4e44-8b2c-9f3a1b2c3d4e",
    size: "20 GB",
    volumeName: "Dummy Boot Volume",
    status: "Available",
    created: "15-09-2025 14:30",
  },
  {
    id: "snap-003",
    name: "sss",
    description: "ssss",
    snapshotId: "c990809c-cd04-4a44-9e1f-5a6b7c8d9e0f",
    size: "2 GB",
    volumeName: "Added Additional Volume",
    status: "Available",
    created: "14-09-2025 11:22",
  },
  {
    id: "snap-004",
    name: "database-backup",
    description: "Daily backup of production database",
    snapshotId: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    size: "50 GB",
    volumeName: "Production DB Volume",
    status: "Creating",
    created: "17-09-2025 03:15",
  },
];

const snapshotDetailsData: SnapshotDetailsType[] = [
  {
    id: "snap-001",
    name: "test",
    description: "test",
    snapshotId: "9ec7dbf3-7f07-4e44-b1fb-a2bb017cc765",
    status: "Available",
    size: "8 GB",
    volume: "To use in instance",
    createdAt: "16-09-2025 09:17",
    updatedAt: "16-09-2025 09:17",
    encryption: "Encrypted",
    volumeSize: "10 GB",
    progress: "100%",
  },
  {
    id: "snap-002",
    name: "snapshot for postman",
    description: "Boot Volume for Instance",
    snapshotId: "5244dce9-6da7-4e44-8b2c-9f3a1b2c3d4e",
    status: "Available",
    size: "20 GB",
    volume: "Dummy Boot Volume",
    createdAt: "15-09-2025 14:30",
    updatedAt: "15-09-2025 14:35",
    encryption: "Encrypted",
    volumeSize: "25 GB",
    progress: "100%",
  },
  {
    id: "snap-003",
    name: "sss",
    description: "ssss",
    snapshotId: "c990809c-cd04-4a44-9e1f-5a6b7c8d9e0f",
    status: "Available",
    size: "2 GB",
    volume: "Added Additional Volume",
    createdAt: "14-09-2025 11:22",
    updatedAt: "14-09-2025 11:25",
    encryption: "Not Encrypted",
    volumeSize: "5 GB",
    progress: "100%",
  },
  {
    id: "snap-004",
    name: "database-backup",
    description: "Daily backup of production database",
    snapshotId: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    status: "Creating",
    size: "45 GB",
    volume: "Production DB Volume",
    createdAt: "17-09-2025 03:15",
    updatedAt: "17-09-2025 03:18",
    encryption: "Encrypted",
    volumeSize: "50 GB",
    progress: "85%",
  },
];

export const getSnapshotDetails = (snapshotId: string): SnapshotDetailsType => {
  const snapshot = snapshotDetailsData.find(
    (snap) => snap.snapshotId === snapshotId
  );

  if (snapshot) {
    return snapshot;
  }

  return {
    id: "unknown",
    name: "Unknown Snapshot",
    description: "Snapshot not found",
    snapshotId: snapshotId,
    status: "Error",
    size: "0 GB",
    volume: "Unknown Volume",
    createdAt: "N/A",
    updatedAt: "N/A",
    encryption: "Unknown",
    volumeSize: "0 GB",
    progress: "0%",
  };
};