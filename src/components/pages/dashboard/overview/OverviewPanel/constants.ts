import { DataPoint, Action, MetricCard } from "./types";

export const CHART_DATA: DataPoint[] = [
  {
    date: "2 Jun",
    value: 350,
    compare: 180,
    fullDate: "2 June 2025",
    lastPeriod: 360,
  },
  {
    date: "5 Jun",
    value: 454,
    compare: 185,
    fullDate: "5 June 2025",
    lastPeriod: 365,
  },
  {
    date: "9 Jun",
    value: 320,
    compare: 190,
    fullDate: "9 June 2025",
    lastPeriod: 370,
  },
  {
    date: "13 Jun",
    value: 320,
    compare: 185,
    fullDate: "13 June 2025",
    lastPeriod: 365,
  },
  {
    date: "15 Jun",
    value: 500.32,
    compare: 92.21,
    fullDate: "15 June 2025",
    lastPeriod: 92.21,
  },
  {
    date: "21 Jun",
    value: 550,
    compare: 90,
    fullDate: "21 June 2025",
    lastPeriod: 360,
  },
  {
    date: "25 Jun",
    value: 400,
    compare: 200,
    fullDate: "25 June 2025",
    lastPeriod: 370,
  },
  {
    date: "28 Jun",
    value: 520,
    compare: 255,
    fullDate: "28 June 2025",
    lastPeriod: 375,
  },
];

export const QUICK_ACTIONS: Action[] = [
  {
    title: "Compute Engine",
    count: "12",
    icon: "/images/overview/compute-engine.svg",
  },
  { title: "Volumes", count: "12", icon: "/images/overview/volumes.svg" },
  { title: "Storage", count: "12", icon: "/images/overview/storage.svg" },
  { title: "Snapshots", count: "12", icon: "/images/overview/snapshots.svg" },
  { title: "Backups", count: "12", icon: "/images/overview/backups.svg" },
  {
    title: "Floating IPs",
    count: "12",
    icon: "/images/overview/floating-ips.svg",
  },
  {
    title: "VPC Networks",
    count: "12",
    icon: "/images/overview/vpc-networks.svg",
  },
  { title: "Routers", count: "12", icon: "/images/overview/routers.svg" },
  {
    title: "Security Groups",
    count: "12",
    icon: "/images/overview/security-groups.svg",
  },
];

export const METRIC_CARDS: MetricCard[] = [
  { label: "Current Billing", value: "$124.32" },
  { label: "Monthly Consumption", value: "$901.77" },
  { label: "Monthly Forecast", value: "$901.77" },
];

export const INSTANCE_OPTIONS = [
  {
    name: "My Test Instance",
    status: "Running",
    region: "us-east-1",
    color: "#22c55e",
  },
  {
    name: "Production Server",
    status: "Running",
    region: "us-west-2",
    color: "#22c55e",
  },
  {
    name: "Development Environment",
    status: "Stopped",
    region: "eu-central-1",
    color: "#ef4444",
  },
  {
    name: "Database Instance",
    status: "Running",
    region: "us-east-1",
    color: "#22c55e",
  },
  {
    name: "Staging Server",
    status: "Pending",
    region: "ap-south-1",
    color: "#f59e0b",
  },
];

export const DEFAULT_ACTIVE_POINT = "15 Jun";

export const CHART_CONFIG = {
  width: 400,
  height: 200,
  yAxisDomain: [0, 600] as [number, number],
  mainLineColor: "#2563EB",
  compareLineColor: "#9CA3AF",
  mainLineStrokeWidth: 3,
  compareLineStrokeWidth: 2,
};

export const COLORS = {
  primary: "#2563EB",
  secondary: "#9CA3AF",
  white: "#fff",
  gray: {
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    700: "#374151",
  },
  blue: {
    500: "#3B82F6",
    600: "#2563EB",
  },
};
