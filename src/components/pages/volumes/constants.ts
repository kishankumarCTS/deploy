import { VolumeType, VolumeDetailsType, SnapshotType } from "./types";

export const volumeData: VolumeType[] = [
  {
    id: "vol-001",
    volumeId: "0aa1bb22-cc33-44dd-88ee-ff1122334455",
    name: "ddsd Additional Volume",
    description: "Additional Volume for Instance",
    size: 2,
    instanceName: "ddsd",
    status: "In Use",
    bootable: false,
    type: "NVMe based High IOPS",
    createdAt: "15-01-2024 10:30",
    privateIpv4: "192.168.1.10",
    publicIpv4: "203.0.113.1",
    privateIpv6: "2001:db8::1",
    publicIpv6: "2001:db8:85a3::1",
  },
  {
    id: "vol-002",
    volumeId: "11223344-5566-7788-99aa-bbccddeeff00",
    name: "ddsd Boot Volume",
    description: "Boot Volume for Instance",
    size: 20,
    instanceName: "ddsd",
    status: "In Use",
    bootable: true,
    type: "NVMe based High IOPS",
    createdAt: "2024-01-15T09:15:00Z",
    privateIpv4: "192.168.1.11",
    publicIpv4: "203.0.113.2",
    privateIpv6: "2001:db8::2",
    publicIpv6: "2001:db8:85a3::2",
  },
  {
    id: "vol-003",
    volumeId: "22334455-6677-8899-aabb-ccddeeff0011",
    name: "Dummy Boot Volume",
    description: "Boot Volume for Instance",
    size: 20,
    instanceName: "Dummy",
    status: "In Use",
    bootable: true,
    type: "NVMe based High IOPS",
    createdAt: "2024-01-14T14:45:00Z",
    privateIpv4: "192.168.1.12",
    publicIpv4: "203.0.113.3",
    privateIpv6: "2001:db8::3",
    publicIpv6: "2001:db8:85a3::3",
  },
  {
    id: "vol-004",
    volumeId: "33445566-7788-99aa-bbcc-ddeeff001122",
    name: "Storage Volume",
    description: "Additional storage for applications",
    size: 100,
    instanceName: "app-server",
    status: "Available",
    bootable: false,
    type: "Standard SSD",
    createdAt: "2024-01-16T08:20:00Z",
    privateIpv4: "192.168.1.13",
    publicIpv4: "203.0.113.4",
    privateIpv6: "2001:db8::4",
    publicIpv6: "2001:db8:85a3::4",
  },
];

export const getVolumeDetails = (volumeId: string): VolumeDetailsType => {
  const volume = volumeData.find((vol) => vol.volumeId === volumeId);

  if (volume) {
    return {
      ...volume,
      encrypted: false,
      updatedAt: "03-09-2025 10:29",
    };
  }

  return {
    id: "unknown",
    volumeId,
    name: "Unknown Volume",
    description: "Volume not found",
    size: 0,
    instanceName: "N/A",
    status: "Error",
    bootable: false,
    encrypted: false,
    type: "N/A",
    createdAt: "N/A",
    updatedAt: "N/A",
    privateIpv4: "N/A",
    publicIpv4: "N/A",
    privateIpv6: "N/A",
    publicIpv6: "N/A",
  };
};

export const snapshotsData: SnapshotType[] = [
  {
    id: "snap-001",
    name: "Project Alpha",
    snapshotId: "c990809c-cd04-4a75-9ce5-a408e00192b0",
    size: 2,
    status: "Available",
    createdAt: "15-01-2024 10:30",
  },
  {
    id: "snap-002",
    name: "Database Backup",
    snapshotId: "d12f34g5-h67i-89j0-k1l2-m3n4o5p6q7r8",
    size: 5,
    status: "Creating",
    createdAt: "2024-05-20T14:15:00Z",
  },
  {
    id: "snap-003",
    name: "Website Files",
    snapshotId: "e9876f5d-c4b3-a210-9876-543210fedcba",
    size: 1.5,
    status: "Available",
    createdAt: "2024-05-22T08:00:00Z",
  },
  {
    id: "snap-004",
    name: "User Data",
    snapshotId: "f0e1d2c3-b4a5-6789-9876-543210abcde",
    size: 10,
    status: "Error",
    createdAt: "2024-05-21T18:45:00Z",
  },
];
