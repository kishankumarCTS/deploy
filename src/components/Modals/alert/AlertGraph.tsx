"use client";

import Graph from "@/components/ui/Graph";
import { Button } from "@/components/ui/Button";
const alertData = [
  { time: "10:00", alerts: 2 },
  { time: "11:00", alerts: 5 },
  { time: "12:00", alerts: 3 },
  { time: "13:00", alerts: 8 },
  { time: "14:00", alerts: 4 },
  { time: "15:00", alerts: 7 },
  { time: "16:00", alerts: 10 },
];

export default function AlertGraph() {
  return (
    <Graph
      title="Alert Trends"
      subtitle="Number of alerts triggered over time"
      data={alertData}
      xKey="time"
      yKey="alerts"
      gradientColor="#2A70F9" // red theme for alerts
      strokeDasharray="4 2"
      height={350}
      headerAction={
        <Button >
          Last 24h
        </Button>
      }
    />
  );
}
