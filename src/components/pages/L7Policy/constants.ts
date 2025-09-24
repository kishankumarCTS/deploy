import { L7PolicyType, L7RuleType } from "./types";

export const l7PoliciesData: L7PolicyType[] = [
  {
    policyId: "dfj4576hf4rbgfmh-fhghk",
    name: "Main Policy",
    position: "1",
    description: "Handles main routing rules",
    provisioningStatus: "Active",
    adminState: "Up",
    operatingStatus: "Online",
    createdAt: "16-09-2025 08:22",
    updatedAt: "16-09-2025 09:08",
  },
  {
    policyId: "somefake",
    name: "Fallback Policy",
    position: "2",
    description: "Fallback policy for unmatched traffic",
    provisioningStatus: "Active",
    adminState: "Down",
    operatingStatus: "Shutoff",
    createdAt: "18-09-2025 11:00",
    updatedAt: "18-09-2025 11:45",
  },
];

export const l7RulesData: L7RuleType[] = [
  {
    id: "rule-001",             // unique React key
    ruleId: "1837sff-8sfjh76h24fjch-sfh",        // this will be used in the details route
    policyId: "dfj4576hf4rbgfmh-fhghk",
    type: "HOST_NAME",
    key: "---",
    compareType: "REGEX",
    value: "test",
    invert: false,
    operatingStatus: "Online",
    provisioningStatus: "Active",
    adminState: "Up",
    createdAt: "16-09-2025 08:22",
  },
  {
    id: "rule-002",
    ruleId: "38abc-ff-8sfjh76h24fjch-sfh",
    policyId: "234567dfj4576hf4rbgfmh-fhdfggghk",
    type: "PATH",
    key: "/api/*",
    compareType: "EQUAL_TO",
    value: "/api/v1",
    invert: false,
    operatingStatus: "Online",
    provisioningStatus: "Active",
    adminState: "Up",
    createdAt: "16-09-2025 08:40",
  },
  
];
export const getL7PolicyDetails = (
  policyId: string
): L7PolicyType | undefined =>
  l7PoliciesData.find((p) => p.policyId === policyId);

export const getL7RulesForPolicy = (policyId: string) =>
  l7RulesData.filter((rule) => rule.policyId === policyId);
