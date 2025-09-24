import { ListenerType, ListenerDetailsType, ListenerPolicyType } from "./types";

export const listenerData: ListenerType[] = [
  {
    id: "listener-001",
    name: "Test",
    listenerId: "2c99c8d9-56fa-4970-9d45-4448cff00dd8",
    description: "Test HTTP listener",
    protocol: "HTTP",
    port: "80",
  },
];

const listenerDetailsData: ListenerDetailsType[] = [
  {
    id: "listener-001",
    listenerId: "2c99c8d9-56fa-4970-9d45-4448cff00dd8",
    name: "Test",
    description: "Test HTTP listener",
    protocol: "HTTP",
    port: "80",
    connectionLimit: "-1",
    clientTimeout: "50000",
    memberTimeout: "50000",
    tcpInspectTimeout: "0",
    provisioningStatus: "Active",
    adminState: "Up",
    operatingStatus: "Online",
    createdAt: "09-09-2025 11:33",
    updatedAt: "17-09-2025 14:53",
    xForwardedFor: "No",
    xForwardedPort: "No",
    xForwardedProto: "No",
  },
];

export const listenerPoliciesData: ListenerPolicyType[] = [
  {
    id: "policy-001",
    policyId: "dfj4576hf4rbgfmh-fhghk",
    name: "test",
    position: 1,
    action: "REJECT",
    operatingStatus: "Online",
    provisioningStatus: "Active",
    adminState: "Up",
    createdAt: "18-09-2025 12:15",
  },
];

export const getListenerDetails = (listenerId: string): ListenerDetailsType => {
  const listener = listenerDetailsData.find((l) => l.listenerId === listenerId);

  if (listener) return listener;

  return {
    id: "unknown",
    listenerId,
    name: "Unknown Listener",
    description: "Listener not found",
    protocol: "-",
    port: "-",
    connectionLimit: "-",
    clientTimeout: "-",
    memberTimeout: "-",
    tcpInspectTimeout: "-",
    provisioningStatus: "-",
    adminState: "-",
    operatingStatus: "-",
    createdAt: "-",
    updatedAt: "-",
    xForwardedFor: "-",
    xForwardedPort: "-",
    xForwardedProto: "-",
  };
};
