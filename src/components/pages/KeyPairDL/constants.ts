import { KeyPairType } from "./types";

export const keyPairData: KeyPairType[] = [
  {
    id: "kp-001",
    name: "dffdfd",
    type: "ssh",
    fingerprint: "d3:8c:b9:96:f1:68:e9:0b:1b:7c:1a:28:86:12:07:43",
    createdAt: "15-01-2024 10:30",
    publicKey:
      "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3dYeC32vZxNBjGnBGCuHybu2A1iHRDwIPvmYZJohYnFCG8dai2SIL/... Generated-by-Nova",
  },
  {
    id: "kp-002",
    name: "Test",
    type: "ssh",
    fingerprint: "ed:4f:67:ae:20:78:e7:ce:ca:ab:64:d4:6e:f8:0a:03",
    createdAt: "20-02-2024 14:15",
    publicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCxyz... ",
  },
];

export const getKeyPairDetails = (keyPairId: string): KeyPairType => {
  return keyPairData.find((kp) => kp.id === keyPairId)!;
};
