"use client";

import CpuUsageChart from "./CpuUsage";
import ChartCard from "./ChartCard";

const InsightsTab = () => {
  return (
    <div>
      <CpuUsageChart />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto mt-6">
        <ChartCard title="CPU Usage" />
        <ChartCard title="Memory" />
        <ChartCard title="Network In (Mbps)" />
        <ChartCard title="Network Out (Mbps)" />
      </div>
    </div>
  );
};

export default InsightsTab;
