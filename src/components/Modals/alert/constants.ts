import { SelectOption } from './types';

export const INSTANCE_OPTIONS: SelectOption[] = [
  { id: 0, label: "Select Instance", value: "__placeholder__", disabled: true },
  { id: 1, label: "Testing2", value: "testing2" },
  { id: 2, label: "Production", value: "production" },
  { id: 3, label: "Staging", value: "staging" },
];

export const METRIC_TYPES: SelectOption[] = [
  {
    id: 0,
    label: "Select Metric Type",
    value: "__placeholder__",
    disabled: true,
  },
  { id: 1, label: "CPU Utilization", value: "cpu_utilization" },
  { id: 2, label: "Memory Usage", value: "memory_usage" },
  { id: 3, label: "Disk Usage", value: "disk_usage" },
];

export const NOTIFICATION_TYPES: SelectOption[] = [
  {
    id: 0,
    label: "Select Notification Type",
    value: "__placeholder__",
    disabled: true,
  },
  { id: 1, label: "Email", value: "email" },
  { id: 2, label: "MS Teams", value: "msteams" },
  { id: 3, label: "Webhook", value: "webhook" },
];

export const METRIC_FIELD_OPTIONS: SelectOption[] = [
  {
    id: 0,
    label: "Select Metric Field",
    value: "__placeholder__",
    disabled: true,
  },
  { id: 1, label: "CPU Usage", value: "cpu_usage" },
  { id: 2, label: "Memory Usage", value: "memory_usage" },
  { id: 3, label: "Disk Usage", value: "disk_usage" },
  { id: 4, label: "Network I/O", value: "network_io" },
];

export const DEFAULT_ALERT_VALUES = {
  WARNING_THRESHOLD: "60",
  CRITICAL_THRESHOLD: "80",
  TRIGGER_FREQUENCY: "5",
  TRIGGER_UNIT: "minutes",
} as const;