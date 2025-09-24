import { OptionItem } from "./types";

export const RULE_TYPES: OptionItem[] = [
  { id: 1, label: "Host Header", value: "HOST_NAME" },
  { id: 2, label: "Path", value: "PATH" },
  { id: 3, label: "Header", value: "HEADER" },
  { id: 4, label: "Cookie", value: "COOKIE" },
  { id: 5, label: "File Type", value: "FILE_TYPE" },
];

export const COMPARE_TYPES: OptionItem[] = [
  { id: 1, label: "REGEX", value: "REGEX" },
  { id: 2, label: "EQUAL TO", value: "EQUAL_TO" },
  { id: 3, label: "STARTS WITH", value: "STARTS_WITH" },
  { id: 4, label: "ENDS WITH", value: "ENDS_WITH" },
  { id: 5, label: "CONTAINS", value: "CONTAINS" },
];
