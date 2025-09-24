import { OptionItem } from "./types";

export const ACTION_OPTIONS: OptionItem[] = [
  { id: 1, label: "Reject", value: "REJECT" },
  { id: 2, label: "Redirect to URL", value: "REDIRECT_TO_URL" },
  { id: 3, label: "Redirect to Pool", value: "REDIRECT_TO_POOL" },
];

export const AVAILABLE_POOLS: OptionItem[] = [
  { id: 1, label: "Test Pool 1", value: "pool-1" },
  { id: 2, label: "Test Pool 2", value: "pool-2" },
  { id: 3, label: "Production Pool", value: "pool-3" },
];
